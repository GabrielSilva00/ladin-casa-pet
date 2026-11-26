import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { Eyebrow } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

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
  // Modo sem banco: o painel não tem o que mostrar, então servimos um splash
  // explicando como ativá-lo. Os agendamentos ainda chegam no WhatsApp.
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-noite text-osso grid place-items-center p-6" data-theme="dark">
        <div className="max-w-xl text-center">
          <Link href="/" aria-label="Site" className="inline-block">
            <Wordmark className="[&_span]:text-osso" />
          </Link>

          <Eyebrow className="mt-10 block text-mate">Painel</Eyebrow>
          <h1 className="mt-4 font-display text-h2 text-osso text-balance">
            Painel em modo{" "}
            <em className="italic text-mate">
              repouso.
            </em>
          </h1>

          <p className="mt-6 font-sans text-[17px] text-osso/80 leading-[1.6]">
            Enquanto você estiver operando no <strong>modo WhatsApp</strong>, os
            agendamentos dos tutores chegam direto no celular do estabelecimento.
            Não há banco de dados para listar aqui. O painel ativa automaticamente
            no próximo deploy em que as variáveis do Supabase estiverem presentes.
          </p>

          <div className="mt-10 border border-osso/15 corner-chamfer-sm p-6 bg-osso/5 text-left">
            <div className="font-mono text-[10px] uppercase tracking-wider2 text-mate mb-3">
              Para ligar o painel
            </div>
            <ol className="space-y-2 font-sans text-[14px] text-osso/85 list-decimal pl-5">
              <li>Crie um projeto grátis em <a href="https://app.supabase.com" target="_blank" rel="noreferrer" className="underline-wavy">supabase.com</a></li>
              <li>Aplique o SQL de <code className="font-mono text-mate">supabase/migrations/</code></li>
              <li>Adicione <code className="font-mono text-mate">NEXT_PUBLIC_SUPABASE_URL</code>, <code className="font-mono text-mate">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> e <code className="font-mono text-mate">SUPABASE_SERVICE_ROLE_KEY</code> na Vercel</li>
              <li>Faça um redeploy. As 7 telas aparecem aqui</li>
            </ol>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider2 text-osso/50">
              Guia completo: <code className="text-mate">DEPLOY.md</code> → "Ligar o banco depois"
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/gestao">
              <Button className="bg-terracota">Abrir painel do dono</Button>
            </Link>
            <Link href="/" className="font-sans text-[14px] text-osso/70 hover:text-osso">
              Voltar para o site
            </Link>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-osso/40">
            O painel do dono funciona sem banco. Seus dados ficam no navegador.
          </p>
        </div>
      </div>
    );
  }

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
