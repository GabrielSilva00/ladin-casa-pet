"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, type PetStep, SIZES, COATS, SIZE_LABELS, COAT_LABELS, SPECIES } from "@/lib/booking/schema";
import { InputField, PillGroup } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";
import { useBooking } from "./BookingContext";
import { cn } from "@/lib/utils";

export function StepPet() {
  const { state, setPet } = useBooking();
  const {
    register, handleSubmit, watch, setValue, formState: { errors, isValid }
  } = useForm<PetStep>({
    resolver: zodResolver(petSchema),
    mode: "onChange",
    defaultValues: {
      petName: state.petName ?? "",
      species: state.species,
      size: state.size,
      coat: state.coat,
      firstTime: state.firstTime ?? false
    }
  });

  const species = watch("species");
  const size = watch("size");
  const coat = watch("coat");
  const firstTime = watch("firstTime");

  return (
    <form onSubmit={handleSubmit(setPet)} className="space-y-10">
      <header>
        <Eyebrow>Passo 01 · Quem é</Eyebrow>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.025em] text-carvao text-balance">
          Conte sobre o seu bicho.
        </h1>
        <p className="mt-3 font-sans text-[15px] text-carvao/70 max-w-[50ch]">
          Ajuda a gente a preparar o banho certo. Shampoo adequado, tempo correto, equipe pronta.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField
          label="Nome do pet"
          placeholder="Rex, Nina, Toby..."
          error={errors.petName?.message}
          {...register("petName")}
        />

        <div className="pt-7">
          <div className="pb-3 font-sans text-[11px] uppercase tracking-[0.14em] text-terracota font-medium">
            Primeira vez na Cabana?
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setValue("firstTime", true, { shouldValidate: true })}
              className={cn(
                "rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium transition-all active:scale-[0.97]",
                firstTime ? "border-terracota bg-terracota text-osso" : "border-carvao/20 text-carvao hover:border-terracota"
              )}
            >
              Sim, é a primeira
            </button>
            <button
              type="button"
              onClick={() => setValue("firstTime", false, { shouldValidate: true })}
              className={cn(
                "rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium transition-all active:scale-[0.97]",
                !firstTime ? "border-terracota bg-terracota text-osso" : "border-carvao/20 text-carvao hover:border-terracota"
              )}
            >
              Já veio antes
            </button>
          </div>
        </div>
      </div>

      <PillGroup
        label="Espécie"
        options={SPECIES.map((s) => ({ value: s, label: s === "cao" ? "Cão" : "Gato" }))}
        value={species}
        onChange={(v) => setValue("species", v, { shouldValidate: true })}
        error={errors.species?.message}
      />

      <PillGroup
        label="Porte"
        options={SIZES.map((v) => ({ value: v, label: SIZE_LABELS[v] }))}
        value={size}
        onChange={(v) => setValue("size", v, { shouldValidate: true })}
        error={errors.size?.message}
      />

      <PillGroup
        label="Tipo de pelagem"
        options={COATS.map((v) => ({ value: v, label: COAT_LABELS[v] }))}
        value={coat}
        onChange={(v) => setValue("coat", v, { shouldValidate: true })}
        error={errors.coat?.message}
      />

      <div className="pt-6 flex justify-end">
        <Button type="submit" disabled={!isValid}>Continuar</Button>
      </div>
    </form>
  );
}
