import { NextResponse } from "next/server";
import { format } from "date-fns";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const date = url.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "data inválida" }, { status: 400 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ taken: [] });
  }

  try {
    const sb = supabaseAdmin();
    const from = `${date}T00:00:00-03:00`;
    const to = `${date}T23:59:59-03:00`;

    const [{ data: bookings }, { data: blocks }] = await Promise.all([
      sb.from("bookings").select("scheduled_at,duration_min,status").gte("scheduled_at", from).lte("scheduled_at", to).neq("status", "cancelled"),
      sb.from("availability_blocks").select("starts_at,ends_at").gte("ends_at", from).lte("starts_at", to)
    ]);

    const taken: string[] = [];
    (bookings ?? []).forEach((b) => {
      const start = new Date(b.scheduled_at as string);
      const slots = Math.ceil((b.duration_min as number) / 30);
      for (let i = 0; i < slots; i++) {
        const t = new Date(start.getTime() + i * 30 * 60_000);
        if (format(t, "yyyy-MM-dd") === date) {
          taken.push(format(t, "HH:mm"));
        }
      }
    });
    (blocks ?? []).forEach((bl) => {
      let t = new Date(bl.starts_at as string);
      const until = new Date(bl.ends_at as string);
      while (t < until) {
        if (format(t, "yyyy-MM-dd") === date) {
          taken.push(format(t, "HH:mm"));
        }
        t = new Date(t.getTime() + 30 * 60_000);
      }
    });

    return NextResponse.json({ taken: Array.from(new Set(taken)) });
  } catch (err) {
    console.error("[availability] error", err);
    return NextResponse.json({ taken: [] });
  }
}
