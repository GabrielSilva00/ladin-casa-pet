import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  chamfered = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { chamfered?: boolean }) {
  return (
    <div
      className={cn(
        "relative bg-osso border border-carvao/10 shadow-card",
        chamfered && "corner-chamfer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Rule({ className, length = "40px", vertical = false }: { className?: string; length?: string; vertical?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block bg-terracota", vertical ? "w-px" : "h-px", className)}
      style={vertical ? { height: length, width: "1px" } : { width: length, height: "1px" }}
    />
  );
}
