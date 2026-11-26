import { Eyebrow } from "@/components/ui/Chip";
import { BRAND } from "@/lib/utils";

export function Visit() {
  return (
    <section id="visitar" className="py-section">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>Onde</Eyebrow>
            <h2 className="mt-4 font-display text-h1 text-carvao text-balance">
              Vila Paraíso, Campinas.
              <br />
              <em className="italic text-terracota" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
                Entre pela cancela de madeira.
              </em>
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-6">
          {/* Mapa estilizado (fallback SVG). Usar Mapbox real com NEXT_PUBLIC_MAPBOX_TOKEN em produção. */}
          <div className="col-span-12 md:col-span-7 relative aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden border border-carvao/15 corner-chamfer-sm bg-osso">
            <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(26,21,18,0.06)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="800" height="600" fill="#F4EDE0" />
              <rect width="800" height="600" fill="url(#grid)" />
              {/* Ruas */}
              <path d="M 0 180 L 800 220" stroke="rgba(26,21,18,0.22)" strokeWidth="18" strokeLinecap="round" />
              <path d="M 0 420 L 800 380" stroke="rgba(26,21,18,0.22)" strokeWidth="14" strokeLinecap="round" />
              <path d="M 360 0 L 400 600" stroke="rgba(26,21,18,0.18)" strokeWidth="12" strokeLinecap="round" />
              <path d="M 100 0 L 140 600" stroke="rgba(26,21,18,0.14)" strokeWidth="8" strokeLinecap="round" />
              <path d="M 620 0 L 660 600" stroke="rgba(26,21,18,0.14)" strokeWidth="8" strokeLinecap="round" />
              {/* Área verde */}
              <circle cx="640" cy="130" r="80" fill="rgba(45,95,63,0.25)" />
              <circle cx="180" cy="500" r="60" fill="rgba(45,95,63,0.20)" />

              {/* Marcador em formato de telhado */}
              <g transform="translate(400,300)">
                <path d="M -24 0 L 0 -24 L 24 0 L 24 20 L -24 20 Z" fill="#B8502E" />
                <circle cx="0" cy="12" r="3" fill="#F4EDE0" />
                <line x1="0" y1="20" x2="0" y2="42" stroke="#B8502E" strokeWidth="2" />
              </g>
              <text x="400" y="360" textAnchor="middle" fill="#1A1512" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2">
                CABANA PET CAFÉ
              </text>
            </svg>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider2 text-carvao/60">
              <span>22°54'02"S / 47°03'40"W</span>
              <a
                href={`https://maps.google.com/?q=${BRAND.coords.lat},${BRAND.coords.lng}`}
                target="_blank"
                rel="noreferrer"
                className="underline-wavy decoration-terracota"
              >
                Abrir no Google Maps
              </a>
            </div>
          </div>

          {/* Etiqueta de endereço */}
          <aside className="col-span-12 md:col-span-5 relative bg-carvao text-osso p-8 md:p-10 corner-chamfer">
            <div className="font-mono text-[10px] uppercase tracking-wider2 text-mate mb-6">
              Cabana Pet Café · 001
            </div>

            <div className="font-display text-[26px] leading-tight text-osso">
              {BRAND.address}
              <br />
              {BRAND.neighborhood} · {BRAND.city} · {BRAND.state}
            </div>

            <div className="my-8 h-px bg-osso/30" />

            <div className="space-y-5 font-sans text-[15px] text-osso/85">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider2 text-mate">Horário</div>
                <div className="mt-1">Terça a Sábado · 09:00 — 18:00</div>
                <div className="text-osso/55">Fechamos domingo e segunda (pra descansar junto).</div>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider2 text-mate">Contato</div>
                <div className="mt-1">{BRAND.phone}</div>
                <div className="text-osso/55">{BRAND.email}</div>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider2 text-mate">Chegando</div>
                <div className="mt-1 text-osso/85">
                  Estacionamento rotativo na rua. Bicicletário na entrada.
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${BRAND.phoneDigits}`}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-btn bg-terracota px-6 py-3 font-sans text-[13px] text-osso transition-all hover:shadow-warm"
            >
              Falar no WhatsApp <span aria-hidden>→</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
