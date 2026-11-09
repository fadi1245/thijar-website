import type { ReactNode } from "react";

export const inputClass =
  "focus-ring mt-2 w-full rounded-xl border border-[hsl(var(--primary)/.18)] bg-white px-4 py-3 text-[15px] text-[hsl(var(--primary))] placeholder:text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--accent)/.5)]";

/** Label + control + optional hint / error. Wrap any input, textarea or select. */
export function FormField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-[hsl(var(--primary))]">
      {label}
      {children}
      {hint && !error && (
        <span className="mt-1.5 block text-xs font-normal text-[hsl(var(--muted-foreground))]">
          {hint}
        </span>
      )}
      {error && (
        <span role="alert" className="mt-1.5 block text-xs font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}