/**
 * Root layout - provides base HTML structure
 * The [locale]/layout.tsx handles locale-specific metadata, lang attribute, and page structure
 * Note: lang attribute is set in [locale]/layout.tsx via html tag
 */

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Return children directly - [locale]/layout.tsx provides html/body structure
  // This is a special pattern for i18n where the nested layout handles html/body
  return children;
}
