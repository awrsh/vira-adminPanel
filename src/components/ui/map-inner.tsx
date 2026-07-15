"use client";

import * as React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapMarker } from "./map";

// Fix default marker icons in bundlers
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function LeafletMapInner({
  center,
  zoom,
  markers,
  className,
}: {
  center: [number, number];
  zoom: number;
  markers: MapMarker[];
  className?: string;
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className={className}
      style={{ height: "100%", width: "100%", background: "transparent" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {markers.map((m) => (
        <React.Fragment key={m.id}>
          <CircleMarker
            center={[m.lat, m.lng]}
            radius={8}
            pathOptions={{
              color: "var(--primary)",
              fillColor: "var(--primary)",
              fillOpacity: 0.25,
              weight: 1.5,
            }}
          />
          <Marker position={[m.lat, m.lng]} icon={markerIcon}>
            {m.label ? <Popup>{m.label}</Popup> : null}
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
}
