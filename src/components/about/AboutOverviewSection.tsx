import { SectionLabel } from "../shared/SectionLabel";
import logo from "../../assets/logo/logo.jpeg";

export function AboutOverviewSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-tajin">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          {/* Content */}
          <div>
            <SectionLabel>THE FIRM / OUR ESSENCE</SectionLabel>

            <h2 className="font-display mt-5 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
              Connecting expertise across accounting, advisory, and
              technology.{" "}
            </h2>

            <div className="mt-8 space-y-6 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">
              <p>
                TAJIN is a multidisciplinary business services company bringing
                together accounting, auditing, taxation, business advisory, and
                technology under one experienced team. We help organizations
                simplify operations, stay compliant, and build stronger
                foundations for growth.
              </p>

              <p>
                With professionals across India and the Middle East, we combine
                local expertise with regional insight to support businesses at
                every stage — from company formation and financial management to
                ERP implementation and digital transformation. Our focus is
                simple: deliver practical solutions that create clarity,
                efficiency, and long-term value.
              </p>
            </div>

            {/* Stats */}
            {/* <div className="mt-10 border-t border-[hsl(var(--border))] pt-8">
              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <p className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                    DISCIPLINE
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-[hsl(var(--primary))]">
                    Dual Competency
                  </h3>

                  <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                    Statutory Law + Cloud Code
                  </p>
                </div>

                <div>
                  <p className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                    GOVERNANCE
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-[hsl(var(--primary))]">
                    5 Jurisdictions
                  </h3>

                  <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                    SOCPA, ICAI, ZATCA, NBR, FTA
                  </p>
                </div>

                <div>
                  <p className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                    VELOCITY
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-[hsl(var(--primary))]">
                    Kernel Systems
                  </h3>

                  <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                    Tailored Ledger Architecture
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Visual */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--primary))] p-8 md:p-12">
              {/* Background circles */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--accent)/.25)]" />
                <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--accent)/.18)]" />
                <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--accent)/.15)]" />
              </div>

              {/* Orbit */}
              {/* <div className="absolute left-1/2 top-1/2 h-[240px] w-[120px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full border border-[hsl(var(--accent)/.35)]" />

              <div className="absolute left-1/2 top-1/2 h-[240px] w-[120px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full border border-[hsl(var(--accent)/.35)]" /> */}

              {/* Core Image */}
              <div className="relative flex h-[420px] items-center justify-center">
                <img
                  src={logo}
                  alt="TAJIN"
                  className="relative z-10 max-h-[180px] w-auto object-contain rounded-2xl"
                />

                {/* Optional glow behind image */}
                <div className="absolute h-48 w-48 rounded-full bg-[hsl(var(--accent)/.15)] blur-3xl" />
              </div>

              {/* Bottom labels */}
              {/* <div className="absolute bottom-6 left-6 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                ● TAJIN PRECISION
              </div>

              <div className="absolute bottom-6 right-6 font-mono-brand text-[10px] tracking-[.18em] text-white/35">
                AXIS // 01
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
