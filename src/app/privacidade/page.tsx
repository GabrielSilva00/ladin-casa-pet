import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Eyebrow } from "@/components/ui/Chip";

export const metadata = { title: "Política de privacidade" };

export default function PrivacidadePage() {
  return (
    <>
      <Navbar />
      <main className="container pt-40 pb-section max-w-[70ch]">
        <Eyebrow>LGPD</Eyebrow>
        <h1 className="mt-4 font-display text-h1 text-carvao">Política de privacidade</h1>
        <p className="mt-10 font-sans text-[17px] leading-[1.6] text-carvao/80">
          A redação definitiva deste documento será fornecida pelo advogado
          responsável pelo Cabana Pet Café, em conformidade com a Lei Geral de
          Proteção de Dados Pessoais (Lei 13.709/2018).
        </p>
        <p className="mt-6 font-sans text-[15px] text-carvao/65">
          Dúvidas sobre dados: <a href="mailto:contato@cabanapetcafe.com.br" className="underline-wavy">contato@cabanapetcafe.com.br</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
