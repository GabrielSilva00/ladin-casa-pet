"use client";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Chip";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[70vh] grid place-items-center bg-osso p-6 text-center">
      <div>
        <Eyebrow>500</Eyebrow>
        <h1 className="mt-4 font-display text-h1 text-carvao text-balance">
          Alguma coisa escapou.
        </h1>
        <p className="mt-6 max-w-[42ch] mx-auto font-sans text-[17px] text-carvao/70">
          Nossa equipe já foi avisada. Enquanto isso, tente de novo.
        </p>
        <Button onClick={reset} className="mt-10">Tentar de novo</Button>
      </div>
    </div>
  );
}
