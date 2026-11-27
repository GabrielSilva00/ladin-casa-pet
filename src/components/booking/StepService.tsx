"use client";

import { useState } from "react";
import { SERVICE_OPTIONS, priceFor, totalFor, totalDurationMin } from "@/lib/booking/schema";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";
import { brl, cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";

export function StepService() {
  const { state, setServices, goto } = useBooking();
  const [picked, setPicked] = useState<string[]>(state.serviceIds ?? ["banho"]);

  const toggle = (id: string) => {
    setPicked((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );
  };

  const total = totalFor(picked, state.size, state.coat);
  const duration = totalDurationMin(picked);

  return (
    <div className="space-y-10">
      <header>
        <Eyebrow>Passo 02 · O que vamos fazer</Eyebrow>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.025em] text-carvao text-balance">
          Escolha o cuidado da tarde.
        </h1>
        <p className="mt-3 font-sans text-[15px] text-carvao/70">
          Pode combinar mais de um. A gente mostra preço e tempo ao vivo.
        </p>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SERVICE_OPTIONS.map((s) => {
          const active = picked.includes(s.id);
          const price = priceFor(s, state.size, state.coat);
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => toggle(s.id)}
                aria-pressed={active}
                className={cn(
                  "group relative flex w-full items-start gap-4 text-left p-6 border transition-all corner-chamfer-sm active:scale-[0.99]",
                  active
                    ? "border-terracota bg-terracota/5 shadow-[0_14px_32px_-20px_rgba(221,107,60,0.55)]"
                    : "border-carvao/15 bg-osso hover:border-terracota/60 hover:-translate-y-0.5"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center border transition-all",
                    active ? "border-terracota bg-terracota text-osso" : "border-carvao/40 text-transparent"
                  )}
                >
                  <svg width="12" height="10" viewBox="0 0 12 10"><path d="M1 5l3 3L11 1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[22px] leading-tight text-carvao">{s.name}</h3>
                    <span className="font-mono text-[12px] text-carvao whitespace-nowrap font-numeric">
                      {price === 0 ? "grátis" : brl(price)}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-[14px] text-carvao/70">{s.blurb}</p>
                  <div className="mt-3 flex items-center gap-3 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-carvao/55">
                    <span>{s.durationMin} min</span>
                    {!s.parallel ? <span className="text-terracota">· exclusivo</span> : null}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-full bg-carvao text-osso px-6 py-4 shadow-[0_18px_40px_-20px_rgba(15,14,12,0.55)]">
        <div className="flex items-center gap-6 font-mono text-[12px] uppercase tracking-[0.14em]">
          <span>
            <span className="text-osso/55">Duração</span>{" "}
            <span className="text-osso font-numeric">~{duration} min</span>
          </span>
          <span>
            <span className="text-osso/55">Total</span>{" "}
            <span className="text-osso font-numeric">{brl(total)}</span>
          </span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => goto("pet")} className="border-osso/60 text-osso hover:bg-osso hover:text-carvao">
            Voltar
          </Button>
          <Button onClick={() => picked.length && setServices({ serviceIds: picked })} disabled={!picked.length}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
