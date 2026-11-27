export function Manifesto() {
  return (
    <section id="manifesto" className="py-section bg-creme2/60">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-4">
            <span className="section-eyebrow">A cabana</span>
            <h2 className="mt-4 font-display text-h2 text-tinta text-balance">
              Não é pet shop. <em className="italic">É um pedaço de lugar.</em>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="font-sans text-[18px] md:text-[20px] leading-[1.55] text-tinta/85 text-pretty">
              Seu cachorro toma banho, faz amigos no gramado. Você senta na varanda, pede um café. Tudo no mesmo quintal, no mesmo tempo.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 pt-8 border-t border-tinta/15">
              <Stat label="Avaliações no Google" value="5,0" sub="242 reviews" />
              <Stat label="Abertos desde" value="2024" sub="todo dia útil" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-tinta/55">{label}</div>
      <div className="mt-2 font-display text-[clamp(28px,4vw,40px)] leading-none text-tinta">{value}</div>
      <div className="mt-1 font-mono text-[11px] text-tinta/55">{sub}</div>
    </div>
  );
}
