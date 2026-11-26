import { z } from "zod";

export const SPECIES = ["cao", "gato"] as const;
export const SIZES = ["mini", "pequeno", "medio", "grande", "gigante"] as const;
export const COATS = ["curta", "media", "longa", "dupla"] as const;

export const SIZE_LABELS: Record<(typeof SIZES)[number], string> = {
  mini: "Mini",
  pequeno: "Pequeno",
  medio: "Médio",
  grande: "Grande",
  gigante: "Gigante"
};
export const COAT_LABELS: Record<(typeof COATS)[number], string> = {
  curta: "Curta",
  media: "Média",
  longa: "Longa",
  dupla: "Dupla"
};

export const petSchema = z.object({
  petName: z.string().min(2, "Nome muito curto"),
  species: z.enum(SPECIES, { message: "Escolha espécie" }),
  size: z.enum(SIZES, { message: "Escolha o porte" }),
  coat: z.enum(COATS, { message: "Escolha a pelagem" }),
  firstTime: z.boolean().default(false)
});
export type PetStep = z.infer<typeof petSchema>;

export const servicesSchema = z.object({
  serviceIds: z.array(z.string()).min(1, "Escolha ao menos um serviço")
});
export type ServicesStep = z.infer<typeof servicesSchema>;

export const scheduleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Escolha uma data"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Escolha um horário")
});
export type ScheduleStep = z.infer<typeof scheduleSchema>;

const PHONE_RE = /^\+?\d{2}\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const tutorSchema = z.object({
  tutorName: z.string().min(2, "Precisa do seu nome"),
  phone: z
    .string()
    .trim()
    .refine((v) => PHONE_RE.test(v) || v.replace(/\D/g, "").length >= 10, "WhatsApp inválido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  notes: z.string().max(500).optional().or(z.literal("")),
  source: z.enum(["instagram", "google", "indicacao", "passando", "outro"]).optional()
});
export type TutorStep = z.infer<typeof tutorSchema>;

export const fullBookingSchema = petSchema
  .and(servicesSchema)
  .and(scheduleSchema)
  .and(tutorSchema);
export type FullBooking = z.infer<typeof fullBookingSchema>;

// Serviços disponíveis (mirrors services table seed)
export type ServiceOption = {
  id: string;
  name: string;
  durationMin: number;
  priceByCoatSize: Partial<Record<`${(typeof SIZES)[number]}-${(typeof COATS)[number]}`, number>>;
  basePriceCents: number;
  parallel: boolean;
  blurb: string;
  img: string;
};

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "banho",
    name: "Banho",
    durationMin: 60,
    basePriceCents: 8500,
    parallel: true,
    blurb: "Água morna, produtos hipoalergênicos, toalha quente.",
    img: "/images/service-banho.jpg",
    priceByCoatSize: {
      "mini-curta": 7500, "mini-media": 8500, "mini-longa": 9500, "mini-dupla": 9500,
      "pequeno-curta": 8500, "pequeno-media": 9500, "pequeno-longa": 10500, "pequeno-dupla": 10500,
      "medio-curta": 9500, "medio-media": 10500, "medio-longa": 12000, "medio-dupla": 12500,
      "grande-curta": 11000, "grande-media": 12500, "grande-longa": 14000, "grande-dupla": 14500,
      "gigante-curta": 13500, "gigante-media": 15000, "gigante-longa": 17000, "gigante-dupla": 18000
    }
  },
  {
    id: "banho-tosa-higienica",
    name: "Banho + Tosa higiênica",
    durationMin: 90,
    basePriceCents: 11000,
    parallel: true,
    blurb: "Banho completo + acabamentos de higiene (patas, íntima, rosto).",
    img: "/images/service-tosa-hig.jpg",
    priceByCoatSize: {
      "mini-curta": 10000, "mini-media": 11000, "mini-longa": 12000, "mini-dupla": 12500,
      "pequeno-curta": 11000, "pequeno-media": 12000, "pequeno-longa": 13500, "pequeno-dupla": 13500,
      "medio-curta": 12500, "medio-media": 13500, "medio-longa": 15500, "medio-dupla": 16000,
      "grande-curta": 14500, "grande-media": 16000, "grande-longa": 18000, "grande-dupla": 18500,
      "gigante-curta": 17500, "gigante-media": 19500, "gigante-longa": 22000, "gigante-dupla": 23000
    }
  },
  {
    id: "banho-tosa-completa",
    name: "Banho + Tosa completa",
    durationMin: 150,
    basePriceCents: 15500,
    parallel: false,
    blurb: "Tosa com máquina/tesoura conforme o pelo e porte do bicho.",
    img: "/images/service-tosa-full.jpg",
    priceByCoatSize: {
      "mini-curta": 14000, "mini-media": 15500, "mini-longa": 17000, "mini-dupla": 17500,
      "pequeno-curta": 15500, "pequeno-media": 17000, "pequeno-longa": 19000, "pequeno-dupla": 19500,
      "medio-curta": 17500, "medio-media": 19500, "medio-longa": 21500, "medio-dupla": 22500,
      "grande-curta": 20000, "grande-media": 22500, "grande-longa": 25000, "grande-dupla": 26000,
      "gigante-curta": 25000, "gigante-media": 28000, "gigante-longa": 32000, "gigante-dupla": 33500
    }
  },
  {
    id: "hidratacao",
    name: "Hidratação (add-on)",
    durationMin: 30,
    basePriceCents: 4500,
    parallel: true,
    blurb: "Máscara de hidratação com oleo de coco e vitamina E.",
    img: "/images/service-hidratacao.jpg",
    priceByCoatSize: {
      "mini-curta": 4000, "mini-media": 4500, "mini-longa": 5000, "mini-dupla": 5000,
      "pequeno-curta": 4500, "pequeno-media": 5000, "pequeno-longa": 5500, "pequeno-dupla": 5500,
      "medio-curta": 5000, "medio-media": 5500, "medio-longa": 6500, "medio-dupla": 6500,
      "grande-curta": 6000, "grande-media": 6500, "grande-longa": 7500, "grande-dupla": 8000,
      "gigante-curta": 7500, "gigante-media": 8500, "gigante-longa": 9500, "gigante-dupla": 10000
    }
  },
  {
    id: "unhas",
    name: "Corte de unhas",
    durationMin: 15,
    basePriceCents: 0,
    parallel: true,
    blurb: "Grátis com qualquer banho.",
    img: "/images/service-unhas.jpg",
    priceByCoatSize: {}
  }
];

export function priceFor(service: ServiceOption, size: (typeof SIZES)[number] | undefined, coat: (typeof COATS)[number] | undefined): number {
  if (!size || !coat) return service.basePriceCents;
  const key = `${size}-${coat}` as const;
  return service.priceByCoatSize[key] ?? service.basePriceCents;
}

export function totalFor(
  ids: string[],
  size: (typeof SIZES)[number] | undefined,
  coat: (typeof COATS)[number] | undefined
): number {
  return ids.reduce((sum, id) => {
    const s = SERVICE_OPTIONS.find((o) => o.id === id);
    if (!s) return sum;
    return sum + priceFor(s, size, coat);
  }, 0);
}

export function totalDurationMin(ids: string[]): number {
  const serv = ids.map((id) => SERVICE_OPTIONS.find((o) => o.id === id)).filter(Boolean) as ServiceOption[];
  if (serv.length === 0) return 0;
  const sorted = serv.sort((a, b) => b.durationMin - a.durationMin);
  const base = sorted[0].durationMin;
  const addons = sorted.slice(1).reduce((s, x) => s + (x.id === "unhas" ? 0 : x.durationMin), 0);
  return base + addons;
}
