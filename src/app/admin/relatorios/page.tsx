import { weeklyStats } from "@/lib/admin/queries";
import { AdminHeader, EmptyState } from "@/components/admin/EmptyState";
import { brl } from "@/lib/utils";
import { format, parseISO } from "date-fns";

export const dynamic = "force-dynamic";

export default async function RelatoriosPage() {
  let stats: Awaited<ReturnType<typeof weeklyStats>>;
  let error: string | null = null;
  try { stats = await weeklyStats(); } catch (e) { error = String(e); return <div><AdminHeader eyebrow="relatórios" title="28 dias" /><EmptyState title="Supabase não configurado." /></div>; }

  const maxCount = Math.max(1, ...stats.byDay.map((d) => d.count));

  return (
    <div>
      <AdminHeader eyebrow="relatórios" title="Últimos 28 dias" />

      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Agendamentos" value={String(stats.bookings)} />
        <Stat label="Receita estimada" value={brl(stats.revenueCents)} />
        <Stat label="Ticket médio" value={stats.bookings ? brl(Math.round(stats.revenueCents / stats.bookings)) : "—"} />
      </section>

      <section className="mt-12">
        <h2 className="font-display text-[22px] text-osso mb-4">Agendamentos por dia</h2>
        <div className="flex items-end gap-1 h-40 border-b border-osso/10 pr-2">
          {stats.byDay.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-2" title={`${d.date} · ${d.count}`}>
              <div
                className="w-full bg-terracota"
                style={{ height: `${(d.count / maxCount) * 100}%` }}
              />
              <span className="font-mono text-[9px] uppercase tracking-wider2 text-osso/50 rotate-45 origin-top-left">
                {format(parseISO(d.date), "dd/MM")}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-[22px] text-osso mb-4">Serviços mais pedidos</h2>
          <ul className="space-y-2">
            {stats.topService.map((s) => (
              <li key={s.service} className="flex items-center justify-between font-sans text-[14px] text-osso/85">
                <span>{s.service}</span>
                <span className="font-mono text-[12px] text-mate">{s.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-[22px] text-osso mb-4">Como conheceram</h2>
          <ul className="space-y-2">
            {stats.bySource.map((s) => (
              <li key={s.source} className="flex items-center justify-between font-sans text-[14px] text-osso/85">
                <span className="capitalize">{s.source}</span>
                <span className="font-mono text-[12px] text-mate">{s.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-osso/10 corner-chamfer-sm p-6 bg-osso/5">
      <div className="font-sans text-[10px] uppercase font-semibold tracking-wider2 text-mate">{label}</div>
      <div className="mt-2 font-display text-[36px] text-osso font-numeric">{value}</div>
    </div>
  );
}
