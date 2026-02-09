import { MapPin, Calendar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  destination: string;
  bestMonth: string;
  imageUrl?: string;
}

export function HeroSection({
  destination,
  bestMonth,
  imageUrl,
}: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden border-b border-border/40 bg-background min-h-[60vh] flex items-center">
      {/* --- FONDO DE IMAGEN --- */}
      {imageUrl && (
        <>
          {/* --- FONDO DE IMAGEN O GRADIENTE --- */}
          <div
            className="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-[30s] hover:scale-110"
            style={{
              backgroundImage: imageUrl
                ? `url('${imageUrl}')`
                : "linear-gradient(to bottom right, #09090b, #18181b)", // Fallback oscuro si es null
            }}
          />

          {/* Si NO hay imagen, agregamos un patrón sutil (opcional) */}
          {!imageUrl && (
            <div
              className="absolute inset-0 z-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            ></div>
          )}

          {/* Overlay Oscuro Estándar */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/60 to-black/10" />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </>
      )}

      {/* --- CONTENIDO --- */}
      {/* Usamos el ancho panorámico que te gustaba (max-w-screen-2xl) y padding lateral amplio */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-8 md:px-20 lg:px-32 py-20">
        <div className="flex flex-col gap-10 items-start w-full max-w-6xl">
          {/* Bloque del Título */}
          <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 text-muted-foreground/80">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 backdrop-blur border border-accent/10">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent font-bold shadow-black drop-shadow-md">
                Destino Objetivo
              </span>
            </div>

            <h1 className="text-balance break-words text-6xl font-extrabold tracking-tight text-foreground sm:text-8xl w-full drop-shadow-2xl leading-[1.05]">
              {destination}
            </h1>
          </div>

          {/* Bloque de Información Secundaria (Badge) */}
          <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 max-w-fit">
            <div className="flex items-center gap-2 text-muted-foreground/90 pl-1">
              <Calendar className="h-4 w-4 shrink-0 text-foreground/80" />
              <span className="font-mono text-[10px] uppercase tracking-widest whitespace-nowrap font-medium text-foreground/80">
                Mejor Temporada & Tips
              </span>
            </div>

            {/* --- AQUÍ ESTÁ EL ARREGLO VISUAL --- */}
            <Badge
              variant="outline"
              className="
                w-full max-w-4xl
                h-auto
                border-accent/60
                bg-accent/10
                backdrop-blur-md

                p-6 sm:p-8  /* <-- ESTO SOLUCIONA EL TEXTO PEGADO AL BORDE */

                rounded-3xl /* Bordes curvos más suaves */

                font-mono
                text-sm sm:text-base
                font-medium
                text-accent

                whitespace-normal
                break-words
                text-left
                leading-relaxed /* Separa las líneas de texto para que no se vea denso */
                shadow-[0_0_20px_rgba(0,0,0,0.2)]
              "
            >
              {bestMonth}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
