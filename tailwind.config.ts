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
          300: "#D3D6D6",
          400: "#BFC3C3",
          500: "#A8ACAC",
          600: "#929696",
          700: "#7B8181",
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
          "border-dark": "#495057",
          "skeleton-light": "#dee2e6",
          "skeleton-dark": "#363A3D",
          1: "#00121f",
          2: "#013a63",
          3: "#013a63",
          4: "#2491d1",
          5: "#5598b5",
          6: "#84afc2",
          7: "#b3ecff",
          "workspace-light": "#f8f9fa",
          "workspace-dark": "#1A1D21",
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
          "text-active-light": "#c8ffeb",
          "text-inactive-light": "#ffecec",
          "text-pending-light": "#d5edff",
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
          "bg-total": "rgba(36,146,209,0.25)",
          "bg-active": "rgba(36,174,123,0.25)",
          "bg-inactive": "rgba(243,119,119,0.25)",
          "bg-dark-total": "rgba(36,146,209,0.1)",
          "bg-dark-active": "rgba(36,174,123,0.1)",
          "bg-dark-inactive": "rgba(243,119,119,0.1)",
        },
        input: {
          "bg-light": "#f2f4f6",
          "bg-dark": "#1a1d21",
          "border-light": "#dee2e6",
          "border-dark": "#363a3d",
          "focus-light": "#44a4ea",
          "focus-dark": "#2d4991",
          "placeholder-light": "#c8c8cc",
          "placeholder-dark": "#929696",
        },
        button: {
          "bg-light": "#f5f7fa",
          "bg-dark": "#1a1d21",
          "hover-light": "#e2e6ea",
          "hover-dark": "#2a2d31",
          "focus-light": "#d9dde1",
          "focus-dark": "#3a3d41",
          "active-light": "#cdd1d5",
          "active-dark": "#4a4d51",
        },
        destructive: "#c1121f",
        "bg-destructive": "#ffccd5",
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
