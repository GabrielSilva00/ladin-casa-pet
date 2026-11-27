import { BRAND } from "@/lib/utils";

export function Visit() {
  return (
    <section id="visitar" className="py-section">
      <div className="container">
        <div className="mb-12">
          <span className="section-eyebrow">Visitar</span>
          <h2 className="mt-4 font-display text-h2 text-tinta text-balance max-w-[16ch]">
            {BRAND.neighborhood}, {BRAND.city}. <em className="italic">Entre pela cancela.</em>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-5 md:gap-6">
          <div className="col-span-12 md:col-span-7">
            <a
              href={BRAND.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="relative block aspect-[4/3] md:aspect-auto md:min-h-[460px] overflow-hidden rounded-soft bg-creme2/50 border border-tinta/10 group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center warm-filter"
                style={{ backgroundImage: "url(/images/lugar-71.jpg)" }}
                aria-hidden
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 40%, rgba(20,18,16,0.75) 100%)" }}
              />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-creme">
                <div>
                  <div className="font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-creme/70">
                    22°54′S / 47°03′W
                  </div>
                  <div className="mt-2 font-display text-[22px] leading-tight">
                    {BRAND.address}, {BRAND.neighborhood}
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-tijolo px-4 py-2 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-creme shrink-0">
                  Abrir no Maps
                  <svg width="12" height="10" viewBox="0 0 12 10" className="transition-transform group-hover:translate-x-1" aria-hidden>
                    <path d="M1 5h9M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
            </a>
          </div>

          <aside className="col-span-12 md:col-span-5 rounded-soft bg-tinta text-creme p-7 md:p-9 flex flex-col">
            <div className="font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-mel">
              Cabana Pet Café · 001
            </div>

            <div className="mt-6 font-display text-[22px] leading-[1.25]">
              {BRAND.address}<br />
              <span className="text-creme/70">{BRAND.neighborhood} · {BRAND.city}/{BRAND.state}</span><br />
              <span className="text-creme/50 text-[15px] font-sans">CEP {BRAND.zip}</span>
            </div>

            <div className="my-7 h-px bg-creme/20" />

            <dl className="space-y-5 font-sans text-[14px]">
              <div>
                <dt className="font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-mel">Horário</dt>
                <dd className="mt-1.5 text-creme/90">Terça a sábado · 9h às 18h</dd>
                <dd className="text-creme/50">{BRAND.closed}</dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-mel">Contato</dt>
                <dd className="mt-1.5 text-creme/90 font-numeric">{BRAND.phone}</dd>
                <dd className="text-creme/50">{BRAND.instagram}</dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-mel">No Google</dt>
                <dd className="mt-1.5 flex items-center gap-2">
                  <span className="text-mel">★★★★★</span>
                  <span className="text-creme/90 font-numeric">{BRAND.googleRating.toFixed(1).replace('.', ',')}</span>
                  <span className="text-creme/50">· {BRAND.googleReviews} avaliações</span>
                </dd>
              </div>
            </dl>

            <a
              href={`https://wa.me/${BRAND.phoneDigits}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-auto pt-3 self-start"
            >
              Falar no WhatsApp
              <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden>
                <path d="M1 6h11M8 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
