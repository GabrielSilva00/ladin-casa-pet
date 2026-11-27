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
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between gap-6 transition-all duration-500",
          scrolled && "md:bg-creme/90 md:backdrop-blur md:rounded-full md:border md:border-tinta/10 md:px-4 md:py-2"
        )}
      >
        <Link href="/" aria-label="Cabana Pet Café" className={cn("block transition-colors", scrolled ? "text-tinta" : "text-creme")}>
          <Wordmark />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 font-sans text-[13px] transition-colors",
                    scrolled
                      ? "text-tinta/70 hover:text-tijolo"
                      : "text-creme/80 hover:text-mel"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/agendar"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-tijolo px-4 py-2 font-sans text-[13px] font-medium text-creme transition-all hover:bg-tijolo2 hover:-translate-y-[1px]"
          >
            Agendar
            <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden>
              <path d="M1 5h9M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </Link>
          <button
            type="button"
            className={cn(
              "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
              scrolled ? "border-tinta/25 text-tinta bg-creme" : "border-creme/40 text-creme"
            )}
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
        <div className="md:hidden container mt-3 rounded-soft border border-tinta/15 bg-creme p-4 shadow-card">
          <ul className="flex flex-col divide-y divide-tinta/10">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-3 font-display text-[22px] text-tinta"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/agendar"
                className="block py-3 font-display text-[22px] text-tijolo"
                onClick={() => setOpen(false)}
              >
                Agendar →
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
