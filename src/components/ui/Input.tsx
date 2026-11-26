"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  hint?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, hint, className, id, value, defaultValue, ...props }, ref) => {
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
      <div className={cn("relative pt-6", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-0 origin-left font-sans transition-all duration-200 ease-out",
            floating ? "top-0 text-[11px] uppercase tracking-wider2 text-terracota" : "top-7 text-[16px] text-carvao/55"
          )}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          onChange={(e) => { setInnerValue(e.target.value); props.onChange?.(e); }}
          className={cn(
            "block w-full bg-transparent pb-2 pt-1 text-[16px] text-carvao placeholder-carvao/30 outline-none",
            "border-b transition-colors duration-200",
            error ? "border-vinho" : "border-carvao/30 focus:border-terracota"
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider2 text-vinho animate-rise">{error}</p>
        ) : hint ? (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider2 text-carvao/55">{hint}</p>
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
      <div className={cn("relative pt-6", className)}>
        <label htmlFor={textareaId} className="block font-mono text-[11px] uppercase tracking-wider2 text-terracota pb-2">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "block w-full bg-transparent pb-2 pt-1 text-[16px] text-carvao placeholder-carvao/30 outline-none min-h-[88px] resize-y",
            "border-b transition-colors duration-200",
            error ? "border-vinho" : "border-carvao/30 focus:border-terracota"
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider2 text-vinho animate-rise">{error}</p>
        ) : hint ? (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider2 text-carvao/55">{hint}</p>
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
    <div className="pt-6">
      <div className="pb-3 font-mono text-[11px] uppercase tracking-wider2 text-terracota">{label}</div>
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
                "rounded-full border px-4 py-2 font-sans text-[13px] transition-all duration-200",
                active
                  ? "border-terracota bg-terracota text-osso"
                  : "border-carvao/30 bg-transparent text-carvao hover:border-terracota hover:text-terracota"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 font-mono text-[11px] uppercase tracking-wider2 text-vinho">{error}</p> : null}
    </div>
  );
}
