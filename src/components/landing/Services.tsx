import Link from "next/link";
import { SERVICES } from "@/content/site";
import { brl } from "@/lib/utils";

export function Services() {
  return (
    <section id="servicos" className="py-section">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-eyebrow">Serviços</span>
            <h2 className="mt-4 font-display text-h2 text-tinta text-balance max-w-[16ch]">
              Três coisas boas no mesmo quintal.
            </h2>
          </div>
          <p className="font-sans text-[15px] text-tinta/65 max-w-[36ch]">
            Pode fazer os três no mesmo dia. Ou só um. Ou só ficar.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/servicos/${s.slug}`}
                className="group block overflow-hidden rounded-soft bg-creme2/60 border border-tinta/10 transition-all duration-300 hover:-translate-y-1 hover:border-tijolo/50 hover:shadow-card"
              >
                <div className="relative aspect-[4/5] overflow-hidden warm-filter">
                  <div
                    className="bg-img absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${s.img})` }}
                    aria-hidden
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 50%, rgba(20,18,16,0.7) 100%)" }}
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-full bg-creme/95 text-tinta font-mono text-[11px]">
                    {s.n}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-creme">
                    <h3 className="font-display text-[26px] leading-none">{s.title}</h3>
                    <p className="mt-2 font-sans text-[13px] text-creme/85 leading-snug">{s.support}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between px-5 py-4 bg-creme">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-tinta/60">
                    {s.fromCents > 0 ? `a partir de ${brl(s.fromCents)}` : "cortesia"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-sans text-[13px] text-tijolo">
                    detalhes
                    <svg width="12" height="10" viewBox="0 0 12 10" className="transition-transform group-hover:translate-x-1" aria-hidden>
                      <path d="M1 5h9M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
