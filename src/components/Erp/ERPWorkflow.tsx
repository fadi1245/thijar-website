import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { erpWorkflows } from "@/data/siteData";

export function ERPWorkflow(){
    return(
        <section className="container-tajin py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-[.75fr_1.25fr]">
          <div>
            <SectionLabel>FROM SETUP TO SUMMARY</SectionLabel>
            <h2 className="font-display mt-5 max-w-md text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">A connected workflow for every stage of the day.</h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">THIJAR ERP keeps the small actions connected to the larger picture, so your team can work faster without losing control of the detail.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {erpWorkflows.map(({ number, title, text, tags }) => (
              <article key={title} className="group rounded-2xl border border-[hsl(var(--border))] bg-white p-6 transition hover:-translate-y-1 hover:border-[hsl(var(--accent)/.55)] hover:shadow-[var(--shadow-md)]">
                <div className="flex items-center justify-end">
                  {/* <span className="font-mono-brand text-[10px] tracking-[.16em] text-[hsl(var(--accent))]">{number}</span> */}
                  <ArrowUpRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-10 font-display text-xl font-bold text-[hsl(var(--primary))]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => <span key={tag} className="rounded-full bg-[#eaf5f6] px-2.5 py-1.5 text-[10px] font-semibold text-[hsl(var(--primary))]">{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
}