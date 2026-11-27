import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "3rem" },
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        tinta: "#141210",       // quase-preto quente (texto, dark bg)
        creme: "#F3EAD4",       // papel cru (bg principal)
        creme2: "#E9DCC0",      // papel + um tom (cards sobre creme)
        tijolo: "#B24626",      // laranja-tijolo (ação principal)
        tijolo2: "#962F18",     // tijolo escuro (hover/estado)
        musgo: "#394A33",       // verde-musgo profundo
        musgo2: "#2A3825",      // musgo noite
        mel: "#E0A935",         // mel/mostarda
        rosa: "#D89378",        // rosa queimado
        cafe: "#4A2F21",        // café moído
        /* compat: mantém nomes antigos como alias enquanto lemos os arquivos */
        osso: "#F3EAD4",
        carvao: "#141210",
        terracota: "#B24626",
        clorofila: "#394A33",
        noite: "#141210",
        mate: "#E0A935",
        tamara: "#D89378",
        vinho: "#962F18"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      fontSize: {
        mega: ["clamp(3.5rem, 9vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        h1: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        h2: ["clamp(1.85rem, 3.5vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h3: ["clamp(1.35rem, 2vw, 1.7rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        lead: ["1.0625rem", { lineHeight: "1.6" }],
        label: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.14em" }],
        monoish: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.04em" }]
      },
      letterSpacing: {
        tighter2: "-0.03em",
        wider2: "0.14em"
      },
      spacing: {
        section: "clamp(3.5rem, 8vw, 7rem)",
        sectionTight: "clamp(2.5rem, 5vw, 4.5rem)"
      },
      borderRadius: {
        btn: "999px",
        soft: "14px"
      },
      boxShadow: {
        warm: "0 18px 40px -22px rgba(178, 70, 38, 0.55)",
        card: "0 10px 30px -18px rgba(20, 18, 16, 0.35)",
        float: "0 20px 50px -20px rgba(20, 18, 16, 0.45)"
      },
      backgroundImage: {
        grain: "url('/textures/grain.svg')",
        paper: "url('/textures/paper.svg')"
      },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(100%)" } },
        pulseSoft: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.55" } },
        floatIn: { "0%": { opacity: "0", transform: "translateY(16px) scale(0.95)" }, "100%": { opacity: "1", transform: "translateY(0) scale(1)" } }
      },
      animation: {
        rise: "rise 650ms cubic-bezier(0.19,1,0.22,1) both",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
        floatIn: "floatIn 500ms cubic-bezier(0.19,1,0.22,1) both"
      }
    }
  },
  plugins: []
};

export default config;
