import { useEffect, useRef, useState } from "react";
import { RevealUp } from "@/lib/revealAnimation";
import clientLogo from "../../assets/logo/clientlogo.png";
import "./ClientSection.css";

export function ClientSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Pause the marquee (and the per-logo bob) while the section is off-screen,
  // so it stops costing GPU time during the scroll into/out of other sections.
  // The actual pausing is done in ClientSection.css via [data-offscreen="true"]
  // (not inline styles, which would override the existing hover-pause rule).
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:py-24"
      aria-label="Client partners"
    >
      <RevealUp>
        <div className="container-tajin text-center">
          <span className="inline-flex items-center rounded-full bg-[hsl(var(--accent)/.12)] px-3 py-1 font-mono-brand text-[11px] font-semibold tracking-[.16em] text-[hsl(var(--accent))]">
            CLIENT PARTNERS
          </span>
          <h2 className="font-display mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
            Growing with businesses that move forward.
          </h2>
        </div>
      </RevealUp>
      {/* full-width single-row marquee, no visible box */}
      <div
        ref={marqueeRef}
        data-offscreen={!inView}
        // Desktop: soft edge fade via mask-image.
        // Mobile: masks on animated content are costly, so use cheap white edge overlays instead (below).
        className="cs-marquee relative mt-12 md:mt-16 lg:[-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        role="presentation"
      >
        {/* glow: blurred on desktop, plain static gradient on mobile (no blur filter) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-48 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--accent)/.12)] blur-3xl lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full [background:radial-gradient(ellipse,hsl(var(--accent)/.14),transparent_70%)] lg:hidden"
        />

        <div
          className="cs-row relative flex w-max items-center gap-8 py-8 pr-8 md:gap-12 md:py-10 md:pr-12"
        >
          {[...Array(2)].flatMap((_, loopIndex) =>
            [...Array(8)].map((__, logoIndex) => (
              <div
                key={`${loopIndex}-${logoIndex}`}
                // bob animation is a desktop extra: 16 independently animating
                // elements is wasted work on a phone
                className="cs-bob shrink-0 max-lg:animate-none!"
                style={{ animationDelay: `${-logoIndex * 0.55}s` }}
              >
                <div className="grid h-24 w-24 place-items-center rounded-3xl bg-white p-3 shadow-[0_6px_16px_hsl(var(--primary)/.12)] transition duration-300 hover:scale-105 hover:shadow-[0_20px_48px_hsl(var(--accent)/.35)] sm:h-32 sm:w-32 md:h-40 md:w-40 lg:shadow-[0_12px_32px_hsl(var(--primary)/.12)]">
                  <img
                    src={clientLogo}
                    alt={
                      loopIndex === 0 && logoIndex === 0
                        ? "Client partner logo"
                        : ""
                    }
                    aria-hidden={loopIndex !== 0 || logoIndex !== 0}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            )),
          )}
        </div>

        {/* mobile/tablet edge fades (replace the mask-image) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-white to-transparent lg:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-white to-transparent lg:hidden"
        />
      </div>
    </section>
  );
}