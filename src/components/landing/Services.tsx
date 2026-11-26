import Link from "next/link";
import { Eyebrow } from "@/components/ui/Chip";
import { SERVICES } from "@/content/site";
import { brl } from "@/lib/utils";

export function Services() {
  return (
    <section id="servicos" className="py-section bg-osso">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>O que a gente faz</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-[-0.025em] text-carvao text-balance">
              Três serviços. <em className="italic text-terracota">Uma só tarde.</em>
            </h2>
          </div>
          <p className="col-span-12 md:col-span-4 md:col-start-9 font-sans text-[15px] text-carvao/70">
            Faz os três no mesmo dia. Ou só um. Ou só fica.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {SERVICES.map((s) => (
            <li key={s.slug} className="group">
              <article className="relative bg-osso corner-chamfer border border-carvao/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_24px_48px_-24px_rgba(221,107,60,0.4)]">
                <div className="relative aspect-square overflow-hidden warm-filter film-grain -ml-5 mt-5 mr-5 border border-carvao/10 corner-chamfer-sm bg-clorofila/15">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${s.img})` }}
                    aria-hidden
                  />
                </div>

                <div className="relative p-8 pb-10">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-2 font-display text-[clamp(90px,10vw,160px)] leading-none text-terracota/15 transition-opacity duration-500 group-hover:text-terracota/35"
                  >
                    {s.n}
                  </span>
                  <h3 className="relative font-display text-[32px] leading-none text-carvao">{s.title}</h3>
                  <p className="mt-5 font-sans text-[15px] leading-[1.55] text-carvao/75">{s.support}</p>

                  <div className="mt-8 flex items-end justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/60">
                      {s.fromCents > 0 ? `a partir de ${brl(s.fromCents)}` : "cortesia"}
                    </span>
                    <Link
                      href={`/servicos/${s.slug}`}
                      className="font-sans text-[13px] text-carvao transition-all hover:text-terracota inline-flex items-center gap-1.5"
                    >
                      Saiba mais
                      <svg width="12" height="10" viewBox="0 0 12 10" className="transition-transform group-hover:translate-x-1" aria-hidden>
                        <path d="M1 5h9M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
