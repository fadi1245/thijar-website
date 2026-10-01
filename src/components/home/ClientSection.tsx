import { RevealUp } from "@/lib/revealAnimation";
import clientLogo from "../../assets/logo/clientlogo.png";

/* Scoped styles: self-contained, no changes needed in your global CSS */
const CSS = `
.cs-row{animation:cs-run 50s linear infinite}
@keyframes cs-run{from{transform:translateX(-50%)}to{transform:translateX(0)}}

.cs-bob{animation:cs-bob 4.5s ease-in-out infinite}
@keyframes cs-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

.cs-marquee:hover .cs-row{animation-play-state:paused}

@media (prefers-reduced-motion:reduce){
  .cs-row,.cs-bob{animation:none!important}
}
`;

const FADE =
  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";

export function ClientSection() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:py-24"
      aria-label="Client partners"
    >
      <style>{CSS}</style>
      <RevealUp>
        <div className="container-tajin text-center">
          <span className="inline-flex items-center rounded-full bg-[hsl(var(--accent)/.12)] px-3 py-1 font-mono-brand text-[10px] font-semibold tracking-[.16em] text-[hsl(var(--accent))]">
            CLIENT PARTNERS
          </span>
          <h2 className="font-display mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
            Growing with businesses that move forward.
          </h2>
        </div>
      </RevealUp>
      {/* full-width single-row marquee, no visible box */}
      <div
        className="cs-marquee relative mt-12 md:mt-16"
        role="presentation"
        style={{ WebkitMaskImage: FADE, maskImage: FADE }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--accent)/.12)] blur-3xl"
        />

        <div className="cs-row relative flex w-max items-center gap-8 py-8 pr-8 md:gap-12 md:py-10 md:pr-12">
          {[...Array(2)].flatMap((_, loopIndex) =>
            [...Array(8)].map((__, logoIndex) => (
              <div
                key={`${loopIndex}-${logoIndex}`}
                className="cs-bob shrink-0"
                style={{ animationDelay: `${-logoIndex * 0.55}s` }}
              >
                <div className="grid h-24 w-24 place-items-center rounded-3xl bg-white p-3 shadow-[0_12px_32px_hsl(var(--primary)/.12)] transition duration-300 hover:scale-105 hover:shadow-[0_20px_48px_hsl(var(--accent)/.35)] sm:h-52 sm:w-52 md:h-40 md:w-40">
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
      </div>
    </section>
  );
}
