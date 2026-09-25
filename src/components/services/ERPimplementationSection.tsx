import {
    Network,
    Settings,
    Users,
  } from "lucide-react";
  import { SectionLabel } from "../shared/SectionLabel";
  
  const implementationSteps = [
    {
      icon: Network,
      title: "1. Chart of Accounts & Setup",
      description:
        "We map your company structure, configure accounts correctly, and clean existing customer and supplier records before migration.",
    },
    {
      icon: Settings,
      title: "2. Workflow & Tax Config",
      description:
        "Configure invoice layouts, GST/VAT settings, user permissions, approval flows, and payment integrations for daily operations.",
    },
    {
      icon: Users,
      title: "3. Team Training & Go-Live",
      description:
        "Hands-on staff training, testing, and guided rollout ensure a smooth transition with continued post-launch support.",
    },
  ];
  
  export function ERPImplementationSection() {
    return (
      <section className="py-14 md:py-12">
        <div className="container-tajin">
          {/* Header */}
          <div className="max-w-5xl">
            <SectionLabel>SERVICE 06</SectionLabel>
  
            <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
              ERP Implementation & Setup
            </h2>
  
            <p className="mt-6 max-w-4xl text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">
              Practical ERP rollout and setup that connects your inventory,
              sales, purchasing, finance, and reporting processes without
              disrupting day-to-day business operations.
            </p>
          </div>
  
          {/* Steps */}
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {implementationSteps.map((step) => {
              const Icon = step.icon;
  
              return (
                <div
                  key={step.title}
                  className="rounded-3xl border border-[hsl(var(--border))] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--accent)/.08)]">
                    <Icon className="h-5 w-5 text-[hsl(var(--accent))]" />
                  </div>
  
                  <h3 className="mt-6 text-2xl font-bold leading-tight text-[hsl(var(--primary))]">
                    {step.title}
                  </h3>
  
                  <p className="mt-4 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }