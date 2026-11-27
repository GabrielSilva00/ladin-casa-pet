import Link from "next/link";
import { BRAND } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate min-h-[88svh] pt-28 pb-16 overflow-hidden bg-tinta">
      {/* Imagem escura borrada no fundo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-dark.jpg)",
          filter: "blur(14px) brightness(0.55) saturate(1.1)",
          transform: "scale(1.1)"
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,18,16,0.55) 0%, rgba(20,18,16,0.35) 50%, rgba(20,18,16,0.70) 100%)"
        }}
      />
      <div aria-hidden className="film-grain pointer-events-none absolute inset-0" />

      <div className="container relative z-10 flex min-h-[72svh] flex-col items-center justify-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-creme/30 bg-tinta/40 backdrop-blur px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-creme/90">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-mel animate-pulseSoft" />
          5,0 no Google · {BRAND.googleReviews} avaliações
        </span>

        <h1 className="mt-7 font-display font-medium text-creme text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em] max-w-[16ch] text-balance">
          Banho pro pet, <em className="italic text-mel">café pra você.</em>
        </h1>

        <p className="mt-6 font-sans text-[16px] md:text-[17px] leading-[1.55] text-creme/80 max-w-[48ch]">
          Acompanhe o banho pelo vidro enquanto toma um cafezinho. Vila Paraíso, Campinas.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/agendar" className="btn-primary text-[15px] px-7 py-3.5">
            Agendar visita
            <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden>
              <path d="M1 6h11M8 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="#cardapio" className="btn-ghost border-creme/40 text-creme hover:border-mel hover:text-mel">
            Ver o lugar
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-creme/60">
          <span>{BRAND.neighborhood}, {BRAND.city}</span>
          <span className="h-px w-8 bg-creme/40" aria-hidden />
          <span>Terça a sábado · 9h às 18h</span>
        </div>
      </div>

      <div className="container absolute inset-x-0 bottom-5 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-creme/50">
        <span>Desde {BRAND.foundedYear}</span>
        <span className="hidden md:inline">role ↓</span>
      </div>
    </section>
  );
}
