import { RevealLeft, RevealRight } from "@/lib/revealAnimation";
import { SectionLabel } from "../shared/SectionLabel";
import { motion, type Variants } from "framer-motion";

const milestones = [
  {
    year: "2011",
    title: "Foundation",
    description:
      "Established in Wayanad, India as a Software Distribution Company.",
    tag: "INITIAL PHASE",
    active: false,
  },
  {
    year: "2012",
    title: "Expansion",
    description:
      "Added Accounting and Auditing Services.",
    tag: "ADVISORY CORE",
    active: false,
  },
  {
    year: "2020",
    title: "Transformation",
    description:
      "Focused on Business Structuring and Automations, driving efficiency and innovation.",
    tag: "AUTOMATION",
    active: false,
  },
  {
    year: "2022",
    title: "Global Reach",
    description:
      "Expanded operations to the GCC region, marking international presence.",
    tag: "GCC FOOTPRINT",
    active: false,
  },
  {
    year: "2023",
    title: "Innovation",
    description:
      "Began in-house Software Development, creating tailored solutions for clients.",
    tag: "TAJIN KERNEL",
    active: true,
  },
  {
    year: "2024",
    title: "Incorporation",
    description:
      "Officially registered as THIJAR PVT LTD, establishing identity.",
    tag: "CORPORATE ENTITY",
    active: false,
  },
];

const LINE_DURATION = 1.8;

const lineVariantsX: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: LINE_DURATION, ease: [0.65, 0, 0.35, 1] as const },
  },
};

const lineVariantsY: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: LINE_DURATION, ease: [0.65, 0, 0.35, 1] as const },
  },
};

// Delay each milestone so it reveals right as the growing line reaches it
const timelineItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: (index / (milestones.length - 1)) * LINE_DURATION,
    },
  }),
};

const timelineDotVariants: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: (index / (milestones.length - 1)) * LINE_DURATION,
    },
  }),
};

export function TimelineMilestonesSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-tajin">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-start">
          <RevealLeft>
          <div>
            <SectionLabel>
              OUR EXPEDITION / MILESTONES
            </SectionLabel>

            <h2 className="font-display mt-5 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
              The journey from foundation to full-spectrum partner.
            </h2>
          </div>
          </RevealLeft>
          <RevealRight>
          <p className="max-w-md mt-15 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
            A chronological roadmap of strategic capability expansion,
            international licensing, and in-house technology architecture.
          </p>
          </RevealRight>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-[hsl(var(--border))]" />

        {/* Desktop Timeline */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-3 h-[2px] bg-[hsl(var(--primary)/.18)]" />
          <motion.div
            className="absolute left-0 right-0 top-3 h-[2px] origin-left bg-[hsl(var(--accent))]"
            variants={lineVariantsX}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />

          <div className="grid grid-cols-6 gap-8">
            {milestones.map((item, index) => (
              <div key={item.year}>
                <motion.div
                  custom={index}
                  variants={timelineDotVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative z-10 h-6 w-6 rounded-full border-2 ${
                    item.active
                      ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent))]"
                      : "border-[hsl(var(--accent))] bg-white"
                  }`}
                >
                  <div
                    className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      item.active
                        ? "bg-white"
                        : "bg-[hsl(var(--accent))]"
                    }`}
                  />
                </motion.div>

                <motion.div
                  custom={index}
                  variants={timelineItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="mt-8"
                >
                  <h3
                    className={`text-3xl font-bold ${
                      item.active
                        ? "text-[hsl(var(--accent))]"
                        : "text-[hsl(var(--primary))]"
                    }`}
                  >
                    {item.year}
                  </h3>

                  <h4 className="mt-3 text-xl font-bold text-[hsl(var(--primary))]">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                    {item.description}
                  </p>

                  {/* <div className="mt-5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                    <span className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                      {item.tag}
                    </span>
                  </div> */}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Timeline */}
        <div className="relative mt-16 lg:hidden">
          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-[hsl(var(--primary)/.15)]" />
          <motion.div
            className="absolute left-[11px] top-0 bottom-0 w-[2px] origin-top bg-[hsl(var(--accent))]"
            variants={lineVariantsY}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          />

          <div className="space-y-10">
            {milestones.map((item, index) => (
              <div key={item.year} className="relative pl-12">
                <motion.div
                  custom={index}
                  variants={timelineDotVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`absolute left-0 top-1 h-6 w-6 rounded-full border-2 ${
                    item.active
                      ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent))]"
                      : "border-[hsl(var(--accent))] bg-white"
                  }`}
                >
                  <div
                    className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      item.active
                        ? "bg-white"
                        : "bg-[hsl(var(--accent))]"
                    }`}
                  />
                </motion.div>

                <motion.div
                  custom={index}
                  variants={timelineItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h3
                    className={`text-2xl font-bold ${
                      item.active
                        ? "text-[hsl(var(--accent))]"
                        : "text-[hsl(var(--primary))]"
                    }`}
                  >
                    {item.year}
                  </h3>

                  <h4 className="mt-2 text-xl font-bold text-[hsl(var(--primary))]">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                    <span className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                      {item.tag}
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}