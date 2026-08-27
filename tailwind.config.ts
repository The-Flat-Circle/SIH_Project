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
        stone: {
          charcoal: "#211C18",
          dark: "#191512",
        },
        parchment: {
          DEFAULT: "#F3E9D2",
          light: "#FAF4E6",
          dark: "#E4D5B4",
        },
        vermilion: {
          DEFAULT: "#B23A2E",
          glow: "#D64536",
          dark: "#8F2C22",
        },
        temple: {
          gold: "#C9973E",
          amber: "#E5B04E",
          light: "#F0C875",
        },
        dusk: {
          indigo: "#1B2A44",
          card: "#142035",
          border: "#293D61",
        },
        sandstone: {
          DEFAULT: "#C9B896",
          muted: "#968769",
          dark: "#4D4333",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        'temple-glow': '0 0 35px -5px rgba(201, 151, 62, 0.25)',
        'vermilion-glow': '0 0 35px -5px rgba(178, 58, 46, 0.35)',
        'card-dusk': '0 10px 30px -10px rgba(10, 16, 26, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
