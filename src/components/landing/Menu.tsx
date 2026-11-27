import Link from "next/link";
import { MENU_HIGHLIGHTS, MENU_SAMPLE } from "@/content/site";
import { brl } from "@/lib/utils";

export function Menu() {
  return (
    <section id="cardapio" className="py-section">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-eyebrow">Do café à cozinha</span>
            <h2 className="mt-4 font-display text-h2 text-tinta text-balance max-w-[18ch]">
              Curto, sazonal, <em className="italic">fresco todo dia.</em>
            </h2>
          </div>
          <Link href="/cardapio" className="btn-ghost w-fit">
            Cardápio completo
            <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden>
              <path d="M1 5h9M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>

        {/* Destaques com imagem */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {MENU_HIGHLIGHTS.map((item) => (
            <li
              key={item.name}
              className="group relative overflow-hidden rounded-soft bg-creme2/70 border border-tinta/10 transition-all duration-300 hover:-translate-y-1 hover:border-tijolo/40 hover:shadow-card"
            >
              <div className="relative aspect-[5/4] overflow-hidden warm-filter">
                <div
                  className="bg-img absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.img})` }}
                  aria-hidden
                />
                <span className="absolute top-3 left-3 inline-flex items-center h-6 px-2.5 rounded-full bg-creme/95 text-tinta font-mono text-[10px] uppercase tracking-[0.14em]">
                  {item.tag}
                </span>
                <span className="absolute top-3 right-3 inline-flex items-center h-7 px-3 rounded-full bg-tijolo text-creme font-mono text-[11px] font-numeric">
                  {brl(item.priceCents)}
                </span>
              </div>
              <div className="px-5 py-5">
                <h3 className="font-display text-[22px] leading-tight text-tinta">
                  {item.name}
                </h3>
                <p className="mt-1.5 font-sans text-[14px] text-tinta/70 leading-snug">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Também na casa — card com mais destaque */}
        <div className="mt-6 rounded-soft bg-baunilha2 border border-tinta/15 overflow-hidden">
          <header className="flex items-end justify-between gap-4 px-6 md:px-8 pt-6 pb-4 border-b border-tinta/15">
            <div>
              <span className="section-eyebrow" style={{ fontSize: "12px", opacity: 0.55 }}>
                O cardápio completo
              </span>
              <h3 className="mt-2 font-display font-medium text-tinta text-[clamp(1.5rem,2.5vw,2rem)] leading-tight">
                Também na casa
              </h3>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-tinta/55 hidden sm:inline">
              {MENU_SAMPLE.length} itens
            </span>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 px-6 md:px-8 py-4">
            {MENU_SAMPLE.map((item) => (
              <li
                key={item.name}
                className="group flex items-start gap-4 py-4 border-b border-tinta/10 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <h4 className="font-display font-medium text-[18px] leading-tight text-tinta truncate">
                      {item.name}
                    </h4>
                    <span
                      aria-hidden
                      className="flex-1 border-b border-dotted border-tinta/30 translate-y-[-3px]"
                    />
                    <span className="font-mono text-[13px] text-tinta font-numeric whitespace-nowrap">
                      {brl(item.priceCents)}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-[13px] text-tinta/60">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <footer className="px-6 md:px-8 py-4 border-t border-tinta/15 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-tinta/55">
            <span>Preços sazonais — Nov/26</span>
            <span>Pede sem pressa.</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
