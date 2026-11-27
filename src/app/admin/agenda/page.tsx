import { format, parseISO, startOfDay, isSameDay, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { listWeekBookings } from "@/lib/admin/queries";
import { AdminHeader, EmptyState } from "@/components/admin/EmptyState";

export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  let rows: Awaited<ReturnType<typeof listWeekBookings>> = [];
  let error: string | null = null;
  try { rows = await listWeekBookings(); } catch (e) { error = String(e); }

  const start = subDays(startOfDay(new Date()), 3);
  const days = Array.from({ length: 14 }, (_, i) => addDays(start, i));
  const byDay = new Map<string, typeof rows>();
  rows.forEach((r) => {
    const k = format(parseISO(r.scheduled_at), "yyyy-MM-dd");
    const arr = byDay.get(k) ?? [];
    arr.push(r);
    byDay.set(k, arr);
  });

  return (
    <div>
      <AdminHeader
        eyebrow="agenda"
        title="Duas semanas"
        action={
          <a href="/admin/bloqueios" className="font-sans text-[11px] uppercase font-semibold tracking-wider2 text-mate hover:text-terracota">
            bloquear data →
          </a>
        }
      />

      {error ? (
        <EmptyState title="Supabase não configurado." />
      ) : (
        <div className="mt-8 grid grid-cols-7 gap-px bg-osso/10">
          {days.slice(0, 7).map((d) => <Day key={d.toISOString()} d={d} byDay={byDay} />)}
          {days.slice(7, 14).map((d) => <Day key={d.toISOString()} d={d} byDay={byDay} />)}
        </div>
      )}
    </div>
  );
}

function Day({ d, byDay }: { d: Date; byDay: Map<string, Awaited<ReturnType<typeof listWeekBookings>>> }) {
  const key = format(d, "yyyy-MM-dd");
  const items = byDay.get(key) ?? [];
  const isToday = isSameDay(d, new Date());
  return (
    <div className={`min-h-[160px] p-3 bg-noite ${isToday ? "ring-1 ring-terracota ring-inset" : ""}`}>
      <div className="flex items-baseline justify-between">
        <div className="font-sans text-[10px] uppercase font-semibold tracking-wider2 text-mate">
          {format(d, "EEE", { locale: ptBR })}
        </div>
        <div className="font-display text-[22px] text-osso">{format(d, "d")}</div>
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((b) => (
          <li
            key={b.id}
            className="text-[11px] font-mono text-osso/85 bg-terracota/25 border-l-2 border-terracota px-2 py-1 truncate"
            title={`${b.pet?.name ?? ""} · ${b.client?.name ?? ""}`}
          >
            {format(parseISO(b.scheduled_at), "HH:mm")} {b.pet?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
