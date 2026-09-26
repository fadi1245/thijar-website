import {
  Building2,
  Landmark,
  ShieldCheck,
  Boxes,
  Code2,
  Rocket,
  Briefcase,
  Globe,
  ArrowUpRight,
} from "lucide-react";

import { SectionLabel } from "../shared/SectionLabel";
import { RevealLeft, RevealRight } from "@/lib/revealAnimation";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Accounting back office",
    description:
      "A dependable finance desk for accurate books, reconciliation, and timely monthly closing.",
    tag: "BOOKKEEPING",
    icon: Building2,
  },
  {
    number: "02",
    title: "Tax & consultation",
    description:
      "Clear advice for compliance, planning, and cross-border transfer pricing and Zakat structuring.",
    tag: "GCC / ZATCA",
    icon: Landmark,
  },
  {
    number: "03",
    title: "Audit & assurance",
    description:
      "Independent perspective, robust internal controls, and certified statutory reporting.",
    tag: "STATUTORY",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "ERP & software",
    description:
      "Practical systems connecting billing, multi-currency finance, and live inventory.",
    tag: "TAJIN CORE",
    icon: Boxes,
  },
  {
    number: "05",
    title: "Custom development",
    description:
      "Bespoke digital architecture, ERP extensions, data pipelines, and legacy modernization.",
    tag: "ENGINEERING",
    icon: Code2,
  },
  {
    number: "06",
    title: "ERP deployment & training",
    description:
      "Full-cycle implementation, data migration, change management, and onboarding.",
    tag: "ONBOARDING",
    icon: Rocket,
  },
  {
    number: "07",
    title: "Company formation",
    description:
      "Cross-border incorporation, corporate structuring, and regulatory clearances *wherever* your business operates.",
    tag: "ADVISORY",
    icon: Briefcase,
  },
  {
    number: "08",
    title: "Growth infrastructure",
    description:
      "E-commerce systems, payment integrations, and technology foundations built for scale.",
    tag: "ECOMMERCE",
    icon: Globe,
  },
];

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AboutServicesSection() {
  return (
    <section className="bg-[#f5f6f7] py-24 md:py-32">
      <div className="container-tajin">
        <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-start">
          <RevealLeft>
          <div>
            <SectionLabel>WHAT WE DELIVER</SectionLabel>
            <h2 className="font-display mt-6 max-w-3xl text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-6xl">
              The full picture, from ledger to launch.
            </h2>
          </div>
          </RevealLeft>
          <RevealRight>
          <div>
            <p className="max-w-md mt-15 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">
              A connected set of functional services, delivered by chartered
              specialists who understand the deep commercial and statutory
              context.
            </p>
          </div>
          </RevealRight>
        </div>

        <motion.div
          className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={cardItemVariants}
                className="group flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--accent)/.4)] hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[hsl(var(--accent)/.1)] text-[hsl(var(--accent))]">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>

                  {/* <span className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                    {service.number}
                  </span> */}
                </div>

                <h3 className="font-display mt-4 text-lg font-bold leading-snug text-[hsl(var(--primary))]">
                  {service.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-[hsl(var(--muted-foreground))]">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[hsl(var(--border))] pt-4">
                  <span className="font-mono-brand text-[9px] tracking-[.18em] text-[hsl(var(--primary))]">
                    {service.tag}
                  </span>

                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-[hsl(var(--accent))] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}