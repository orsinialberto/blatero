import { TravelCard } from "@/components/TravelCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { Travel } from "@/lib/travels";

interface TravelsHighlightSectionProps {
  travels: Travel[];
}

export function TravelsHighlightSection({ travels }: TravelsHighlightSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="space-y-6">
          <SectionHeader
            label="Ultime pubblicazioni"
            linkText="Vedi tutti"
            linkHref="/viaggi"
          />

          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {travels.map((travel) => (
              <TravelCard key={travel.slug} travel={travel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

