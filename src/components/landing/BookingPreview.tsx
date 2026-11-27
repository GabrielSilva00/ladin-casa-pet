import Link from "next/link";
import { BRAND } from "@/lib/utils";

const STEPS = [
  { n: "01", t: "Quem é o seu pet", d: "Nome, porte, pelagem." },
  { n: "02", t: "Dia e hora", d: "Slots de 30 min, 14 dias à frente." },
  { n: "03", t: "Confirme", d: "A gente te espera com café quente." }
];

export function BookingPreview() {
  return (
    <section id="agendamento" className="py-section bg-musgo text-creme relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top right, rgba(224,169,53,0.35), transparent 50%), radial-gradient(ellipse at bottom left, rgba(178,70,38,0.4), transparent 50%)"
        }}
      />
      <div className="container relative">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="col-span-12 md:col-span-5">
            <span className="section-eyebrow on-dark">Agendamento</span>
            <h2 className="mt-4 font-display text-h2 text-creme text-balance max-w-[18ch]">
              Marque o banho. <em className="italic text-baunilha">A gente cuida do resto.</em>
            </h2>
            <p className="mt-5 font-sans text-[16px] text-creme/80 max-w-[42ch]">
              Três passos. Dois minutos. Sem download.
            </p>
            <Link href="/agendar" className="btn-primary mt-8">
              Começar agendamento
              <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden>
                <path d="M1 6h11M8 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <div className="mt-8 flex items-center gap-3 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-creme/55">
              <span>ou</span>
              <a href={`https://wa.me/${BRAND.phoneDigits}`} target="_blank" rel="noreferrer" className="accent-wave text-creme/85">
                chame no WhatsApp
              </a>
            </div>
          </div>

          <ol className="col-span-12 md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                className="relative rounded-soft bg-tinta/40 backdrop-blur border border-creme/15 p-5 flex flex-col gap-6 min-h-[180px] transition-colors hover:border-mel/60"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-mel">
                    {s.n}
                  </span>
                  <span className="h-6 w-6 inline-flex items-center justify-center rounded-full bg-mel/20 text-mel font-mono text-[11px]">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-[20px] leading-tight text-creme">{s.t}</h3>
                  <p className="mt-2 font-sans text-[13px] text-creme/70">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
