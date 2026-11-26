// Integração Z-API (WhatsApp Business para Brasil).
// Docs: https://developer.z-api.io
//
// Para produção configure ZAPI_INSTANCE_ID, ZAPI_TOKEN e ZAPI_CLIENT_TOKEN.
// Em desenvolvimento sem chaves, apenas loga e retorna sucesso simulado.

type SendOpts = {
  phone: string; // digits only, e.g. "5519999999999"
  message: string;
};

const INSTANCE = process.env.ZAPI_INSTANCE_ID;
const TOKEN = process.env.ZAPI_TOKEN;
const CLIENT_TOKEN = process.env.ZAPI_CLIENT_TOKEN;

export async function sendWhatsApp({ phone, message }: SendOpts) {
  const digits = phone.replace(/\D/g, "");
  if (!INSTANCE || !TOKEN || !CLIENT_TOKEN) {
    console.info("[whatsapp:stub]", digits, message.slice(0, 80));
    return { ok: true, stubbed: true as const };
  }

  const url = `https://api.z-api.io/instances/${INSTANCE}/token/${TOKEN}/send-text`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Token": CLIENT_TOKEN
    },
    body: JSON.stringify({ phone: digits, message })
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export function bookingConfirmationMessage(opts: {
  tutorName: string;
  petName: string;
  dateLabel: string;
  time: string;
  services: string[];
  totalBRL: string;
}) {
  const first = opts.tutorName.split(" ")[0];
  return [
    `Oi ${first}, aqui é da Cabana ☕️🐾`,
    "",
    `Seu horário para *${opts.petName}* está confirmado:`,
    `• ${opts.dateLabel} às ${opts.time}`,
    `• ${opts.services.join(" + ")}`,
    `• Valor estimado: ${opts.totalBRL}`,
    "",
    `Rua José Gabeta, 522 — Vila Paraíso.`,
    `Se precisar remarcar é só responder esta mensagem.`,
    "",
    `Até lá.`
  ].join("\n");
}
