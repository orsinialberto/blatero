import { Geist, Geist_Mono, Comforter, Poiret_One, Schoolbell } from "next/font/google";

// Next.js requires font loaders to be called and assigned to const in module scope
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const comforter = Comforter({
  variable: "--font-comforter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

export const poiretOne = Poiret_One({
  variable: "--font-poiret-one",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

export const schoolbell = Schoolbell({
  variable: "--font-schoolbell",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

// Utility to get all font variables as a single string
// Note: kleeOne is loaded via CSS @import instead of Next.js font loader due to Turbopack compatibility
// The CSS variable --font-klee-one is defined in globals.css and used via Tailwind's font-klee class
export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  comforter.variable,
  poiretOne.variable,
  schoolbell.variable,
].join(" ");

