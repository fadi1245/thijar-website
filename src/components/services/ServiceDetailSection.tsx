import {
  BookText,
  Wallet,
  TrendingUp,
  FileCheck2,
} from "lucide-react";

import { SectionLabel } from "../shared/SectionLabel";
import { RevealLeft } from "@/lib/revealAnimation";
import { motion, type Variants } from "framer-motion";

const features = [
  {
    icon: BookText,
    title: "Daily & Monthly Bookkeeping",
    description:
      "Accurate entry of purchases, sales invoices, expense vouchers, and bank feeds.",
  },
  {
    icon: Wallet,
    title: "Receivables & Payables",
    description:
      "Track vendor dues, send invoice reminders, and stay on top of daily cash flow.",
  },
  {
    icon: TrendingUp,
    title: "Monthly Reports (MIS)",
    description:
      "Clear Profit & Loss statements, balance sheets, and key business highlights each month.",
  },
  {
    icon: FileCheck2,
    title: "Year-End Financials",
    description:
      "Complete audit-ready closing files and schedules ready for tax and statutory filing.",
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
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ServiceDetailSection() {
  return (
    <section className="bg-[#f6f5f4] py-15 md:py-20">
      <div className="container-tajin">
        <div className="grid gap-16 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
          {/* Left Content */}
          <RevealLeft>
          <div>
            {/* <SectionLabel>SERVICE 01</SectionLabel> */}

            <h2 className="font-display mt-5 max-w-lg text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-6xl">
              Accounting Back Office
            </h2>

            <div className="mt-8 space-y-6 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">
              <p>
                Everyday bookkeeping, bank reconciliation, timely monthly
                reporting, and financial statement preparation tailored to
                Indian and GCC compliance standards.
              </p>

              <p>
                Get peace of mind with clean, organized books and up-to-date
                numbers without having to recruit and manage a large internal
                team.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-md bg-white px-3 py-2 font-mono-brand text-[10px] tracking-[.16em] text-[hsl(var(--primary))]">
                INDIA & GCC COMPLIANT
              </span>

              <span className="rounded-md bg-white px-3 py-2 font-mono-brand text-[10px] tracking-[.16em] text-[hsl(var(--primary))]">
                MONTH-END CLOSING
              </span>

              <span className="rounded-md bg-white px-3 py-2 font-mono-brand text-[10px] tracking-[.16em] text-[hsl(var(--primary))]">
                BANK RECONCILIATIONS
              </span>
            </div>
          </div>
          </RevealLeft>
          {/* Right Cards */}
          <motion.div
            className="grid gap-5 sm:grid-cols-2"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={cardItemVariants}
                  className="rounded-3xl border border-[hsl(var(--primary)/.06)] bg-white/70 p-6 transition-all duration-300 hover:border-[hsl(var(--accent)/.15)] hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent)/.08)]">
                    <Icon className="h-5 w-5 text-[hsl(var(--accent))]" />
                  </div>

                  <h3 className="mt-5 text-2xl font-bold leading-snug text-[hsl(var(--primary))]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}