import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { erpWorkflows } from "@/data/siteData";
import { motion, type Variants } from "framer-motion";
import { RevealLeft } from "@/lib/revealAnimation";

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

const tagContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.35 },
  },
};

const tagVariants: Variants = {
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

export function ERPWorkflow(){
    return(
        <section className="container-tajin py-10 md:py-12" style={{ perspective: 1200 }}>
        <div className="grid gap-10 md:grid-cols-[.75fr_1.25fr]">
          <RevealLeft>
          <div>
            <SectionLabel>FROM SETUP TO SUMMARY</SectionLabel>
            <h2 className="font-display mt-5 max-w-md text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">A connected workflow for every stage of the day.</h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">THIJAR ERP keeps the small actions connected to the larger picture, so your team can work faster without losing control of the detail.</p>
          </div>
          </RevealLeft>
          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {erpWorkflows.map(({ number, title, text, tags }) => (
              <motion.article
                key={title}
                variants={cardItemVariants}
                style={{ transformOrigin: "top center" }}
                className="group rounded-2xl border border-[hsl(var(--border))] bg-white p-6 transition hover:-translate-y-1 hover:border-[hsl(var(--accent)/.55)] hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-center justify-end">
                  {/* <span className="font-mono-brand text-[10px] tracking-[.16em] text-[hsl(var(--accent))]">{number}</span> */}
                  <ArrowUpRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-10 font-display text-xl font-bold text-[hsl(var(--primary))]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{text}</p>
                <motion.div
                  className="mt-5 flex flex-wrap gap-2"
                  variants={tagContainerVariants}
                >
                  {tags.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={tagVariants}
                      className="rounded-full bg-[#eaf5f6] px-2.5 py-1.5 text-[10px] font-semibold text-[hsl(var(--primary))]"
                    >
                      {tag}
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