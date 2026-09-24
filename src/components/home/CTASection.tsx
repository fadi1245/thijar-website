import { Link } from "@tanstack/react-router";
import { SectionLabel } from "../shared/SectionLabel";
import { ArrowUpRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-[#f1f4f7] py-20 md:py-24">
      <div className="container-tajin flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          {/* <SectionLabel>READY WHEN YOU ARE</SectionLabel> */}
          <h2 className="font-display mt-5 max-w-xl text-4xl font-extrabold leading-[1.04] tracking-[-.05em] text-[hsl(var(--primary))]">
            Bring us the complexity.
            <br />
            We&apos;ll bring a way through.
          </h2>
        </div>
        <Link
          to="/contact-us"
          className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-4 text-sm font-bold text-white transition hover:bg-[hsl(var(--accent))]"
          data-testid="link-home-final-cta"
        >
          Start a conversation{" "}
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
