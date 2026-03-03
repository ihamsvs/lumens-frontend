import React from "react";
import {
  MapPin,
  Film,
  CircleDot,
  Timer,
  Eye,
  Camera,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Spot } from "@/types/travel";

interface DirectorCardProps {
  spot: Spot;
  index: number;
}

export function DirectorCard({ spot, index }: DirectorCardProps) {
  // Separamos la conexión de la película si viene con formato "Pelicula; Escena"
  const [movie, scene] = spot.movie_connection.includes(";")
    ? spot.movie_connection.split(";")
    : [spot.movie_connection, "Escena de Cine"];

  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:border-accent/30 w-full max-w-full shadow-lg">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* --- COLUMNA IZQUIERDA: VISUAL & NARRATIVA --- */}
          <div className="flex flex-col lg:border-r lg:border-border/40 min-w-0 h-full">
            {/* 1. SECCIÓN DE IMAGEN */}
            <div className="relative h-56 w-full overflow-hidden border-b border-border/20 group-hover:border-accent/20 transition-colors shrink-0">
              {spot.image_url ? (
                <>
                  <img
                    src={spot.image_url}
                    alt={spot.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </>
              ) : (
                <div className="h-full w-full bg-secondary/10 flex flex-col items-center justify-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Camera className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                    Imagen no disponible
                  </span>
                </div>
              )}

              {/* Badge de Categoría */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/90 border border-white/10 shadow-sm z-10">
                {spot.category}
              </div>
            </div>

            {/* 2. CONTENIDO DE TEXTO */}
            <div className="flex flex-1 flex-col gap-5 p-6">
              <div className="flex flex-col gap-2 min-w-0">
                <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-foreground text-background font-bold font-mono text-xs">
                    {index + 1}
                  </div>
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                  <span className="font-mono text-xs uppercase tracking-widest truncate text-accent">
                    {spot.city}, {spot.country}
                  </span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground leading-tight">
                  {spot.name}
                </h2>
              </div>

              <p className="leading-relaxed text-muted-foreground text-sm">
                {spot.description}
              </p>

              {/* Grid de Tips (Se empuja al fondo de esta columna) */}
              <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2 pt-4">
                <div className="rounded-md bg-secondary/30 p-3 border border-border/30">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Eye className="h-3.5 w-3.5 text-sky-400" /> Tip Viajero
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {spot.visitor_tip}
                  </p>
                </div>
                <div className="rounded-md bg-secondary/30 p-3 border border-border/30">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Timer className="h-3.5 w-3.5 text-amber-400" /> Mejor Hora
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {spot.best_time_to_visit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- COLUMNA DERECHA: HUD TÉCNICO (DATOS DE CÁMARA) --- */}
          {/* FIX: h-full y flex-col puro (sin justify-center) para controlar el espaciado */}
          <div className="flex flex-col h-full bg-zinc-950/30 p-6 relative overflow-hidden min-w-0">
            <ApertureDecoration />

            {/* SECCIÓN 1: Director's Settings */}
            <div className="flex flex-col gap-5 p-5 bg-zinc-950/50 rounded-xl border border-border/50 relative z-10">
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-bold">
                <CircleDot className="h-4 w-4" /> Director's Settings
              </span>

              {typeof spot.camera_settings === "string" ? (
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  {/* FIX: h-6 w-6 y shrink-0 para que el ícono no se aplaste */}
                  <Camera className="h-6 w-6 shrink-0 mt-0.5 text-zinc-400" />
                  <p className="leading-relaxed">{spot.camera_settings}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    {/* FIX: Íconos grandes y títulos claros */}
                    <Camera className="h-6 w-6 shrink-0 mt-0.5 text-blue-400" />
                    <div>
                      <strong className="text-zinc-200 block mb-1 uppercase tracking-widest text-[10px]">
                        Cámara Pro
                      </strong>
                      <p className="leading-relaxed">
                        {spot.camera_settings?.pro}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Smartphone className="h-6 w-6 shrink-0 mt-0.5 text-emerald-400" />
                    <div>
                      <strong className="text-zinc-200 block mb-1 uppercase tracking-widest text-[10px]">
                        Smartphone
                      </strong>
                      <p className="leading-relaxed">
                        {spot.camera_settings?.mobile}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 2: Referencia de Película */}
            {/* FIX: mt-auto empuja esta caja hasta el final de la tarjeta */}
            <div className="relative z-10 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5 min-w-0 mt-auto">
              <div className="flex items-center gap-2 mb-3 text-indigo-400">
                <Film className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Referencia Visual
                </span>
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                {/* FIX: Quitamos truncate para que el título de la peli se lea completo */}
                <span className="font-bold text-foreground text-sm leading-snug">
                  {movie}
                </span>
                <span className="text-sm text-muted-foreground italic leading-relaxed">
                  "{scene?.trim()}"
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- SUBCOMPONENTES AUXILIARES ---

function ApertureDecoration() {
  return (
    <svg
      className="absolute -top-12 -right-12 h-48 w-48 text-foreground opacity-[0.02] pointer-events-none"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
    </svg>
  );
}
