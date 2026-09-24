import { offices } from "@/data/siteData";
import { SectionLabel } from "../shared/SectionLabel";

export function OfficeSection() {
  return (
    <section className="container-tajin py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:items-end">
        <div>
          <SectionLabel>WHERE WE ARE</SectionLabel>
          <h2 className="font-display mt-5 max-w-lg text-4xl font-extrabold leading-[1.02] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
            Local context.
            <br />
            Cross-border reach.
          </h2>
        </div>
        <div>
          <p className="max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
            Our teams work across the markets where ambitious businesses are
            building. One point of contact, multiple local perspectives.
          </p>
          <div className="mt-8 grid grid-cols-2 border-l border-[hsl(var(--accent))] pl-5 sm:grid-cols-3">
            {offices.map((office) => (
              <div key={office.code} className="mb-6">
                <span className="font-mono-brand text-[10px] tracking-[.12em] text-[hsl(var(--accent))]">
                  {office.code}
                </span>
                <p className="mt-1 text-sm font-bold text-[hsl(var(--primary))]">
                  {office.city}
                </p>
                <p className="mt-0.5 text-[11px] text-[hsl(var(--muted-foreground))]">
                  {office.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
