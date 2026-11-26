"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tutorSchema, type TutorStep } from "@/lib/booking/schema";
import { InputField, TextareaField } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";
import { useBooking } from "./BookingContext";
import { formatPhone, cn } from "@/lib/utils";

const SOURCES = [
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "indicacao", label: "Indicação" },
  { value: "passando", label: "Passando na rua" },
  { value: "outro", label: "Outro" }
] as const;

export function StepTutor() {
  const { state, setTutor, goto } = useBooking();
  const {
    register, handleSubmit, watch, setValue, formState: { errors, isValid }
  } = useForm<TutorStep>({
    resolver: zodResolver(tutorSchema),
    mode: "onChange",
    defaultValues: {
      tutorName: state.tutorName ?? "",
      phone: state.phone ?? "",
      email: state.email ?? "",
      notes: state.notes ?? "",
      source: state.source
    }
  });

  const source = watch("source");

  return (
    <form onSubmit={handleSubmit(setTutor)} className="space-y-10">
      <header>
        <Eyebrow>Passo 04 · Sobre você</Eyebrow>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.025em] text-carvao text-balance">
          Para avisar quando estiver pronto.
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField
          label="Seu nome"
          placeholder="Marina Oliveira"
          error={errors.tutorName?.message}
          {...register("tutorName")}
        />
        <InputField
          label="WhatsApp"
          placeholder="+55 (19) 99999-9999"
          error={errors.phone?.message}
          {...register("phone", {
            onChange: (e) => (e.target.value = formatPhone(e.target.value))
          })}
        />
        <InputField
          label="Email (opcional)"
          placeholder="marina@exemplo.com"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="pt-7">
          <div className="pb-3 font-sans text-[11px] uppercase tracking-[0.14em] text-terracota font-medium">
            Como conheceu a gente?
          </div>
          <div className="flex flex-wrap gap-2">
            {SOURCES.map((s) => {
              const active = source === s.value;
              return (
                <button
                  type="button"
                  key={s.value}
                  onClick={() => setValue("source", s.value, { shouldValidate: true })}
                  className={cn(
                    "rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium transition-all active:scale-[0.97]",
                    active ? "border-terracota bg-terracota text-osso" : "border-carvao/20 text-carvao hover:border-terracota"
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <TextareaField
        label="Observações (alergias, medos, cuidados especiais)"
        placeholder="Ele é um pouco tímido com secador."
        error={errors.notes?.message}
        {...register("notes")}
      />

      <div className="flex items-center justify-between gap-3 pt-6">
        <Button variant="ghost" type="button" onClick={() => goto("schedule")}>Voltar</Button>
        <Button type="submit" disabled={!isValid}>Continuar</Button>
      </div>
    </form>
  );
}
