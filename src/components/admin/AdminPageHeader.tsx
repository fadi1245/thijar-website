import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  /** Optional button slot, e.g. "Add job" */
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-[-.05em] text-[hsl(var(--primary))] sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="sm:shrink-0">{action}</div>}
    </div>
  );
}