import { MessageCircleMore, ClipboardCheck, Headphones } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircleMore,
    title: "Discuss Your Needs",
    description:
      "A quick consultation to understand your business, current processes, and goals across India or the GCC.",
    footer: "STEP 1: FREE CONSULTATION",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Simple Onboarding",
    description:
      "We gather the required information, prepare the setup, and configure a clear workflow tailored to your operations.",
    footer: "STEP 2: EASY SETUP",
  },
  {
    number: "03",
    icon: Headphones,
    title: "Continuous Support",
    description:
      "Our team handles ongoing filings, compliance, reporting, and day-to-day support so you can focus on growth.",
    footer: "STEP 3: ONGOING PEACE OF MIND",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-[hsl(var(--background))] py-10md:py-12">
      <div className="container-tajin">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono-brand text-[10px] tracking-[.22em] text-[hsl(var(--accent))]">
            SIMPLE THREE-STEP PROCESS
          </span>

          <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
            How We Work Together
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
            We keep the onboarding process transparent, straightforward,
            and efficient from day one.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,.08)]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl font-extrabold leading-none tracking-[-.06em] text-[hsl(var(--primary))]">
                    <span className="text-[hsl(var(--accent))]">
                      {step.number.slice(0, 1)}
                    </span>
                    {step.number.slice(1)}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent)/.08)]">
                    <Icon className="h-5 w-5 text-[hsl(var(--accent))]" />
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[hsl(var(--primary))]">
                  {step.title}
                </h3>

                <p className="mt-4 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">
                  {step.description}
                </p>

                <div className="mt-8 border-t border-black/5 pt-5">
                  <span className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                    {step.footer}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}