import { RevealLeft } from "@/lib/revealAnimation";
import { SectionLabel } from "../shared/SectionLabel";
import { erpReports } from "@/data/siteData";
import { motion, type Variants } from "framer-motion";

const reportContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const reportItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ERPReports(){
    return(
        <section className="container-tajin grid gap-12 py-24 md:grid-cols-[.8fr_1.2fr] md:py-32">
          <RevealLeft>
        <div>
          <SectionLabel>REPORTS THAT ANSWER QUESTIONS</SectionLabel>
          <h2 className="font-display mt-5 max-w-md text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">From daily detail to the full financial picture.</h2>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">Give owners, accountants, and managers the reports they need to understand performance, position, stock, tax, and cash movement.</p>
        </div>
        </RevealLeft>
        <motion.div
          className="grid gap-x-8 gap-y-0 border-t border-[hsl(var(--border))] sm:grid-cols-2"
          variants={reportContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {erpReports.map((report, index) => (
            <motion.div
              key={report}
              variants={reportItemVariants}
              className="flex items-center gap-3 border-b border-[hsl(var(--border))] py-4 text-sm font-semibold text-[hsl(var(--primary))]"
            >
              <span className="font-mono-brand text-[10px] text-[hsl(var(--accent))]">{String(index + 1).padStart(2, '0')}</span>
              {report}
            </motion.div>
          ))}
        </motion.div>
      </section>
    )
}