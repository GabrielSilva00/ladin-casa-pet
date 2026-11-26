import { NextResponse } from "next/server";
import { fullBookingSchema, SERVICE_OPTIONS, totalDurationMin, totalFor } from "@/lib/booking/schema";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { sendWhatsApp, bookingConfirmationMessage } from "@/lib/integrations/whatsapp";
import { sendEmail, bookingConfirmationEmail } from "@/lib/integrations/email";
import { createCalendarEvent } from "@/lib/integrations/calendar";
import { parseDateISO, formatFull } from "@/lib/booking/availability";
import { brl } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = fullBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", issues: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;
  const duration = totalDurationMin(data.serviceIds);
  const total = totalFor(data.serviceIds, data.size, data.coat);
  const startISO = `${data.date}T${data.time}:00-03:00`;
  const start = new Date(startISO);
  const end = new Date(start.getTime() + duration * 60_000);
  const serviceNames = data.serviceIds
    .map((id) => SERVICE_OPTIONS.find((s) => s.id === id)?.name)
    .filter(Boolean) as string[];

  let bookingId: string | null = null;

  if (isSupabaseConfigured) {
    try {
      const sb = supabaseAdmin();

      // upsert client by phone
      const phoneDigits = data.phone.replace(/\D/g, "");
      const { data: client, error: clientErr } = await sb
        .from("clients")
        .upsert(
          { name: data.tutorName, phone: phoneDigits, email: data.email || null, source: data.source ?? null, notes: data.notes || null },
          { onConflict: "phone" }
        )
        .select()
        .single();
      if (clientErr) throw clientErr;

      // upsert pet by client + name
      const { data: existingPet } = await sb
        .from("pets")
        .select("*")
        .eq("client_id", client.id)
        .eq("name", data.petName)
        .maybeSingle();

      let pet = existingPet;
      if (!pet) {
        const { data: created, error } = await sb
          .from("pets")
          .insert({
            client_id: client.id,
            name: data.petName,
            species: data.species,
            size: data.size,
            coat: data.coat
          })
          .select()
          .single();
        if (error) throw error;
        pet = created;
      }

      const { data: booking, error: bookingErr } = await sb
        .from("bookings")
        .insert({
          pet_id: pet!.id,
          client_id: client.id,
          service_ids: data.serviceIds,
          scheduled_at: startISO,
          duration_min: duration,
          total_price_cents: total,
          notes: data.notes || null,
          status: "confirmed"
        })
        .select()
        .single();
      if (bookingErr) throw bookingErr;
      bookingId = booking.id;

      // calendar
      const { id: eventId } = await createCalendarEvent({
        summary: `${data.petName} · ${serviceNames.join(" + ")}`,
        description: `${data.tutorName} — ${phoneDigits}\n${data.notes ?? ""}`,
        startISO,
        endISO: end.toISOString()
      });
      if (eventId) {
        await sb.from("bookings").update({ external_calendar_event_id: eventId }).eq("id", booking.id);
      }
    } catch (err) {
      console.error("[bookings] supabase error", err);
      return NextResponse.json({ error: "Falha ao registrar agendamento" }, { status: 500 });
    }
  }

  // Confirmações (whatsapp + email). Em modo stub, apenas log.
  const dateLabel = formatFull(parseDateISO(data.date));

  await sendWhatsApp({
    phone: data.phone.replace(/\D/g, ""),
    message: bookingConfirmationMessage({
      tutorName: data.tutorName,
      petName: data.petName,
      dateLabel,
      time: data.time,
      services: serviceNames,
      totalBRL: brl(total)
    })
  });

  if (data.email) {
    await sendEmail({
      to: data.email,
      subject: "Seu horário no Cabana está confirmado",
      html: bookingConfirmationEmail({
        tutorName: data.tutorName,
        petName: data.petName,
        dateLabel,
        time: data.time,
        services: serviceNames,
        totalBRL: brl(total)
      })
    });
  }

  return NextResponse.json({ ok: true, id: bookingId });
}
