/**
 * Google Analytics utility functions
 * Provides type-safe functions for tracking custom events
 */

const COOKIE_CONSENT_KEY = "cookie-consent";

/**
 * Check if user has consented to cookies
 */
function hasConsented(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
}

/**
 * Safely call gtag function
 */
function gtag(...args: unknown[]): void {
  if (typeof window !== "undefined" && window.gtag && hasConsented()) {
    window.gtag(...args);
  }
}

/**
 * Track a custom event in Google Analytics
 * 
 * @param action - The action being tracked (e.g., "click", "download", "share")
 * @param category - The category of the event (e.g., "navigation", "engagement")
 * @param label - Optional label for the event (e.g., "header-link", "footer-social")
 * @param value - Optional numeric value associated with the event
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  const eventParams: Record<string, unknown> = {
    event_category: category,
  };

  if (label) {
    eventParams.event_label = label;
  }

  if (value !== undefined) {
    eventParams.value = value;
  }

  gtag("event", action, eventParams);
}

/**
 * Track a page view
 * Usually handled automatically by GoogleAnalytics component on route changes,
 * but can be used for manual tracking if needed
 * 
 * @param path - The page path to track
 */
export function trackPageView(path: string): void {
  if (typeof window === "undefined" || !window.gtag || !hasConsented()) {
    return;
  }

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (!GA_MEASUREMENT_ID) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

