// Integração Resend — https://resend.com
// Em desenvolvimento sem RESEND_API_KEY, apenas loga.

type SendOpts = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM ?? "Cabana Pet Café <ola@cabanapetcafe.com.br>";

export async function sendEmail({ to, subject, html, replyTo }: SendOpts) {
  if (!API_KEY) {
    console.info("[email:stub]", to, subject);
    return { ok: true, stubbed: true as const };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from: FROM, to, subject, html, reply_to: replyTo })
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export function bookingConfirmationEmail(opts: {
  tutorName: string;
  petName: string;
  dateLabel: string;
  time: string;
  services: string[];
  totalBRL: string;
}) {
  const brand = "#B8502E";
  return `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8" /><title>Confirmação — Cabana Pet Café</title></head>
<body style="margin:0;background:#F4EDE0;font-family:Georgia,serif;color:#1A1512">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${brand}">
      Cabana Pet Café · Vila Paraíso
    </div>
    <h1 style="font-size:36px;line-height:1.1;margin:16px 0 24px;font-weight:400">
      ${opts.petName} tem horário marcado.
    </h1>
    <p style="font-family:system-ui;font-size:15px;line-height:1.6;color:#1A1512cc;margin:0 0 24px">
      Olá ${opts.tutorName}, confirmamos o seu agendamento. Guarda esse e-mail — se precisar remarcar, é só responder.
    </p>
    <table style="width:100%;border-collapse:collapse;font-family:system-ui;font-size:14px">
      <tr><td style="padding:10px 0;color:#1A151288;width:40%">Quando</td><td style="padding:10px 0">${opts.dateLabel} às ${opts.time}</td></tr>
      <tr><td style="padding:10px 0;color:#1A151288;border-top:1px solid #1A151220">Serviços</td><td style="padding:10px 0;border-top:1px solid #1A151220">${opts.services.join(" + ")}</td></tr>
      <tr><td style="padding:10px 0;color:#1A151288;border-top:1px solid #1A151220">Valor estimado</td><td style="padding:10px 0;border-top:1px solid #1A151220">${opts.totalBRL}</td></tr>
      <tr><td style="padding:10px 0;color:#1A151288;border-top:1px solid #1A151220">Onde</td><td style="padding:10px 0;border-top:1px solid #1A151220">Rua José Gabeta, 522 — Vila Paraíso, Campinas/SP</td></tr>
    </table>
    <p style="font-family:system-ui;font-size:13px;color:#1A151288;margin-top:36px">
      Até lá — o café já está moído.
    </p>
  </div>
</body>
</html>`;
}
