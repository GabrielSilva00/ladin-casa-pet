import { Eyebrow } from "@/components/ui/Chip";

export function Manifesto() {
  return (
    <section id="manifesto" className="py-section">
      <div className="container grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2 md:col-start-2">
          <Eyebrow>Manifesto</Eyebrow>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-5">
          <p className="font-display text-[clamp(28px,4vw,44px)] leading-[1.18] text-carvao text-pretty">
            Não somos pet shop com cadeira pra sentar. Somos uma cabana onde o seu cachorro faz amigos e você faz a segunda rodada de café.
          </p>
          <p className="mt-8 font-display text-[clamp(28px,4vw,44px)] leading-[1.18] text-carvao text-pretty">
            A gente banha com água morna, tosa com paciência e serve espresso de gente grande — no mesmo lugar, no mesmo ar.
          </p>
          <p className="mt-8 font-display italic text-[clamp(28px,4vw,44px)] leading-[1.18] text-terracota text-pretty" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
            Chama de pausa. Chama de ritual. A gente chama de clareira.
          </p>
        </div>
      </div>
    </section>
  );
}
