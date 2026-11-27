"use client";

import { useRef } from "react";
import { TOUR } from "@/content/site";

export function Tour() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="cabana" className="py-section bg-tinta text-creme">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-eyebrow on-dark">O lugar</span>
            <h2 className="mt-4 font-display text-h2 text-creme whitespace-nowrap">
              Entre, <em className="italic">fique</em>, respire.
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="h-10 w-10 rounded-full border border-creme/40 text-creme transition-all hover:bg-tijolo hover:border-tijolo"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="h-10 w-10 rounded-full border border-creme/40 text-creme transition-all hover:bg-tijolo hover:border-tijolo"
              aria-label="Próximo"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-12 flex gap-5 overflow-x-auto scroll-snap-x pb-6 pl-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))] pr-5"
        style={{ scrollbarWidth: "none" }}
      >
        {TOUR.map((item, i) => (
          <figure
            key={item.src}
            className="shrink-0 w-[min(78vw,420px)] aspect-[3/4]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-soft bg-musgo/20 warm-filter">
              <div
                className="bg-img absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.src})` }}
                aria-hidden
              />
              <span className="absolute top-3 left-3 inline-flex items-center h-6 px-2 rounded-full bg-tinta/70 backdrop-blur font-sans text-[10px] uppercase font-semibold tracking-[0.14em] text-creme/90">
                {String(i + 1).padStart(2, "0")} / {String(TOUR.length).padStart(2, "0")}
              </span>
            </div>
            <figcaption className="mt-3 pl-3 border-l-2 border-tijolo font-sans text-[13px] text-creme/80">
              {item.caption}
            </figcaption>
          </figure>
        ))}
        <div className="shrink-0 w-6" aria-hidden />
      </div>
    </section>
  );
}
