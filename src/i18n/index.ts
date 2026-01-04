/**
 * i18n utility functions and hooks
 * Provides type-safe translation access for server and client components
 */

import type { SupportedLocale } from "@/config/locales";
import { defaultLocale } from "@/config/locales";
import type { TranslationMessages, Translations } from "./types";

// Import translation messages
import itMessages from "./messages/it.json";
import enMessages from "./messages/en.json";

/**
 * Translation messages map
 * Maps locale codes to their translation objects
 */
const messages: Record<SupportedLocale, TranslationMessages> = {
  it: itMessages as TranslationMessages,
  en: enMessages as TranslationMessages,
};

/**
 * Get translations for a specific locale
 * Use this function in server components and server-side code
 *
 * @param locale - The locale to get translations for
 * @returns Type-safe translations object for the specified locale
 *
 * @example
 * ```tsx
 * // In a server component
 * export default function Page({ params }: { params: { locale: string } }) {
 *   const t = getTranslations(params.locale as SupportedLocale);
 *   return <h1>{t.common.siteName}</h1>;
 * }
 * ```
 */
export function getTranslations(
  locale: SupportedLocale = defaultLocale
): Translations {
  return messages[locale] || messages[defaultLocale];
}

/**
 * Get a nested translation value by dot-separated path
 * Useful for dynamic key access
 *
 * @param locale - The locale to get translation for
 * @param path - Dot-separated path to the translation (e.g., 'navigation.menu')
 * @returns The translation string or undefined if not found
 *
 * @example
 * ```tsx
 * const menuText = getTranslation('it', 'navigation.menu');
 * ```
 */
export function getTranslation(
  locale: SupportedLocale,
  path: string
): string | undefined {
  const translations = getTranslations(locale);
  const keys = path.split(".");

  let value: any = translations;
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key as keyof typeof value];
    } else {
      return undefined;
    }
  }

  return typeof value === "string" ? value : undefined;
}

// Note: useTranslations hook is exported from './hooks' for client components
// Import it from '@/i18n/hooks' in client components

/**
 * Check if a locale is supported
 *
 * @param locale - Locale code to check
 * @returns True if the locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale in messages;
}

/**
 * Get all available locales
 *
 * @returns Array of supported locale codes
 */
export function getAvailableLocales(): SupportedLocale[] {
  return Object.keys(messages) as SupportedLocale[];
}

// Re-export types for convenience
export type { TranslationMessages, Translations, TranslationKey } from "./types";
