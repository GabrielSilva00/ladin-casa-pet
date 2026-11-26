import Link from "next/link";
import { BRAND } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-noite text-osso">
      <div className="container py-20">
        <div className="grid grid-cols-12 gap-10">
          <section className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-wider2 text-mate mb-4">Newsletter</div>
            <p className="font-sans text-[15px] text-osso/80 mb-5">
              Receba o cardápio da semana e as novidades. Sem spam, só um e-mail por semana.
            </p>
            <form
              action="/api/subscribe"
              method="post"
              className="flex items-center gap-2 border-b border-osso/30 pb-2 focus-within:border-terracota transition-colors"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="seu@email.com"
                className="w-full bg-transparent text-osso placeholder-osso/40 outline-none font-sans text-[15px]"
              />
              <button type="submit" className="font-mono text-[11px] uppercase tracking-wider2 text-terracota hover:text-mate">
                assinar →
              </button>
            </form>
          </section>

          <section className="col-span-6 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-wider2 text-mate mb-4">Visite</div>
            <ul className="space-y-2 font-sans text-[15px] text-osso/80">
              <li>{BRAND.address}</li>
              <li>{BRAND.neighborhood} · {BRAND.city}/{BRAND.state}</li>
              <li>Terça a Sábado · 09:00–18:00</li>
              <li>
                <a href={`https://maps.google.com/?q=${BRAND.coords.lat},${BRAND.coords.lng}`} className="underline-wavy">
                  Como chegar
                </a>
              </li>
            </ul>
          </section>

          <section className="col-span-6 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-wider2 text-mate mb-4">Siga</div>
            <ul className="space-y-2 font-sans text-[15px] text-osso/80">
              <li>
                <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="underline-wavy">Instagram</a>
              </li>
              <li>
                <a href="https://facebook.com/cabanapetcafe" target="_blank" rel="noreferrer" className="underline-wavy">Facebook</a>
              </li>
            </ul>
          </section>

          <section className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-wider2 text-mate mb-4">Fale com a gente</div>
            <ul className="space-y-2 font-sans text-[15px] text-osso/80">
              <li>
                <a href={`https://wa.me/${BRAND.phoneDigits}`} target="_blank" rel="noreferrer" className="underline-wavy">WhatsApp</a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="underline-wavy">{BRAND.email}</a>
              </li>
              <li>{BRAND.phone}</li>
            </ul>
          </section>
        </div>

        {/* Wordmark gigante outline */}
        <div
          aria-hidden
          className="mt-20 pb-6 leading-none select-none overflow-hidden"
        >
          <div
            className="font-display font-light tracking-tighter2 text-[clamp(120px,20vw,320px)]"
            style={{
              WebkitTextStroke: "1px #F4EDE0",
              color: "transparent",
              lineHeight: "0.85"
            }}
          >
            CABANA
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-osso/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider2 text-osso/55">
          <span>© {year} Cabana Pet Café · Feito em Campinas com grãos bons e cachorros felizes</span>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="hover:text-mate">Privacidade</Link>
            <Link href="/termos" className="hover:text-mate">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
