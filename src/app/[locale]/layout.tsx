import type { Metadata } from "next";

import "./../globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MainWrapper } from "@/components/MainWrapper";
import { fontVariables } from "@/config/fonts";
import { siteMetadata } from "@/config/metadata";
import { getLocaleFromParams } from "@/lib/i18n/routing";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  const lang = locale.split("-")[0];
  
  return {
    metadataBase: new URL(siteMetadata.url),
    title: siteMetadata.title,
    description: siteMetadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = await getLocaleFromParams(params);
  const lang = locale.split("-")[0];

  return (
    <html lang={lang}>
      <body className={`${fontVariables} bg-brand-background antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
        </div>
        <CookieBanner />
      </body>
    </html>
  );
}
