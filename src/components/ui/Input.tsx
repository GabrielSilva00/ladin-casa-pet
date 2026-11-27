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
    const hasVal = innerValue.length > 0;

    return (
      <div className={cn("group relative", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "block pb-2 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] font-medium transition-colors",
            error ? "text-tijolo2" : focused ? "text-tijolo" : "text-tinta/60"
          )}
        >
          {label}
        </label>

        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border bg-creme px-4 py-3 transition-all",
            error
              ? "border-tijolo2"
              : focused
              ? "border-tijolo ring-4 ring-tijolo/10"
              : hasVal
              ? "border-tinta/25"
              : "border-tinta/15 group-hover:border-tinta/30"
          )}
        >
          {leading ? <span className="text-tinta/55">{leading}</span> : null}
          <input
            ref={ref}
            id={inputId}
            value={value}
            defaultValue={defaultValue}
            onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
            onChange={(e) => { setInnerValue(e.target.value); props.onChange?.(e); }}
            className="block w-full bg-transparent text-[15px] text-tinta placeholder-tinta/35 outline-none"
            {...props}
          />
        </div>

        {error ? (
          <p className="mt-1.5 font-sans text-[12px] text-tijolo2">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 font-sans text-[12px] text-tinta/55">{hint}</p>
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
    const [focused, setFocused] = React.useState(false);
    return (
      <div className={cn("relative", className)}>
        <label htmlFor={textareaId} className={cn(
          "block pb-2 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] font-medium transition-colors",
          error ? "text-tijolo2" : focused ? "text-tijolo" : "text-tinta/60"
        )}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          className={cn(
            "block w-full rounded-xl border bg-creme px-4 py-3 text-[15px] text-tinta placeholder-tinta/35 outline-none min-h-[88px] resize-y transition-all",
            error ? "border-tijolo2" : focused ? "border-tijolo ring-4 ring-tijolo/10" : "border-tinta/15 hover:border-tinta/30"
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 font-sans text-[12px] text-tijolo2">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 font-sans text-[12px] text-tinta/55">{hint}</p>
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
    <div>
      <div className="pb-2 font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-tinta/60 font-medium">{label}</div>
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
                  ? "border-tijolo bg-tijolo text-creme shadow-[0_6px_14px_-8px_rgba(178,70,38,0.65)]"
                  : "border-tinta/20 bg-creme text-tinta hover:border-tijolo hover:text-tijolo"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 font-sans text-[12px] text-tijolo2">{error}</p> : null}
    </div>
  );
}
