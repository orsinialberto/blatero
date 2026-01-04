/**
 * Client-side i18n hooks
 * Use these hooks in client components (marked with 'use client')
 */

"use client";

import { useMemo } from "react";
import type { SupportedLocale } from "@/config/locales";
import { defaultLocale } from "@/config/locales";
import { getTranslations } from "./index";
import type { Translations } from "./types";

/**
 * React hook for accessing translations in client components
 * Use this hook in client components (marked with 'use client')
 *
 * @param locale - The locale to use for translations
 * @returns Type-safe translations object
 *
 * @example
 * ```tsx
 * 'use client';
 * import { useTranslations } from '@/i18n/hooks';
 *
 * export function MyComponent() {
 *   const t = useTranslations('it');
 *   return <button>{t.navigation.close}</button>;
 * }
 * ```
 */
export function useTranslations(
  locale: SupportedLocale = defaultLocale
): Translations {
  // Memoize translations to avoid recreating the object on every render
  // This will be enhanced in future iterations when locale context is added
  return useMemo(() => getTranslations(locale), [locale]);
}
