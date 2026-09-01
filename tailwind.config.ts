import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b0d0c",
          900: "#121512",
          800: "#1b201c",
          700: "#262c27",
          600: "#39423b",
        },
        cream: {
          50: "#fbfaf7",
          100: "#f6f4ee",
          200: "#eeeae1",
        },
        emerald: {
          50: "#eef5f0",
          100: "#d7e8de",
          300: "#8db8a0",
          500: "#3f7d5c",
          600: "#33654a",
          700: "#294f3b",
          900: "#152a1f",
        },
        gold: {
          200: "#e9dcb8",
          300: "#d8c496",
          500: "#b99a5c",
          600: "#9c7f47",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["Source Serif 4", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,13,12,0.04), 0 8px 24px -12px rgba(11,13,12,0.12)",
        elevated: "0 4px 12px rgba(11,13,12,0.08), 0 20px 40px -20px rgba(11,13,12,0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
