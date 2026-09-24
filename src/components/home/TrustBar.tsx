import { ShieldCheck } from "lucide-react";

export function TrustBar() {
  return (
    <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="container-tajin grid gap-8 py-9 md:grid-cols-[1.1fr_2fr] md:items-center">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-[hsl(var(--accent))]" />
          <span className="text-sm font-semibold text-[hsl(var(--primary))]">
            A partner built around confidence
          </span>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-medium text-[hsl(var(--muted-foreground))]">
          <span>Chartered Accountants</span>
          <span>Auditors</span>
          <span>Technology Experts</span>
          <span>Cross-border perspective</span>
        </div>
      </div>
    </section>
  );
}
