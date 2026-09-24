import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  light?: boolean;
}

export function SectionLabel({
  children,
  light = false,
}: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono-brand text-[10px] font-medium tracking-[.13em]
      ${
        light
          ? "border-white/20 bg-white/6 text-white/65"
          : "border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.07)] text-[hsl(var(--accent))]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
      {children}
    </div>
  );
}