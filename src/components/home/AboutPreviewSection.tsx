import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

export function AboutPreviewSection() {
  return (
    <section className="relative">
      <div className="relative flex flex-col px-4 lg:px-24 lg:flex-row">
        {/* Image */}
        <div className="relative w-full aspect-square">
          <Image
            src={withBasePath("/images/moto-profile.JPG")}
            alt="Alberto in moto"
            fill
            className="object-cover"
            sizes="max-width: 1024px"
            loading="lazy"
          />
        </div>

        {/* Text Box */}
        <div className="relative w-full flex items-start justify-center pt-8 md:pt-12 md:pb-12 lg:aspect-square lg:items-center lg:pt-0 lg:pb-0" >
          <div className="space-y-6 text-center lg:text-left lg:px-24">
            <h2 className="font-klee text-4xl font-normal text-brand-primary pb-6">
              Metto lo zaino, seguo la strada e via...
            </h2>
            <div className="space-y-4 text-brand-muted pb-6">
              <p className="font-klee text-base leading-relaxed">
                Ciao sono Alberto, e da qualche anno ho scoperto che la mia felicità pesa più o meno quanto uno zaino.
                Cammino, viaggio in moto, esploro quando posso e come posso. 
              </p>
              <p className="font-klee text-base leading-relaxed">
                Scrivo questo blog per fermare un po' di quella libertà che il viaggio regala, 
                per ricordarmi ciò che ho visto e condividere ciò che mi è rimasto dentro.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/about"
                className="inline-flex w-fit items-center justify-center bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
              >
                Chi sono
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

