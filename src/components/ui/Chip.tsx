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
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]",
        active
          ? "border-tijolo bg-tijolo text-creme"
          : "border-tinta/25 text-tinta bg-transparent",
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
        "inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-tijolo",
        className
      )}
    >
      {children}
    </span>
  );
}
