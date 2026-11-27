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
    <div className="border-y border-tinta/10 bg-creme/90 backdrop-blur sticky top-0 z-30">
      <div className="h-[3px] bg-tinta/10">
        <div
          className="h-full bg-tijolo transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="container py-4 flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
        <ol className="flex items-center gap-2 md:gap-3 text-[12px]">
          {STEP_IDS.map((id, i) => {
            const reached = state.reached[id];
            const active = state.current === id;
            const done = reached && !active && i < stepIndex;
            return (
              <li key={id} className="flex items-center gap-2 md:gap-3 whitespace-nowrap">
                <button
                  type="button"
                  disabled={!reached}
                  onClick={() => reached && goto(id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-2 py-1 transition-colors",
                    active && "text-tijolo",
                    done && "text-tinta/85 hover:text-tijolo",
                    !reached && "text-tinta/35 cursor-not-allowed"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-medium transition-all",
                      active && "bg-tijolo text-creme",
                      done && "bg-tinta/10 text-tinta",
                      !reached && "bg-tinta/5 text-tinta/40"
                    )}
                  >
                    {done ? (
                      <svg width="10" height="8" viewBox="0 0 10 8" aria-hidden>
                        <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <span className="hidden md:inline font-sans text-[13px] font-medium">{LABELS[id]}</span>
                </button>
                {i < STEP_IDS.length - 1 ? (
                  <span aria-hidden className="w-3 h-px bg-tinta/20 hidden md:block" />
                ) : null}
              </li>
            );
          })}
        </ol>
        <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.14em] text-tinta/50 font-numeric">
          {Math.round(pct)}%
        </span>
      </div>
    </div>
  );
}
