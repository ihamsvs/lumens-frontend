"use client";
import * as React from "react";
import ReactMap, {
  Marker as ReactMarker,
  Popup as ReactPopup,
  NavigationControl,
  Source,
  Layer,
  MapProvider,
  useMap,
  ViewState,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";
import type { LineLayer } from "maplibre-gl";

// --- 1. COMPONENTE PRINCIPAL DEL MAPA ---
interface MapProps extends React.ComponentProps<typeof ReactMap> {
  children?: React.ReactNode;
  className?: string;
}

export function Map({ children, className, ...props }: MapProps) {
  return (
    <MapProvider>
      <div
        className={cn(
          "relative w-full h-full rounded-xl overflow-hidden border border-border/40 bg-zinc-950",
          className,
        )}
      >
        <ReactMap
          {...props}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          attributionControl={false}
        >
          <NavigationControl
            position="bottom-right"
            showCompass
            visualizePitch
          />
          {children}
        </ReactMap>
      </div>
    </MapProvider>
  );
}

// --- 2. RUTA (LINEA ENTRE PUNTOS) ---
interface MapRouteProps {
  coordinates: [number, number][]; // Array de [longitud, latitud]
  color?: string;
  width?: number;
  opacity?: number;
}

export function MapRoute({
  coordinates,
  color = "#3b82f6",
  width = 3,
  opacity = 0.8,
}: MapRouteProps) {
  const geojsonData: GeoJSON.Feature<GeoJSON.Geometry> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordinates,
    },
  };

  const layerStyle: LineLayer = {
    id: "route-layer",
    type: "line",
    paint: {
      "line-color": color,
      "line-width": width,
      "line-opacity": opacity,
      "line-blur": 1,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
  };

  return (
    <Source id="route-source" type="geojson" data={geojsonData}>
      <Layer {...layerStyle} />
    </Source>
  );
}

// --- 3. MARCADOR ---
interface MapMarkerProps {
  latitude: number;
  longitude: number;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function MapMarker({
  latitude,
  longitude,
  children,
  onClick,
}: MapMarkerProps) {
  return (
    <ReactMarker
      latitude={latitude}
      longitude={longitude}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick?.();
      }}
    >
      <div className="cursor-pointer transition-transform hover:scale-110 hover:z-50">
        {children}
      </div>
    </ReactMarker>
  );
}

// --- 4. CONTENIDO DEL MARCADOR (Círculo, Pin, etc) ---
export function MarkerContent({ children }: { children: React.ReactNode }) {
  return <div className="relative group">{children}</div>;
}

// --- 5. TOOLTIP (Nombre al pasar el mouse) ---
export function MarkerTooltip({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] px-2 py-1 rounded border border-white/10 whitespace-nowrap z-50 pointer-events-none shadow-xl font-mono uppercase tracking-widest">
      {children}
    </div>
  );
}
