import { Link } from "@tanstack/react-router";
import { SectionLabel } from "../shared/SectionLabel";
import { ArrowRight } from "lucide-react";
import erpDashboard from  '../../assets/images/erpDashboard.png'

export function ERPHighlight(){
    return(
<section className="overflow-hidden bg-[hsl(var(--primary))] py-24 text-white md:py-32">
<div className="container-tajin grid gap-14 md:grid-cols-[.85fr_1.15fr] md:items-center">
  <div className="reveal">
    <SectionLabel light>THIJAR ERP</SectionLabel>
    <h2 className="font-display mt-6 max-w-lg text-4xl font-extrabold leading-[1.02] tracking-[-.055em] md:text-6xl">Run the numbers. Move the business.</h2>
    <p className="mt-7 max-w-md text-[16px] leading-7 text-white/60">THIJAR ERP brings billing, accounting, stock, and reporting into one easy-to-use platform — so every decision starts from a clearer view of the business.</p>
    <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-white/70">
      {['Billing', 'Accounting', 'Inventory', 'Reports'].map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/[.06] px-3 py-2">{item}</span>)}
    </div>
    <Link to="/erp" className="focus-ring mt-9 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#36afc0]" data-testid="link-home-erp">
      Explore THIJAR ERP <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
  <div className="reveal reveal-delay-1 relative">
    <div className="absolute -inset-4 rounded-[28px] bg-[hsl(var(--accent)/.14)] blur-2xl" />
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-2 shadow-[0_22px_60px_rgba(0,0,0,.2)]">
      <img src={erpDashboard} alt="TAJIN ERP financial dashboard showing receivables, payables, stock, and business reports" className="w-full rounded-xl object-cover" />
    </div>
  </div>
</div>
</section>
    )
}