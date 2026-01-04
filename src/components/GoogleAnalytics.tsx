"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const COOKIE_CONSENT_KEY = "cookie-consent";

/**
 * Helper function to safely call gtag
 */
function gtag(...args: unknown[]): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

/**
 * Update consent state and initialize Google Analytics
 * Follows Google's Consent Mode v2 guidelines:
 * 1. Update consent state to 'granted' (consent update)
 * 2. Initialize gtag and config (if not already done)
 * 3. Load external gtag.js script
 * 
 * Reference: https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic
 */
function initializeGoogleAnalytics(): void {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") {
    return;
  }

  // Check if already initialized (prevent double loading)
  if (document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    return;
  }

  // Ensure dataLayer and gtag exist (they should be initialized by ConsentModeInitializer)
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }

  // Step 1: Update consent state to 'granted' (required by Consent Mode)
  // This must be done BEFORE loading the Google tag
  gtag('consent', 'update', {
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'ad_storage': 'granted',
    'analytics_storage': 'granted',
  });

  // Step 2: Add inline script with gtag initialization calls
  // Equivalent to Google's second <script> tag
  const inlineScript = document.createElement("script");
  inlineScript.innerHTML = `
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(inlineScript);

  // Step 3: Load external gtag.js script asynchronously
  // Equivalent to Google's first <script> tag with async attribute
  const externalScript = document.createElement("script");
  externalScript.async = true;
  externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(externalScript);
}

/**
 * Check if user has accepted cookies
 */
function hasConsented(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
}

/**
 * Google Analytics component
 * Implements Google Consent Mode v2: updates consent state and loads GA only after user consent
 * Tracks page views on route changes
 * 
 * Reference: https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic
 */
export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Only proceed if GA ID is available
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    // Ensure dataLayer and gtag are initialized (should be done by ConsentModeInitializer)
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      if (!window.gtag) {
        window.gtag = function(...args: unknown[]) {
          window.dataLayer!.push(args);
        };
      }
    }

    // Initialize GA if consent was already given
    if (hasConsented()) {
      initializeGoogleAnalytics();
    }

    // Listen for consent changes (from CookieBanner)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY && e.newValue === "accepted") {
        initializeGoogleAnalytics();
      }
    };

    // Listen for custom consent event (in case storage event doesn't fire in same window)
    const handleConsentAccepted = () => {
      if (hasConsented()) {
        initializeGoogleAnalytics();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cookie-consent-accepted", handleConsentAccepted);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cookie-consent-accepted", handleConsentAccepted);
    };
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !hasConsented() || !pathname) {
      return;
    }

    // Wait a bit for gtag to be available
    const timeoutId = setTimeout(() => {
      if (window.gtag) {
        gtag("config", GA_MEASUREMENT_ID, {
          page_path: pathname,
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

