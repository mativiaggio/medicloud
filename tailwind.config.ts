import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        green: {
          500: "#24AE7C",
          600: "#0D2A1F",
        },
        blue: {
          500: "#79B5EC",
          600: "#152432",
        },
        red: {
          500: "#F37877",
          600: "#3E1716",
          700: "#F24E43",
        },
        light: {
          200: "#E8E9E9",
        },
        dark: {
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#363A3D",
          600: "#76828D",
          700: "#ABB8C4",
        },
        main: {
          login: "#00121f",
          accent: "#2491d1",
          "bg-dark": "#131619",
          "bg-light": "#e9ecef",
          "subtitle-light": "#6c757d ",
          "subtitle-dark": "#ABB7C3",
          "border-light": "#dee2e6",
          "border-dark": "#363A3D",
          "skeleton-light": "#dee2e6",
          "skeleton-dark": "#363A3D",
          1: "#00121f",
          2: "#013a63",
          3: "#013a63",
          4: "#2491d1",
          5: "#5598b5",
          6: "#84afc2",
          7: "#b3ecff",
        },
        color: {
          light: "#000000",
          dark: "#ffffff",
        },
        badge: {
          "bg-active-light": "#24AE7C",
          "bg-inactive-light": "#F37877",
          "bg-pending-light": "#44A4EA",
          "bg-active-dark": "#0D2A1F",
          "bg-inactive-dark": "#3E1716",
          "bg-pending-dark": "#2D4991",
          "text-active-light": "#58FFC3",
          "text-inactive-light": "#ffc4c3",
          "text-pending-light": "#44A4EA",
          "text-active-dark": "#83CBFF",
          "text-inactive-dark": "#F37877",
          "text-pending-dark": "#44A4EA",
        },
        table: {
          "header-light": "#ffffff",
          "header-dark": "#0d0f10",
          "border-light": "#d3d6db",
          "border-dark": "#1a1d21",
          "tr-odd-dark": "transparent",
          "tr-even-dark": "#1c2023",
          "tr-odd-light": "transparent",
          "tr-even-light": "#f2f4f6",
          "contact-light": "#ff9500",
          "contact-dark": "#FFC300",
        },
        card: {
          total: "#2491d1",
          active: "#24AE7C",
          inactive: "#F37877",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "inherit", // Mantiene el color de texto original
            a: {
              color: "inherit", // Mantiene el color de los enlaces original
            },
            h1: {
              color: "inherit",
            },
            h2: {
              color: "inherit",
            },
            h3: {
              color: "inherit",
            },
            h4: {
              color: "inherit",
            },
            h5: {
              color: "inherit",
            },
            h6: {
              color: "inherit",
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
