import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center bg-osso p-6 text-center">
      <div>
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 font-display text-h1 text-carvao text-balance">
          Essa trilha não{" "}
          <em className="italic text-terracota" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
            leva à clareira.
          </em>
        </h1>
        <p className="mt-6 max-w-[42ch] mx-auto font-sans text-[17px] text-carvao/70">
          A página que você procurava não existe — ou se perdeu entre as árvores.
        </p>
        <Link href="/" className="inline-block mt-10">
          <Button>Voltar para a home</Button>
        </Link>
      </div>
    </div>
  );
}
