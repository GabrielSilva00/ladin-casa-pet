// Google Calendar (service account) — stub.
// Para ativar, decodifique GOOGLE_SERVICE_ACCOUNT_JSON_B64 e use googleapis.
// Aqui deixamos a interface pronta e um stub que apenas loga.

type CreateEvent = {
  summary: string;
  description?: string;
  startISO: string;
  endISO: string;
  attendees?: { email: string }[];
};

export async function createCalendarEvent(evt: CreateEvent): Promise<{ id: string | null }> {
  const id = process.env.GOOGLE_CALENDAR_ID;
  const sa = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64;
  if (!id || !sa) {
    console.info("[calendar:stub]", evt.summary, evt.startISO);
    return { id: null };
  }

  // IMPLEMENTAÇÃO REAL (habilitar quando googleapis estiver instalado):
  //
  // const { google } = await import("googleapis");
  // const creds = JSON.parse(Buffer.from(sa, "base64").toString("utf8"));
  // const auth = new google.auth.JWT(creds.client_email, undefined, creds.private_key, [
  //   "https://www.googleapis.com/auth/calendar"
  // ]);
  // const calendar = google.calendar({ version: "v3", auth });
  // const created = await calendar.events.insert({
  //   calendarId: id,
  //   requestBody: {
  //     summary: evt.summary,
  //     description: evt.description,
  //     start: { dateTime: evt.startISO, timeZone: "America/Sao_Paulo" },
  //     end:   { dateTime: evt.endISO,   timeZone: "America/Sao_Paulo" },
  //     attendees: evt.attendees
  //   }
  // });
  // return { id: created.data.id ?? null };

  return { id: null };
}
