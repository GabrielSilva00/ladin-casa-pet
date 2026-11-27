import { listClients } from "@/lib/admin/queries";
import { AdminHeader, EmptyState } from "@/components/admin/EmptyState";
import { format, parseISO } from "date-fns";

export const dynamic = "force-dynamic";

export default async function ClientesPage() {
  let clients: Awaited<ReturnType<typeof listClients>> = [];
  let error: string | null = null;
  try { clients = await listClients(); } catch (e) { error = String(e); }

  return (
    <div>
      <AdminHeader eyebrow="clientes" title="Tutores & pets" />
      {error ? <EmptyState title="Supabase não configurado." /> :
       clients.length === 0 ? <EmptyState title="Nenhum cliente ainda." hint="O primeiro agendamento cadastra o primeiro tutor." /> :
      (
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((c: any) => (
            <li key={c.id} className="border border-osso/10 corner-chamfer-sm p-5 bg-osso/5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-[22px] text-osso">{c.name}</h3>
                  <div className="mt-1 font-mono text-[11px] text-osso/60">
                    {c.phone} {c.email ? `· ${c.email}` : ""}
                  </div>
                </div>
                <span className="font-sans text-[10px] uppercase font-semibold tracking-wider2 text-mate">
                  {c.source ?? "—"}
                </span>
              </div>
              <ul className="mt-4 space-y-1 font-sans text-[13px] text-osso/80">
                {(c.pets ?? []).map((p: any) => (
                  <li key={p.id}>
                    <span className="font-display text-[16px] italic">{p.name}</span>{" "}
                    <span className="text-osso/55">({p.species}, {p.size}, pelo {p.coat})</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-sans text-[10px] uppercase font-semibold tracking-wider2 text-osso/50">
                {(c.bookings ?? []).length} visitas · cliente desde {format(parseISO(c.created_at), "MM/yyyy")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
