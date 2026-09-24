import { SectionLabel } from "../shared/SectionLabel";
import { erpUserViews } from "@/data/siteData";

export function ERPUserViews(){
    return(
        <section className="bg-[#f1f4f7] py-24 md:py-28">
        <div className="container-tajin">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <SectionLabel>ONE PLATFORM / MANY PERSPECTIVES</SectionLabel>
              <h2 className="font-display mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">Useful for every team that touches the business.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">Different people need different views. THIJAR ERP keeps everyone working from the same business information.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2">
            {erpUserViews.map(([title, text], index) => (
              <div key={title} className="bg-[#f1f4f7] p-7 md:p-9">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--accent)/.12)] font-mono-brand text-[10px] font-bold text-[hsl(var(--accent))]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-xl font-bold text-[hsl(var(--primary))]">{title}</h3>
                </div>
                <p className="mt-5 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}