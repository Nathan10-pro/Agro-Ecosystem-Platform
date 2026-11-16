import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core B2B Agro-Commerce Palette
        primary: {
          DEFAULT: "#0F3D2E", // Deep forest green
          dark: "#08261C",
          light: "#185340",
          container: "#08261C",
        },
        secondary: {
          DEFAULT: "#7A4B2A", // Restrained warm earthy terracotta
          light: "#9A6540",
          dark: "#5A3319",
        },
        surface: {
          DEFAULT: "#FFFFFF", // Clean white
          off: "#FBFBF9", // Warm off-white
          subtle: "#F4F4F0", // Subtle neutral surface
          border: "#E5E5DE", // Clean thin border
          muted: "#6B726C", // Muted neutral text
        },
        // Backward-compatible tokens mapped to clean neutral palette
        background: "#FFFFFF",
        "on-background": "#141A17",
        "on-surface": "#141A17",
        "on-surface-variant": "#4E5752",
        "surface-container": "#F5F5F1",
        "surface-container-low": "#FAFAF8",
        "surface-container-high": "#EDEDE7",
        "surface-container-highest": "#E4E4DC",
        "outline-variant": "#E0E3DE",
        outline: "#8B948E",
        "tertiary-container": "#0F3D2E",
        "primary-fixed": "#D1EADB",
        "primary-fixed-dim": "#A3D4B6",
        "tertiary-fixed": "#D1EADB",
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        "2xl": "8px",
        "3xl": "8px",
      },
    },
  },
  plugins: [],
};

export default config;
