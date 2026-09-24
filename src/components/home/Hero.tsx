import { slides } from "@/data/siteData";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionLabel } from "../shared/SectionLabel";

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      8000,
    );
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section className="hero-slice relative h-[600px] overflow-hidden bg-[hsl(var(--primary))] text-white sm:h-[640px] lg:h-[700px]">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="absolute -right-24 top-16 h-[420px] w-[420px] rounded-full border border-white/10 bg-[hsl(var(--accent)/.12)] blur-[1px]" />
      <div className="absolute -right-2 top-28 h-[270px] w-[270px] rounded-full border border-white/10 bg-[hsl(var(--accent)/.08)]" />
      <div className="container-tajin relative h-full">
        <div className="absolute inset-x-0 bottom-24 top-6 flex w-full max-w-[840px] items-center">
          <div key={slide.index} className="reveal w-full">
            {/* <SectionLabel light>{slide.eyebrow}</SectionLabel> */}
            <div className="flex items-start gap-5">
              {/* <span className="hidden pt-3 font-mono-brand text-xs text-white/35 sm:block">
                /{slide.index}
              </span> */}
              <div>
                <h1 className="font-display max-w-[850px] text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-.02em] text-balance">
                  {slide.heading}
                </h1>{" "}
                <p className="mt-3 max-w-[590px] text-[15px] leading-6 text-white/66 md:text-[17px]">
                  {slide.subheading}
                </p>
                <Link
                  to={slide.action}
                  className="focus-ring group mt-5 inline-flex items-center gap-3 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(23,146,166,.26)] transition-all hover:-translate-y-0.5 hover:bg-[#36afc0]"
                  data-testid={`link-hero-cta-${slide.index}`}
                >
                  {slide.button}
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-10 flex items-center justify-between border-t border-white/15 pt-4">
          <span className="font-mono-brand text-[10px] tracking-[.18em] text-white/35">
            {slide.accent}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setActive((active - 1 + slides.length) % slides.length)
              }
              className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white"
              aria-label="Previous slide"
              data-testid="button-hero-previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div
              className="flex gap-1.5"
              role="tablist"
              aria-label="Hero slides"
            >
              {slides.map((item, index) => (
                <button
                  type="button"
                  key={item.index}
                  onClick={() => setActive(index)}
                  role="tab"
                  aria-selected={active === index}
                  aria-label={`Show slide ${index + 1}`}
                  className={`focus-ring h-1 rounded-full transition-all ${active === index ? "w-10 bg-[hsl(var(--accent))]" : "w-4 bg-white/25 hover:bg-white/50"}`}
                  data-testid={`button-hero-slide-${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActive((active + 1) % slides.length)}
              className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white"
              aria-label="Next slide"
              data-testid="button-hero-next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="drift absolute bottom-26 right-[9%] hidden h-40 w-40 rounded-full border border-white/20 bg-white/[.06] p-4 lg:block">
          <div className="hero-orb flex h-full w-full flex-col justify-between rounded-full border border-white/15 bg-[hsl(var(--accent)/.2)] p-4">
            <Globe2 className="h-5 w-5 text-[hsl(var(--accent))]" />
            <span className="font-mono-brand text-[9px] leading-4 tracking-[.14em] text-white/60">
              INDIA
              <br />
              MIDDLE EAST
              <br />
              ONE TEAM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}