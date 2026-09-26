import { SectionLabel } from "../shared/SectionLabel";
import { erpFeatureGroups } from "@/data/siteData";
import { motion, type Variants } from "framer-motion";

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -35,
    y: -30,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const pillContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.35 },
  },
};

const pillVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};


export function ERPFeatures(){
    return(
        <section className="bg-[#eaf5f6] py-20 md:py-24">
        <div className="container-tajin" style={{ perspective: 1200 }}>
          <SectionLabel>BUILT FOR THE WORK THAT MATTERS</SectionLabel>
          <motion.div
            className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[hsl(var(--primary)/.14)] bg-[hsl(var(--primary)/.14)] md:grid-cols-2"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {erpFeatureGroups.map(({ number, icon: Icon, title, text, features }) => (
              <motion.article
                key={title}
                variants={cardItemVariants}
                style={{ transformOrigin: "top center" }}
                className="bg-[#eaf5f6] p-6 md:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--primary)/.08)] text-[hsl(var(--accent))]">
                    <Icon className="h-7 w-7" strokeWidth={1.7} />
                  </span>
                  {/* <span className="rounded-full border border-[hsl(var(--accent)/.3)] px-2.5 py-1 font-mono-brand text-[10px] font-medium tracking-[.14em] text-[hsl(var(--accent))]">{number}</span> */}
                </div>
                <h3 className="mt-8 font-display text-[1.65rem] font-bold leading-tight text-[hsl(var(--primary))]">{title}</h3>
                <p className="mt-3 max-w-lg text-base leading-7 text-[hsl(var(--muted-foreground))]">{text}</p>
                <motion.div
                  className="mt-5 flex flex-wrap gap-2"
                  variants={pillContainerVariants}
                >
                  {features.map((feature) => (
                    <motion.span
                      key={feature}
                      variants={pillVariants}
                      className="rounded-full border border-[hsl(var(--primary)/.14)] bg-white/65 px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))]"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    )
}