import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          background: "#f7f7f5",
          primary: "#0f172a",
          secondary: "#334155",
          accent: "#14b8a6",
          muted: "#475569",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        comforter: ["var(--font-comforter)", "Brush Script MT", "cursive"],
        klee: ["var(--font-klee-one)", "cursive"],
        poiret: ["var(--font-poiret-one)", "sans-serif"],
        schoolbell: ["var(--font-schoolbell)", "cursive"],
      },
      boxShadow: {
        card: "0 25px 45px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(120deg, rgba(249,115,22,0.15), rgba(20,184,166,0.2))",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          xl: "2rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1152px",
          "2xl": "1152px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
