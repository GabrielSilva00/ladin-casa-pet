"use client";

import { useBooking, STEP_IDS } from "./BookingContext";
import { cn } from "@/lib/utils";

const LABELS: Record<(typeof STEP_IDS)[number], string> = {
  pet: "Pet",
  service: "Serviço",
  schedule: "Dia e hora",
  tutor: "Seus dados",
  review: "Confirmação"
};

export function StepIndicator() {
  const { state, stepIndex, totalSteps, goto } = useBooking();
  const pct = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <div className="border-b border-carvao/10 bg-osso/80 backdrop-blur sticky top-0 z-30">
      <div className="h-[2px] bg-terracota/20">
        <div
          className="h-full bg-terracota transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="container py-5 flex items-center justify-between gap-6 overflow-x-auto">
        <ol className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-wider2">
          {STEP_IDS.map((id, i) => {
            const reached = state.reached[id];
            const active = state.current === id;
            return (
              <li key={id} className="flex items-center gap-4 whitespace-nowrap">
                <button
                  type="button"
                  disabled={!reached}
                  onClick={() => reached && goto(id)}
                  className={cn(
                    "inline-flex items-center gap-2 transition-colors",
                    active && "text-terracota",
                    !active && reached && "text-carvao",
                    !reached && "text-carvao/30 cursor-not-allowed"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full border",
                      active && "border-terracota bg-terracota text-osso",
                      !active && reached && "border-carvao/60 text-carvao",
                      !reached && "border-carvao/20 text-carvao/40"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden md:inline">{LABELS[id]}</span>
                </button>
                {i < STEP_IDS.length - 1 ? (
                  <span aria-hidden className="w-4 h-px bg-carvao/20 hidden md:block" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
