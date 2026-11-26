"use client";

import { format, parseISO } from "date-fns";
import type { GestaoBooking, GestaoStatus } from "@/lib/gestao/store";
import { brl, cn } from "@/lib/utils";

const COLORS: Record<GestaoStatus, string> = {
  aguardando: "border-l-mate",
  em_banho: "border-l-terracota",
  finalizado: "border-l-clorofila"
};

export function BookingCard({
  booking,
  onClick
}: {
  booking: GestaoBooking;
  onClick?: () => void;
}) {
  const time = format(parseISO(booking.scheduledAt), "HH:mm");
  const phoneDigits = booking.phone.replace(/\D/g, "");

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full text-left rounded-2xl border border-carvao/10 bg-osso p-5 transition-all duration-200",
        "border-l-4 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-20px_rgba(15,14,12,0.35)]",
        "active:scale-[0.99]",
        COLORS[booking.status]
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[24px] leading-tight text-carvao truncate">
            {booking.petName}
          </h3>
          <p className="mt-0.5 font-sans text-[13px] text-carvao/60">
            {booking.species === "cao" ? "Cão" : "Gato"} · porte {booking.size}
          </p>
        </div>
        <span className="font-mono text-[14px] text-carvao font-numeric whitespace-nowrap">
          {time}
        </span>
      </div>

      <div className="mt-4 font-sans text-[13px] text-carvao/75">
        {booking.serviceName}
      </div>

      <div className="mt-4 pt-4 border-t border-carvao/10 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="font-sans text-[13px] text-carvao truncate">{booking.tutorName}</div>
          <a
            href={`https://wa.me/${phoneDigits}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-mono text-[11px] text-carvao/55 hover:text-terracota truncate block"
          >
            {booking.phone}
          </a>
        </div>
        <span className="font-mono text-[12px] text-carvao/70 font-numeric whitespace-nowrap">
          {brl(booking.totalPriceCents)}
        </span>
      </div>
    </button>
  );
}
