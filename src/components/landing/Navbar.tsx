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
          "container flex items-center justify-between gap-4 transition-all duration-500",
          scrolled && "md:bg-baunilha/90 md:backdrop-blur md:rounded-full md:border md:border-tinta/10 md:px-4 md:py-2"
        )}
      >
        <Link
          href="/"
          aria-label="Cabana Pet Café"
          className={cn("block transition-colors", scrolled ? "text-tinta" : "text-baunilha")}
        >
          <Wordmark />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 font-sans text-[13px] font-semibold transition-colors",
                    scrolled
                      ? "text-tinta/70 hover:text-lavanda2"
                      : "text-baunilha/85 hover:text-lavanda3"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={cn(
            "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
            scrolled ? "border-tinta/25 text-tinta bg-baunilha" : "border-baunilha/40 text-baunilha"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-4">
            <span className={cn("absolute inset-x-0 top-0 h-[2px] rounded bg-current transition-transform", open && "translate-y-[6px] rotate-45")} />
            <span className={cn("absolute inset-x-0 top-1/2 h-[2px] rounded bg-current transition-opacity", open && "opacity-0")} />
            <span className={cn("absolute inset-x-0 bottom-0 h-[2px] rounded bg-current transition-transform", open && "-translate-y-[6px] -rotate-45")} />
          </span>
        </button>
      </div>

      {open ? (
        <div className="md:hidden container mt-3 rounded-soft border border-tinta/15 bg-baunilha p-3 shadow-card">
          <ul className="flex flex-col divide-y divide-tinta/10">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-3 px-2 font-display font-semibold text-[20px] text-tinta hover:text-lavanda2 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden className="text-lavanda">
                    <path d="M1 6h11M8 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
