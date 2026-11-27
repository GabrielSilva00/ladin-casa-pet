"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingCta() {
  const pathname = usePathname();

  // Esconde em /agendar e /gestao (já é a ação principal da página)
  if (pathname?.startsWith("/agendar") || pathname?.startsWith("/gestao") || pathname?.startsWith("/admin")) return null;

  return (
    <Link
      href="/agendar"
      aria-label="Agendar visita"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 inline-flex items-center gap-2 rounded-full bg-lavanda text-papel px-5 py-3.5 shadow-float transition-all duration-300 hover:bg-lavanda2 hover:-translate-y-[2px] animate-floatIn"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-papel opacity-70 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-papel" />
      </span>
      <span className="font-sans text-[14px] font-bold">Agendar</span>
      <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden>
        <path d="M1 6h11M8 1l4 5-4 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  );
}
