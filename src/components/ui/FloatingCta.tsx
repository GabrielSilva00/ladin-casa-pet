"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function FloatingCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esconde em /agendar e /gestao (já é a ação principal da página)
  if (pathname?.startsWith("/agendar") || pathname?.startsWith("/gestao") || pathname?.startsWith("/admin")) return null;

  return (
    <Link
      href="/agendar"
      aria-label="Agendar visita"
      className={`fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 inline-flex items-center gap-2 rounded-full bg-tijolo text-creme px-5 py-3.5 shadow-float transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-mel opacity-70 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-mel" />
      </span>
      <span className="font-sans text-[14px] font-medium">Agendar</span>
      <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden>
        <path d="M1 6h11M8 1l4 5-4 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  );
}
