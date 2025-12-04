import Image from "next/image";
import Link from "next/link";

import { TravelCard } from "@/components/TravelCard";
import { TravelMap } from "@/components/TravelMap";
import { getAllTravels } from "@/lib/travels";
import { withBasePath } from "@/lib/paths";

export default async function HomePage() {
  const travels = await getAllTravels();
  const highlights = travels.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section Full Width */}
      <section className="relative -mx-4 -mt-[73px] h-screen max-h-screen md:-mx-8 lg:-mx-12">
        <div className="relative h-full w-full">
          <Image
            src={withBasePath("/images/home-hero.jpg")}
            alt="I miei viaggi"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container w-full">
            <div className="mx-auto max-w-3xl space-y-8 text-center text-white/90 animate-in fade-in duration-1000">
              <h1 className="font-comforter text-6xl font-normal leading-[1.1] text-white md:text-7xl lg:text-8xl">
                Quella voglia di partire che non passa mai
              </h1>
              <p className="font-klee text-xl leading-relaxed text-white/90 md:text-2xl">
                Partire, scoprire e raccontare: i viaggi che mi fanno stare bene.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container space-y-16">
        {/* About Preview Section */}
        <section className="relative">
          <div className="relative">
            {/* Image - Limited width */}
            <div className="relative h-[400px] w-full lg:h-[600px] lg:max-w-3xl">
              <Image
                src={withBasePath("/images/moto-profile.JPG")}
                alt="Alberto in moto"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48rem"
              />
            </div>

            {/* Text Box - Overlapping on right, centered vertically */}
            <div className="relative -mt-20 z-10 mx-auto w-full max-w-2xl bg-white px-8 py-14 shadow-card lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:mt-0 lg:px-10 lg:py-18">
              <div className="space-y-10 text-center">
                <div className="space-y-6">
                  <h2 className="font-klee text-4xl font-normal text-brand-primary">
                   Metto lo zaino, seguo la strada e mi perdo
                  </h2>
                  <div className="space-y-6 text-brand-muted">
                    <p className="font-klee text-base leading-relaxed">
                     Ciao sono Alberto, e da qualche anno ho scoperto che la mia felicità pesa più o meno quanto uno zaino.
                     Cammino, viaggio in moto, esploro quando posso e come posso. 
                     Amo perdermi nei sentieri, nelle strade secondarie, nei mercati affollati e nei tramonti che arrivano quando meno te li aspetti.
                    </p>
                    <p className="font-klee text-base leading-relaxed">
                     Scrivo questo blog per fermare un po’ di quella libertà che il viaggio regala, 
                     per ricordarmi ciò che ho visto e condividere ciò che mi è rimasto dentro.
                     Perché la voglia di partire — quella sì — non passa mai.
                    </p>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="inline-flex w-fit items-center justify-center bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary"
                >
                  Scopri di più su di me
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
              Ultime pubblicazioni
            </p>
          </div>
          <Link
            href="/viaggi"
            className="text-sm font-semibold text-brand-secondary hover:underline"
          >
            Vedi tutti →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((travel) => (
            <TravelCard key={travel.slug} travel={travel} />
          ))}
        </div>
      </section>

        <TravelMap />
      </div>
    </div>
  );
}
