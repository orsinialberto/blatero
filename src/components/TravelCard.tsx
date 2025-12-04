import Image from "next/image";
import Link from "next/link";

import type { Travel } from "@/lib/travels";
import { formatDateRange } from "@/lib/dates";

interface TravelCardProps {
  travel: Travel;
}

export function TravelCard({ travel }: TravelCardProps) {
  const titleColorClass =
    travel.heroTitleVariant === "dark" ? "text-slate-900" : "text-white";

  return (
    <Link href={`/viaggi/${travel.slug}`}>
      <article className="group relative aspect-[4/3] overflow-hidden bg-white transition-transform hover:scale-[1.02]">
        <Image
          src={travel.coverImage}
          alt={travel.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="h-[72px] flex flex-col justify-end">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-1">
              {formatDateRange(travel.date, travel.endDate)}
            </p>
            <h3 className={`text-2xl font-semibold leading-tight line-clamp-2 ${titleColorClass}`}>
              {travel.title}
            </h3>
          </div>
        </div>
      </article>
    </Link>
  );
}
