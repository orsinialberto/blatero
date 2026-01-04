"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supportedLocales, defaultLocale, type SupportedLocale } from "@/config/locales";

/**
 * Client component that updates the html lang attribute based on the current locale
 * This is needed because the root layout can't access the locale parameter
 */
export function LangAttributeSetter() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract locale from pathname (e.g., /it/about -> it, /en/about -> en)
    const pathSegments = pathname.split("/").filter(Boolean);
    const firstSegment = pathSegments[0];

    // Check if first segment is a valid locale
    const locale: SupportedLocale = supportedLocales.includes(
      firstSegment as SupportedLocale
    )
      ? (firstSegment as SupportedLocale)
      : defaultLocale;

    // Update the html lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [pathname]);

  return null;
}

