/** Small tab switcher inside a page (used by Jobs | Applications). */
export function SubTabs<T extends string>({
    items,
    value,
    onChange,
  }: {
    items: { id: T; label: string }[];
    value: T;
    onChange: (id: T) => void;
  }) {
    return (
      <div
        role="tablist"
        className="mb-6 inline-flex rounded-xl border border-[hsl(var(--primary)/.14)] bg-white p-1"
      >
        {items.map(({ id, label }) => {
          const active = id === value;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(id)}
              className={`focus-ring rounded-lg px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-[hsl(var(--primary))] text-white"
                  : "text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/.06)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }