import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";
import { BookingProvider } from "@/components/booking/BookingContext";
import { StepIndicator } from "@/components/booking/StepIndicator";
import { BRAND } from "@/lib/utils";

export default function AgendarLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-creme2/40">
        <header className="container py-5 flex items-center justify-between">
          <Link href="/" aria-label="Voltar à home" className="text-tinta">
            <Wordmark />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[13px] text-tinta/60 hover:text-tijolo"
          >
            <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden>
              <path d="M11 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
            Voltar
          </Link>
        </header>

        <StepIndicator />

        <main className="container py-10 md:py-14 max-w-[880px]">
          <div className="rounded-soft bg-creme border border-tinta/10 p-6 md:p-12 shadow-card">
            {children}
          </div>
        </main>

        <footer className="container py-8 border-t border-tinta/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-tinta/50">
          <span>Dúvidas? Chame no WhatsApp.</span>
          <a href={`https://wa.me/${BRAND.phoneDigits}`} className="hover:text-tijolo">{BRAND.phone}</a>
        </footer>
      </div>
    </BookingProvider>
  );
}
