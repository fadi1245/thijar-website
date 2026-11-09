import type { ReactNode } from "react";

/** White card with a title row. Used for each block inside a tab. */
export function AdminPanel({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[hsl(var(--primary)/.12)] bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-extrabold tracking-[-.03em] text-[hsl(var(--primary))] sm:text-2xl">
            {title}
          </h2>
          {description && (
            <p className="mt-1 max-w-lg text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              {description}
            </p>
          )}
        </div>
        {action && <div className="sm:shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}