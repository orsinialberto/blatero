"use client";

import { useEffect } from "react";

/**
 * Consent Mode Initializer
 * Sets default consent state before user interaction as per Google's guidelines
 * This must run before the consent banner and before any Google tags are loaded
 * 
 * Reference: https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic
 */
export function ConsentModeInitializer() {
  useEffect(() => {
    // Initialize dataLayer and gtag function (without loading Google scripts yet)
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: unknown[]) {
      window.dataLayer!.push(args);
    };

    // Set default consent state (all denied) before user interaction
    // This is required by Google's Consent Mode v2
    window.gtag('consent', 'default', {
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'wait_for_update': 500,
    });
  }, []);

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

