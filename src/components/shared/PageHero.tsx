import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";

export function PageHero({
  label,
  title,
  text,
  illustration,
}: {
  label: string;
  title: string;
  text: string;
  illustration?: React.ReactNode;
}) {
  return (
    <section
      className="hero-slice relative min-h-[520px] overflow-hidden bg-[hsl(var(--primary))] text-white lg:min-h-[560px]"
      // fills the first screen on every viewport. If your header is NOT overlaying
      // the hero, set --header-h (e.g. 80px) so hero + header = exactly one screen.
      style={{ height: "calc(100svh - var(--header-h, 0px))" }}
    >
      <div className="hero-grid absolute inset-0 opacity-35" />
      <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10 bg-[hsl(var(--accent)/.12)] md:h-96 md:w-96" />

      {/* ---------- DESKTOP-ONLY DECOR ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {/* big soft glow behind the illustration */}
        <div className="absolute right-[-6%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-[hsl(var(--accent)/.20)] blur-3xl xl:h-[760px] xl:w-[760px]" />
        {/* slowly breathing rings */}
        <motion.div
          className="absolute right-[2%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full border border-white/10 xl:h-[680px] xl:w-[680px]"
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute right-[7%] top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full border border-white/10 xl:h-[540px] xl:w-[540px]" />
        {/* glow behind the headline so the left side is not flat */}
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[hsl(var(--accent)/.12)] blur-3xl" />
      </div>

      {/* ---------- MOBILE-ONLY DECOR (unchanged) ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:hidden"
      >
        <div className="absolute -left-24 top-8 h-56 w-56 rounded-full bg-[hsl(var(--accent)/.22)] blur-3xl" />
        <motion.div
          className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-white/15"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full border border-white/10 bg-[hsl(var(--accent)/.14)]" />
        <Globe2 className="absolute bottom-12 right-12 h-7 w-7 text-[hsl(var(--accent))]" />
      </div>

      <div className="container-tajin relative flex h-full items-center lg:pb-24 lg:pt-20">
        <div className="flex w-full items-center gap-8 lg:gap-6 xl:gap-10">
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
              {/* label chip: now on mobile AND desktop */}
              {/* {label && (
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono-brand text-[10px] uppercase tracking-[.18em] text-white/80 backdrop-blur-sm lg:mb-7 lg:px-4 lg:py-2 lg:text-xs">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--accent))]" />
                  {label}
                </span>
              )} */}

              {/* mobile size untouched, desktop scales up */}
              <h1 className="font-display mt-0 text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-.02em] text-balance lg:text-[clamp(3rem,5vw,5.25rem)] lg:leading-[1]">
                {title}
              </h1>

              {/* accent underline: mobile + desktop */}
              <div className="mt-5 h-1 w-14 rounded-full bg-[hsl(var(--accent))] lg:mt-7 lg:h-1.5 lg:w-24" />

              <p className="mt-5 max-w-xl text-[15px] leading-6 text-white/66 md:text-[17px] lg:mt-7 lg:max-w-lg lg:text-lg lg:leading-8 lg:text-white/75">
                {text}
              </p>
            </div>
          </motion.div>

          {/* --------------------------- ILLUSTRATION -------------------------- */}
          {illustration && (
            <motion.div
              className="
                relative hidden flex-1 lg:block
                lg:-mr-10 lg:h-[62svh] lg:max-h-[720px]
                xl:-mr-24
                2xl:-mr-32
                [&_svg]:h-full [&_svg]:w-full [&_svg]:max-w-none
                [&_svg]:drop-shadow-[0_30px_60px_rgba(0,0,0,.35)]
              "
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {illustration}
            </motion.div>
          )}
        </div>

        {/* bottom bar: now on desktop too, fills the empty lower area */}
        <div className="absolute inset-x-0 bottom-8 flex items-center justify-between border-t border-white/15 pt-4 lg:bottom-10">
          <span className="font-mono-brand text-[10px] tracking-[.18em] text-white/40 lg:text-xs">
            INDIA · MIDDLE EAST
          </span>
          <span className="font-mono-brand text-[10px] tracking-[.18em] text-white/40 lg:text-xs">
            THIJAR
          </span>
        </div>
      </div>
    </section>
  );
}