"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TravelGuide } from "@/types/travel";
import { Loader2, MapPin, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// Interfaz para mapear la respuesta de Supabase
interface SavedGuide {
  search_term: string;
  data: TravelGuide;
}

export default function ExplorePage() {
  const [guides, setGuides] = useState<SavedGuide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLatestGuides = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";
        const res = await fetch(`${apiUrl}/guides/explore`);

        if (!res.ok) throw new Error("Error al cargar el muro de exploración");
        const data = await res.json();
        setGuides(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestGuides();
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      {/* Reutilizamos tu Header. Si alguien busca aquí, lo mandamos al Home con su búsqueda */}
      <Header
        onSearch={(city) =>
          (window.location.href = `/?city=${encodeURIComponent(city)}`)
        }
        isLoading={false}
      />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm font-medium text-accent mb-4 backdrop-blur">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span>Muro de Inspiración</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Descubre nuevas vibras
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora los destinos y las locaciones cinematográficas que otros
            usuarios de LUMENS han descubierto recientemente.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {/* Generamos 6 tarjetas falsas para llenar la pantalla */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden border border-border/50 rounded-xl bg-card/50 flex flex-col"
              >
                {/* Skeleton de la Imagen */}
                <Skeleton className="h-56 w-full rounded-none bg-muted/50" />

                {/* Skeleton del Texto (Prompt) */}
                <div className="p-5 flex flex-col gap-3 bg-zinc-950/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Skeleton className="h-3.5 w-3.5 rounded-full bg-accent/20" />
                    <Skeleton className="h-3 w-32 bg-foreground/10" />
                  </div>
                  <Skeleton className="h-4 w-full bg-foreground/20" />
                  <Skeleton className="h-4 w-4/5 bg-foreground/20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-1000">
            {guides.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden border-border/50 hover:border-accent/40 transition-all duration-300 group bg-card/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] cursor-pointer"
                onClick={() =>
                  (window.location.href = `/?city=${encodeURIComponent(item.search_term)}`)
                }
              >
                {/* Imagen de Portada */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={
                      item.data.destination_image_url ||
                      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
                    }
                    alt={item.data.destination}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Badge de la ciudad real */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/90">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="font-mono text-sm uppercase tracking-widest font-bold truncate">
                        {item.data.destination}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prompt original del usuario */}
                <CardHeader className="p-5 bg-zinc-950/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-accent/70" />
                    <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                      Búsqueda original:
                    </span>
                  </div>
                  <CardTitle className="text-sm font-medium leading-relaxed italic text-foreground/80 line-clamp-2">
                    "{item.search_term}"
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
