import { motion, useInView } from "framer-motion";
import { Globe2 } from "lucide-react";
import { Suspense, useRef } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function PageHero({
  // label,
  title,
  text,
  illustration,
}: {
  label: string;
  title: string;
  text: string;
  /** Desktop-only; pass a React.lazy component so mobile never downloads it */
  illustration?: React.ReactNode;
}) {
  // track whether the hero is on screen
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { amount: 0 });
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Loops while visible, rests in place when scrolled away
  const breathe = heroInView
    ? { scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }
    : { scale: 1, opacity: 0.5 };
  const breatheMobile = heroInView
    ? { scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }
    : { scale: 1, opacity: 0.5 };

  return (
    <section
      ref={heroRef}
      className="hero-slice relative flex flex-col overflow-hidden bg-[hsl(var(--primary))] text-white"
      // At least one screen tall, but grows with the text instead of clipping it
      style={{ minHeight: "max(520px, calc(100svh - var(--header-h, 0px)))" }}
    >
      <div className="hero-grid absolute inset-0 opacity-35" />
      <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10 bg-[hsl(var(--accent)/.12)] md:h-96 md:w-96" />

      {/* ---------- DESKTOP-ONLY DECOR ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {/* blur-3xl replaced with a radial gradient */}
        <div
          className="absolute right-[-6%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full xl:h-[760px] xl:w-[760px]"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--accent) / .25), transparent)",
          }}
        />
        {/* will-change-transform + uses the pausable animation */}
        <motion.div
          className="absolute right-[2%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full border border-white/10 will-change-transform xl:h-[680px] xl:w-[680px]"
          animate={breathe}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute right-[7%] top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full border border-white/10 xl:h-[540px] xl:w-[540px]" />
        {/* left glow also a gradient */}
        <div
          className="absolute -left-32 bottom-0 h-80 w-80 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--accent) / .16), transparent)",
          }}
        />
      </div>

      {/* ---------- MOBILE-ONLY DECOR ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:hidden"
      >
        {/* mobile glow as a gradient */}
        <div
          className="absolute -left-24 top-8 h-56 w-56 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, hsl(var(--accent) / .28), transparent)",
          }}
        />
        {/* mobile ring, same treatment */}
        <motion.div
          className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-white/15 will-change-transform"
          animate={breatheMobile}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full border border-white/10 bg-[hsl(var(--accent)/.14)]" />
        <Globe2 className="absolute bottom-12 right-12 h-7 w-7 text-[hsl(var(--accent))]" />
      </div>

      <div className="container-tajin relative flex flex-1 flex-col">
        <div className="flex w-full flex-1 items-center gap-8 pb-8 pt-28 lg:gap-6 lg:pb-12 lg:pt-24 xl:gap-10">
          {/* ------------------------------ TEXT ------------------------------ */}
          <motion.div
            className={illustration ? "lg:w-[44%] lg:shrink-0" : ""}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={
                illustration
                  ? "w-full max-w-2xl lg:max-w-none"
                  : "w-full max-w-4xl"
              }
            >
              <h1 className="font-display mt-0 text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-.02em] text-balance lg:text-[clamp(3rem,5vw,5.25rem)] lg:leading-[1]">
                {title}
              </h1>

              <div className="mt-5 h-1 w-14 rounded-full bg-[hsl(var(--accent))] lg:mt-7 lg:h-1.5 lg:w-24" />

              <p className="mt-5 max-w-xl text-[15px] leading-6 text-white/66 md:text-[17px] lg:mt-7 lg:max-w-lg lg:text-lg lg:leading-8 lg:text-white/75">
                {text}
              </p>
            </div>
          </motion.div>

          {/* --------------------------- ILLUSTRATION -------------------------- */}
          {/* Mounted on desktop only; Suspense holds it back until its chunk loads */}
          {illustration && isDesktop && (
            <Suspense fallback={null}>
              <motion.div
                className="
                  relative hidden flex-1 will-change-transform lg:block
                  lg:-mr-10 lg:h-[62svh] lg:max-h-[720px]
                  xl:-mr-24
                  2xl:-mr-32
                  [&_svg]:h-full [&_svg]:w-full [&_svg]:max-w-none
                "
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                {illustration}
              </motion.div>
            </Suspense>
          )}
        </div>

        <div className="mb-8 flex items-center justify-between border-t border-white/15 pt-4 lg:mb-10">
          <span className="font-mono-brand text-[11px] tracking-[.18em] text-white/60 lg:text-xs">
            INDIA · MIDDLE EAST
          </span>
          <span className="font-mono-brand text-[11px] tracking-[.18em] text-white/60 lg:text-xs">
            THIJAR
          </span>
        </div>
      </div>
    </section>
  );
}