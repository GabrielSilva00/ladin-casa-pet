import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden font-sans font-medium tracking-wide transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-terracota text-osso rounded-full shadow-[0_10px_24px_-14px_rgba(221,107,60,0.65)] hover:shadow-[0_18px_40px_-16px_rgba(221,107,60,0.85)] hover:-translate-y-[2px] before:absolute before:inset-0 before:-translate-x-full before:bg-carvao/20 before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-0",
        dark:
          "bg-carvao text-osso rounded-full hover:bg-noite hover:-translate-y-[2px]",
        ghost:
          "bg-transparent text-carvao border border-carvao/30 rounded-full hover:border-carvao hover:bg-carvao hover:text-osso",
        link:
          "text-carvao bg-transparent"
      },
      size: {
        sm: "px-5 py-2.5 text-[13px]",
        md: "px-7 py-4 text-[14px]",
        lg: "px-9 py-[18px] text-[15px]"
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
        <span className="relative z-[1] inline-flex items-center gap-2.5">
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
