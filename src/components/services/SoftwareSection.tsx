import { useState } from "react";
import { Receipt, QrCode, Warehouse, ArrowRight, Plus, BarChart3 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SectionLabel } from "../shared/SectionLabel";

const softwareFeatures = [
  {
    icon: Receipt,
    title: "Fast Point of Sale & Billing",
    description:
      "Quick barcode scanning, split payments, instant receipt printing, and offline capability so sales never stop.",
  },
  {
    icon: BarChart3,
    title: "Financial Reporting",
    description:
      "Generates real-time Profit & Loss, Balance Sheet, tax and Cash Flow reports for better business decisions.",
  },
  {
    icon: Warehouse,
    title: "Inventory & Stock Sync",
    description:
      "Real-time stock alerts, batch expiry management, and transfers between branches without manual entries.",
  },
];

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0% 50% 0% 50%)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const tagContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    borderImageSource: "linear-gradient(to bottom, transparent 0%, transparent 100%)",
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
};

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 },
  },
};

export function SoftwareSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ActiveIcon = softwareFeatures[activeIndex].icon;

  return (
    <section className="bg-[hsl(var(--primary))] py-24 md:py-32">
      <div className="container-tajin">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={headerVariants} className="max-w-4xl">
            <SectionLabel light>SERVICE 04 / SOFTWARE</SectionLabel>

            <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-white md:text-5xl">
              THIJAR Billing & Accounting Software
            </h2>

            <p className="mt-6 max-w-3xl text-[15px] leading-8 text-white/65">
              User-friendly billing and accounting software with native ZATCA
              e-invoicing for Saudi Arabia and simplified tax-compliant billing
              for businesses across India and the GCC.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={tagContainerVariants}
          >
            <motion.span
              variants={tagVariants}
              className="rounded bg-[hsl(var(--accent))] px-4 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]"
            >
              ZATCA PHASE-2 READY
            </motion.span>

            <motion.span
              variants={tagVariants}
              className="rounded bg-white/10 px-4 py-2 font-mono-brand text-[10px] tracking-[.18em] text-white"
            >
              INDIA GST COMPLIANT
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Interactive feature showcase */}
        <div className="mt-16 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: clickable feature list */}
          <motion.div
            className="flex flex-col"
            variants={listContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {softwareFeatures.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.title}
                  onClick={() => setActiveIndex(index)}
                  variants={listItemVariants}
                  className="group relative flex items-center gap-5 overflow-hidden border-b border-white/10 py-6 text-left first:border-t"
                >
                  <motion.span
                    className="absolute left-0 top-0 w-[2px] bg-[hsl(var(--accent))]"
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: index * 0.15 + 0.1 }}
                  />

                  {/* <span
                    className={`font-mono-brand text-xs tracking-[.18em] transition-colors duration-300 ${
                      isActive ? "text-[hsl(var(--accent))]" : "text-white/30"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span> */}

                  <span
                    className={`flex-1 ml-2 text-lg font-bold leading-tight transition-colors duration-300 md:text-xl ${
                      isActive ? "text-white" : "text-white/40 group-hover:text-white/70 ml-5"
                    }`}
                  >
                    {item.title}
                  </span>

                  <Plus
                    className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                      isActive
                        ? "rotate-45 text-[hsl(var(--accent))]"
                        : "text-white/30 group-hover:text-white/60"
                    }`}
                  />
                </motion.button>
              );
            })}

            <div className="mt-10 hidden lg:block">
              <Link
                to="/erp"
                className="group inline-flex items-center gap-3 rounded-full bg-[hsl(var(--accent))] px-7 py-3.5 font-mono-brand text-[11px] font-semibold tracking-[.18em] text-[hsl(var(--primary))] transition-all duration-300 hover:gap-4 hover:brightness-110"
              >
                KNOW MORE
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right: active feature detail panel */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-white/[0.04] p-10 md:p-14"
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[hsl(var(--accent)/.08)] blur-2xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--accent)/.15)]">
                  <ActiveIcon className="h-6 w-6 text-[hsl(var(--accent))]" />
                </div>

                <h3 className="mt-8 text-3xl font-bold leading-tight text-white">
                  {softwareFeatures[activeIndex].title}
                </h3>

                <p className="mt-5 max-w-md text-[15px] leading-8 text-white/60">
                  {softwareFeatures[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* CTA (mobile) */}
          <Link
            to="/erp"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[hsl(var(--accent))] px-7 py-3.5 font-mono-brand text-[11px] font-semibold tracking-[.18em] text-[hsl(var(--primary))] transition-all duration-300 hover:gap-4 hover:brightness-110 lg:hidden"
          >
            KNOW MORE
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}