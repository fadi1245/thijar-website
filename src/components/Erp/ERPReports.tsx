import { SectionLabel } from "../shared/SectionLabel";
import { erpReports } from "@/data/siteData";

export function ERPReports(){
    return(
        <section className="container-tajin grid gap-12 py-24 md:grid-cols-[.8fr_1.2fr] md:py-32">
        <div>
          <SectionLabel>REPORTS THAT ANSWER QUESTIONS</SectionLabel>
          <h2 className="font-display mt-5 max-w-md text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">From daily detail to the full financial picture.</h2>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">Give owners, accountants, and managers the reports they need to understand performance, position, stock, tax, and cash movement.</p>
        </div>
        <div className="grid gap-x-8 gap-y-0 border-t border-[hsl(var(--border))] sm:grid-cols-2">
          {erpReports.map((report, index) => (
            <div key={report} className="flex items-center gap-3 border-b border-[hsl(var(--border))] py-4 text-sm font-semibold text-[hsl(var(--primary))]">
              <span className="font-mono-brand text-[10px] text-[hsl(var(--accent))]">{String(index + 1).padStart(2, '0')}</span>
              {report}
            </div>
          ))}
        </div>
      </section>
    )
}