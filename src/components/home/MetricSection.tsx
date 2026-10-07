import { MetricCounter } from "../sections/MetricCounter";
import { successMetrics } from "@/data/siteData";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export function MetricSection() {
  const reduce = useReducedMotion();

  // One orchestrated reveal: heading first, then the metric panel,
  // then each metric in turn. Skipped entirely for reduced-motion users.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const item: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section
      className="bg-[#eaf5f6] py-12 md:py-18"
      aria-label="TAJIN success metrics"
    >
      <motion.div
        className="container-tajin"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Heading row */}
        <motion.div
          variants={item}
          className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end md:gap-16"
        >
          <h2 className="font-display max-w-xl text-3xl font-extrabold leading-[1.04] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
          Real impact, proven by our numbers.
          </h2>
          <p className="max-w-sm text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
          A growing network of trusted clients and an expert team keeping operations running smoothly everywhere.
          </p>
        </motion.div>

        {/* Metric panel: one surface, figures separated by dividers */}
        <motion.div
          variants={item}
          className="mt-10 overflow-hidden rounded-3xl border border-[hsl(var(--primary)/0.12)] bg-white md:mt-14"
        >
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {successMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                variants={item}
                className={[
                  "px-6 py-8 md:px-8 md:py-12",
                  // vertical divider between columns
                  i % 2 === 1 ? "border-l" : "",
                  i > 0 ? "md:border-l" : "md:border-l-0",
                  // horizontal divider between mobile rows
                  i >= 2 ? "border-t md:border-t-0" : "",
                  "border-[hsl(var(--primary)/0.12)]",
                ].join(" ")}
              >
                <MetricCounter {...metric} />
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}