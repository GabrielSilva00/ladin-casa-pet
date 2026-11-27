"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

function Content() {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-14">
      <div className="h-16 w-16 rounded-full bg-tijolo/15 border border-tijolo/30 flex items-center justify-center mb-6 animate-floatIn">
        <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden className="text-tijolo">
          <path d="M1 11l8 8L27 2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-tijolo">
        Agendamento feito
      </div>
      <h1 className="mt-3 font-display text-h1 text-tinta text-balance max-w-[20ch]">
        Seu horário está <em className="italic text-tijolo">guardado.</em>
      </h1>

      <p className="mt-5 max-w-[52ch] font-sans text-[16px] text-tinta/75">
        O agendamento já está no painel da casa. A gente te confirma pelo WhatsApp em instantes.
      </p>

      {id ? (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-tinta/5 border border-tinta/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-tinta/60">
          Protocolo <span className="text-tinta font-numeric">{id}</span>
        </div>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-3 justify-center">
        <Link href="/">
          <Button>Voltar para o começo</Button>
        </Link>
        <Link href="/gestao" className="btn-ghost">
          Ver no painel
        </Link>
      </div>

      <div className="mt-14 font-mono text-[11px] uppercase tracking-[0.14em] text-tinta/50">
        Até lá. O café já está moído.
      </div>
    </div>
  );
}

export default function ConfirmadoPage() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
