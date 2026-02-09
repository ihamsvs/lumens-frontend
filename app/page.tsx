"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { DirectorCard } from "@/components/director-card";
import { TravelGuide } from "@/types/travel";
import { CinematicMap } from "@/components/cinematic-map";
import {
  Map as MapIcon,
  Calendar,
  Sparkles,
  Navigation,
  Ticket,
} from "lucide-react";

export default function LumensPage() {
  const [guide, setGuide] = useState<TravelGuide | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuide = async (city: string) => {
    setLoading(true);
    setError(null);
    setGuide(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
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
                Descubre el mundo a través de <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-400 to-zinc-600">
                  sus historias
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
                Encuentra los lugares más icónicos, conoce la mejor época para
                viajar y descubre qué películas famosas sucedieron justo donde
                estás parado.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-left mt-16">
                <FeatureBox
                  icon={<Navigation className="h-5 w-5" />}
                  title="Lugares Icónicos"
                  desc="Guías curadas de los puntos imperdibles de cada ciudad."
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
                    title="Elige tu Destino"
                    desc="Escribe a dónde quieres ir en el buscador."
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
        <div className="flex h-[80vh] flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-2 border-zinc-800"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
            <MapIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-accent" />
          </div>
          <div className="text-center space-y-2">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-foreground font-bold">
              Preparando tu Guía
            </p>
            <p className="text-xs text-muted-foreground animate-pulse">
              Buscando mejores rutas • Consultando clima...
            </p>
          </div>
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
