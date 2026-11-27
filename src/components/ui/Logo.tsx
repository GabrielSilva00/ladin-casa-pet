import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2 leading-none text-inherit", className)}>
      <span className="font-display text-[22px] font-medium tracking-[-0.03em]">Cabana</span>
      <span className="h-[13px] w-px bg-tijolo opacity-80" aria-hidden />
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-75">Pet Café</span>
    </span>
  );
}

export function LogoMark({ className, size = 56 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("text-tijolo", className)}
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
