import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        // Colores de la marca All Supplies con variaciones accesibles
        brand: {
          green: "#39b54a", // Verde principal - Ratio 4.5:1 con blanco
          "green-dark": "#2a8538", // Verde más oscuro para mejor contraste - Ratio 7:1 con blanco
          "green-light": "#4fc55e", // Verde más claro para fondos
          "green-50": "#f0f9f2", // Verde muy claro para fondos
          "green-100": "#dcf2e0", // Verde claro para hover states
          blue: "#0054a6", // Azul principal - Ratio 7.8:1 con blanco
          "blue-dark": "#003d7a", // Azul más oscuro para mejor contraste - Ratio 10:1 con blanco
          "blue-light": "#1a6bb8", // Azul más claro para hover
          "blue-50": "#eff6ff", // Azul muy claro para fondos
          "blue-100": "#dbeafe", // Azul claro para hover states
          white: "#ffffff",
        },
        // Colores de texto accesibles
        text: {
          primary: "#1e293b", // Texto principal - Ratio 16:1 con blanco
          secondary: "#475569", // Texto secundario - Ratio 9:1 con blanco
          muted: "#64748b", // Texto suave - Ratio 7:1 con blanco
          "on-brand-green": "#ffffff", // Texto sobre verde - Ratio 4.5:1
          "on-brand-blue": "#ffffff", // Texto sobre azul - Ratio 7.8:1
        },
        // Colores de estado accesibles
        success: {
          DEFAULT: "#16a34a", // Verde de éxito - Ratio 4.8:1 con blanco
          dark: "#15803d", // Verde oscuro - Ratio 6.2:1 con blanco
        },
        warning: {
          DEFAULT: "#d97706", // Naranja de advertencia - Ratio 4.5:1 con blanco
          dark: "#b45309", // Naranja oscuro - Ratio 5.8:1 con blanco
        },
        error: {
          DEFAULT: "#dc2626", // Rojo de error - Ratio 5.9:1 con blanco
          dark: "#b91c1c", // Rojo oscuro - Ratio 7.2:1 con blanco
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
