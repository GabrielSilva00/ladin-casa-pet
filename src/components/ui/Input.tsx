"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  hint?: string;
  leading?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, hint, className, id, value, defaultValue, leading, ...props }, ref) => {
    const generated = React.useId();
    const inputId = id ?? generated;
    const [focused, setFocused] = React.useState(false);
    const [innerValue, setInnerValue] = React.useState<string>(
      value !== undefined ? String(value) : defaultValue !== undefined ? String(defaultValue) : ""
    );
    React.useEffect(() => {
      if (value !== undefined) setInnerValue(String(value));
    }, [value]);
    const floating = focused || innerValue.length > 0;

    return (
      <div className={cn("group relative pt-7", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-0 origin-left transition-all duration-200 ease-out font-sans",
            floating
              ? "top-0 text-[11px] uppercase tracking-[0.14em] text-terracota font-medium"
              : "top-[30px] text-[16px] text-carvao/50"
          )}
        >
          {label}
        </label>

        <div className="flex items-center gap-2">
          {leading ? <span className="text-carvao/55">{leading}</span> : null}
          <input
            ref={ref}
            id={inputId}
            value={value}
            defaultValue={defaultValue}
            onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
            onChange={(e) => { setInnerValue(e.target.value); props.onChange?.(e); }}
            className={cn(
              "block w-full bg-transparent pb-2.5 pt-1 text-[17px] text-carvao placeholder-carvao/30 outline-none",
              "border-b transition-[border-color,padding] duration-200",
              error
                ? "border-vinho"
                : focused
                ? "border-terracota border-b-2 pb-[9px]"
                : "border-carvao/25 group-hover:border-carvao/55"
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-vinho">{error}</p>
        ) : hint ? (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-carvao/50">{hint}</p>
        ) : null}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const generated = React.useId();
    const textareaId = id ?? generated;
    return (
      <div className={cn("relative pt-7", className)}>
        <label htmlFor={textareaId} className="block font-sans text-[11px] uppercase tracking-[0.14em] text-terracota font-medium pb-2">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "block w-full bg-transparent pb-2 pt-1 text-[16px] text-carvao placeholder-carvao/30 outline-none min-h-[88px] resize-y",
            "border-b transition-colors duration-200",
            error ? "border-vinho" : "border-carvao/25 focus:border-terracota focus:border-b-2"
          )}
          {...props}
        />
        {error ? (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-vinho">{error}</p>
        ) : hint ? (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-carvao/50">{hint}</p>
        ) : null}
      </div>
    );
  }
);
TextareaField.displayName = "TextareaField";

export function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  error
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T | undefined;
  onChange: (v: T) => void;
  error?: string;
}) {
  return (
    <div className="pt-7">
      <div className="pb-3 font-sans text-[11px] uppercase tracking-[0.14em] text-terracota font-medium">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-5 py-2.5 font-sans text-[13px] font-medium transition-all duration-200 active:scale-[0.97]",
                active
                  ? "border-terracota bg-terracota text-osso shadow-[0_6px_14px_-8px_rgba(221,107,60,0.7)]"
                  : "border-carvao/20 bg-transparent text-carvao hover:border-terracota hover:text-terracota"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-vinho">{error}</p> : null}
    </div>
  );
}
