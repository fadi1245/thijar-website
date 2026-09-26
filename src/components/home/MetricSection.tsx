import { MetricCounter } from "../sections/MetricCounter";
import { SectionLabel } from "../shared/SectionLabel";
import { successMetrics } from "@/data/siteData";
import { motion } from "framer-motion";


export function MetricSection() {
  return (
    <section
      className="bg-[#eaf5f6] py-20 md:py-24"
      aria-label="TAJIN success metrics"
    >
      <div className="container-tajin">
      <motion.div
          initial={{opacity:0, x:-100}}
          whileInView={{opacity:1, x:0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.6}}
          >
        <div className="grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-end">

          <div>
            <h2 className="font-display mt-5 max-w-sm text-3xl font-extrabold leading-[1.04] tracking-[-.05em] text-[hsl(var(--primary))] md:text-4xl">
              The numbers behind the partnership.
            </h2>
          </div>
          <p className="max-w-lg text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
            A growing network, trusted relationships, and a team built to keep
            business moving across markets.
          </p>
        </div>
        </motion.div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-8">
          {successMetrics.map((metric) => (
            <MetricCounter key={metric.label} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
