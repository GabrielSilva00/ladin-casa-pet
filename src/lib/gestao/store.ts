"use client";

import { useEffect, useState, useCallback } from "react";

export type GestaoStatus = "aguardando" | "em_banho" | "finalizado";

export type GestaoBooking = {
  id: string;
  petName: string;
  species: "cao" | "gato";
  size: string;
  coat?: string;
  tutorName: string;
  phone: string;
  serviceName: string;
  scheduledAt: string; // ISO
  durationMin: number;
  totalPriceCents: number;
  status: GestaoStatus;
  notes?: string;
  createdAt: string;
};

const KEY = "cabana.gestao.v1";
const EVT = "cabana:gestao:update";

export function readAllBookings(): GestaoBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeAllBookings(list: GestaoBooking[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {
    /* quota */
  }
}

function readAll() { return readAllBookings(); }
function writeAll(list: GestaoBooking[]) { writeAllBookings(list); }

// chamada síncrona (fora de hook): grava um booking novo
export function createBooking(b: Omit<GestaoBooking, "id" | "createdAt" | "status"> & { status?: GestaoStatus }): GestaoBooking {
  const next: GestaoBooking = {
    ...b,
    id: `b_${Math.random().toString(36).slice(2, 10)}`,
    createdAt: new Date().toISOString(),
    status: b.status ?? "aguardando"
  };
  writeAllBookings([next, ...readAllBookings()]);
  return next;
}

export function useBookings() {
  const [bookings, setBookings] = useState<GestaoBooking[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setBookings(readAll());
    setReady(true);
    const onUpdate = () => setBookings(readAll());
    window.addEventListener("cabana:gestao:update", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("cabana:gestao:update", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const persist = useCallback((next: GestaoBooking[]) => {
    setBookings(next);
    writeAll(next);
  }, []);

  const add = useCallback(
    (b: Omit<GestaoBooking, "id" | "createdAt" | "status"> & { status?: GestaoStatus }) => {
      const now = new Date().toISOString();
      const next: GestaoBooking = {
        ...b,
        id: `b_${Math.random().toString(36).slice(2, 10)}`,
        createdAt: now,
        status: b.status ?? "aguardando"
      };
      persist([next, ...readAll()]);
      return next;
    },
    [persist]
  );

  const update = useCallback((id: string, patch: Partial<GestaoBooking>) => {
    const next = readAll().map((x) => (x.id === id ? { ...x, ...patch } : x));
    persist(next);
  }, [persist]);

  const remove = useCallback((id: string) => {
    persist(readAll().filter((x) => x.id !== id));
  }, [persist]);

  const seed = useCallback(() => {
    const today = new Date();
    const t = (h: number, m: number) => {
      const d = new Date(today);
      d.setHours(h, m, 0, 0);
      return d.toISOString();
    };
    const sample: GestaoBooking[] = [
      {
        id: "s1", createdAt: new Date().toISOString(),
        petName: "Nina", species: "cao", size: "pequeno", coat: "longa",
        tutorName: "Marina Oliveira", phone: "+55 19 99876-1234",
        serviceName: "Banho + Tosa higiênica", scheduledAt: t(10, 30),
        durationMin: 90, totalPriceCents: 13500, status: "aguardando"
      },
      {
        id: "s2", createdAt: new Date().toISOString(),
        petName: "Ben", species: "cao", size: "medio", coat: "curta",
        tutorName: "Pedro Castro", phone: "+55 19 99500-7788",
        serviceName: "Banho + Hidratação", scheduledAt: t(11, 0),
        durationMin: 90, totalPriceCents: 14000, status: "em_banho"
      },
      {
        id: "s3", createdAt: new Date().toISOString(),
        petName: "Flor", species: "cao", size: "pequeno", coat: "media",
        tutorName: "Rodrigo Nunes", phone: "+55 19 99122-4411",
        serviceName: "Banho", scheduledAt: t(9, 30),
        durationMin: 60, totalPriceCents: 9500, status: "finalizado"
      },
      {
        id: "s4", createdAt: new Date().toISOString(),
        petName: "Otávio", species: "cao", size: "grande", coat: "dupla",
        tutorName: "Camila Prado", phone: "+55 19 99833-2020",
        serviceName: "Banho + Tosa completa", scheduledAt: t(14, 0),
        durationMin: 150, totalPriceCents: 26000, status: "aguardando"
      }
    ];
    persist(sample);
  }, [persist]);

  const reset = useCallback(() => persist([]), [persist]);

  return { bookings, ready, add, update, remove, seed, reset };
}
