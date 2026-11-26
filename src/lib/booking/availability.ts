import { addDays, format, parse, startOfDay, isSameDay, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";

export const WORK_HOURS = { start: "09:00", end: "18:00" };
export const SLOT_MINUTES = 30;
export const WORK_DAYS = [2, 3, 4, 5, 6]; // tue..sat

export function listNextDays(n: number, from = new Date()): Date[] {
  const start = startOfDay(from);
  return Array.from({ length: n }, (_, i) => addDays(start, i));
}

export function isWorkDay(d: Date) {
  return WORK_DAYS.includes(d.getDay());
}

export function slotsForDate(date: Date, taken: string[] = [], now = new Date()): { time: string; available: boolean }[] {
  if (!isWorkDay(date)) return [];
  const [sh, sm] = WORK_HOURS.start.split(":").map(Number);
  const [eh, em] = WORK_HOURS.end.split(":").map(Number);
  const slots: { time: string; available: boolean }[] = [];
  const cursor = new Date(date);
  cursor.setHours(sh, sm, 0, 0);
  const end = new Date(date);
  end.setHours(eh, em, 0, 0);
  while (cursor < end) {
    const t = format(cursor, "HH:mm");
    const slotDate = new Date(date);
    const [h, m] = t.split(":").map(Number);
    slotDate.setHours(h, m, 0, 0);
    const inPast = isSameDay(slotDate, now) && !isAfter(slotDate, now);
    slots.push({ time: t, available: !inPast && !taken.includes(t) });
    cursor.setMinutes(cursor.getMinutes() + SLOT_MINUTES);
  }
  return slots;
}

export function formatDayLabel(d: Date) {
  return format(d, "EEE", { locale: ptBR }); // ter
}
export function formatDayNumber(d: Date) {
  return format(d, "d");
}
export function formatMonth(d: Date) {
  return format(d, "MMM", { locale: ptBR }).replace(".", "");
}
export function formatFull(d: Date) {
  return format(d, "EEEE, d 'de' MMMM", { locale: ptBR });
}

export function parseDateISO(iso: string) {
  return parse(iso, "yyyy-MM-dd", new Date());
}
