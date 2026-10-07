import { ArrowRight, Code2, Network } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { Link } from "@tanstack/react-router";
import { RevealLeft, RevealRight } from "@/lib/revealAnimation";

export function TeamSection() {
  return (
    <section className="overflow-hidden bg-[hsl(var(--primary))] py-24 text-white md:py-32">
      {/* Scoped CSS animations, all disabled for reduced-motion users */}
      <style>{`
        @keyframes tj-spin { to { transform: rotate(360deg); } }
        @keyframes tj-pulse {
          0%   { transform: scale(1);   opacity: .55; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes tj-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes tj-flow { to { stroke-dashoffset: -24; } }
        .tj-spin  { animation: tj-spin 28s linear infinite; }
        .tj-pulse { animation: tj-pulse 3.2s ease-out infinite; }
        .tj-float { animation: tj-float 6s ease-in-out infinite; }
        .tj-flow  { animation: tj-flow 1.6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .tj-spin, .tj-pulse, .tj-float, .tj-flow { animation: none; }
        }
      `}</style>

      <div className="container-tajin grid gap-14 md:grid-cols-[.8fr_1.2fr] md:items-center">
        <RevealLeft>
          <div>
            <SectionLabel light>ONE TEAM / MANY DISCIPLINES</SectionLabel>
            <h2 className="font-display mt-6 max-w-md text-4xl font-extrabold leading-[1.02] tracking-[-.05em] md:text-5xl">
              The confidence of people who see the whole board.
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">
              Our 50+ personnel bring together CA&apos;s, accountants,
              auditors, engineers, developers, and digital specialists across
              India and the Middle East.
            </p>
            <Link
              to="/careers"
              className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--accent))] hover:text-white"
              data-testid="link-home-team"
            >
              Join the THIJAR team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealLeft>

        <RevealRight>
          {/* Network: one hub (the people) connected to the two things they run on */}
          <div className="relative min-h-[380px] md:min-h-[420px]" aria-hidden="true">
            {/* Connecting lines with flowing dashes */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="32" y1="50" x2="76" y2="20"
                className="tj-flow stroke-[hsl(var(--accent))]"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity=".7"
              />
              <line
                x1="32" y1="50" x2="76" y2="80"
                className="tj-flow stroke-[hsl(var(--accent))]"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity=".7"
              />
            </svg>

            {/* Hub */}
            <div className="absolute left-[32%] top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-40 w-40 md:h-48 md:w-48">
                <span className="tj-pulse absolute inset-0 rounded-full border border-[hsl(var(--accent)/.5)]" />
                <span
                  className="tj-pulse absolute inset-0 rounded-full border border-[hsl(var(--accent)/.5)]"
                  style={{ animationDelay: "1.6s" }}
                />
                {/* Orbit ring with travelling dot */}
                <div className="tj-spin absolute -inset-5 rounded-full border border-dashed border-white/20">
                  <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_0_8px_hsl(var(--accent)/.14)]" />
                </div>
                <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-white/15 bg-[hsl(var(--primary))] text-center">
                  <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent)/.22)]" />
                  <span className="font-mono-brand relative text-5xl text-[hsl(var(--accent))]">
                    50<span className="text-3xl">+</span>
                  </span>
                  <span className="relative mt-2 text-xs leading-5 text-white/70">
                    Professionals
                    <br />
                    across regions
                  </span>
                </div>
              </div>
            </div>

            {/* Node: operating view */}
            <div className="absolute left-[76%] top-[20%] -translate-x-1/2 -translate-y-1/2">
              <div className="tj-float relative flex h-32 w-32 flex-col justify-between rounded-[28px] border border-white/15 bg-[hsl(var(--primary))] p-4 md:h-40 md:w-40 md:p-5">
                <span className="absolute inset-0 rounded-[28px] bg-white/[.06]" />
                <Code2
                  className="relative h-6 w-6 text-[hsl(var(--accent))]"
                  strokeWidth={1.5}
                />
                <span className="relative text-xs leading-5 text-white/70">
                  One connected operating view across teams
                </span>
              </div>
            </div>

            {/* Node: technology */}
            <div className="absolute left-[76%] top-[80%] -translate-x-1/2 -translate-y-1/2">
              <div
                className="tj-float relative flex h-32 w-32 flex-col justify-between rounded-[28px] border border-white/15 bg-[hsl(var(--primary))] p-4 md:h-40 md:w-40 md:p-5"
                style={{ animationDelay: "-3s" }}
              >
                <span className="absolute inset-0 rounded-[28px] bg-white/[.06]" />
                <Network
                  className="relative h-6 w-6 text-[hsl(var(--accent))]"
                  strokeWidth={1.5}
                />
                <span className="relative text-xs leading-5 text-white/70">
                  Technology that simplifies daily operations
                </span>
              </div>
            </div>
          </div>
        </RevealRight>
      </div>
    </section>
  );
}