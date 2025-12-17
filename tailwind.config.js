/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Deeper dark mode background colors
        background: "hsl(240 10% 4%)",
        foreground: "hsl(0 0% 98%)",
        primary: { DEFAULT: "hsl(0 0% 98%)", foreground: "hsl(240 5.9% 10%)" },
        secondary: { DEFAULT: "hsl(240 3.7% 15.9%)", foreground: "hsl(0 0% 98%)" },
        destructive: { DEFAULT: "hsl(0 62.8% 30.6%)", foreground: "hsl(0 0% 98%)" },
        muted: { DEFAULT: "hsl(240 3.7% 15.9%)", foreground: "hsl(240 5% 64.9%)" },
        accent: { DEFAULT: "hsl(240 3.7% 15.9%)", foreground: "hsl(0 0% 98%)" },
        popover: { DEFAULT: "hsl(240 10% 4%)", foreground: "hsl(0 0% 98%)" },
        card: { DEFAULT: "hsl(240 10% 6%)", foreground: "hsl(0 0% 98%)" },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}