import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function brl(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
}

export function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 13);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `+${digits.slice(0, 2)} (${digits.slice(2)}`;
  if (digits.length <= 9) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4)}`;
  return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const BRAND = {
  name: "Cabana Pet Café",
  short: "Cabana",
  address: "Rua José Gabeta, 522",
  neighborhood: "Vila Paraíso",
  city: "Campinas",
  state: "SP",
  phone: "+55 19 3199-1405",
  phoneDigits: "551931991405",
  email: "contato@cabanapetcafe.com.br",
  instagram: "@cabanapetcafe",
  instagramUrl: "https://instagram.com/cabanapetcafe",
  openHours: "Terça a Sábado · 09:00–18:00",
  closed: "Fechamos domingo e segunda (pra descansar junto)",
  foundedYear: 2024,
  coords: { lat: -22.9015, lng: -47.0612 }
} as const;
