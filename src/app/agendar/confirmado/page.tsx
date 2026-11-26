import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";

export default function ConfirmadoPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <Eyebrow>Pronto</Eyebrow>
      <h1 className="mt-4 font-display text-h1 text-carvao text-balance">
        Seu horário está{" "}
        <em className="italic text-terracota" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
          guardado.
        </em>
      </h1>
      <p className="mt-6 max-w-[48ch] font-sans text-[17px] text-carvao/75">
        Enviamos a confirmação pelo WhatsApp. Se precisar remarcar, é só responder
        a mensagem — a gente dá um jeito.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4 justify-center">
        <Link href="/">
          <Button>Voltar para o começo</Button>
        </Link>
        <Link href="/cardapio" className="font-sans text-[15px] text-carvao underline-wavy">
          Enquanto isso, veja o cardápio
        </Link>
      </div>
      <div className="mt-16 font-mono text-[11px] uppercase tracking-wider2 text-carvao/50">
        Até lá — o café já está moído.
      </div>
    </div>
  );
}
