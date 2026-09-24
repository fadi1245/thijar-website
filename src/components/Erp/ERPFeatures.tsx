import { SectionLabel } from "../shared/SectionLabel";
import { erpFeatureGroups } from "@/data/siteData";


export function ERPFeatures(){
    return(
        <section className="bg-[#eaf5f6] py-20 md:py-24">
        <div className="container-tajin">
          <SectionLabel>BUILT FOR THE WORK THAT MATTERS</SectionLabel>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--primary)/.14)] bg-[hsl(var(--primary)/.14)] md:grid-cols-2">
            {erpFeatureGroups.map(({ number, icon: Icon, title, text, features }) => (
              <article key={title} className="bg-[#eaf5f6] p-6 md:p-7">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--primary)/.08)] text-[hsl(var(--accent))]">
                    <Icon className="h-7 w-7" strokeWidth={1.7} />
                  </span>
                  {/* <span className="rounded-full border border-[hsl(var(--accent)/.3)] px-2.5 py-1 font-mono-brand text-[10px] font-medium tracking-[.14em] text-[hsl(var(--accent))]">{number}</span> */}
                </div>
                <h3 className="mt-8 font-display text-[1.65rem] font-bold leading-tight text-[hsl(var(--primary))]">{title}</h3>
                <p className="mt-3 max-w-lg text-base leading-7 text-[hsl(var(--muted-foreground))]">{text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {features.map((feature) => <span key={feature} className="rounded-full border border-[hsl(var(--primary)/.14)] bg-white/65 px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))]">{feature}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
}