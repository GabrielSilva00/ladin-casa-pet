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

    return (
      <div className={cn("group relative", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "block pb-2 font-sans text-[13px] font-bold transition-colors",
            error ? "text-lavanda2" : focused ? "text-lavanda2" : "text-tinta"
          )}
        >
          {label}
        </label>

        <div
          className={cn(
            "flex items-center gap-2 rounded-full border-2 bg-papel px-5 py-3 transition-all",
            error
              ? "border-lavanda2 ring-4 ring-lavanda2/15"
              : focused
              ? "border-lavanda ring-4 ring-lavanda/15"
              : "border-tinta/15 group-hover:border-lavanda/60"
          )}
        >
          {leading ? <span className="text-tinta/55 shrink-0">{leading}</span> : null}
          <input
            ref={ref}
            id={inputId}
            value={value}
            defaultValue={defaultValue}
            onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
            className="block w-full bg-transparent text-[15px] text-tinta placeholder-tinta/35 outline-none font-sans"
            {...props}
          />
        </div>

        {error ? (
          <p className="mt-2 font-sans text-[12px] font-semibold text-lavanda2">{error}</p>
        ) : hint ? (
          <p className="mt-2 font-sans text-[12px] text-tinta/55">{hint}</p>
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
          "block pb-2 font-sans text-[13px] font-bold transition-colors",
          error ? "text-lavanda2" : focused ? "text-lavanda2" : "text-tinta"
        )}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          className={cn(
            "block w-full rounded-[22px] border-2 bg-papel px-5 py-3.5 text-[15px] text-tinta placeholder-tinta/35 outline-none min-h-[96px] resize-y transition-all font-sans",
            error ? "border-lavanda2 ring-4 ring-lavanda2/15" : focused ? "border-lavanda ring-4 ring-lavanda/15" : "border-tinta/15 hover:border-lavanda/60"
          )}
          {...props}
        />
        {error ? (
          <p className="mt-2 font-sans text-[12px] font-semibold text-lavanda2">{error}</p>
        ) : hint ? (
          <p className="mt-2 font-sans text-[12px] text-tinta/55">{hint}</p>
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
      <div className="pb-2 font-sans text-[13px] font-bold text-tinta">{label}</div>
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
                "rounded-full border-2 px-5 py-2.5 font-sans text-[13px] font-semibold transition-all duration-200 active:scale-[0.97]",
                active
                  ? "border-lavanda bg-lavanda text-papel shadow-[0_6px_14px_-8px_rgba(135,120,240,0.7)]"
                  : "border-tinta/15 bg-papel text-tinta hover:border-lavanda hover:text-lavanda2"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 font-sans text-[12px] font-semibold text-lavanda2">{error}</p> : null}
    </div>
  );
}
