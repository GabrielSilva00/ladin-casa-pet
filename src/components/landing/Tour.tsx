"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Chip";
import { TOUR } from "@/content/site";

export function Tour() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="cabana" className="py-section bg-noite text-osso">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow className="text-mate">O lugar</Eyebrow>
            <h2 className="mt-4 font-display text-h1 text-osso text-balance">
              Entre,{" "}
              <em className="italic" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>fique,</em>{" "}
              respire.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="h-11 w-11 rounded-full border border-osso/40 text-osso transition-colors hover:bg-terracota hover:border-terracota"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="h-11 w-11 rounded-full border border-osso/40 text-osso transition-colors hover:bg-terracota hover:border-terracota"
              aria-label="Próximo"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-14 flex gap-6 overflow-x-auto scroll-snap-x pb-6 pl-[max(1.25rem,calc((100vw-1360px)/2+1.25rem))] pr-5"
        style={{ scrollbarWidth: "none" }}
      >
        {TOUR.map((item, i) => (
          <figure
            key={item.src}
            className="shrink-0 w-[min(80vw,520px)]"
            style={{ aspectRatio: item.ratio }}
          >
            <div className="relative h-full w-full overflow-hidden corner-chamfer-sm bg-clorofila/20 warm-filter film-grain">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.src})` }}
                aria-hidden
              />
              <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider2 text-osso/80">
                {String(i + 1).padStart(2, "0")} / {String(TOUR.length).padStart(2, "0")}
              </span>
            </div>
            <figcaption className="mt-3 pl-3 border-l-2 border-terracota font-mono text-[11px] uppercase tracking-wider2 text-osso/70">
              {item.caption}
            </figcaption>
          </figure>
        ))}
        <div className="shrink-0 w-6" aria-hidden />
      </div>
    </section>
  );
}
