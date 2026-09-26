import { Link } from "@tanstack/react-router";
import { SectionLabel } from "../shared/SectionLabel";
import { ArrowRight } from "lucide-react";
import { RevealLeft, RevealRight } from "@/lib/revealAnimation";

export function ERPPromise(){
    return(
        <section className="container-tajin grid gap-10 pb-20 md:grid-cols-[.95fr_1.05fr] md:items-center md:gap-20 md:pb-28">
          <RevealLeft>
        <div>
          <SectionLabel>THE ERP PROMISE</SectionLabel>
          <h2 className="font-display mt-5 max-w-xl text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">One view of the business. Fewer decisions made in the dark.</h2>
        </div>
        </RevealLeft>
        <RevealRight>
        <div className="border-l-2 border-[hsl(var(--accent)/.5)] pl-6 md:pl-8 pt-20">
          <p className="max-w-2xl text-lg leading-8 text-[hsl(var(--foreground)/.8)] md:text-xl">THIJAR ERP is built for the everyday financial work that keeps a business moving: recording accounts, raising bills, tracking stock, managing payments, and seeing what needs attention next.</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[hsl(var(--muted-foreground))]">It is not a money-transfer platform. It is the connected accounting and billing layer your team uses to understand business finances, serve customers, and operate with confidence.</p>
          <Link to="/contact-us" className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))]" data-testid="link-erp-consultation">Discuss your operation <ArrowRight className="h-4 w-4" /></Link>
        </div>
        </RevealRight>
      </section>
    )
}