"use client";

import { useMemo, useState } from "react";
import { format, parseISO, isSameDay, isAfter, startOfDay, endOfDay, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useBookings, type GestaoStatus, type GestaoBooking } from "@/lib/gestao/store";
import { BookingCard } from "@/components/gestao/BookingCard";
import { BookingDrawer } from "@/components/gestao/BookingDrawer";
import { NewBookingModal } from "@/components/gestao/NewBookingModal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";
import { brl, cn } from "@/lib/utils";

type Scope = "hoje" | "semana";

const COLUMNS: { id: GestaoStatus; label: string; hint: string }[] = [
  { id: "aguardando", label: "A chegar", hint: "Confirmados para hoje." },
  { id: "em_banho", label: "Em banho", hint: "Em atendimento agora." },
  { id: "finalizado", label: "Finalizado", hint: "Pronto, pode buscar." }
];

export default function GestaoPage() {
  const { bookings, ready, add, update, remove, seed, reset } = useBookings();
  const [scope, setScope] = useState<Scope>("hoje");
  const [openNew, setOpenNew] = useState(false);
  const [selected, setSelected] = useState<GestaoBooking | null>(null);

  const now = new Date();
  const filtered = useMemo(() => {
    const dayStart = startOfDay(now);
    const dayEnd = endOfDay(now);
    return bookings.filter((b) => {
      const at = parseISO(b.scheduledAt);
      if (scope === "hoje") return isSameDay(at, now);
      return isAfter(at, dayStart) && differenceInDays(at, dayEnd) <= 7;
    });
  }, [bookings, scope, now]);

  const grouped = useMemo(() => {
    const map: Record<GestaoStatus, GestaoBooking[]> = {
      aguardando: [], em_banho: [], finalizado: []
    };
    filtered
      .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
      .forEach((b) => { map[b.status].push(b); });
    return map;
  }, [filtered]);

  const totalRevenue = useMemo(
    () => filtered.reduce((s, b) => s + b.totalPriceCents, 0),
    [filtered]
  );

  const todayLabel = format(now, "EEEE, d 'de' MMMM", { locale: ptBR });

  return (
    <>
      {/* Hero/Header */}
      <section className="container pt-10 pb-8">
        <Eyebrow>Painel do dono</Eyebrow>
        <div className="mt-3 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.025em] text-carvao capitalize">
              {todayLabel}.
            </h1>
            <p className="mt-3 font-sans text-[16px] text-carvao/65 max-w-[52ch]">
              Quando um pedido chega no WhatsApp, registre aqui. O painel acompanha a tarde inteira do seu lado.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {ready && bookings.length === 0 ? (
              <button
                type="button"
                onClick={seed}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55 hover:text-terracota"
              >
                carregar exemplo
              </button>
            ) : null}
            <Button onClick={() => setOpenNew(true)} showArrow={false}>
              + Novo agendamento
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="A chegar" value={String(grouped.aguardando.length)} accent="mate" />
          <Stat label="Em banho" value={String(grouped.em_banho.length)} accent="terracota" />
          <Stat label="Finalizados" value={String(grouped.finalizado.length)} accent="clorofila" />
          <Stat label="Receita do dia" value={brl(totalRevenue)} accent="carvao" />
        </div>

        {/* Scope tabs */}
        <div className="mt-10 inline-flex items-center gap-1 p-1 rounded-full border border-carvao/15 bg-osso">
          {(["hoje", "semana"] as Scope[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScope(s)}
              className={cn(
                "rounded-full px-5 py-2 font-sans text-[13px] font-medium transition-all",
                scope === s ? "bg-carvao text-osso" : "text-carvao/60 hover:text-carvao"
              )}
            >
              {s === "hoje" ? "Hoje" : "Próximos 7 dias"}
            </button>
          ))}
        </div>
      </section>

      {/* Kanban */}
      <section className="container pb-20">
        {!ready ? (
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/40">
            carregando...
          </p>
        ) : filtered.length === 0 ? (
          <EmptyState onSeed={seed} onNew={() => setOpenNew(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLUMNS.map((col) => (
              <div key={col.id}>
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="font-display text-[22px] text-carvao">{col.label}</h2>
                  <span className="font-mono text-[11px] text-carvao/45 font-numeric">
                    {grouped[col.id].length}
                  </span>
                </div>
                <div className="space-y-3 min-h-[120px]">
                  {grouped[col.id].length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-carvao/15 p-6 font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/35 text-center">
                      {col.hint}
                    </div>
                  ) : (
                    grouped[col.id].map((b) => (
                      <BookingCard
                        key={b.id}
                        booking={b}
                        onClick={() => setSelected(b)}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {ready && bookings.length > 0 ? (
          <div className="mt-20 pt-8 border-t border-carvao/10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-carvao/40">
            <span>Dados salvos no seu navegador. {bookings.length} agendamento{bookings.length === 1 ? "" : "s"} no histórico.</span>
            <button
              type="button"
              onClick={() => confirm("Limpar todos os agendamentos locais?") && reset()}
              className="hover:text-vinho"
            >
              Limpar tudo
            </button>
          </div>
        ) : null}
      </section>

      <NewBookingModal
        open={openNew}
        onClose={() => setOpenNew(false)}
        onCreate={(b) => add(b)}
      />
      <BookingDrawer
        booking={selected}
        onClose={() => setSelected(null)}
        onStatusChange={(id, status) => { update(id, { status }); setSelected((cur) => cur ? { ...cur, status } : cur); }}
        onDelete={(id) => remove(id)}
      />
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: "mate" | "terracota" | "clorofila" | "carvao" }) {
  const dot = { mate: "bg-mate", terracota: "bg-terracota", clorofila: "bg-clorofila", carvao: "bg-carvao" }[accent];
  return (
    <div className="rounded-2xl border border-carvao/10 bg-osso p-5">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-carvao/55">
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dot)} />
        {label}
      </div>
      <div className="mt-2 font-display text-[34px] leading-none text-carvao font-numeric">{value}</div>
    </div>
  );
}

function EmptyState({ onSeed, onNew }: { onSeed: () => void; onNew: () => void }) {
  return (
    <div className="mt-10 rounded-3xl border border-carvao/10 bg-osso p-10 md:p-16 text-center">
      <Eyebrow>Começar</Eyebrow>
      <h2 className="mt-4 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.05] text-carvao text-balance max-w-[28ch] mx-auto">
        Nenhum agendamento por aqui. <em className="italic text-terracota">Ainda.</em>
      </h2>
      <p className="mt-4 font-sans text-[15px] text-carvao/65 max-w-[48ch] mx-auto">
        Quando chegar um pedido no WhatsApp, toca em Novo agendamento. Ou carrega um exemplo pra ver como fica.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
        <Button onClick={onNew} showArrow={false}>+ Novo agendamento</Button>
        <button
          type="button"
          onClick={onSeed}
          className="font-sans text-[14px] text-carvao accent-wave"
        >
          Carregar exemplo
        </button>
      </div>
    </div>
  );
}
