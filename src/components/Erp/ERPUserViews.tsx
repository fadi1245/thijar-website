import { RevealLeft, RevealRight } from "@/lib/revealAnimation";
import { SectionLabel } from "../shared/SectionLabel";
import { erpUserViews } from "@/data/siteData";
import { motion, type Variants } from "framer-motion";

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const cardItemVariants: Variants = {
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

export function ERPUserViews() {
  return (
    <section className="bg-[#f1f4f7] py-24 md:py-28">
      <div className="container-tajin">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <RevealLeft>
            <div>
              <SectionLabel>ONE PLATFORM / MANY PERSPECTIVES</SectionLabel>
              <h2 className="font-display mt-5 max-w-2xl text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
                Useful for every team that touches the business.
              </h2>
            </div>
          </RevealLeft>

          <RevealRight>
            <p className="max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              Different people need different views. THIJAR ERP keeps everyone
              working from the same business information.
            </p>
          </RevealRight>
        </div>
        <motion.div
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {erpUserViews.map(([title, text], index) => (
            <motion.div
              key={title}
              variants={cardItemVariants}
              className="bg-[#f1f4f7] p-7 md:p-9"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--accent)/.12)] font-mono-brand text-[10px] font-bold text-[hsl(var(--accent))]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold text-[hsl(var(--primary))]">
                  {title}
                </h3>
              </div>
              <p className="mt-5 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}