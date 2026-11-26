import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Eyebrow } from "@/components/ui/Chip";
import { MENU_SAMPLE } from "@/content/site";
import { brl } from "@/lib/utils";

export const metadata = { title: "Cardápio — grãos, cozinha e petiscos" };

export default function CardapioPage() {
  return (
    <>
      <Navbar />
      <main className="container pt-40 pb-section">
        <Eyebrow>Cardápio</Eyebrow>
        <h1 className="mt-4 font-display text-h1 text-carvao text-balance max-w-[18ch]">
          Curto, sazonal,{" "}
          <em className="italic text-terracota" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
            todo dia fresco.
          </em>
        </h1>
        <p className="mt-6 max-w-[48ch] font-sans text-[17px] text-carvao/75">
          O cardápio completo muda semanalmente. Abaixo, uma amostra do que
          costuma sair em dia de semana.
        </p>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-14">
          {MENU_SAMPLE.map((item) => (
            <li key={item.name} className="flex items-end justify-between gap-6 border-t border-carvao/15 py-6 last:border-b">
              <div>
                <h3 className="font-display italic text-[22px] text-carvao">{item.name}</h3>
                <p className="mt-1 font-sans text-[14px] text-carvao/65">{item.desc}</p>
              </div>
              <div className="font-mono text-[14px] text-carvao font-numeric">{brl(item.priceCents)}</div>
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <Link href="/agendar" className="font-sans text-[15px] text-carvao underline-wavy">
            Marcar um horário para o seu bicho →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
