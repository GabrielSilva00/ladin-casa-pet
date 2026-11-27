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
        /* ===== PALETA LAVANDA + BEGE (tipo pet-shop template) ===== */
        baunilha:  "#F3E8D7",   // bg principal: bege cremoso
        baunilha2: "#EBDBC0",   // bg card (um tom mais escuro)
        tinta:     "#2A2340",   // texto / dark: roxo-noite profundo
        lavanda:   "#8778F0",   // acento principal: lavanda média
        lavanda2:  "#6253D8",   // lavanda escura (hover)
        lavanda3:  "#E3DCFC",   // lavanda pastel (tints)
        papel:     "#FFFFFF",   // branco puro (texto em cima do lavanda)

        /* ===== ALIASES LEGADOS (tudo aponta pra nova paleta) ===== */
        creme:     "#F3E8D7",  // → baunilha
        creme2:    "#EBDBC0",  // → baunilha2
        osso:      "#F3E8D7",  // → baunilha
        carvao:    "#2A2340",  // → tinta
        noite:     "#2A2340",  // → tinta
        clorofila: "#6253D8",  // → lavanda2 (antes era musgo verde, agora é lavanda escura)
        musgo:     "#6253D8",  // → lavanda2
        terracota: "#8778F0",  // → lavanda
        tijolo:    "#8778F0",  // → lavanda
        tijolo2:   "#6253D8",  // → lavanda2
        coral:     "#8778F0",  // → lavanda
        coral2:    "#6253D8",
        limao:     "#2A2340",  // → tinta
        mel:       "#8778F0",  // → lavanda
        mate:      "#8778F0",
        oceano:    "#6253D8",  // → lavanda2
        rosa:      "#E3DCFC",  // → lavanda3
        tamara:    "#E3DCFC",
        vinho:     "#6253D8",
        cafe:      "#2A2340",
        terra:     "#8778F0",  // → lavanda
        terra2:    "#6253D8"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      fontSize: {
        mega: ["clamp(3.5rem, 9vw, 7.5rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        h1: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        h2: ["clamp(1.85rem, 3.5vw, 2.75rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        h3: ["clamp(1.35rem, 2vw, 1.7rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        lead: ["1.0625rem", { lineHeight: "1.6" }],
        label: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.1em" }],
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
        soft: "22px"
      },
      boxShadow: {
        warm: "0 18px 40px -22px rgba(135, 120, 240, 0.55)",
        card: "0 10px 30px -18px rgba(42, 35, 64, 0.3)",
        float: "0 20px 50px -20px rgba(42, 35, 64, 0.4)"
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
