import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] pt-36 pb-24 overflow-hidden">
      <div className="container relative z-10 grid grid-cols-12 gap-6">
        <h1 className="col-span-12 lg:col-span-10 font-display text-mega text-carvao text-balance">
          onde o seu{" "}
          <em className="italic font-light" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
            cafuné
          </em>{" "}
          vira o seu{" "}
          <em className="italic font-light" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
            café
          </em>{" "}
          da manhã
        </h1>

        <p className="col-span-12 md:col-span-7 lg:col-span-6 lg:col-start-6 mt-10 font-sans text-[20px] leading-[1.55] text-carvao/85">
          Banho, tosa e um expresso enquanto você espera — ao ar livre, em Campinas.
        </p>

        <div className="col-span-12 lg:col-span-6 lg:col-start-6 mt-8 flex flex-wrap items-center gap-4">
          <Link href="/agendar">
            <Button size="lg">Agendar visita</Button>
          </Link>
          <a href="#cardapio" className="font-sans text-[15px] text-carvao underline-wavy">
            Ver cardápio
          </a>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-6 mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider2 text-carvao/70">
          <span>{BRAND.neighborhood}, {BRAND.city}</span>
          <span aria-hidden>·</span>
          <span>Só com hora marcada</span>
          <span aria-hidden>·</span>
          <span>Desde {BRAND.foundedYear}</span>
        </div>
      </div>

      {/* Foto do deque (SVG placeholder — trocar por foto real em public/images/hero.svg) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-85 warm-filter"
        style={{
          backgroundImage: "url(/images/hero.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center 65%"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(244,237,224,0.95) 0%, rgba(244,237,224,0.65) 40%, rgba(244,237,224,0.15) 100%)"
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="film-grain absolute inset-0" />
      </div>

      {/* Linha mono inferior */}
      <div className="container absolute inset-x-0 bottom-6 z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider2 text-carvao/60">
        <span>22°54'S / 47°04'W</span>
        <span className="hidden md:inline">role para baixo ↓</span>
      </div>
    </section>
  );
}
