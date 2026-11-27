import Link from "next/link";
import { BRAND } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate min-h-[90svh] pt-28 pb-10 overflow-hidden bg-tinta">
      {/* Imagem escura borrada no fundo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-dark.jpg)",
          filter: "blur(14px) brightness(0.5) saturate(1.05)",
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

      <div className="container relative z-10 grid grid-cols-12 gap-6 items-center min-h-[72svh]">
        {/* Coluna esquerda: texto */}
        <div className="col-span-12 md:col-span-7 lg:col-span-6 text-left">
          <h1 className="font-display font-semibold text-baunilha text-[clamp(2.25rem,5.6vw,4.5rem)] leading-[1] tracking-[-0.03em] max-w-[14ch] text-balance">
            Banho pro pet, <em className="italic text-lavanda3">café pra você.</em>
          </h1>

          <p className="mt-6 font-sans text-[16px] md:text-[17px] leading-[1.55] max-w-[42ch] text-baunilha/80">
            Acompanhe o banho pelo vidro enquanto toma um cafezinho. Vila Paraíso, Campinas.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/agendar" className="btn-primary on-dark text-[15px] px-6 py-3.5">
              Agendar visita
              <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden>
                <path d="M1 6h11M8 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#cardapio" className="btn-ghost on-dark">
              Ver o lugar
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4 font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-baunilha/55">
            <span>{BRAND.neighborhood}, {BRAND.city}</span>
            <span className="h-px w-6 bg-baunilha/35" aria-hidden />
            <span>Terça a sábado · 9h às 18h</span>
          </div>
        </div>

        {/* Coluna direita: cachorro PNG */}
        <div className="hidden md:block md:col-span-5 lg:col-span-6 relative self-end">
          <img
            src="/images/dog-hero.png"
            alt=""
            aria-hidden
            className="relative w-full max-w-[520px] ml-auto object-contain"
            style={{
              filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.35))",
              transform: "translateY(10%)"
            }}
          />
        </div>
      </div>

      <div className="container absolute inset-x-0 bottom-5 z-10 flex items-center justify-between font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-baunilha/45">
        <span>Desde {BRAND.foundedYear}</span>
        <span className="hidden md:inline">role ↓</span>
      </div>
    </section>
  );
}
