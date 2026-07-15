"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label?: string;
}

export interface MiniMapProps {
  className?: string;
  height?: number | string;
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  /** Tehran by default for Persian SaaS demos */
}

const DEFAULT_CENTER: [number, number] = [35.6892, 51.389];

function MapFallback({
  height,
  className,
}: {
  height: number | string;
  className?: string;
}) {
  return (
    <Skeleton
      className={cn("w-full rounded-surface", className)}
      style={{ height }}
    />
  );
}

const LeafletMapInner = dynamic(
  () => import("./map-inner").then((m) => m.LeafletMapInner),
  {
    ssr: false,
    loading: () => <MapFallback height={320} />,
  },
);

function MiniMap({
  className,
  height = 320,
  center = DEFAULT_CENTER,
  zoom = 12,
  markers = [
    { id: "hq", lat: 35.6892, lng: 51.389, label: "HQ" },
    { id: "branch", lat: 35.7219, lng: 51.3347, label: "Branch" },
  ],
}: MiniMapProps) {
  return (
    <div
      data-slot="mini-map"
      className={cn(
        "overflow-hidden rounded-surface border border-border bg-muted/30",
        className,
      )}
      style={{ height }}
    >
      <LeafletMapInner
        center={center}
        zoom={zoom}
        markers={markers}
        className="h-full w-full"
      />
    </div>
  );
}

export { MiniMap, DEFAULT_CENTER };
