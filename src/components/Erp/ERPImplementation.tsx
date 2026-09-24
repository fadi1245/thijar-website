import { SectionLabel } from "../shared/SectionLabel";

export function ERPImplementation(){
    return(
        <section className="container-tajin grid gap-10 py-24 md:grid-cols-[1fr_1fr] md:py-32">
        <div><SectionLabel>IMPLEMENTATION, NOT INSTALLATION</SectionLabel><h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))]">From first workshop to confident adoption.</h2></div>
        <div className="grid gap-5">{['Understand the current operation', 'Design the future-state workflow', 'Configure, migrate, and integrate', 'Train the people who make it work'].map((item, index) => <div key={item} className="flex gap-4 border-b border-[hsl(var(--border))] pb-5"><span className="font-mono-brand text-xs text-[hsl(var(--accent))]">0{index + 1}</span><span className="text-sm font-semibold text-[hsl(var(--primary))]">{item}</span></div>)}</div>
      </section>
    )
}