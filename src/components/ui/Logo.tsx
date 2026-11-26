import { cn } from "@/lib/utils";

export function Wordmark({ className, variant = "default" }: { className?: string; variant?: "default" | "stacked" | "outline" }) {
  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col leading-none", className)}>
        <span className="font-display text-[26px] font-medium tracking-tighter2 text-carvao">Cabana</span>
        <span className="h-px w-8 bg-terracota my-[6px]" aria-hidden />
        <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-carvao/80">Pet Café</span>
      </span>
    );
  }
  if (variant === "outline") {
    return (
      <span
        className={cn("font-display font-light tracking-tighter2 leading-none", className)}
        style={{
          WebkitTextStroke: "1px #1A1512",
          color: "transparent"
        }}
      >
        CABANA
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-baseline gap-2 leading-none", className)}>
      <span className="font-display text-[22px] font-medium tracking-tighter2 text-carvao">Cabana</span>
      <span className="h-[14px] w-px bg-terracota" aria-hidden />
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-carvao/80">Pet Café</span>
    </span>
  );
}

export function LogoMark({ className, size = 56 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("text-terracota", className)}
      aria-hidden
    >
      <path
        d="M8 34 L32 10 L56 34 L56 54 L40 54 L40 38 L24 38 L24 54 L8 54 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="46" r="2.4" fill="currentColor" />
    </svg>
  );
}
