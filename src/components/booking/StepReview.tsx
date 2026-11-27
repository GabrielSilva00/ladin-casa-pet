"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { useBooking } from "./BookingContext";
import { brl } from "@/lib/utils";
import { SERVICE_OPTIONS, totalFor, totalDurationMin, SIZE_LABELS, COAT_LABELS } from "@/lib/booking/schema";
import { parseDateISO, formatFull } from "@/lib/booking/availability";
import { createBooking } from "@/lib/gestao/store";

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
      // Simula gravar no banco: escreve no localStorage compartilhado com /gestao
      const scheduledAt = state.date && state.time
        ? new Date(`${state.date}T${state.time}:00`).toISOString()
        : new Date().toISOString();

      const serviceName = services.map((s) => s.name).join(" + ") || "Serviço";

      await new Promise((r) => setTimeout(r, 450)); // leve delay para parecer rede

      const saved = createBooking({
        petName: state.petName ?? "Pet",
        species: (state.species ?? "cao") as "cao" | "gato",
        size: state.size ?? "medio",
        coat: state.coat,
        tutorName: state.tutorName ?? "Tutor",
        phone: state.phone ?? "",
        serviceName,
        scheduledAt,
        durationMin: duration,
        totalPriceCents: total,
        notes: state.notes || undefined
      });

      toast.success("Agendamento registrado!");
      reset();
      router.push(`/agendar/confirmado?id=${saved.id}`);
    } catch (err) {
      toast.error("Não consegui registrar agora. Tenta de novo.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const niceDate = state.date ? formatFull(parseDateISO(state.date)) : "—";

  return (
    <div className="space-y-10">
      <header>
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-tijolo">
          Passo 05 · Confirmação
        </div>
        <h1 className="mt-3 font-display text-h2 text-tinta text-balance">
          Dá uma olhada antes de confirmar.
        </h1>
      </header>

      <article className="rounded-soft bg-creme2/60 border border-tinta/15 p-6 md:p-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-tijolo">
          Cabana Pet Café · Vila Paraíso
        </div>

        <h2 className="mt-4 font-display text-[28px] md:text-[32px] leading-tight text-tinta">
          {state.petName}{" "}
          <span className="font-sans text-[15px] font-normal text-tinta/60 align-middle">
            ({state.species === "cao" ? "Cão" : "Gato"}, {state.size ? SIZE_LABELS[state.size] : ""}, pelo {state.coat ? COAT_LABELS[state.coat].toLowerCase() : ""})
          </span>
        </h2>

        <div className="mt-5 h-px bg-tinta/15" />

        <ul className="my-5 space-y-2.5">
          {services.map((s) => (
            <li key={s.id} className="flex items-baseline justify-between gap-6">
              <span className="font-display italic text-[18px] text-tinta">{s.name}</span>
              <span className="font-mono text-[13px] text-tinta font-numeric">
                {s.basePriceCents === 0 ? "grátis" : brl(
                  s.priceByCoatSize[`${state.size!}-${state.coat!}`] ?? s.basePriceCents
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="h-px bg-tinta/15" />

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 font-sans text-[14px] text-tinta">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-tinta/55">Quando</div>
            <div className="mt-1 capitalize">{niceDate}</div>
            <div className="mt-1 font-numeric text-tinta/70">{state.time} · ~{duration} min</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-tinta/55">Onde</div>
            <div className="mt-1">Rua José Gabeta, 522</div>
            <div className="mt-1 text-tinta/60">Vila Paraíso · Campinas</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-tinta/55">Tutor</div>
            <div className="mt-1">{state.tutorName}</div>
            <div className="mt-1 text-tinta/60 font-numeric">{state.phone}</div>
          </div>
          <div className="md:text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-tinta/55">Total estimado</div>
            <div className="mt-1 font-display text-[32px] leading-none text-tijolo font-numeric">
              {brl(total)}
            </div>
            <div className="mt-1 text-[12px] text-tinta/55">
              Valor final conforme condição do pelo.
            </div>
          </div>
        </div>

        {state.notes ? (
          <div className="mt-6 pt-5 border-t border-tinta/15 font-sans text-[14px] text-tinta/75">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-tinta/55 mr-2">Nota:</span>
            {state.notes}
          </div>
        ) : null}
      </article>

      <p className="font-sans text-[13px] text-tinta/60">
        O agendamento aparece imediatamente no painel de gestão. A confirmação sai depois pelo WhatsApp.
      </p>

      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => goto("tutor")}>Voltar</Button>
        <Button onClick={submit} disabled={submitting}>
          {submitting ? "Registrando…" : "Confirmar agendamento"}
        </Button>
      </div>
    </div>
  );
}
