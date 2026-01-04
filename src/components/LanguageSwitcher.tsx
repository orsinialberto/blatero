"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "@/i18n/hooks";
import { removeLocaleFromPath, addLocaleToPath } from "@/lib/i18n/routing";
import { supportedLocales, localeConfig, type SupportedLocale } from "@/config/locales";

interface LanguageSwitcherProps {
  /**
   * Whether the header is transparent (affects styling)
   */
  isTransparent?: boolean;
}

/**
 * LanguageSwitcher component
 * Allows users to switch between available locales while preserving the current path and query parameters
 *
 * @example
 * ```tsx
 * <LanguageSwitcher isTransparent={true} />
 * ```
 */
export function LanguageSwitcher({ isTransparent = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations();

  /**
   * Get the path without locale prefix
   */
  const pathWithoutLocale = removeLocaleFromPath(pathname || "/");

  /**
   * Get query string if present
   */
  const queryString = searchParams.toString();
  const fullQueryString = queryString ? `?${queryString}` : "";

  /**
   * Handle language switch
   * Navigates to the same page in the selected language, preserving query params
   */
  const handleLanguageSwitch = (newLocale: SupportedLocale) => {
    if (newLocale === currentLocale) {
      return; // Already on this language
    }

    // Create new path with the selected locale
    const newPath = addLocaleToPath(pathWithoutLocale, newLocale);
    const fullPath = `${newPath}${fullQueryString}`;

    // Navigate to the new path
    router.push(fullPath);

    // Store preference in localStorage for future visits
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("preferredLocale", newLocale);
      } catch (error) {
        // Ignore localStorage errors (e.g., in private browsing)
        console.warn("Failed to save locale preference:", error);
      }
    }
  };

  /**
   * Get the other locale (toggle between it and en)
   */
  const otherLocale = supportedLocales.find((locale) => locale !== currentLocale) || supportedLocales[0];

  /**
   * Get locale display name
   */
  const getLocaleName = (locale: SupportedLocale): string => {
    return localeConfig[locale].nativeName;
  };

  /**
   * Get aria label for language button
   */
  const getAriaLabel = (locale: SupportedLocale): string => {
    if (locale === "it") {
      return t.components.languageSwitcher.switchToItalian;
    }
    return t.components.languageSwitcher.switchToEnglish;
  };

  const textColor = isTransparent ? "text-white" : "text-brand-primary";
  const borderColor = isTransparent ? "border-white/30" : "border-slate-300";
  const hoverBg = isTransparent ? "hover:bg-white/20" : "hover:bg-slate-100";
  const activeBg = isTransparent ? "bg-white/10" : "bg-slate-50";

  return (
    <div className="flex items-center gap-2" role="group" aria-label={t.components.languageSwitcher.language}>
      {supportedLocales.map((locale) => {
        const isActive = locale === currentLocale;
        const localeName = getLocaleName(locale);

        return (
          <button
            key={locale}
            onClick={() => handleLanguageSwitch(locale)}
            aria-label={getAriaLabel(locale)}
            aria-current={isActive ? "true" : "false"}
            className={`
              rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${textColor}
              ${borderColor}
              ${isActive ? activeBg : `bg-transparent ${hoverBg}`}
              ${isActive ? "cursor-default" : "cursor-pointer"}
              ${isTransparent ? "focus:ring-white/50" : "focus:ring-brand-primary/50"}
            `}
            disabled={isActive}
            title={isActive ? `${t.components.languageSwitcher.currentLanguage}: ${localeName}` : `${t.components.languageSwitcher.switchTo}: ${localeName}`}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
