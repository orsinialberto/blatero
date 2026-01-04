/**
 * i18n routing utilities
 * Provides locale-aware path generation and locale detection
 */

import type { SupportedLocale } from "@/config/locales";
import { defaultLocale, supportedLocales } from "@/config/locales";
import { withBasePath } from "@/lib/paths";

/**
 * Get locale from pathname
 * Extracts locale from URL path (e.g., '/it/about' -> 'it')
 *
 * @param pathname - The pathname to extract locale from
 * @returns The locale code or default locale if not found
 *
 * @example
 * ```tsx
 * const locale = getLocaleFromPath('/en/about'); // 'en'
 * const locale = getLocaleFromPath('/about'); // 'it' (default)
 * ```
 */
export function getLocaleFromPath(pathname: string): SupportedLocale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isSupportedLocale(firstSegment)) {
    return firstSegment;
  }

  return defaultLocale;
}

/**
 * Check if a string is a supported locale
 *
 * @param locale - String to check
 * @returns True if the string is a supported locale
 */
function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

/**
 * Remove locale prefix from pathname
 * Strips the locale segment from the beginning of a path
 *
 * @param pathname - The pathname to process
 * @returns Pathname without locale prefix
 *
 * @example
 * ```tsx
 * const path = removeLocaleFromPath('/en/about'); // '/about'
 * const path = removeLocaleFromPath('/about'); // '/about'
 * ```
 */
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isSupportedLocale(firstSegment)) {
    return "/" + segments.slice(1).join("/");
  }

  return pathname;
}

/**
 * Add locale prefix to a path
 * Prepends locale to a path, ensuring proper formatting
 *
 * @param path - The path to localize (e.g., '/about' or 'about')
 * @param locale - The locale to prepend
 * @returns Localized path (e.g., '/it/about')
 *
 * @example
 * ```tsx
 * const localizedPath = addLocaleToPath('/about', 'en'); // '/en/about'
 * const localizedPath = addLocaleToPath('about', 'it'); // '/it/about'
 * ```
 */
export function addLocaleToPath(path: string, locale: SupportedLocale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  // Ensure path starts with /
  const normalizedPath = cleanPath ? `/${cleanPath}` : "";

  return `/${locale}${normalizedPath}`;
}

/**
 * Create a localized path for navigation
 * Combines locale prefix with base path handling
 *
 * @param path - The path to localize
 * @param locale - The locale to use
 * @returns Full localized path with base path if configured
 *
 * @example
 * ```tsx
 * const href = createLocalizedPath('/about', 'en'); // '/en/about'
 * const href = createLocalizedPath('/viaggi', 'it'); // '/it/viaggi'
 * ```
 */
export function createLocalizedPath(
  path: string,
  locale: SupportedLocale
): string {
  const localizedPath = addLocaleToPath(path, locale);
  return withBasePath(localizedPath);
}

/**
 * Get all static paths for a given route pattern
 * Generates all locale combinations for static export
 *
 * @param routePath - The route path pattern (e.g., '/about' or '/viaggi/[slug]')
 * @param dynamicParams - Optional dynamic parameters (e.g., [{ slug: 'travel-1' }])
 * @returns Array of all localized paths
 *
 * @example
 * ```tsx
 * // For static route
 * const paths = getAllLocalizedPaths('/about');
 * // Returns: [{ locale: 'it', path: '/it/about' }, { locale: 'en', path: '/en/about' }]
 *
 * // For dynamic route
 * const paths = getAllLocalizedPaths('/viaggi/[slug]', [{ slug: 'travel-1' }]);
 * // Returns: [{ locale: 'it', slug: 'travel-1' }, { locale: 'en', slug: 'travel-1' }]
 * ```
 */
export function getAllLocalizedPaths(
  routePath: string,
  dynamicParams: Array<Record<string, string>> = [{}]
): Array<{ locale: SupportedLocale; [key: string]: string }> {
  const results: Array<{ locale: SupportedLocale; [key: string]: string }> = [];

  for (const locale of supportedLocales) {
    for (const params of dynamicParams) {
      results.push({
        locale,
        ...params,
      });
    }
  }

  return results;
}

/**
 * Parse locale from params object
 * Extracts locale from Next.js params (used in [locale] routes)
 *
 * @param params - Next.js params object (can be Promise or plain object)
 * @returns Promise resolving to the locale
 *
 * @example
 * ```tsx
 * // In a page component
 * export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
 *   const locale = await getLocaleFromParams(params);
 *   // Use locale...
 * }
 * ```
 */
export async function getLocaleFromParams(
  params: Promise<{ locale: string }> | { locale: string }
): Promise<SupportedLocale> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (isSupportedLocale(locale)) {
    return locale;
  }

  return defaultLocale;
}
