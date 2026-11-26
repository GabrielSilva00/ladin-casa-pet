import { getSettings } from "@/lib/admin/queries";
import { AdminHeader, EmptyState } from "@/components/admin/EmptyState";

export const dynamic = "force-dynamic";

export default async function ConfigPage() {
  let settings: Record<string, unknown> = {};
  let error: string | null = null;
  try { settings = await getSettings(); } catch (e) { error = String(e); }

  if (error) return <div><AdminHeader eyebrow="configurações" title="Horários & operação" /><EmptyState title="Supabase não configurado." /></div>;

  const work = settings.work_hours as { start: string; end: string; days: number[] } | undefined;

  return (
    <div>
      <AdminHeader eyebrow="configurações" title="Horários & operação" />

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-osso/10 corner-chamfer-sm p-6 bg-osso/5">
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-mate mb-2">Horário</div>
          <div className="font-display text-[24px] text-osso">
            {work?.start ?? "09:00"} às {work?.end ?? "18:00"}
          </div>
          <div className="mt-1 font-sans text-[13px] text-osso/65">
            Dias: {(work?.days ?? [2,3,4,5,6]).join(", ")} (0=dom, 6=sáb)
          </div>
        </div>

        <div className="border border-osso/10 corner-chamfer-sm p-6 bg-osso/5">
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-mate mb-2">Slot</div>
          <div className="font-display text-[24px] text-osso">
            {String(settings.slot_minutes ?? 30)} minutos
          </div>
          <div className="mt-1 font-sans text-[13px] text-osso/65">Intervalo entre horários.</div>
        </div>

        <div className="border border-osso/10 corner-chamfer-sm p-6 bg-osso/5">
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-mate mb-2">Paralelos</div>
          <div className="font-display text-[24px] text-osso">
            {String(settings.max_parallel ?? 2)} banhos simultâneos
          </div>
        </div>

        <div className="border border-osso/10 corner-chamfer-sm p-6 bg-osso/5">
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-mate mb-2">Buffer</div>
          <div className="font-display text-[24px] text-osso">
            {String(settings.buffer_minutes ?? 15)} minutos
          </div>
          <div className="mt-1 font-sans text-[13px] text-osso/65">Acrescido a cada serviço.</div>
        </div>
      </section>

      <p className="mt-10 font-mono text-[11px] uppercase tracking-wider2 text-osso/40">
        Edição inline e mensagens automáticas de WhatsApp. Próxima entrega.
      </p>
    </div>
  );
}
