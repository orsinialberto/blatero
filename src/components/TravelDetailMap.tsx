import type { Travel } from "@/lib/travels";
import { TravelDetailMapLazy } from "@/components/map/TravelDetailMapLazy";
import type { SupportedLocale } from "@/config/locales";
import { getTranslations } from "@/i18n";

interface TravelDetailMapProps {
  map: NonNullable<Travel["map"]>;
  coords?: Travel["coords"];
  title: string;
  locale: SupportedLocale;
}

export function TravelDetailMap({ map, coords, title, locale }: TravelDetailMapProps) {
  const t = getTranslations(locale);
  
  return (
    <section className="space-y-4 bg-white p-8 shadow-card">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
          {t.components.travelDetailMap.trackLabel}
        </p>
      </div>
      <div className="h-[420px] w-full overflow-hidden rounded-xl bg-brand-background">
        <TravelDetailMapLazy map={map} fallbackCoords={coords} title={title} />
      </div>
    </section>
  );
}

