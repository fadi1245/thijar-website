import { Layers3, Smartphone, Workflow, Upload } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { motion } from "framer-motion";
import { useState } from "react";

const customSoftwareServices = [
  {
    icon: Layers3,
    title: "Operations Portals",
    description:
      "Custom dashboards for vendor requests, internal approvals, and real-time order tracking.",
  },
  {
    icon: Smartphone,
    title: "Mobile Business Apps",
    description:
      "iOS and Android applications for field teams, sales operations, deliveries, and digital workflows.",
  },
  {
    icon: Workflow,
    title: "System Integrations",
    description:
      "Connect payment gateways, courier APIs, CRMs, ERPs, and accounting platforms into one workflow.",
  },
  {
    icon: Upload,
    title: "Legacy Modernization",
    description:
      "Upgrade outdated desktop systems into secure, cloud-accessible applications without disrupting operations.",
  },
];

export function CustomSoftwareSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32">
      <div className="container-tajin">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* Left Side */}
          <div>
            <SectionLabel>SERVICE 05</SectionLabel>

            <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
              Customized Software
            </h2>

            <div className="mt-8 space-y-6 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">
              <p>
                Tailored web and mobile applications designed around your
                business processes, whether inventory management, order
                tracking, customer engagement, or internal operations.
              </p>

              <p>
                Built using modern technologies, our solutions are scalable,
                secure, and easy for teams to adopt without lengthy training or
                operational disruption.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded bg-[hsl(var(--secondary))] px-3 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
                WEB PORTALS
              </span>

              <span className="rounded bg-[hsl(var(--secondary))] px-3 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
                MOBILE APPS
              </span>

              <span className="rounded bg-[hsl(var(--secondary))] px-3 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
                API INTEGRATIONS
              </span>
            </div>
          </div>

          {/* Right Side: expandable list */}
          <div className="border-t border-[hsl(var(--border))]">
            {customSoftwareServices.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={item.title}
                  layout
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() =>
                    setActiveIndex(isActive ? null : index)
                  }
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="cursor-pointer border-b border-[hsl(var(--border))] py-6"
                >
                  <div className="flex items-center gap-5">
                    {/* <span className="font-mono-brand text-xs tracking-[.18em] text-[hsl(var(--muted-foreground))]">
                      {String(index + 1).padStart(2, "0")}
                    </span> */}

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive
                          ? "bg-[hsl(var(--accent)/.15)]"
                          : "bg-[hsl(var(--accent)/.08)]"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-[hsl(var(--accent))]" />
                    </div>

                    <h3 className="flex-1 text-xl font-bold leading-tight text-[hsl(var(--primary))] md:text-2xl">
                      {item.title}
                    </h3>

                    <motion.span
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-2xl leading-none text-[hsl(var(--accent))]"
                    >
                      +
                    </motion.span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="ml-16 mt-4 max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}