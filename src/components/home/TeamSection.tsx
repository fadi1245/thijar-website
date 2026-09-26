import { ArrowRight, Code2, Network } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { Link } from "@tanstack/react-router";
import { RevealLeft, RevealRight } from "@/lib/revealAnimation";

export function TeamSection() {
  return (
    <section className="overflow-hidden bg-[hsl(var(--primary))] py-24 text-white md:py-32">
      <div className="container-tajin grid gap-14 md:grid-cols-[.8fr_1.2fr] md:items-center">
        <RevealLeft>
        <div>
          <SectionLabel light>ONE TEAM / MANY DISCIPLINES</SectionLabel>
          <h2 className="font-display mt-6 max-w-md text-4xl font-extrabold leading-[1.02] tracking-[-.05em] md:text-5xl">
            The confidence of people who see the whole board.
          </h2>
          <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">
            Our 50+ personnel bring together CA&apos;s, accountants, auditors,
            engineers, developers, and digital specialists across India and the
            Middle East.
          </p>
          <Link
            to="/careers"
            className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--accent))] hover:text-white"
            data-testid="link-home-team"
          >
            Meet the THIJAR team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </RevealLeft>
        <RevealRight>
        <div className="relative min-h-[330px]">
          <div className="absolute left-[12%] top-[8%] h-44 w-44 rounded-full border border-white/15 bg-[hsl(var(--accent)/.22)] p-5">
            <div className="flex h-full flex-col justify-between rounded-full border border-white/10 p-5">
              <span className="font-mono-brand text-4xl text-[hsl(var(--accent))]">
                50<span className="text-2xl">+</span>
              </span>
              <span className="text-xs leading-5 text-white/65">
                CA professionals
                <br />
                across regions
              </span>
            </div>
          </div>
          <div className="absolute right-[8%] top-[2%] flex h-36 w-36 flex-col justify-between rounded-[28px] border border-white/15 bg-white/[.05] p-5">
            <Code2
              className="h-6 w-6 text-[hsl(var(--accent))]"
              strokeWidth={1.5}
            />
            <span className="text-xs leading-5 text-white/65">
              One connected operating view
              <br />
              across teams
            </span>
          </div>
          <div className="absolute bottom-[3%] left-[28%] flex h-40 w-40 flex-col justify-between rounded-[28px] border border-white/15 bg-white/[.05] p-5">
            <Network
              className="h-6 w-6 text-[hsl(var(--accent))]"
              strokeWidth={1.5}
            />
            <span className="text-xs leading-5 text-white/65">
              Technology that simplifies
              <br />
              daily operations
            </span>
          </div>
          <div className="absolute bottom-[18%] right-[1%] h-3 w-3 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_0_10px_hsl(var(--accent)/.12)]" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
        </div>
        </RevealRight>
      </div>
    </section>
  );
}
