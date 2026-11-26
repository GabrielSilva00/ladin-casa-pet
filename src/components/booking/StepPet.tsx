"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, type PetStep, SIZES, COATS, SIZE_LABELS, COAT_LABELS, SPECIES } from "@/lib/booking/schema";
import { InputField, PillGroup } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";
import { useBooking } from "./BookingContext";

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
        <h1 className="mt-3 font-display text-h2 text-carvao text-balance">
          Conta pra gente sobre o seu bicho.
        </h1>
        <p className="mt-3 font-sans text-[15px] text-carvao/70 max-w-[50ch]">
          Isso ajuda a preparar o banho certo — shampoo adequado, tempo correto, equipe pronta.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputField
          label="Nome do pet"
          placeholder="Rex, Nina, Toby…"
          error={errors.petName?.message}
          {...register("petName")}
        />

        <div className="pt-6">
          <div className="pb-3 font-mono text-[11px] uppercase tracking-wider2 text-terracota">
            Primeira vez na Cabana?
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setValue("firstTime", true, { shouldValidate: true })}
              className={`rounded-full border px-4 py-2 font-sans text-[13px] transition-all ${firstTime ? "border-terracota bg-terracota text-osso" : "border-carvao/30 text-carvao"}`}
            >
              Sim, é a primeira
            </button>
            <button
              type="button"
              onClick={() => setValue("firstTime", false, { shouldValidate: true })}
              className={`rounded-full border px-4 py-2 font-sans text-[13px] transition-all ${!firstTime ? "border-terracota bg-terracota text-osso" : "border-carvao/30 text-carvao"}`}
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
