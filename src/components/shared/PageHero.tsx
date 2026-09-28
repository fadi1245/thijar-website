import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";

export function PageHero({
  label,
  title,
  text,
  image,
  imageAlt,
}: {
  label: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="hero-slice relative h-[520px] overflow-hidden bg-[hsl(var(--primary))] text-white sm:h-[640px] lg:h-[700px]">
      <div className="hero-grid absolute inset-0 opacity-35" />
      <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10 bg-[hsl(var(--accent)/.12)] md:h-96 md:w-96" />

      {/* ---------- MOBILE-ONLY DECOR ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 lg:hidden">
        {/* soft accent glow, top-left */}
        <div className="absolute -left-24 top-8 h-56 w-56 rounded-full bg-[hsl(var(--accent)/.22)] blur-3xl" />

        {/* pulsing concentric rings, bottom-right */}
        <motion.div
          className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-white/15"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full border border-white/10 bg-[hsl(var(--accent)/.14)]" />
        <Globe2 className="absolute bottom-12 right-12 h-7 w-7 text-[hsl(var(--accent))]" />
      </div>

      <div className="container-tajin relative flex h-full items-center">
        <div className="flex w-full items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={
                image ? "w-full max-w-2xl lg:max-w-xl" : "w-full max-w-4xl"
              }
            >
              {/* mobile-only label chip */}
              {label && (
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono-brand text-[10px] uppercase tracking-[.18em] text-white/80 backdrop-blur-sm lg:hidden">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--accent))]" />
                  {label}
                </span>
              )}

              <h1 className="font-display mt-0 text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-.02em] text-balance lg:mt-7">
                {title}
              </h1>

              {/* mobile-only accent underline */}
              <div className="mt-5 h-1 w-14 rounded-full bg-[hsl(var(--accent))] lg:hidden" />

              <p className="mt-5 max-w-xl text-[15px] leading-6 text-white/66 md:text-[17px]">
                {text}
              </p>
            </div>
          </motion.div>

          {image && (
            <motion.div
              className="relative hidden h-[420px] flex-1 lg:block"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm" />
              <img
                src={image}
                alt={imageAlt ?? ""}
                className="absolute inset-0 h-full w-full rounded-3xl object-cover p-2"
              />
            </motion.div>
          )}
        </div>

        {/* mobile-only bottom bar, echoes the home Hero */}
        <div className="absolute inset-x-0 bottom-8 flex items-center justify-between border-t border-white/15 pt-4 lg:hidden">
          <span className="font-mono-brand text-[10px] tracking-[.18em] text-white/40">
            INDIA · MIDDLE EAST
          </span>
          <span className="font-mono-brand text-[10px] tracking-[.18em] text-white/40">
            TAJIN
          </span>
        </div>
      </div>
    </section>
  );
}