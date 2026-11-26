import { Eyebrow } from "@/components/ui/Chip";
import { TESTIMONIALS } from "@/content/site";

export function Testimonials() {
  return (
    <section className="py-section">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow>Palavra de quem já foi</Eyebrow>
            <h2 className="mt-4 font-display text-h1 text-carvao text-balance">
              Três tutores,{" "}
              <em className="italic text-terracota" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
                três sábados.
              </em>
            </h2>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <li
              key={t.author}
              className="relative paper-texture p-8 md:p-10 shadow-card border border-carvao/10 corner-chamfer-sm"
              style={{ transform: `rotate(${t.rotate})` }}
            >
              <p className="font-display text-[clamp(22px,2vw,28px)] leading-[1.35] text-carvao">
                {t.text}
              </p>

              {/* Assinatura manuscrita (SVG placeholder) */}
              <svg
                viewBox="0 0 220 60"
                className="mt-8 h-12 w-auto text-carvao"
                aria-hidden
              >
                <path
                  d={
                    i === 0
                      ? "M5 42 C 25 18, 45 50, 70 28 S 120 50, 150 24 S 200 48, 215 30"
                      : i === 1
                      ? "M5 36 C 30 10, 55 55, 85 30 S 130 12, 160 38 S 205 10, 215 32"
                      : "M5 40 C 20 20, 50 46, 80 24 S 135 48, 165 20 S 200 46, 215 28"
                  }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              <div className="mt-4 font-mono text-[11px] uppercase tracking-wider2 text-carvao/60">
                — {t.author} ({t.meta}) · {t.neighborhood}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
