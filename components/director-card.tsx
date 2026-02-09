import React from "react";
import {
  MapPin,
  Film,
  CircleDot,
  Timer,
  Gauge,
  Eye,
  MonitorPlay,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
          <div className="flex flex-col lg:border-r lg:border-border/40 min-w-0">
            {/* 1. SECCIÓN DE IMAGEN (NUEVO) */}
            {spot.image_url ? (
              <div className="relative h-56 w-full overflow-hidden border-b border-border/20 group-hover:border-accent/20 transition-colors">
                {spot.image_url ? (
                  <>
                    <img
                      src={spot.image_url}
                      alt={spot.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60" />
                  </>
                ) : (
                  // --- FALLBACK: ICONO DE CÁMARA ---
                  <div className="h-full w-full bg-secondary/10 flex flex-col items-center justify-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                      Imagen no disponible
                    </span>
                  </div>
                )}

                {/* Badge de Categoría (Siempre visible) */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/90 border border-white/10 shadow-sm z-10">
                  {spot.category}
                </div>
              </div>
            ) : (
              // Fallback visual si no hay imagen (Patrón sutil)
              <div className="h-24 w-full bg-secondary/20 border-b border-border/20 flex items-center justify-center">
                <Film className="h-8 w-8 text-muted-foreground/20" />
              </div>
            )}

            {/* 2. CONTENIDO DE TEXTO */}
            <div className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                    {/* Número de índice estilo claqueta */}
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-foreground text-background font-bold font-mono text-xs">
                      {index + 1}
                    </div>
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span className="font-mono text-xs uppercase tracking-widest truncate text-accent">
                      {spot.city}, {spot.country}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-foreground wrap-break-word mt-2 leading-tight">
                  {spot.name}
                </h2>
              </div>

              <p className="leading-relaxed text-muted-foreground text-sm wrap-break-word">
                {spot.description}
              </p>

              {/* Grid de Tips */}
              <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-secondary/30 p-3 border border-border/30">
                  <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                    <Eye className="h-3 w-3 text-sky-400" /> Tip Viajero
                  </div>
                  <p className="text-xs text-foreground/80 wrap-break-word font-medium">
                    {spot.visitor_tip}
                  </p>
                </div>
                <div className="rounded-md bg-secondary/30 p-3 border border-border/30">
                  <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                    <Timer className="h-3 w-3 text-amber-400" /> Mejor Hora
                  </div>
                  <p className="text-xs text-foreground/80 wrap-break-word font-medium">
                    {spot.best_time_to_visit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- COLUMNA DERECHA: HUD TÉCNICO (DATOS DE CÁMARA) --- */}
          <div className="flex flex-col justify-center gap-6 bg-zinc-950/30 p-6 relative overflow-hidden min-w-0">
            {/* Decoración de fondo (Apertura) */}
            <ApertureDecoration />

            {/* Header del HUD */}
            <div className="flex items-center justify-between relative z-10 border-b border-border/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-red-500/90 font-bold">
                  REC • PRO SETTINGS
                </span>
              </div>
              <Gauge className="h-4 w-4 text-muted-foreground/50" />
            </div>

            {/* Grid de Parámetros Técnicos */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <CameraSettingBox
                icon={<Gauge />}
                label="ISO"
                value={spot.camera_settings.iso}
              />
              <CameraSettingBox
                icon={<Timer />}
                label="SHUTTER"
                value={spot.camera_settings.shutter_speed}
              />
              <CameraSettingBox
                icon={<CircleDot />}
                label="APERTURE"
                value={spot.camera_settings.aperture}
              />
              <CameraSettingBox
                icon={<MonitorPlay />}
                label="FOCAL LEN"
                value={spot.camera_settings.focal_length}
              />
            </div>

            {/* Recomendación de Lente */}
            <div className="relative z-10 min-w-0 mt-2">
              <span className="font-mono text-[10px] uppercase text-muted-foreground">
                Lente Recomendado
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1 w-1 bg-accent rounded-full"></div>
                <p className="font-mono text-sm text-accent font-bold wrap-break-word tracking-wide">
                  {spot.camera_settings.lens_recommendation}
                </p>
              </div>
            </div>

            <Separator className="bg-border/20 relative z-10 my-1" />

            {/* Referencia de Película */}
            <div className="relative z-10 rounded border border-indigo-500/20 bg-indigo-500/5 p-4 min-w-0">
              <div className="flex items-center gap-2 mb-2 text-indigo-400">
                <Film className="h-4 w-4 shrink-0" />
                <span className="font-mono text-xs uppercase tracking-widest whitespace-nowrap font-bold">
                  Referencia Visual
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-foreground text-sm truncate">
                  {movie}
                </span>
                <span className="text-xs text-muted-foreground italic mt-1 wrap-break-word">
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

function CameraSettingBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded border border-border/40 bg-background/20 p-2.5 min-w-0 hover:bg-background/40 transition-colors">
      <div className="flex items-center justify-between text-muted-foreground [&>svg]:h-3.5 [&>svg]:w-3.5">
        {icon}
        <span className="font-mono text-[9px] uppercase tracking-widest opacity-70">
          {label}
        </span>
      </div>
      <span className="font-mono text-sm font-bold text-amber-500 truncate pt-1">
        {value}
      </span>
    </div>
  );
}

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
