import { TESTIMONIALS } from "@/content/site";

export function Testimonials() {
  return (
    <section className="py-section bg-creme2/50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-tijolo">
              06 · quem já foi
            </div>
            <h2 className="mt-4 font-display text-h2 text-tinta text-balance max-w-[16ch]">
              O que os tutores dizem.
            </h2>
          </div>
          <a
            href="https://www.google.com/maps/place/Cabana+Pet+Caf%C3%A9"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-tinta/70 hover:text-tijolo"
          >
            <span className="text-mel">★★★★★</span> 5,0 no Google · 242 avaliações
          </a>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.author}
              className="relative rounded-soft bg-creme border border-tinta/10 p-7 flex flex-col"
            >
              <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden className="mb-4 text-tijolo/70">
                <path
                  fill="currentColor"
                  d="M0 22V12.5C0 5.5 4 1 11 0v4c-3 1-5 3.5-5 7h5v11H0zm17 0V12.5C17 5.5 21 1 28 0v4c-3 1-5 3.5-5 7h5v11H17z"
                />
              </svg>
              <p className="font-display text-[19px] leading-[1.45] text-tinta flex-1">
                {t.text}
              </p>

              <div className="mt-6 pt-5 border-t border-tinta/10 flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-full flex items-center justify-center font-mono text-[13px] font-medium text-creme shrink-0"
                  style={{ background: t.color }}
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-sans text-[14px] font-medium text-tinta">{t.author}</div>
                  <div className="font-mono text-[11px] text-tinta/55">no Google · {t.when}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
