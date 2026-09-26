import { SectionLabel } from "../shared/SectionLabel";
import { motion, type Variants } from "framer-motion";

const stats = [
  {
    label: "REGIONAL FOCUS",
    value: "India & GCC",
    title: "Active Operations",
    description:
      "Dedicated local presence in Saudi Arabia, UAE, Bahrain, Oman, and India.",
  },
  {
    label: "EXPERIENCE",
    value: "10+ Years",
    title: "Industry Proven",
    description:
      "Guiding founders and established enterprises through cross-border growth.",
  },
  {
    label: "STATUTORY ACCURACY",
    value: "100%",
    title: "Compliant Filings",
    description:
      "Flawless adherence to GST, ZATCA e-invoicing, FTA Corporate Tax, and VAT rules.",
    accent: true,
  },
  {
    label: "TRUSTED BY",
    value: "500+",
    title: "Clients Served",
    description:
      "From fast-growing retail outlets to multi-entity trading firms across the region.",
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

export function ServicesStatsSection() {
  return (
    <section className="bg-[#f6f5f4] py-10">
      <div className="container-tajin">
        <motion.div
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              variants={cardItemVariants}
              className="rounded-3xl border border-[hsl(var(--primary)/.08)] bg-white p-6 md:p-8"
            >
              {/* <p className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                {item.label}
              </p> */}

              <h3
                className={`mt-2 font-display text-5xl font-extrabold leading-none tracking-[-.06em] md:text-6xl ${
                  item.accent
                    ? "text-[hsl(var(--accent))]"
                    : "text-[hsl(var(--primary))]"
                }`}
              >
                {item.value}
              </h3>

              <h4 className="mt-4 text-2xl font-bold text-[hsl(var(--primary))]">
                {item.title}
              </h4>

              <p className="mt-3 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}