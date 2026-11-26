import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] pt-36 pb-24 overflow-hidden">
      {/* Imagem borrada de fundo */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/hero.png)",
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
            filter: "blur(14px) saturate(1.1) brightness(0.92)",
            transform: "scale(1.08)"
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(240,230,209,0.88) 0%, rgba(240,230,209,0.72) 45%, rgba(240,230,209,0.45) 100%)"
        }}
      />
      <div aria-hidden className="film-grain pointer-events-none absolute inset-0 -z-10" />

      <div className="container relative z-10 grid grid-cols-12 gap-6">
        <h1 className="col-span-12 lg:col-span-11 font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.92] tracking-[-0.03em] text-carvao text-balance">
          onde o seu <em className="italic text-terracota">cafuné</em> vira o seu <em className="italic text-terracota">café</em> da manhã
        </h1>

        <p className="col-span-12 md:col-span-7 lg:col-span-5 lg:col-start-7 mt-10 font-sans text-[18px] leading-[1.6] text-carvao/85">
          Banho, tosa e café de especialidade ao ar livre. Em Campinas.
        </p>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7 mt-8 flex flex-wrap items-center gap-5">
          <Link href="/agendar">
            <Button size="lg">Agendar visita</Button>
          </Link>
          <Link href="#cardapio">
            <Button variant="link" size="md">Ver cardápio</Button>
          </Link>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7 mt-14 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/70">
          <span>{BRAND.neighborhood}, {BRAND.city}</span>
          <span aria-hidden className="text-terracota">·</span>
          <span>Só com hora marcada</span>
        </div>
      </div>

      <div className="container absolute inset-x-0 bottom-6 z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55">
        <span>Desde {BRAND.foundedYear}</span>
        <span className="hidden md:inline">role para baixo ↓</span>
      </div>
    </section>
  );
}
