"use client";

import dynamic from "next/dynamic";

import type { Travel } from "@/lib/travels";
import type { VisitedCity } from "@/config/visitedCities";

const TravelMapClient = dynamic(() => import("./TravelMapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-brand-muted">
      Carico la mappa…
    </div>
  ),
});

interface TravelMapLazyProps {
  travels: Array<Travel & { coords: NonNullable<Travel["coords"]> }>;
  visitedCities?: VisitedCity[];
}

export function TravelMapLazy({ travels, visitedCities }: TravelMapLazyProps) {
  return <TravelMapClient travels={travels} visitedCities={visitedCities} />;
}

