import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";
import { BookingProvider } from "@/components/booking/BookingContext";
import { StepIndicator } from "@/components/booking/StepIndicator";

export default function AgendarLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-osso">
        <header className="container py-6 flex items-center justify-between">
          <Link href="/" aria-label="Voltar à home">
            <Wordmark />
          </Link>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-wider2 text-carvao/60 hover:text-terracota"
          >
            ← Voltar
          </Link>
        </header>

        <StepIndicator />

        <main className="container py-14 max-w-[880px]">
          {children}
        </main>

        <footer className="container py-8 border-t border-carvao/10 font-mono text-[11px] uppercase tracking-wider2 text-carvao/50 flex items-center justify-between">
          <span>Dúvidas? Chame no WhatsApp.</span>
          <a href="https://wa.me/551931991405" className="hover:text-terracota">+55 19 3199-1405</a>
        </footer>
      </div>
    </BookingProvider>
  );
}
