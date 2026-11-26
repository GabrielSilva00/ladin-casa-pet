import * as React from "react";
import { cn } from "@/lib/utils";

export function Chip({
  children,
  active,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider2",
        active
          ? "border-terracota bg-terracota text-osso"
          : "border-terracota/60 text-carvao bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[11px] uppercase tracking-wider2 text-terracota",
        className
      )}
    >
      ({children})
    </span>
  );
}
