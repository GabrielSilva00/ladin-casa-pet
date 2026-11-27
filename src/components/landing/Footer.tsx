import Link from "next/link";
import { BRAND } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-tinta text-creme">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-12 gap-8">
          <section className="col-span-12 md:col-span-4">
            <div className="font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-mel mb-4">
              Novidades
            </div>
            <p className="font-sans text-[15px] text-creme/75 mb-5 max-w-[32ch]">
              Cardápio da semana e horários especiais. Um e-mail por semana.
            </p>
            <form
              action="/api/subscribe"
              method="post"
              className="flex items-center gap-2 rounded-full border border-creme/25 pl-4 pr-1.5 py-1.5 focus-within:border-mel transition-colors"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="seu@email.com"
                className="w-full bg-transparent text-creme placeholder-creme/40 outline-none font-sans text-[14px]"
              />
              <button type="submit" className="rounded-full bg-tijolo px-4 py-2 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-creme hover:bg-tijolo2 transition-colors">
                assinar
              </button>
            </form>
          </section>

          <section className="col-span-6 md:col-span-3 md:col-start-6">
            <div className="font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-mel mb-4">Visite</div>
            <ul className="space-y-2 font-sans text-[14px] text-creme/80">
              <li>{BRAND.address}</li>
              <li>{BRAND.neighborhood}, {BRAND.city}/{BRAND.state}</li>
              <li>Terça a sábado · 9h às 18h</li>
              <li>
                <a href={BRAND.googleMapsUrl} target="_blank" rel="noreferrer" className="accent-wave">
                  Como chegar
                </a>
              </li>
            </ul>
          </section>

          <section className="col-span-6 md:col-span-3">
            <div className="font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-mel mb-4">Fale com a gente</div>
            <ul className="space-y-2 font-sans text-[14px] text-creme/80">
              <li>
                <a href={`https://wa.me/${BRAND.phoneDigits}`} target="_blank" rel="noreferrer" className="accent-wave">
                  WhatsApp {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="accent-wave">{BRAND.email}</a>
              </li>
              <li>
                <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="accent-wave">
                  {BRAND.instagram}
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div
          aria-hidden
          className="mt-16 pb-4 leading-none select-none overflow-hidden"
        >
          <div
            className="font-display font-medium tracking-[-0.03em] text-[clamp(90px,16vw,240px)]"
            style={{
              WebkitTextStroke: "1px rgba(243,234,212,0.5)",
              color: "transparent",
              lineHeight: "0.85"
            }}
          >
            cabana
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-creme/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-creme/50">
          <span>© {year} Cabana Pet Café · Campinas</span>
          <div className="flex items-center gap-4">
            <Link href="/gestao" className="hover:text-mel">Gestão</Link>
            <Link href="/privacidade" className="hover:text-mel">Privacidade</Link>
            <Link href="/termos" className="hover:text-mel">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
