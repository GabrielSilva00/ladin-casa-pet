"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";
import { useBooking } from "./BookingContext";
import { brl } from "@/lib/utils";
import { SERVICE_OPTIONS, totalFor, totalDurationMin, SIZE_LABELS, COAT_LABELS } from "@/lib/booking/schema";
import { parseDateISO, formatFull } from "@/lib/booking/availability";

export function StepReview() {
  const { state, goto, reset } = useBooking();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const serviceIds = state.serviceIds ?? [];
  const services = serviceIds
    .map((id) => SERVICE_OPTIONS.find((s) => s.id === id))
    .filter(Boolean) as typeof SERVICE_OPTIONS;

  const total = totalFor(serviceIds, state.size, state.coat);
  const duration = totalDurationMin(serviceIds);

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });
      if (!res.ok) throw new Error("Falha ao agendar");
      const data = await res.json();
      toast.success("Agendamento confirmado — enviamos tudo no seu WhatsApp.");
      reset();
      router.push(`/agendar/confirmado?id=${data.id ?? ""}`);
    } catch (err) {
      toast.error("Não consegui registrar agora. Tenta de novo ou chama no WhatsApp.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const niceDate = state.date ? formatFull(parseDateISO(state.date)) : "—";

  return (
    <div className="space-y-10">
      <header>
        <Eyebrow>Passo 05 · Confirmação</Eyebrow>
        <h1 className="mt-3 font-display text-h2 text-carvao text-balance">
          Dá uma olhada antes de confirmar.
        </h1>
      </header>

      {/* Recibo editorial */}
      <article className="paper-texture border border-carvao/15 corner-chamfer-sm p-8 md:p-12 shadow-card">
        <div className="font-mono text-[11px] uppercase tracking-wider2 text-terracota">
          Cabana Pet Café · Vila Paraíso
        </div>

        <h2 className="mt-5 font-display text-[36px] leading-tight text-carvao">
          {state.petName}{" "}
          <span className="font-sans text-[16px] font-normal text-carvao/70 align-middle">
            ({state.species === "cao" ? "Cão" : "Gato"}, {state.size ? SIZE_LABELS[state.size] : ""}, pelo {state.coat ? COAT_LABELS[state.coat].toLowerCase() : ""})
          </span>
        </h2>

        <div className="mt-6 h-px bg-carvao/20" />

        <ul className="my-6 space-y-3">
          {services.map((s) => (
            <li key={s.id} className="flex items-baseline justify-between gap-6">
              <span className="font-display italic text-[20px] text-carvao">{s.name}</span>
              <span className="font-mono text-[13px] text-carvao font-numeric">
                {s.basePriceCents === 0 ? "grátis" : brl(
                  s.priceByCoatSize[`${state.size!}-${state.coat!}`] ?? s.basePriceCents
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="h-px bg-carvao/20" />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-[15px] text-carvao">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider2 text-carvao/55">Quando</div>
            <div className="mt-1 capitalize">{niceDate}</div>
            <div className="mt-1 font-numeric">{state.time} · ~{duration} min</div>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider2 text-carvao/55">Onde</div>
            <div className="mt-1">Rua José Gabeta, 522</div>
            <div className="mt-1 text-carvao/60">Vila Paraíso · Campinas</div>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider2 text-carvao/55">Tutor</div>
            <div className="mt-1">{state.tutorName}</div>
            <div className="mt-1 text-carvao/60 font-numeric">{state.phone}</div>
          </div>
          <div className="md:text-right">
            <div className="font-mono text-[11px] uppercase tracking-wider2 text-carvao/55">Total estimado</div>
            <div className="mt-1 font-display text-[32px] leading-none text-terracota font-numeric">
              {brl(total)}
            </div>
            <div className="mt-1 text-[12px] text-carvao/55">
              Valor final conforme condição do pelo.
            </div>
          </div>
        </div>

        {state.notes ? (
          <div className="mt-6 pt-6 border-t border-carvao/15 font-sans text-[14px] text-carvao/75">
            <span className="font-mono text-[11px] uppercase tracking-wider2 text-carvao/55 mr-2">Nota:</span>
            {state.notes}
          </div>
        ) : null}
      </article>

      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => goto("tutor")}>Voltar</Button>
        <Button onClick={submit} disabled={submitting}>
          {submitting ? "Confirmando…" : "Confirmar agendamento"}
        </Button>
      </div>
    </div>
  );
}
