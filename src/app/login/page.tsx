"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { InputField } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Logo";
import { Eyebrow } from "@/components/ui/Chip";
import { createClient } from "@/lib/supabase/browser";
import { toast } from "sonner";

function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const sb = createClient();
      const { error } = await sb.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}${next}` }
      });
      if (error) throw error;
      toast.success("Link mágico enviado para o seu e-mail.");
    } catch (err) {
      toast.error("Não foi possível enviar o link. Tenta de novo.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <Wordmark />
      <Eyebrow className="mt-10 block">Painel</Eyebrow>
      <h1 className="mt-3 font-display text-h2 text-carvao">Entre com o seu e-mail.</h1>
      <p className="mt-3 font-sans text-[15px] text-carvao/70">
        Enviamos um link de acesso. Nada de senha — mais seguro assim.
      </p>

      <InputField
        label="E-mail"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-8"
      />

      <Button type="submit" disabled={sending || !email} className="mt-8 w-full">
        {sending ? "Enviando…" : "Enviar link"}
      </Button>

      <p className="mt-10 font-mono text-[11px] uppercase tracking-wider2 text-carvao/50">
        Só e-mails autorizados têm acesso ao painel.
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-osso grid place-items-center p-6">
      <Suspense fallback={<div className="font-mono text-[11px] text-carvao/50">carregando…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
