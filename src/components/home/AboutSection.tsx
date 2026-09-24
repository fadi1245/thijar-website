import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { Link } from "@tanstack/react-router";


export function AboutSection(){
    return(
<section className="container-tajin grid gap-14 py-24 md:grid-cols-[.8fr_1.2fr] md:py-32">
<div className="reveal">
  <SectionLabel>THE THIJAR APPROACH</SectionLabel>
  <h2 className="font-display mt-6 max-w-md text-4xl font-extrabold leading-[1.02] tracking-[-.055em] text-[hsl(var(--primary))] md:text-5xl">Business clarity for your most important moves.</h2>
</div>
<div className="reveal reveal-delay-1">
  <p className="max-w-[620px] text-xl leading-8 text-[hsl(var(--foreground)/.78)]">THIJAR brings the right people into the room — financial specialists who understand the detail, and technology teams who know how to turn it into progress.</p>
  <p className="mt-6 max-w-[570px] text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">From a growing company&apos;s first books to a multi-market operation&apos;s ERP rollout, we make complexity more useful. Clear advice. Accountable delivery. A team that stays close.</p>
  <Link to="/about-us" className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] underline decoration-[hsl(var(--accent)/.45)] decoration-2 underline-offset-8 hover:text-[hsl(var(--accent))]" data-testid="link-home-about">
    See how we work <ArrowUpRight className="h-4 w-4" />
  </Link>
</div>
</section>
    )
}