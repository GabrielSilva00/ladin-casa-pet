import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Eyebrow } from "@/components/ui/Chip";

export const metadata = { title: "Termos de uso" };

export default function TermosPage() {
  return (
    <>
      <Navbar />
      <main className="container pt-40 pb-section max-w-[70ch]">
        <Eyebrow>Agendamento</Eyebrow>
        <h1 className="mt-4 font-display text-h1 text-carvao">Termos de uso</h1>
        <p className="mt-10 font-sans text-[17px] leading-[1.6] text-carvao/80">
          Documento definitivo em redação. Resumo operacional:
        </p>
        <ul className="mt-6 space-y-3 font-sans text-[15px] text-carvao/75 list-none pl-0">
          <li className="pl-6 relative before:content-['·'] before:absolute before:left-0 before:text-terracota before:text-2xl before:top-[-6px]">
            Cancelamentos com até 2h de antecedência não têm cobrança.
          </li>
          <li className="pl-6 relative before:content-['·'] before:absolute before:left-0 before:text-terracota before:text-2xl before:top-[-6px]">
            Atrasos superiores a 20min podem exigir remarcação.
          </li>
          <li className="pl-6 relative before:content-['·'] before:absolute before:left-0 before:text-terracota before:text-2xl before:top-[-6px]">
            Pets com sinais de doença podem ser reagendados após liberação veterinária.
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
