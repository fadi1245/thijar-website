import { ShieldCheck } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { RevealLeft, RevealUp } from "@/lib/revealAnimation";

export function ERPBenefits(){
    return(
        <section className="bg-[hsl(var(--primary))] py-24 text-white md:py-28">
        <div className="container-tajin">
          <SectionLabel light>MORE THAN SOFTWARE</SectionLabel>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              ['Easy to use', 'Clear workflows your team can learn and use without unnecessary friction.'],
              ['Self-manageable', 'Configuration options that let your business take ownership of the day-to-day setup.'],
              ['Cloud storage', 'Keep your business information accessible and organized wherever your teams work.'],
              ['Accountant support', 'When you need a second view, THIJAR specialists are close to the system and the numbers.'],
            ].map(([title, text]) => (
              <RevealUp>
              <div key={title} className="rounded-2xl border border-white/15 bg-white/[.05] p-6">
                <ShieldCheck className="h-6 w-6 text-[hsl(var(--accent))]" strokeWidth={1.5} />
                <h3 className="mt-10 font-display text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
              </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>
    )
}