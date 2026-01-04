import type { Metadata } from "next";

import "./globals.css";
import { fontVariables } from "@/config/fonts";
import { siteMetadata } from "@/config/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: siteMetadata.title,
  description: siteMetadata.description,
};

/**
 * Root layout - provides base HTML structure
 * The [locale]/layout.tsx handles the actual page structure with Header, Footer, etc.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteMetadata.locale.split("-")[0]}>
      <body className={`${fontVariables} bg-brand-background antialiased`}>
        {children}
      </body>
    </html>
  );
}
