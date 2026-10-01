import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-[#f1f4f7] py-16 md:py-24">
      <div className="container-tajin">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-[hsl(var(--primary))] px-7 py-12 text-white md:px-14 md:py-16"
        >
          {/* soft accent glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[hsl(var(--accent)/.22)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-[hsl(var(--accent)/.10)] blur-3xl"
          />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 font-mono-brand text-[10px] font-semibold tracking-[.16em] text-[hsl(var(--accent))]">
                READY WHEN YOU ARE
              </span>
              <h2 className="font-display mt-5 max-w-xl text-3xl font-extrabold leading-[1.04] tracking-[-.05em] md:text-5xl">
                Bring us the complexity.
                <br />
                <span className="text-white/60">
                  We&apos;ll bring a way through.
                </span>
              </h2>
            </div>

            <Link
              to="/contact-us"
              className="focus-ring group inline-flex shrink-0 items-center gap-3 rounded-full bg-[hsl(var(--accent))] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#36afc0]"
              data-testid="link-home-final-cta"
            >
              Start a conversation{" "}
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}