import { useState } from "react";
import { Receipt, QrCode, Warehouse, ArrowRight, Plus, BarChart3 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
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

export function SoftwareSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ActiveIcon = softwareFeatures[activeIndex].icon;

  return (
    <section className="bg-[hsl(var(--primary))] py-24 md:py-32">
      <div className="container-tajin">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <SectionLabel light>SERVICE 04 / SOFTWARE</SectionLabel>

            <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-white md:text-5xl">
              THIJAR Billing & Accounting Software
            </h2>

            <p className="mt-6 max-w-3xl text-[15px] leading-8 text-white/65">
              User-friendly billing and accounting software with native ZATCA
              e-invoicing for Saudi Arabia and simplified tax-compliant billing
              for businesses across India and the GCC.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="rounded bg-[hsl(var(--accent))] px-4 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
              ZATCA PHASE-2 READY
            </span>

            <span className="rounded bg-white/10 px-4 py-2 font-mono-brand text-[10px] tracking-[.18em] text-white">
              INDIA GST COMPLIANT
            </span>
          </div>
        </div>

        {/* Interactive feature showcase */}
        <div className="mt-16 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: clickable feature list */}
          <div className="flex flex-col">
            {softwareFeatures.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.title}
                  onClick={() => setActiveIndex(index)}
                  className="group flex items-center gap-5 border-b border-white/10 py-6 text-left first:border-t"
                >
                  {/* <span
                    className={`font-mono-brand text-xs tracking-[.18em] transition-colors duration-300 ${
                      isActive ? "text-[hsl(var(--accent))]" : "text-white/30"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span> */}

                  <span
                    className={`flex-1 text-lg font-bold leading-tight transition-colors duration-300 md:text-xl ${
                      isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
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
                </button>
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
          </div>

          {/* Right: active feature detail panel */}
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.04] p-10 md:p-14">
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
          </div>

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