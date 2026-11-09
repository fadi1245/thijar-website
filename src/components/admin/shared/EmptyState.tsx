import type { ComponentType, ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[hsl(var(--primary)/.25)] px-5 py-12 text-center">
      {Icon && (
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--primary)/.08)] text-[hsl(var(--accent))]">
          <Icon className="h-6 w-6" strokeWidth={1.7} />
        </span>
      )}
      <h3 className="font-display mt-4 text-lg font-bold text-[hsl(var(--primary))]">
        {title}
      </h3>
      {text && (
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">
          {text}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}