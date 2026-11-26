import Link from "next/link";
import { Eyebrow } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

const STEPS = [
  { n: "01", t: "Diga quem é o seu pet", d: "Nome, porte, pelagem." },
  { n: "02", t: "Escolha dia e hora", d: "14 dias à frente. Slots de 30 min." },
  { n: "03", t: "Confirme no WhatsApp", d: "A gente responde em instantes." }
];

export function BookingPreview() {
  return (
    <section id="agendamento" className="py-sectionTight bg-clorofila text-osso">
      <div className="container grid grid-cols-12 gap-10 items-center">
        <div className="col-span-12 md:col-span-5">
          <Eyebrow className="text-mate">Dia e hora</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-[-0.025em] text-osso text-balance">
            Marque o banho.<br />
            <em className="italic text-mate">A gente cuida do resto.</em>
          </h2>
          <p className="mt-6 font-sans text-[17px] text-osso/80 max-w-[42ch]">
            Três passos. Dois minutos.
          </p>
          <Link href="/agendar" className="mt-8 inline-block">
            <Button size="lg" className="bg-terracota text-osso">Começar agendamento</Button>
          </Link>
        </div>

        <ol className="col-span-12 md:col-span-6 md:col-start-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="relative aspect-square bg-noite/40 border border-osso/15 corner-chamfer-sm p-5 flex flex-col justify-between"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mate">{s.n}</span>
              <div>
                <h3 className="font-display text-[22px] leading-tight text-osso">{s.t}</h3>
                <p className="mt-2 font-sans text-[13px] text-osso/70">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
