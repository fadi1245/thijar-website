import { Link } from "@tanstack/react-router";
import { ArrowRight, MonitorSmartphone } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { RevealUp } from "@/lib/revealAnimation";

export function AboutCTASection() {
  return (
    <section className="bg-[hsl(var(--primary))] py-12 md:py-12">
      <RevealUp>
      <div className="container-tajin">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 md:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
            {/* Left */}
            <div>
              <SectionLabel light>
                INSTITUTIONAL PARTNERSHIP
              </SectionLabel>

              <h2 className="font-display mt-6 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-.05em] text-white md:text-5xl">
                Ready to bring clarity to your regulatory and digital landscape?
              </h2>

              <p className="mt-6 max-w-2xl text-[15px] leading-8 text-white/60">
                Engage our multidisciplinary teams of chartered accountants,
                tax auditors, and cloud architects to configure your enterprise
                operations across the GCC and South Asia.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4 lg:items-end">
              <Link
                to="/contact-us"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-8 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(23,146,166,.25)] transition-all hover:-translate-y-0.5 hover:bg-[#36afc0]"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/erp"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-8 py-4 text-sm font-bold text-white/80 transition-all hover:bg-white/[0.08] hover:text-white"
              >
                Explore TAJIN ERP
                <MonitorSmartphone className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[.18em] text-white/35">
                <span>• CONFIDENTIAL ENGAGEMENT</span>
                <span>• DIRECT CA ADVISORY</span>
              </div>

              <div className="font-mono-brand text-[10px] tracking-[.18em] text-white/35">
                ESTABLISHED 2011 — THIJAR PVT LTD
              </div>
            </div>
          </div>
        </div>
      </div>
      </RevealUp>
    </section>
  );
}