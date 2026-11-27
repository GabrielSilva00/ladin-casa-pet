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
        /* ===== NOVA PALETA ===== */
        baunilha: "#FFF7E6",   // bg principal: branco-baunilha quente e vivo
        creme:    "#FFF7E6",   // alias (igual a baunilha, vivo)
        creme2:   "#F5E7CC",   // card bg sobre baunilha (amarelo-areia)
        tinta:    "#0D0D10",   // texto / dark: preto quase-puro
        coral:    "#FF4F3C",   // acento 1: coral quente vibrante (não tijolo)
        coral2:   "#D13828",   // coral escuro (hover/estado)
        limao:    "#C9EC3B",   // acento 2: verde-limão elétrico (chartreuse)
        limao2:   "#A7CA1F",   // limão escuro
        oceano:   "#174A7A",   // acento 3: azul-oceano profundo
        rosa:     "#F7B8A5",   // acento 4: rosa-pêssego suave
        musgo:    "#2A5234",   // verde-musgo profundo (mais escuro, menos oliva)
        tijolo:   "#FF4F3C",   // alias → coral
        tijolo2:  "#D13828",   // alias → coral2
        /* ===== ALIASES LEGADOS (apontam para a nova paleta) ===== */
        osso:      "#FFF7E6",  // → baunilha
        carvao:    "#0D0D10",  // → tinta
        terracota: "#FF4F3C",  // → coral
        clorofila: "#2A5234",  // → musgo
        noite:     "#0D0D10",  // → tinta
        mate:      "#C9EC3B",  // → limao
        mel:       "#C9EC3B",  // → limao
        tamara:    "#F7B8A5",  // → rosa
        vinho:     "#B13020",  // vermelho bordô profundo
        cafe:      "#174A7A"   // → oceano
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      fontSize: {
        mega: ["clamp(3.5rem, 9vw, 7.5rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        h1: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        h2: ["clamp(1.85rem, 3.5vw, 2.75rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        h3: ["clamp(1.35rem, 2vw, 1.7rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        lead: ["1.0625rem", { lineHeight: "1.6" }],
        label: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.14em" }],
        monoish: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.04em" }]
      },
      letterSpacing: {
        tighter2: "-0.04em",
        wider2: "0.14em"
      },
      spacing: {
        section: "clamp(3.5rem, 8vw, 7rem)",
        sectionTight: "clamp(2.5rem, 5vw, 4.5rem)"
      },
      borderRadius: {
        btn: "999px",
        soft: "18px"
      },
      boxShadow: {
        warm: "0 18px 40px -22px rgba(255, 79, 60, 0.6)",
        card: "0 10px 30px -18px rgba(13, 13, 16, 0.35)",
        float: "0 20px 50px -20px rgba(13, 13, 16, 0.5)"
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
