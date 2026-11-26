import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden font-sans text-[15px] font-medium tracking-wide transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-terracota text-osso rounded-btn before:absolute before:inset-0 before:-translate-x-full before:bg-noite/15 before:transition-transform before:duration-500 before:ease-out hover:before:translate-x-0",
        ghost:
          "bg-transparent text-carvao border border-carvao rounded-btn hover:bg-carvao hover:text-osso",
        link: "text-carvao underline decoration-terracota decoration-2 underline-offset-4 hover:decoration-[3px]"
      },
      size: {
        sm: "px-4 py-2 text-[13px]",
        md: "px-8 py-[18px]",
        lg: "px-10 py-5 text-[17px]"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
  trailing?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, trailing, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(button({ variant, size }), className)} {...props}>
        <span className="relative z-[1] inline-flex items-center gap-2">
          {children}
          {trailing ?? (
            variant === "link" ? null : (
              <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            )
          )}
        </span>
      </button>
    );
  }
);
Button.displayName = "Button";
