import { Link } from "@tanstack/react-router";
import { SectionLabel } from "../shared/SectionLabel";
import { ArrowRight } from "lucide-react";
import { zatcaCapabilities } from "@/data/siteData";


export function ZatcaSection(){
    return(
        <section className="overflow-hidden bg-[hsl(var(--primary))] py-24 text-white md:py-32">
        <div className="container-tajin">
          <div className="grid gap-12 md:grid-cols-[.85fr_1.15fr] md:items-start md:gap-20">
            <div>
              <SectionLabel light>SAUDI ARABIA / ZATCA PHASE 2</SectionLabel>
              <h2 className="font-display mt-6 max-w-lg text-4xl font-extrabold leading-[1.02] tracking-[-.055em] md:text-6xl">Saudi e-invoicing, ready for the integration phase.</h2>
              <p className="mt-7 max-w-lg text-base leading-7 text-white/65">TAJIN ERP is set up to support businesses preparing for ZATCA&apos;s Phase 2 Integration Phase — connecting the e-invoicing workflow with FATOORA, the required invoice format, and the additional information expected in each invoice.</p>
              <p className="mt-5 max-w-lg text-sm leading-6 text-white/45">Phase 2 is introduced in waves. Our team can help you understand your readiness, configure the workflow, test the setup, and prepare your people for the assigned integration date.</p>
              <Link to="/contact-us" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#36afc0]" data-testid="link-erp-zatca-consultation">
                Plan your ZATCA setup <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {zatcaCapabilities.map(({ title, text, icon: Icon }) => (
                <article key={title} className="rounded-2xl border border-white/15 bg-white/[.06] p-6 transition-colors hover:border-[hsl(var(--accent)/.65)] hover:bg-white/[.1]">
                  <Icon className="h-7 w-7 text-[hsl(var(--accent))]" strokeWidth={1.6} />
                  <h3 className="mt-8 font-display text-xl font-bold leading-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5 text-xs font-semibold text-white/55">
            <span>Saudi e-invoicing</span><span>Phase 2 integration</span><span>FATOORA readiness</span><span>Invoice data controls</span>
          </div>
        </div>
      </section>
    )
}