import type { TravelStats } from "@/lib/travels";

interface TravelStatsProps {
  stats: TravelStats;
}

export function TravelStats({ stats }: TravelStatsProps) {
  const statsItems = [
    {
      value: stats.countriesVisited,
      label: "Paesi visitati",
    },
    {
      value: stats.continentsVisited,
      label: "Continenti visitati",
    },
    {
      value: stats.kilometersWalked,
      label: "Km percorsi",
      suffix: " km",
    },
    {
      value: stats.brokenShoes,
      label: "Paia di scarpe rotte",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-stone-50 via-slate-50 to-white border-y border-slate-200 pt-24 pb-24 w-full">
      <div className="mx-auto max-w-6xl px-4 lg:px-24">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-16">
          {statsItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="font-klee text-4xl font-semibold text-brand-primary md:text-5xl">
                {item.value.toLocaleString("it-IT")}
                {item.suffix}
              </div>
              <div className="mt-3 font-klee text-sm text-brand-muted md:text-base">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

