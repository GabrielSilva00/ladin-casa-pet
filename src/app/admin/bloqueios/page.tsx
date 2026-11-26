import { listBlocks } from "@/lib/admin/queries";
import { AdminHeader, EmptyState } from "@/components/admin/EmptyState";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function BloqueiosPage() {
  let blocks: Awaited<ReturnType<typeof listBlocks>> = [];
  let error: string | null = null;
  try { blocks = await listBlocks(); } catch (e) { error = String(e); }

  return (
    <div>
      <AdminHeader
        eyebrow="bloqueios"
        title="Datas indisponíveis"
        action={
          <button className="rounded-btn bg-terracota px-4 py-2 font-sans text-[13px] text-osso hover:shadow-warm">
            + novo bloqueio
          </button>
        }
      />

      {error ? <EmptyState title="Supabase não configurado." /> :
       blocks.length === 0 ? <EmptyState title="Nenhum bloqueio ativo." hint="Feriados, folgas e manutenção aparecem aqui." /> :
      (
        <ul className="mt-8 space-y-2">
          {blocks.map((b: any) => (
            <li key={b.id} className="flex items-center justify-between gap-4 border border-osso/10 corner-chamfer-sm p-4 bg-osso/5">
              <div>
                <div className="font-display text-[18px] text-osso">{b.reason ?? "Bloqueio"}</div>
                <div className="font-mono text-[11px] text-osso/60">
                  {format(parseISO(b.starts_at), "dd/MM HH:mm", { locale: ptBR })} —{" "}
                  {format(parseISO(b.ends_at), "dd/MM HH:mm", { locale: ptBR })}
                </div>
              </div>
              <button className="font-mono text-[11px] uppercase tracking-wider2 text-osso/60 hover:text-vinho">
                remover
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 font-mono text-[11px] uppercase tracking-wider2 text-osso/40">
        Criação e edição com modal. Próxima entrega.
      </p>
    </div>
  );
}
