import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, ShieldCheck, Clock3, BadgeCheck } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";

export function ServicesCTASection() {
  return (
    <section className="bg-[hsl(var(--primary))] py-24 md:py-32">
      <div className="container-tajin">
        <div className="mx-auto max-w-5xl text-center">
          <SectionLabel light>GET IN TOUCH</SectionLabel>

          <h2 className="font-display mt-6 text-5xl font-extrabold leading-[1.03] tracking-[-.06em] text-white md:text-6xl lg:text-7xl">
            Ready to simplify your
            <br />
            business in India or the
            <br />
            GCC?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/60">
            Speak directly with our team for quick clarity on pricing,
            procedures, compliance requirements, and implementation timelines.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact-us"
              className="focus-ring inline-flex items-center gap-3 rounded-full bg-[hsl(var(--accent))] px-8 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(23,146,166,.25)] transition-all hover:-translate-y-0.5 hover:bg-[#36afc0]"
            >
              <ArrowUpRight className="h-4 w-4" />
              Speak with our team
            </Link>

            <a
              href="mailto:hello@tajin.com"
              className="focus-ring inline-flex items-center gap-3 rounded-full bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/12"
            >
              <Mail className="h-4 w-4" />
              Send us an email
            </a>
          </div>

          {/* Bottom Trust Bar */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-8 md:gap-8">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[hsl(var(--accent))]" />
              <span className="font-mono-brand text-[10px] tracking-[.18em] text-white/55">
                FAST 24-HOUR RESPONSE
              </span>
            </div>

            <span className="hidden text-white/20 md:block">•</span>

            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[hsl(var(--accent))]" />
              <span className="font-mono-brand text-[10px] tracking-[.18em] text-white/55">
                LICENSED INDIA & GCC ADVISORS
              </span>
            </div>

            <span className="hidden text-white/20 md:block">•</span>

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[hsl(var(--accent))]" />
              <span className="font-mono-brand text-[10px] tracking-[.18em] text-white/55">
                STRICT CONFIDENTIALITY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}