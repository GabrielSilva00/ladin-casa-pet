import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { listTodayBookings } from "@/lib/admin/queries";
import { AdminHeader, EmptyState } from "@/components/admin/EmptyState";
import { brl } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-mate/20 text-mate border-mate/50",
  confirmed: "bg-clorofila/30 text-osso border-clorofila",
  in_progress: "bg-terracota/30 text-tamara border-terracota",
  finished: "bg-osso/15 text-osso/80 border-osso/30",
  no_show: "bg-vinho/30 text-osso border-vinho",
  cancelled: "bg-osso/10 text-osso/40 border-osso/20 line-through"
};
const STATUS_LABELS: Record<string, string> = {
  pending: "aguardando",
  confirmed: "confirmado",
  in_progress: "em banho",
  finished: "finalizado",
  no_show: "no-show",
  cancelled: "cancelado"
};

export default async function HojePage() {
  let bookings: Awaited<ReturnType<typeof listTodayBookings>> = [];
  let error: string | null = null;
  try { bookings = await listTodayBookings(); } catch (e) { error = String(e); }

  const today = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  return (
    <div>
      <AdminHeader eyebrow="hoje" title={today} />

      {error ? (
        <EmptyState title="Supabase não está configurado." hint="Defina as variáveis NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY." />
      ) : bookings.length === 0 ? (
        <EmptyState title="Dia leve." hint="Nenhum agendamento para hoje. Aproveita um café." />
      ) : (
        <ul className="mt-8 space-y-3">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="group grid grid-cols-12 gap-4 items-center border border-osso/10 corner-chamfer-sm p-5 bg-osso/5 hover:bg-osso/10 transition-colors"
            >
              <div className="col-span-2 font-mono text-[18px] text-osso font-numeric">
                {format(new Date(b.scheduled_at), "HH:mm")}
              </div>
              <div className="col-span-5">
                <div className="font-display text-[22px] text-osso">
                  {b.pet?.name} <span className="font-sans text-[13px] text-osso/60">({b.pet?.size}, pelo {b.pet?.coat})</span>
                </div>
                <div className="font-sans text-[13px] text-osso/70">
                  {b.client?.name} · <a href={`https://wa.me/${b.client?.phone}`} className="underline-wavy">{b.client?.phone}</a>
                </div>
              </div>
              <div className="col-span-3 font-mono text-[11px] uppercase tracking-wider2 text-osso/70">
                {b.service_ids.join(" + ")} · {b.duration_min}min
              </div>
              <div className="col-span-1 font-mono text-[13px] text-osso/80 text-right font-numeric">
                {brl(b.total_price_cents)}
              </div>
              <div className="col-span-1 text-right">
                <span className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider2 ${STATUS_COLORS[b.status] ?? ""}`}>
                  {STATUS_LABELS[b.status] ?? b.status}
                </span>
              </div>
              {b.notes ? (
                <div className="col-span-12 pt-3 mt-3 border-t border-osso/10 font-sans text-[13px] text-osso/65">
                  <span className="font-mono text-[10px] uppercase tracking-wider2 text-mate mr-2">nota:</span>
                  {b.notes}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
