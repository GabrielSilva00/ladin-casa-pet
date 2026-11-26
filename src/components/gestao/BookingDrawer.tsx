"use client";

import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { GestaoBooking, GestaoStatus } from "@/lib/gestao/store";
import { brl, cn } from "@/lib/utils";

const STATUS: { id: GestaoStatus; label: string }[] = [
  { id: "aguardando", label: "A chegar" },
  { id: "em_banho", label: "Em banho" },
  { id: "finalizado", label: "Finalizado" }
];

export function BookingDrawer({
  booking,
  onClose,
  onStatusChange,
  onDelete
}: {
  booking: GestaoBooking | null;
  onClose: () => void;
  onStatusChange: (id: string, status: GestaoStatus) => void;
  onDelete: (id: string) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!booking) return null;
  const phoneDigits = booking.phone.replace(/\D/g, "");
  const niceDate = format(parseISO(booking.scheduledAt), "EEEE, d 'de' MMMM 'às' HH:mm", { locale: ptBR });

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-carvao/50 backdrop-blur-sm animate-rise"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-[520px] bg-osso shadow-[-20px_0_60px_-20px_rgba(15,14,12,0.4)] overflow-y-auto animate-rise">
        <header className="sticky top-0 z-10 bg-osso border-b border-carvao/10 px-8 py-5 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-terracota">
            Agendamento
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/60 hover:text-carvao"
            aria-label="Fechar"
          >
            fechar ✕
          </button>
        </header>

        <div className="px-8 py-6">
          <h2 className="font-display text-[48px] leading-none text-carvao">{booking.petName}</h2>
          <p className="mt-2 font-sans text-[15px] text-carvao/65">
            {booking.species === "cao" ? "Cão" : "Gato"} · porte {booking.size}
            {booking.coat ? ` · pelo ${booking.coat}` : ""}
          </p>

          <div className="mt-8 h-px bg-carvao/15" />

          <div className="mt-8 space-y-6 font-sans text-[15px]">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55 mb-1">
                Serviço
              </div>
              <div className="text-carvao">{booking.serviceName}</div>
              <div className="mt-1 text-carvao/60 font-mono text-[12px] font-numeric">
                ~{booking.durationMin} min · {brl(booking.totalPriceCents)}
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55 mb-1">
                Quando
              </div>
              <div className="text-carvao capitalize">{niceDate}</div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55 mb-1">
                Tutor
              </div>
              <div className="text-carvao">{booking.tutorName}</div>
              <div className="mt-2 flex gap-2">
                <a
                  href={`https://wa.me/${phoneDigits}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-terracota px-5 py-2.5 font-sans text-[13px] text-osso transition-all hover:-translate-y-[1px] hover:shadow-[0_10px_24px_-14px_rgba(221,107,60,0.75)]"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${phoneDigits}`}
                  className="inline-flex items-center gap-2 rounded-full border border-carvao/30 px-5 py-2.5 font-sans text-[13px] text-carvao transition-all hover:border-carvao hover:bg-carvao hover:text-osso"
                >
                  Ligar
                </a>
              </div>
              <div className="mt-2 font-mono text-[12px] text-carvao/55 font-numeric">
                {booking.phone}
              </div>
            </div>

            {booking.notes ? (
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55 mb-1">
                  Observações
                </div>
                <div className="text-carvao/85">{booking.notes}</div>
              </div>
            ) : null}
          </div>

          <div className="mt-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55 mb-3">
              Estado
            </div>
            <div className="flex gap-2">
              {STATUS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onStatusChange(booking.id, s.id)}
                  className={cn(
                    "flex-1 rounded-full border px-4 py-3 font-sans text-[13px] font-medium transition-all active:scale-[0.97]",
                    booking.status === s.id
                      ? "border-terracota bg-terracota text-osso"
                      : "border-carvao/20 text-carvao hover:border-terracota hover:text-terracota"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-carvao/10">
            <button
              type="button"
              onClick={() => {
                if (confirm("Remover este agendamento?")) {
                  onDelete(booking.id);
                  onClose();
                }
              }}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-vinho hover:text-carvao transition-colors"
            >
              Remover agendamento
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
