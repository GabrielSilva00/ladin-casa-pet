import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";

export default function GestaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-osso text-carvao">
      <header className="sticky top-0 z-30 border-b border-carvao/10 bg-osso/90 backdrop-blur">
        <div className="container py-4 flex items-center justify-between gap-6">
          <Link href="/" aria-label="Site">
            <Wordmark />
          </Link>
          <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/65">
            <Link href="/gestao" className="text-terracota">Gestão</Link>
            <Link href="/" className="hover:text-terracota">Site público</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
