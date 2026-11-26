// Monta um link wa.me com a mensagem do agendamento pré-preenchida.
// Usado no modo "sem banco": o tutor envia o pedido direto para o
// WhatsApp do estabelecimento e o atendimento confirma manualmente.

import type { FullBooking } from "./schema";
import { SERVICE_OPTIONS, SIZE_LABELS, COAT_LABELS, totalFor } from "./schema";
import { parseDateISO, formatFull } from "./availability";
import { brl, BRAND } from "@/lib/utils";

export function buildBookingWhatsappMessage(b: FullBooking): string {
  const services = b.serviceIds
    .map((id) => SERVICE_OPTIONS.find((s) => s.id === id)?.name)
    .filter(Boolean) as string[];

  const total = totalFor(b.serviceIds, b.size, b.coat);
  const dateLabel = formatFull(parseDateISO(b.date));

  const lines = [
    "Olá, Cabana! 🐾",
    "",
    "Gostaria de agendar um horário:",
    "",
    `*Pet:* ${b.petName}`,
    `  ${b.species === "cao" ? "Cão" : "Gato"} · porte ${SIZE_LABELS[b.size]} · pelo ${COAT_LABELS[b.coat].toLowerCase()}`,
    `  ${b.firstTime ? "Primeira vez na Cabana" : "Já visitou antes"}`,
    "",
    `*Serviço:* ${services.join(" + ")}`,
    `*Dia:* ${dateLabel}`,
    `*Horário:* ${b.time}`,
    `*Valor estimado:* ${brl(total)}`,
    ""
  ];

  if (b.notes) {
    lines.push(`*Observações:* ${b.notes}`, "");
  }

  lines.push(
    "···",
    `Tutor: ${b.tutorName}`,
    `WhatsApp: ${b.phone}`
  );
  if (b.email) lines.push(`E-mail: ${b.email}`);
  if (b.source) lines.push(`Conheci por: ${b.source}`);

  return lines.join("\n");
}

export function buildBookingWhatsappUrl(b: FullBooking): string {
  const message = buildBookingWhatsappMessage(b);
  return `https://wa.me/${BRAND.phoneDigits}?text=${encodeURIComponent(message)}`;
}
