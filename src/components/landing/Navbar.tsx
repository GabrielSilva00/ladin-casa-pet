"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";
import { NAV } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div className="container flex items-center justify-between gap-6">
        <Link href="/" aria-label="Cabana Pet Café" className="block">
          <Wordmark />
        </Link>

        <nav className={cn("hidden md:block", scrolled && "opacity-0 pointer-events-none")}>
          <ul className="flex items-center gap-1 rounded-full border border-terracota/70 bg-osso/80 backdrop-blur px-2 py-1.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-1.5 font-sans text-[13px] text-carvao transition-colors hover:bg-terracota hover:text-osso"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/gestao"
            className="hidden lg:inline font-mono text-[11px] uppercase tracking-[0.14em] text-carvao/55 hover:text-terracota"
          >
            Painel
          </Link>
          <Link
            href="/agendar"
            className="inline-flex items-center gap-2 rounded-btn bg-terracota px-5 py-2.5 font-sans text-[13px] font-medium text-osso transition-all hover:shadow-warm hover:-translate-y-[1px]"
          >
            Agendar <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-carvao/20 text-carvao"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span className={cn("absolute inset-x-0 top-0 h-px bg-current transition-transform", open && "translate-y-[6px] rotate-45")} />
              <span className={cn("absolute inset-x-0 top-1/2 h-px bg-current transition-opacity", open && "opacity-0")} />
              <span className={cn("absolute inset-x-0 bottom-0 h-px bg-current transition-transform", open && "-translate-y-[6px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden container mt-4 rounded-2xl border border-carvao/15 bg-osso p-4 shadow-card">
          <ul className="flex flex-col divide-y divide-carvao/10">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-3 font-display text-[22px] text-carvao"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
