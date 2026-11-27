import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden font-sans font-medium transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-tijolo text-creme rounded-full shadow-[0_10px_24px_-14px_rgba(178,70,38,0.65)] hover:bg-tijolo2 hover:shadow-[0_18px_40px_-16px_rgba(178,70,38,0.85)] hover:-translate-y-[2px]",
        dark:
          "bg-tinta text-creme rounded-full hover:-translate-y-[2px]",
        ghost:
          "bg-transparent text-tinta border border-tinta/25 rounded-full hover:border-tijolo hover:text-tijolo",
        link:
          "text-tinta bg-transparent"
      },
      size: {
        sm: "px-4 py-2 text-[13px]",
        md: "px-6 py-3 text-[14px]",
        lg: "px-7 py-3.5 text-[15px]"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  trailing?: React.ReactNode;
  showArrow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, trailing, showArrow, ...props }, ref) => {
    const defaultArrow = variant !== "link" && showArrow !== false;
    return (
      <button ref={ref} className={cn(button({ variant, size }), className)} {...props}>
        <span className="relative z-[1] inline-flex items-center gap-2">
          {variant === "link" ? (
            <span className="accent-wave">{children}</span>
          ) : (
            children
          )}
          {trailing ?? (
            defaultArrow ? (
              <svg
                width="14" height="12" viewBox="0 0 14 12"
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
                aria-hidden
              >
                <path d="M1 6h11M8 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : null
          )}
        </span>
      </button>
    );
  }
);
Button.displayName = "Button";
