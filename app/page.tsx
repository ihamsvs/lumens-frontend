"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { DirectorCard } from "@/components/director-card";
import { TravelGuide } from "@/types/travel";
import { CinematicMap } from "@/components/cinematic-map";
import { Skeleton } from "@/components/ui/skeleton";
import { DirectorCardSkeleton } from "@/components/director-card-skeleton";
import {
  Map as MapIcon,
  Calendar,
  Sparkles,
  Navigation,
  Ticket,
} from "lucide-react";
const DownloadButton = dynamic(() => import("@/components/download-button"), {
  ssr: false,
  loading: () => (
    <div className="h-12 w-48 mx-auto mt-12 bg-white/10 rounded-full animate-pulse" />
  ),
});
export default function LumensPage() {
  const [guide, setGuide] = useState<TravelGuide | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuide = async (city: string) => {
    setLoading(true);
    setError(null);
    setGuide(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";
      const res = await fetch(
        `${apiUrl}/gemini/cinematic-guide?city=${encodeURIComponent(city)}`,
      );

      if (!res.ok) throw new Error("Error al conectar con el servidor");

      const data: TravelGuide = await res.json();
      setGuide(data);
    } catch (err) {
      setError(
        "No pudimos encontrar ese destino. Intenta con una ciudad famosa.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cityFromUrl = params.get("city");

    if (cityFromUrl) {
      fetchGuide(cityFromUrl);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <Header onSearch={fetchGuide} isLoading={loading} />

      {!guide && !loading && (
        <div className="animate-in fade-in duration-700">
          <section className="relative overflow-hidden py-20 sm:py-32 border-b border-border/40">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-secondary/50 via-background to-background opacity-50" />

            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm font-medium text-accent mb-6 backdrop-blur">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                <span>Tu compañero de viaje inteligente</span>
              </div>

              <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-7xl mb-6">
                Tu Location Scout <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-400 to-zinc-600">
                  impulsado por IA
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
                Busca un destino exacto o describe la vibra cinematográfica que
                tienes en mente. La IA encontrará el lugar perfecto, sus mejores
                locaciones y la configuración de cámara ideal.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-left mt-16">
                <FeatureBox
                  icon={<Navigation className="h-5 w-5" />}
                  title="Locaciones Ocultas"
                  desc="Descubre el 'B-side' de la ciudad. Callejones, arquitectura y joyas secretas."
                />
                <FeatureBox
                  icon={<Calendar className="h-5 w-5" />}
                  title="Planificación Ideal"
                  desc="Sabrás exactamente cuál es el mejor mes y hora para visitar."
                />
                <FeatureBox
                  icon={<Ticket className="h-5 w-5" />}
                  title="Dato de Cine"
                  desc="Curiosidades de películas famosas filmadas en tu destino."
                />
              </div>
            </div>
          </section>

          <section className="py-24 bg-secondary/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight">
                  Tu viaje en 3 pasos
                </h2>
                <p className="text-muted-foreground mt-2">
                  Planifica tu próxima aventura en segundos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <Step
                    num="01"
                    title="Ingresa tu Destino o Vibra"
                    desc="Escribe una ciudad (ej: París) o lo que imaginas (ej: castillo medieval con nieve)."
                  />
                  <Step
                    num="02"
                    title="Descubre Secretos"
                    desc="Obtén una lista de lugares, tips y curiosidades de cine."
                  />
                  <Step
                    num="03"
                    title="Captura el Momento"
                    desc="Recibe ajustes profesionales para tu cámara."
                  />
                </div>

                <div className="relative rounded-xl border border-border/50 bg-background/50 p-2 shadow-2xl backdrop-blur">
                  <div className="absolute inset-0 bg-linear-to-tr from-accent/10 to-transparent rounded-xl" />
                  <div className="relative aspect-video rounded-lg border border-border bg-zinc-950/80 flex items-center justify-center overflow-hidden">
                    <div className="text-center p-6">
                      <MapIcon className="h-12 w-12 text-accent mx-auto mb-4" />
                      <p className="text-muted-foreground font-mono text-sm">
                        Creando itinerario...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {loading && (
        <div className="w-full animate-in fade-in duration-500">
          {/* 1. SKELETON DEL HERO SECTION */}
          <section className="relative w-full overflow-hidden border-b border-border/40 min-h-[60vh] flex items-center bg-secondary/5">
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-8 md:px-20 lg:px-32 py-20">
              <div className="flex flex-col gap-10 items-start w-full max-w-6xl">
                <div className="flex flex-col gap-4 w-full">
                  {/* Etiqueta de Destino */}
                  <Skeleton className="h-8 w-48 rounded-full bg-accent/20" />
                  {/* Título Gigante */}
                  <Skeleton className="h-24 w-3/4 md:w-1/2 bg-foreground/10" />
                  <Skeleton className="h-24 w-2/4 md:w-1/3 bg-foreground/10" />
                </div>
                {/* Badge de Clima */}
                <Skeleton className="h-32 w-full max-w-4xl rounded-3xl bg-accent/10" />
              </div>
            </div>
          </section>

          {/* 2. SKELETON DEL MAPA */}
          <section className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
            <Skeleton className="w-full h-[500px] rounded-xl shadow-2xl bg-zinc-900 border border-border/40 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 opacity-50">
                <MapIcon className="h-10 w-10 text-accent animate-pulse" />
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent font-bold animate-pulse">
                  Renderizando coordenadas...
                </p>
              </div>
            </Skeleton>
          </section>

          {/* 3. SKELETON DE LAS TARJETAS DE LOCACIONES */}
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8">
              {/* Caja de introducción */}
              <Skeleton className="h-24 w-full rounded-lg bg-accent/5 border border-accent/10" />

              {/* Tarjetas de directores falsas */}
              <DirectorCardSkeleton />
              <DirectorCardSkeleton />
              <DirectorCardSkeleton />
            </div>
          </main>
        </div>
      )}

      {error && (
        <div className="mx-auto max-w-lg mt-20 p-6 border border-destructive/30 bg-destructive/5 rounded-lg text-center animate-in slide-in-from-bottom-2">
          <p className="text-destructive font-medium font-mono">{error}</p>
        </div>
      )}

      {guide && (
        <div className="animate-in slide-in-from-bottom-8 duration-700 fade-in">
          <HeroSection
            destination={guide.destination}
            bestMonth={guide.best_month_to_visit}
            imageUrl={guide.destination_image_url}
          />
          <section className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
            {guide.spots.length > 0 && <CinematicMap spots={guide.spots} />}
          </section>

          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-border/40" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Lugares Imperdibles
              </span>
              <div className="h-px flex-1 bg-border/40" />
            </div>

            <div className="flex flex-col gap-8">
              <div className="p-6 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur">
                <p className="text-lg text-foreground/90 font-light leading-relaxed italic">
                  "{guide.description_intro}"
                </p>
              </div>

              {guide.spots.map((spot, idx) => (
                <DirectorCard key={idx} spot={spot} index={idx} />
              ))}
            </div>
            <DownloadButton guide={guide} />
            <footer className="mt-20 border-t border-border/40 pt-8 text-center pb-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 hover:text-accent transition-colors cursor-default">
                LUMENS TRAVEL AI © {new Date().getFullYear()}
              </p>
            </footer>
          </main>
        </div>
      )}
    </div>
  );
}

function FeatureBox({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-lg border border-border/50 bg-background/50 p-5 transition-all hover:border-accent/40 hover:bg-accent/5">
      <div className="mb-3 inline-flex items-center justify-center rounded bg-secondary p-2 text-foreground group-hover:text-accent transition-colors">
        {icon}
      </div>
      <h3 className="mb-1 font-semibold text-foreground font-mono uppercase tracking-wide text-sm">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="font-mono text-xl font-bold text-accent/50">{num}</span>
      <div>
        <h3 className="font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  );
}
