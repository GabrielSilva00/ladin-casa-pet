import { format, startOfDay, endOfDay, addDays, subDays } from "date-fns";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

export type BookingRow = {
  id: string;
  scheduled_at: string;
  duration_min: number;
  status: string;
  total_price_cents: number;
  service_ids: string[];
  notes: string | null;
  pet: { id: string; name: string; species: string; size: string; coat: string } | null;
  client: { id: string; name: string; phone: string; email: string | null } | null;
};

export async function listTodayBookings(): Promise<BookingRow[]> {
  if (!isSupabaseConfigured) return [];
  const sb = supabaseAdmin();
  const from = startOfDay(new Date()).toISOString();
  const to = endOfDay(new Date()).toISOString();
  const { data, error } = await sb
    .from("bookings")
    .select("id, scheduled_at, duration_min, status, total_price_cents, service_ids, notes, pet:pet_id(id,name,species,size,coat), client:client_id(id,name,phone,email)")
    .gte("scheduled_at", from)
    .lte("scheduled_at", to)
    .order("scheduled_at", { ascending: true });
  if (error) throw error;
  return (data as unknown as BookingRow[]) ?? [];
}

export async function listWeekBookings(anchor = new Date()): Promise<BookingRow[]> {
  if (!isSupabaseConfigured) return [];
  const sb = supabaseAdmin();
  const from = startOfDay(subDays(anchor, 3)).toISOString();
  const to = endOfDay(addDays(anchor, 10)).toISOString();
  const { data, error } = await sb
    .from("bookings")
    .select("id, scheduled_at, duration_min, status, total_price_cents, service_ids, notes, pet:pet_id(id,name,species,size,coat), client:client_id(id,name,phone,email)")
    .gte("scheduled_at", from)
    .lte("scheduled_at", to)
    .order("scheduled_at", { ascending: true });
  if (error) throw error;
  return (data as unknown as BookingRow[]) ?? [];
}

export async function listClients() {
  if (!isSupabaseConfigured) return [];
  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from("clients")
    .select("id,name,phone,email,source,notes,created_at, pets!client_id(id,name,species,size,coat), bookings!client_id(id,scheduled_at,status)")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return data ?? [];
}

export async function listServices() {
  if (!isSupabaseConfigured) return [];
  const sb = supabaseAdmin();
  const { data } = await sb.from("services").select("*").order("duration_min");
  return data ?? [];
}

export async function listMenuItems() {
  if (!isSupabaseConfigured) return [];
  const sb = supabaseAdmin();
  const { data } = await sb.from("menu_items").select("*").order("sort_order");
  return data ?? [];
}

export async function listBlocks() {
  if (!isSupabaseConfigured) return [];
  const sb = supabaseAdmin();
  const { data } = await sb.from("availability_blocks").select("*").order("starts_at", { ascending: false }).limit(50);
  return data ?? [];
}

export async function getSettings() {
  if (!isSupabaseConfigured) return {};
  const sb = supabaseAdmin();
  const { data } = await sb.from("settings").select("key,value");
  return Object.fromEntries((data ?? []).map((row) => [row.key, row.value])) as Record<string, unknown>;
}

export async function weeklyStats() {
  if (!isSupabaseConfigured) return { byDay: [], bySource: [], topService: [], revenueCents: 0, bookings: 0 };
  const sb = supabaseAdmin();
  const since = subDays(new Date(), 28).toISOString();
  const { data } = await sb
    .from("bookings")
    .select("scheduled_at,total_price_cents,service_ids,client:client_id(source)")
    .gte("scheduled_at", since);
  type Row = {
    scheduled_at: string;
    total_price_cents: number;
    service_ids: string[];
    client: { source: string | null } | { source: string | null }[] | null;
  };
  const rows = (data ?? []) as unknown as Row[];
  const byDay = new Map<string, number>();
  const bySource = new Map<string, number>();
  const byService = new Map<string, number>();
  let revenue = 0;
  rows.forEach((r) => {
    const day = format(new Date(r.scheduled_at), "yyyy-MM-dd");
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
    revenue += r.total_price_cents ?? 0;
    const clientNode = Array.isArray(r.client) ? r.client[0] : r.client;
    const src = clientNode?.source ?? "outro";
    bySource.set(src, (bySource.get(src) ?? 0) + 1);
    (r.service_ids ?? []).forEach((id) => byService.set(id, (byService.get(id) ?? 0) + 1));
  });
  return {
    byDay: Array.from(byDay.entries()).sort().map(([date, count]) => ({ date, count })),
    bySource: Array.from(bySource.entries()).map(([source, count]) => ({ source, count })),
    topService: Array.from(byService.entries()).sort((a, b) => b[1] - a[1]).map(([service, count]) => ({ service, count })),
    revenueCents: revenue,
    bookings: rows.length
  };
}
