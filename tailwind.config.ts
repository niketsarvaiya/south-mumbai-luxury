import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F5F0",
        champagne: {
          DEFAULT: "#C9A96E",
          light: "#E8D5B0",
          dark: "#A07840",
        },
        obsidian: "#0A0A0A",
        "warm-grey": {
          50: "#F9F7F5",
          100: "#F0EDE8",
          200: "#E0DBD3",
          300: "#C8C1B6",
          400: "#A89E92",
          500: "#8C8073",
          600: "#726558",
          700: "#5C5148",
          800: "#3D3530",
          900: "#211D19",
        },
        navy: {
          DEFAULT: "#0F1C2E",
          light: "#1A2E48",
          dark: "#070F1A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
