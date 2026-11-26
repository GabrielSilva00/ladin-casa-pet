import { listServices, listMenuItems } from "@/lib/admin/queries";
import { AdminHeader, EmptyState } from "@/components/admin/EmptyState";
import { brl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CardapioAdminPage() {
  let services: Awaited<ReturnType<typeof listServices>> = [];
  let items: Awaited<ReturnType<typeof listMenuItems>> = [];
  let error: string | null = null;
  try {
    [services, items] = await Promise.all([listServices(), listMenuItems()]);
  } catch (e) { error = String(e); }

  if (error) return <div><AdminHeader eyebrow="cardápio" title="Serviços & café" /><EmptyState title="Supabase não configurado." /></div>;

  return (
    <div>
      <AdminHeader eyebrow="cardápio" title="Serviços & café" />

      <section className="mt-8">
        <h2 className="font-display text-[26px] text-osso">Serviços de banho & tosa</h2>
        <ul className="mt-4 divide-y divide-osso/10 border border-osso/10 corner-chamfer-sm bg-osso/5">
          {services.map((s: any) => (
            <li key={s.id} className="grid grid-cols-12 gap-3 items-center px-5 py-4">
              <div className="col-span-5 font-display text-[18px] text-osso">{s.name}</div>
              <div className="col-span-3 font-mono text-[11px] text-osso/60">{s.duration_min} min</div>
              <div className="col-span-3 font-mono text-[12px] text-osso/80 font-numeric">a partir de {brl(s.base_price_cents)}</div>
              <div className="col-span-1 text-right">
                <span className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider2 ${s.featured ? "border-mate text-mate" : "border-osso/30 text-osso/50"}`}>
                  {s.featured ? "no site" : "oculto"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-[26px] text-osso">Cardápio do café</h2>
        <ul className="mt-4 divide-y divide-osso/10 border border-osso/10 corner-chamfer-sm bg-osso/5">
          {items.map((i: any) => (
            <li key={i.id} className="grid grid-cols-12 gap-3 items-baseline px-5 py-4">
              <div className="col-span-5 font-display text-[18px] italic text-osso">{i.name}</div>
              <div className="col-span-4 font-sans text-[13px] text-osso/65 truncate">{i.description}</div>
              <div className="col-span-2 font-mono text-[12px] text-osso/80 font-numeric">{brl(i.price_cents)}</div>
              <div className="col-span-1 text-right">
                <span className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider2 ${i.featured ? "border-mate text-mate" : "border-osso/30 text-osso/50"}`}>
                  {i.featured ? "destaque" : "regular"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-wider2 text-osso/40">
        CRUD completo (criar, editar, remover). Próxima entrega.
      </p>
    </div>
  );
}
