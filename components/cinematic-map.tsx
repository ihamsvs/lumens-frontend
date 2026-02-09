"use client";

import * as React from "react";
import { Spot } from "@/types/travel";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapRoute,
} from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Popup } from "react-map-gl/maplibre"; // Importamos Popup directamente de la librería base para funcionalidad

interface CinematicMapProps {
  spots: Spot[];
}

export function CinematicMap({ spots }: CinematicMapProps) {
  const [selectedSpot, setSelectedSpot] = React.useState<Spot | null>(null);

  // 1. Calcular el centro inicial (basado en el primer spot)
  const initialViewState = {
    longitude: spots[0]?.coordinates.longitude || 0,
    latitude: spots[0]?.coordinates.latitude || 0,
    zoom: 12,
  };

  // 2. Generar array de coordenadas para la línea de ruta [[lng, lat], [lng, lat]...]
  const routeCoordinates = spots.map(
    (s) =>
      [s.coordinates.longitude, s.coordinates.latitude] as [number, number],
  );

  return (
    <div className="relative w-full h-125 shadow-2xl">
      {/* Etiqueta flotante */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-xs font-mono uppercase tracking-widest text-accent shadow-lg pointer-events-none">
        Ruta de Rodaje
      </div>

      <Map initialViewState={initialViewState}>
        {/* LÍNEA DE RUTA (Conecta los puntos) */}
        <MapRoute
          coordinates={routeCoordinates}
          color="#a855f7" // Un color morado/accent (ajusta a tu theme)
          width={6}
          opacity={0.6}
        />

        {/* MARCADORES */}
        {spots.map((spot, index) => (
          <MapMarker
            key={index}
            longitude={spot.coordinates.longitude}
            latitude={spot.coordinates.latitude}
            onClick={() => setSelectedSpot(spot)}
          >
            <MarkerContent>
              {/* Círculo numerado estilo "Metro de NY" */}
              <div className="size-6 rounded-full bg-accent border-2 border-zinc-950 shadow-[0_0_10px_rgba(168,85,247,0.5)] flex items-center justify-center text-zinc-950 text-xs font-bold relative z-10">
                {index + 1}
              </div>
              {/* Efecto de "Glow" debajo del marcador */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-accent blur-sm opacity-70"></div>
            </MarkerContent>

            <MarkerTooltip>{spot.name}</MarkerTooltip>
          </MapMarker>
        ))}

        {/* POPUP PERSONALIZADO (Mantenemos la lógica anterior para el detalle) */}
        {selectedSpot && (
          <Popup
            anchor="top"
            longitude={selectedSpot.coordinates.longitude}
            latitude={selectedSpot.coordinates.latitude}
            onClose={() => setSelectedSpot(null)}
            closeButton={false}
            className="cinematic-popup"
            offset={20}
            maxWidth="300px"
          >
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSpot(null);
                }}
                className="absolute -top-2 -right-2 bg-zinc-900 text-white rounded-full p-1 border border-white/20 hover:bg-red-500/80 transition-colors z-50 shadow-lg"
              >
                <X className="h-3 w-3" />
              </button>

              <Card className="border border-white/10 bg-zinc-950/95 backdrop-blur-xl text-white overflow-hidden shadow-2xl rounded-lg">
                {selectedSpot.image_url && (
                  <div className="h-24 w-full relative">
                    <img
                      src={selectedSpot.image_url}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  </div>
                )}
                <div className="p-4 pt-2">
                  <h3 className="font-bold text-sm mb-1 pr-4">
                    {selectedSpot.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">
                    {selectedSpot.description}
                  </p>
                </div>
              </Card>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
