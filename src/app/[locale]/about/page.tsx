import type { Metadata } from "next";
import Image from "next/image";

import { withBasePath } from "@/lib/paths";
import { getLocaleFromParams } from "@/lib/i18n/routing";
import { getAllLocalizedPaths } from "@/lib/i18n/routing";
import { getTranslations } from "@/i18n";
import type { SupportedLocale } from "@/config/locales";

interface AboutPageProps {
  params: Promise<{ locale: string }> | { locale: string };
}

export async function generateStaticParams() {
  return getAllLocalizedPaths("/about");
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  const t = getTranslations(locale as SupportedLocale);

  return {
    title: t.pages.about.title,
    description: t.pages.about.description,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const locale = await getLocaleFromParams(params);
  const t = getTranslations(locale as SupportedLocale);
  
  return (
    <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
      <section className="space-y-6 bg-white p-8 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-muted">
          {t.pages.about.sectionLabel}
        </p>
        <h1 className="text-4xl font-semibold text-brand-primary">{t.pages.about.heading}</h1>
        <div className="space-y-4 text-brand-muted">
          <p className="font-klee text-lg">
            {t.pages.about.bio1}
          </p>
          <p className="font-klee text-lg">
            {t.pages.about.bio2}
          </p>
          <p className="font-klee text-lg">
            {t.pages.about.bio3}
          </p>
        </div>
      </section>
      <aside className="space-y-6 bg-white p-8 text-sm text-brand-muted shadow-card">
        <div>
          <h2 className="text-xl font-semibold text-brand-primary">{t.pages.about.travelCompanions}</h2>
          <ul className="mt-3 space-y-2">
            <li className="font-klee">✦  {t.pages.about.companion1}</li>
            <li className="font-klee">✦  {t.pages.about.companion2}</li>
            <li className="font-klee">✦  {t.pages.about.companion3}</li>
          </ul>
        </div>
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={withBasePath("/images/profile.jpg")} 
            alt={t.pages.about.profileImageAlt} 
            fill 
            className="object-cover"
            sizes="320px"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-brand-primary">{t.pages.about.contacts}</h2>
          <p className="mt-3 font-klee">orsini.alberto@hotmail.it</p>
        </div>
      </aside>
    </div>
  );
}
