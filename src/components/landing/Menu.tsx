import Link from "next/link";
import { Eyebrow } from "@/components/ui/Chip";
import { MENU_SAMPLE } from "@/content/site";
import { brl } from "@/lib/utils";

export function Menu() {
  return (
    <section id="cardapio" className="py-section">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>Do café à cozinha</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-[-0.025em] text-carvao text-balance">
              Curto, sazonal, <em className="italic text-terracota">fresco todo dia.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10 font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55">
            Terça a sábado
            <br />
            09:00 às 17:30
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-0">
          {MENU_SAMPLE.map((item) => (
            <li
              key={item.name}
              className="group flex items-end justify-between gap-6 border-t border-carvao/15 py-6 last:border-b md:[&:nth-child(2)]:border-t md:[&:first-child]:border-t"
            >
              <div className="min-w-0">
                <h3 className="font-display italic text-[24px] leading-none text-carvao">
                  {item.name}
                </h3>
                <p className="mt-2 font-sans text-[14px] text-carvao/65 truncate">{item.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="font-numeric font-mono text-[14px] text-carvao">{brl(item.priceCents)}</span>
                <div className="mt-2 h-px w-10 bg-terracota opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <Link href="/cardapio" className="font-sans text-[15px] text-carvao accent-wave">
            Ver cardápio completo
          </Link>
        </div>
      </div>
    </section>
  );
}
