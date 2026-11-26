import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";

const NAV = [
  { href: "/admin/hoje", label: "Hoje", n: "01" },
  { href: "/admin/agenda", label: "Agenda", n: "02" },
  { href: "/admin/clientes", label: "Clientes & Pets", n: "03" },
  { href: "/admin/cardapio", label: "Cardápio", n: "04" },
  { href: "/admin/bloqueios", label: "Bloqueios", n: "05" },
  { href: "/admin/configuracoes", label: "Configurações", n: "06" },
  { href: "/admin/relatorios", label: "Relatórios", n: "07" }
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-noite text-osso" data-theme="dark">
      <div className="grid grid-cols-12 min-h-screen">
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2 border-b lg:border-b-0 lg:border-r border-osso/10 p-6 lg:py-10">
          <Link href="/" aria-label="Site" className="block [&_*]:text-osso">
            <Wordmark className="[&_span]:text-osso" />
          </Link>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-wider2 text-mate">Painel</div>

          <nav className="mt-10">
            <ul className="space-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="group flex items-center gap-3 rounded-sm px-2 py-2 font-sans text-[14px] text-osso/80 hover:bg-osso/10 hover:text-osso transition-colors"
                  >
                    <span className="font-mono text-[10px] text-mate/70 w-6">{n.n}</span>
                    <span>{n.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 pt-6 border-t border-osso/10">
            <a
              href="/api/auth/signout"
              className="font-mono text-[10px] uppercase tracking-wider2 text-osso/60 hover:text-terracota"
            >
              Sair ↗
            </a>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-9 xl:col-span-10 p-6 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
