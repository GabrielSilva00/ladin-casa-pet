"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { InputField, TextareaField, PillGroup } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";
import type { GestaoBooking } from "@/lib/gestao/store";
import { SERVICE_OPTIONS, priceFor, totalDurationMin, SIZES, COATS, SIZE_LABELS, COAT_LABELS, SPECIES } from "@/lib/booking/schema";
import { brl, formatPhone, cn } from "@/lib/utils";

export function NewBookingModal({
  open,
  onClose,
  onCreate
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (b: Omit<GestaoBooking, "id" | "createdAt" | "status">) => void;
}) {
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState<(typeof SPECIES)[number]>("cao");
  const [size, setSize] = useState<(typeof SIZES)[number]>("medio");
  const [coat, setCoat] = useState<(typeof COATS)[number]>("media");
  const [tutorName, setTutorName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState(SERVICE_OPTIONS[0].id);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState("10:00");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setPetName("");
      setTutorName("");
      setPhone("");
      setNotes("");
    }
  }, [open]);

  if (!open) return null;

  const service = SERVICE_OPTIONS.find((s) => s.id === serviceId)!;
  const total = priceFor(service, size, coat);
  const duration = totalDurationMin([serviceId]);
  const canSubmit = petName.length > 1 && tutorName.length > 1 && phone.replace(/\D/g, "").length >= 10;

  const submit = () => {
    const iso = `${date}T${time}:00`;
    onCreate({
      petName,
      species,
      size,
      coat,
      tutorName,
      phone,
      serviceName: service.name,
      scheduledAt: iso,
      durationMin: duration,
      totalPriceCents: total,
      notes: notes || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-carvao/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full flex items-start md:items-center justify-center p-4 py-10">
          <section className="relative w-full max-w-2xl bg-osso corner-chamfer p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(15,14,12,0.5)] animate-rise">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55 hover:text-carvao"
            >
              fechar ✕
            </button>

            <Eyebrow>Novo</Eyebrow>
            <h2 className="mt-3 font-display text-[36px] leading-tight text-carvao">
              Registrar agendamento.
            </h2>
            <p className="mt-2 font-sans text-[14px] text-carvao/65">
              Para quando o pedido chegar pelo WhatsApp.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Nome do pet"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
              <InputField
                label="Nome do tutor"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
              />
              <InputField
                label="WhatsApp"
                placeholder="+55 (19) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
              />
              <div className="pt-7">
                <div className="pb-3 font-sans text-[11px] uppercase tracking-[0.14em] text-terracota font-medium">
                  Serviço
                </div>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full bg-transparent border-b border-carvao/25 pb-2 pt-1 text-[16px] text-carvao outline-none focus:border-terracota"
                >
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <PillGroup
              label="Espécie"
              options={SPECIES.map((s) => ({ value: s, label: s === "cao" ? "Cão" : "Gato" }))}
              value={species}
              onChange={(v) => setSpecies(v)}
            />
            <PillGroup
              label="Porte"
              options={SIZES.map((v) => ({ value: v, label: SIZE_LABELS[v] }))}
              value={size}
              onChange={(v) => setSize(v)}
            />
            <PillGroup
              label="Pelagem"
              options={COATS.map((v) => ({ value: v, label: COAT_LABELS[v] }))}
              value={coat}
              onChange={(v) => setCoat(v)}
            />

            <div className="mt-6 grid grid-cols-2 gap-6">
              <InputField
                label="Data"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <InputField
                label="Horário"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <TextareaField
              label="Observações (opcional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-carvao/10">
              <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-carvao/60">
                <span>~{duration} min</span>
                <span className="ml-4">
                  <span className="text-carvao/50">Total</span>{" "}
                  <span className="text-carvao font-numeric">{brl(total)}</span>
                </span>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                <Button onClick={submit} disabled={!canSubmit} showArrow={false}>
                  Registrar
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
