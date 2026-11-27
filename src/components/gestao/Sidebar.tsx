"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
  disabled?: boolean;
};

export function Sidebar({ active = "painel", counts }: { active?: string; counts?: Record<string, number> }) {
  const items: Item[] = [
    {
      id: "painel",
      label: "Painel",
      active: active === "painel",
      count: counts?.painel,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M2 2h5v5H2V2zm7 0h5v8H9V2zM2 9h5v5H2V9zm7 3h5v2H9v-2z" fill="currentColor"/></svg>
      )
    },
    {
      id: "agenda",
      label: "Agenda",
      active: active === "agenda",
      disabled: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <rect x="2" y="3" width="12" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: "clientes",
      label: "Clientes",
      active: active === "clientes",
      disabled: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <circle cx="8" cy="5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M2 14c0-2.8 2.7-5 6-5s6 2.2 6 5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: "servicos",
      label: "Serviços",
      active: active === "servicos",
      disabled: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <path d="M4 6c0-2 1.5-3 4-3s4 1 4 3M3 10c0-.5.5-1 1-1h8c.5 0 1 .5 1 1v3c0 .5-.5 1-1 1H4c-.5 0-1-.5-1-1v-3z" fill="none" stroke="currentColor" strokeWidth="1.3"/>
        </svg>
      )
    },
    {
      id: "financeiro",
      label: "Financeiro",
      active: active === "financeiro",
      disabled: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <path d="M2 4h12v8H2V4z" fill="none" stroke="currentColor" strokeWidth="1.3"/>
          <circle cx="8" cy="8" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.3"/>
        </svg>
      )
    },
    {
      id: "config",
      label: "Configurações",
      active: active === "config",
      disabled: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  return (
    <aside className="hidden md:flex flex-col w-[220px] shrink-0 bg-tinta text-creme min-h-screen sticky top-0 border-r border-tinta/20">
      <div className="px-5 py-5 border-b border-creme/10">
        <Link href="/" className="inline-flex items-baseline gap-2 text-creme">
          <span className="font-display text-[20px] font-medium tracking-[-0.03em]">Cabana</span>
          <span className="h-[12px] w-px bg-mel" aria-hidden />
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-creme/70">Painel</span>
        </Link>
      </div>

      <nav className="flex-1 py-4 px-3">
        <div className="px-2 pb-2 font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-creme/40">
          Operação
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                disabled={item.disabled}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-[13px] transition-colors text-left",
                  item.active
                    ? "bg-creme/10 text-creme"
                    : item.disabled
                    ? "text-creme/30 cursor-not-allowed"
                    : "text-creme/70 hover:bg-creme/5 hover:text-creme"
                )}
              >
                <span className={item.active ? "text-mel" : ""}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {typeof item.count === "number" && item.count > 0 ? (
                  <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-tijolo text-creme font-mono text-[10px] font-numeric">
                    {item.count}
                  </span>
                ) : null}
                {item.disabled ? (
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-creme/30">em breve</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-creme/10 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-mel/20 text-mel flex items-center justify-center font-mono text-[12px] font-medium">
            CP
          </div>
          <div className="min-w-0">
            <div className="font-sans text-[12px] text-creme truncate">Cabana Pet Café</div>
            <div className="font-mono text-[10px] text-creme/50 truncate">dono · Campinas</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
