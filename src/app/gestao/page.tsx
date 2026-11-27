"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { format, parseISO, isSameDay, isAfter, startOfDay, endOfDay, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useBookings, type GestaoStatus, type GestaoBooking } from "@/lib/gestao/store";
import { BookingCard } from "@/components/gestao/BookingCard";
import { BookingDrawer } from "@/components/gestao/BookingDrawer";
import { NewBookingModal } from "@/components/gestao/NewBookingModal";
import { Sidebar } from "@/components/gestao/Sidebar";
import { brl, cn } from "@/lib/utils";

type Scope = "hoje" | "semana";
type View = "kanban" | "lista";

const COLUMNS: { id: GestaoStatus; label: string; hint: string; accent: string }[] = [
  { id: "aguardando", label: "A chegar", hint: "Confirmados para hoje.", accent: "bg-mel" },
  { id: "em_banho", label: "Em banho", hint: "Em atendimento agora.", accent: "bg-tijolo" },
  { id: "finalizado", label: "Finalizado", hint: "Pronto, pode buscar.", accent: "bg-musgo" }
];

export default function GestaoPage() {
  const { bookings, ready, add, update, remove, seed, reset } = useBookings();
  const [scope, setScope] = useState<Scope>("hoje");
  const [view, setView] = useState<View>("kanban");
  const [openNew, setOpenNew] = useState(false);
  const [selected, setSelected] = useState<GestaoBooking | null>(null);
  const [q, setQ] = useState("");

  const now = useMemo(() => new Date(), [bookings]);
  const filtered = useMemo(() => {
    const dayStart = startOfDay(now);
    const dayEnd = endOfDay(now);
    return bookings
      .filter((b) => {
        const at = parseISO(b.scheduledAt);
        if (scope === "hoje") return isSameDay(at, now);
        return isAfter(at, dayStart) && differenceInDays(at, dayEnd) <= 7;
      })
      .filter((b) => {
        if (!q.trim()) return true;
        const t = q.toLowerCase();
        return (
          b.petName.toLowerCase().includes(t) ||
          b.tutorName.toLowerCase().includes(t) ||
          b.serviceName.toLowerCase().includes(t) ||
          b.phone.includes(t)
        );
      });
  }, [bookings, scope, q, now]);

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
    <div className="flex">
      <Sidebar active="painel" counts={{ painel: bookings.length }} />

      <div className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-creme/90 backdrop-blur border-b border-tinta/10">
          <div className="px-5 md:px-8 py-4 flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <div className="font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-tinta/50">
                Painel · Gestão
              </div>
              <h1 className="mt-0.5 font-display text-[22px] leading-tight text-tinta capitalize truncate">
                {todayLabel}
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-creme2/70 border border-tinta/10 rounded-full px-3 py-2 w-[280px] focus-within:border-tijolo/60 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="text-tinta/50">
                <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar pet, tutor, serviço..."
                className="w-full bg-transparent outline-none font-sans text-[13px] text-tinta placeholder-tinta/40"
              />
              {q ? (
                <button type="button" onClick={() => setQ("")} className="text-tinta/40 hover:text-tijolo text-[14px]">×</button>
              ) : null}
            </div>

            <Link href="/" className="hidden md:inline-flex items-center gap-2 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-tinta/55 hover:text-tijolo px-2">
              Ver site
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden><path d="M2 2h6v6M8 2L2 8" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>
            </Link>

            <button
              type="button"
              onClick={() => setOpenNew(true)}
              className="btn-primary text-[13px] px-4 py-2.5 whitespace-nowrap"
            >
              <span className="text-[16px] leading-none">+</span>
              Novo
            </button>
          </div>

          {/* Secondary bar: tabs + stats */}
          <div className="px-5 md:px-8 pb-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-tinta/5 border border-tinta/10">
              {(["hoje", "semana"] as Scope[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScope(s)}
                  className={cn(
                    "rounded-full px-4 py-1.5 font-sans text-[12px] font-medium transition-all",
                    scope === s ? "bg-creme text-tinta shadow-sm" : "text-tinta/60 hover:text-tinta"
                  )}
                >
                  {s === "hoje" ? "Hoje" : "Próximos 7 dias"}
                </button>
              ))}
            </div>

            <div className="h-5 w-px bg-tinta/15" aria-hidden />

            <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-tinta/5 border border-tinta/10">
              {(["kanban", "lista"] as View[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 font-sans text-[12px] font-medium transition-all inline-flex items-center gap-1.5",
                    view === v ? "bg-creme text-tinta shadow-sm" : "text-tinta/60 hover:text-tinta"
                  )}
                >
                  {v === "kanban" ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><rect x="1" y="1" width="2.5" height="10" fill="currentColor"/><rect x="4.75" y="1" width="2.5" height="7" fill="currentColor"/><rect x="8.5" y="1" width="2.5" height="4" fill="currentColor"/></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M1 2h10M1 6h10M1 10h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  )}
                  {v === "kanban" ? "Kanban" : "Lista"}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-4 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-tinta/55">
              <span>
                <span className="text-tinta/50">Receita</span>{" "}
                <span className="text-tinta font-numeric">{brl(totalRevenue)}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Stats row */}
        <section className="px-5 md:px-8 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="A chegar" value={String(grouped.aguardando.length)} dot="bg-mel" />
            <Stat label="Em banho" value={String(grouped.em_banho.length)} dot="bg-tijolo" />
            <Stat label="Finalizados" value={String(grouped.finalizado.length)} dot="bg-musgo" />
            <Stat label="Total" value={String(filtered.length)} dot="bg-tinta" />
          </div>
        </section>

        {/* Main content */}
        <main className="px-5 md:px-8 pb-24 pt-8">
          {!ready ? (
            <p className="font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-tinta/40">carregando...</p>
          ) : filtered.length === 0 ? (
            <EmptyState hasData={bookings.length > 0} onSeed={seed} onNew={() => setOpenNew(true)} />
          ) : view === "kanban" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {COLUMNS.map((col) => (
                <div key={col.id} className="rounded-soft bg-creme border border-tinta/10 overflow-hidden">
                  <header className="px-4 py-3 flex items-center justify-between border-b border-tinta/10 bg-creme2/40">
                    <div className="inline-flex items-center gap-2">
                      <span className={cn("inline-block h-2 w-2 rounded-full", col.accent)} aria-hidden />
                      <h2 className="font-sans text-[13px] font-medium text-tinta">{col.label}</h2>
                    </div>
                    <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-tinta/5 font-mono text-[11px] text-tinta font-numeric">
                      {grouped[col.id].length}
                    </span>
                  </header>
                  <div className="p-3 space-y-2.5 min-h-[160px]">
                    {grouped[col.id].length === 0 ? (
                      <div className="rounded-lg border border-dashed border-tinta/15 py-6 px-3 font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-tinta/35 text-center">
                        {col.hint}
                      </div>
                    ) : (
                      grouped[col.id].map((b) => (
                        <BookingCard key={b.id} booking={b} onClick={() => setSelected(b)} />
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <BookingTable rows={filtered} onOpen={setSelected} />
          )}

          {ready && bookings.length > 0 ? (
            <div className="mt-16 pt-6 border-t border-tinta/10 flex items-center justify-between font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-tinta/40">
              <span>Dados salvos no navegador. {bookings.length} registro{bookings.length === 1 ? "" : "s"}.</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={seed}
                  className="hover:text-tijolo"
                >
                  Recarregar exemplo
                </button>
                <button
                  type="button"
                  onClick={() => confirm("Limpar todos os agendamentos locais?") && reset()}
                  className="hover:text-tijolo2"
                >
                  Limpar tudo
                </button>
              </div>
            </div>
          ) : null}
        </main>
      </div>

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
    </div>
  );
}

function Stat({ label, value, dot }: { label: string; value: string; dot: string }) {
  return (
    <div className="rounded-soft border border-tinta/10 bg-creme p-4">
      <div className="flex items-center gap-2 font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-tinta/55">
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dot)} aria-hidden />
        {label}
      </div>
      <div className="mt-2 font-display text-[28px] leading-none text-tinta font-numeric">{value}</div>
    </div>
  );
}

function BookingTable({
  rows,
  onOpen
}: {
  rows: GestaoBooking[];
  onOpen: (b: GestaoBooking) => void;
}) {
  const statusLabel: Record<GestaoStatus, { label: string; style: string }> = {
    aguardando: { label: "A chegar", style: "bg-mel/20 text-tinta border-mel/40" },
    em_banho: { label: "Em banho", style: "bg-tijolo/15 text-tijolo border-tijolo/40" },
    finalizado: { label: "Finalizado", style: "bg-musgo/15 text-musgo border-musgo/40" }
  };

  return (
    <div className="rounded-soft bg-creme border border-tinta/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-[13px]">
          <thead>
            <tr className="border-b border-tinta/10 bg-creme2/40 text-tinta/60 font-sans text-[10px] uppercase font-semibold tracking-[0.14em]">
              <th className="px-4 py-3 font-normal">Horário</th>
              <th className="px-4 py-3 font-normal">Pet</th>
              <th className="px-4 py-3 font-normal">Tutor</th>
              <th className="px-4 py-3 font-normal">Serviço</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 font-normal text-right">Total</th>
              <th aria-label="ação" className="w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const time = format(parseISO(r.scheduledAt), "HH:mm");
              return (
                <tr
                  key={r.id}
                  className="border-b border-tinta/5 last:border-0 hover:bg-creme2/30 transition-colors cursor-pointer"
                  onClick={() => onOpen(r)}
                >
                  <td className="px-4 py-3 font-mono text-tinta font-numeric">{time}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-tinta">{r.petName}</div>
                    <div className="text-[11px] text-tinta/50">{r.species === "cao" ? "Cão" : "Gato"} · {r.size}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-tinta">{r.tutorName}</div>
                    <div className="text-[11px] text-tinta/50 font-numeric">{r.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-tinta/80">{r.serviceName}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 font-sans text-[10px] uppercase font-semibold tracking-[0.1em]", statusLabel[r.status].style)}>
                      {statusLabel[r.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-numeric text-tinta">{brl(r.totalPriceCents)}</td>
                  <td className="px-4 py-3 text-tinta/40">→</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState({ hasData, onSeed, onNew }: { hasData: boolean; onSeed: () => void; onNew: () => void }) {
  return (
    <div className="rounded-soft border border-tinta/10 bg-creme p-10 md:p-14 text-center">
      <div className="h-14 w-14 mx-auto rounded-full bg-tijolo/10 flex items-center justify-center text-tijolo mb-5">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
          <rect x="2" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M2 9h18M7 1v4M15 1v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-tight text-tinta text-balance max-w-[28ch] mx-auto">
        {hasData ? "Nenhum agendamento neste período." : "Nenhum agendamento por aqui."}
      </h2>
      <p className="mt-3 font-sans text-[14px] text-tinta/65 max-w-[48ch] mx-auto">
        Toca em Novo pra registrar na mão, ou carrega um exemplo pra ver o painel preenchido.
      </p>
      <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
        <button type="button" onClick={onNew} className="btn-primary">+ Novo agendamento</button>
        <button type="button" onClick={onSeed} className="btn-ghost">Carregar exemplo</button>
      </div>
    </div>
  );
}
