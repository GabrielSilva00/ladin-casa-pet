import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1360px" }
    },
    extend: {
      colors: {
        clorofila: "#2D5F3F",
        terracota: "#B8502E",
        osso: "#F4EDE0",
        carvao: "#1A1512",
        tamara: "#D4917A",
        mate: "#E8C566",
        noite: "#0F2419",
        vinho: "#8B2E2E"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      fontSize: {
        mega: ["clamp(4.5rem, 12vw, 11.25rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        h1: ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        h2: ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        lead: ["1.25rem", { lineHeight: "1.55" }],
        label: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
        monoish: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.02em" }]
      },
      letterSpacing: {
        tighter2: "-0.03em",
        wider2: "0.12em"
      },
      spacing: {
        section: "clamp(5rem, 12vw, 12.5rem)",
        sectionTight: "clamp(3.5rem, 6vw, 6.25rem)"
      },
      borderRadius: {
        btn: "4px"
      },
      boxShadow: {
        warm: "0 20px 40px -20px rgba(184, 80, 46, 0.35)",
        card: "0 8px 24px -16px rgba(26, 21, 18, 0.25)"
      },
      backgroundImage: {
        grain: "url('/textures/grain.svg')",
        paper: "url('/textures/paper.svg')"
      },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(100%)" } },
        pulseSoft: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.55" } }
      },
      animation: {
        rise: "rise 650ms cubic-bezier(0.19,1,0.22,1) both",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
