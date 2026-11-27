"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";
import { useBooking } from "./BookingContext";
import {
  listNextDays, isWorkDay, slotsForDate,
  formatDayLabel, formatDayNumber, formatMonth, formatFull, parseDateISO
} from "@/lib/booking/availability";
import { cn } from "@/lib/utils";

async function fetchTaken(dateISO: string): Promise<string[]> {
  try {
    const res = await fetch(`/api/bookings/availability?date=${dateISO}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.taken as string[]) ?? [];
  } catch {
    return [];
  }
}

export function StepSchedule() {
  const { state, setSchedule, goto } = useBooking();
  const days = useMemo(() => listNextDays(14), []);
  const initial = state.date ? parseDateISO(state.date) : days.find(isWorkDay) ?? days[0];
  const [date, setDate] = useState<Date>(initial);
  const [time, setTime] = useState<string | undefined>(state.time);
  const [taken, setTaken] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const isoDate = format(date, "yyyy-MM-dd");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchTaken(isoDate).then((t) => {
      if (!active) return;
      setTaken(t);
      setLoading(false);
    });
    return () => { active = false; };
  }, [isoDate]);

  const slots = slotsForDate(date, taken);
  const canContinue = Boolean(time && slots.find((s) => s.time === time && s.available));

  return (
    <div className="space-y-10">
      <header>
        <Eyebrow>Passo 03 · Quando</Eyebrow>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.025em] text-carvao text-balance">
          Escolha dia e horário.
        </h1>
        <p className="mt-3 font-sans text-[15px] text-carvao/70">
          Terça a sábado, das 9 às 18h. A gente respeita o tempo do seu pet.
        </p>
      </header>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
        {days.map((d) => {
          const workable = isWorkDay(d);
          const iso = format(d, "yyyy-MM-dd");
          const active = iso === isoDate;
          return (
            <button
              key={iso}
              type="button"
              disabled={!workable}
              onClick={() => { setDate(d); setTime(undefined); }}
              className={cn(
                "shrink-0 w-[72px] rounded-2xl border p-3 text-center transition-all duration-200 active:scale-[0.97]",
                active
                  ? "border-terracota bg-terracota text-osso shadow-[0_10px_24px_-14px_rgba(221,107,60,0.6)]"
                  : workable
                  ? "border-carvao/15 bg-osso text-carvao hover:border-terracota hover:-translate-y-0.5"
                  : "border-carvao/10 text-carvao/30 cursor-not-allowed line-through"
              )}
            >
              <div className="font-sans text-[10px] uppercase font-semibold tracking-[0.14em]">{formatDayLabel(d)}</div>
              <div className="mt-1 font-display text-[28px] leading-none">{formatDayNumber(d)}</div>
              <div className="mt-1 font-sans text-[10px] uppercase font-semibold">{formatMonth(d)}</div>
            </button>
          );
        })}
      </div>

      <div>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-[26px] text-carvao capitalize">
            {formatFull(date)}
          </h2>
          <span className="font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-carvao/55">
            {loading ? "carregando..." : `${slots.filter((s) => s.available).length} slots livres`}
          </span>
        </div>

        {slots.length === 0 ? (
          <p className="font-sans text-[15px] text-carvao/60">Fechado neste dia. Escolha outro.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {slots.map((s) => (
              <button
                key={s.time}
                type="button"
                disabled={!s.available}
                onClick={() => setTime(s.time)}
                className={cn(
                  "rounded-xl py-3 font-mono text-[13px] border transition-all active:scale-[0.97]",
                  time === s.time
                    ? "border-terracota bg-terracota text-osso shadow-[0_8px_16px_-10px_rgba(221,107,60,0.6)]"
                    : s.available
                    ? "border-carvao/15 text-carvao hover:border-terracota hover:text-terracota"
                    : "border-carvao/10 text-carvao/25 cursor-not-allowed line-through"
                )}
              >
                {s.time}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-6">
        <Button variant="ghost" onClick={() => goto("service")}>Voltar</Button>
        <Button onClick={() => time && setSchedule({ date: isoDate, time })} disabled={!canContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
