"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";
import { BRAND } from "@/lib/utils";

function Content() {
  const params = useSearchParams();
  const modo = params.get("modo");
  const isWhatsapp = modo === "whatsapp";

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <Eyebrow>{isWhatsapp ? "Quase lá" : "Pronto"}</Eyebrow>
      <h1 className="mt-4 font-display text-h1 text-carvao text-balance max-w-[20ch]">
        {isWhatsapp ? (
          <>
            Toque{" "}
            <em className="italic text-terracota">
              enviar
            </em>{" "}
            no WhatsApp pra concluir.
          </>
        ) : (
          <>
            Seu horário está{" "}
            <em className="italic text-terracota">
              guardado.
            </em>
          </>
        )}
      </h1>

      <p className="mt-6 max-w-[52ch] font-sans text-[17px] text-carvao/75">
        {isWhatsapp ? (
          <>
            Abrimos o WhatsApp numa nova aba com todos os dados do agendamento
            prontos. É só tocar <strong>enviar</strong>. A gente confirma o
            horário por mensagem em instantes.
          </>
        ) : (
          <>
            Enviamos a confirmação pelo WhatsApp. Se precisar remarcar, é só
            responder a mensagem. A gente dá um jeito.
          </>
        )}
      </p>

      {isWhatsapp ? (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-wider2 text-carvao/55">
          Não abriu a aba?{" "}
          <a
            href={`https://wa.me/${BRAND.phoneDigits}`}
            target="_blank"
            rel="noreferrer"
            className="underline-wavy"
          >
            abra o WhatsApp aqui
          </a>
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-4 justify-center">
        <Link href="/">
          <Button>Voltar para o começo</Button>
        </Link>
        <Link href="/cardapio" className="font-sans text-[15px] text-carvao underline-wavy">
          Enquanto isso, veja o cardápio
        </Link>
      </div>

      <div className="mt-16 font-mono text-[11px] uppercase tracking-wider2 text-carvao/50">
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
