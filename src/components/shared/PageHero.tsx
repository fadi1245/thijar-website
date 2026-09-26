import { SectionLabel } from "../shared/SectionLabel";
import { motion } from "framer-motion";

export function PageHero({
  label,
  title,
  text,
  image,
  imageAlt,
}: {
  label: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="hero-slice relative h-[600px] overflow-hidden bg-[hsl(var(--primary))] text-white sm:h-[640px] lg:h-[700px]">
      <div className="hero-grid absolute inset-0 opacity-35" />
      <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10 bg-[hsl(var(--accent)/.12)] md:h-96 md:w-96" />

      <div className="container-tajin relative flex h-full items-center">
        <div className="flex w-full items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* Left Content */}
            <div
              className={
                image ? "w-full max-w-2xl lg:max-w-xl" : "w-full max-w-4xl"
              }
            >
              {/* <SectionLabel light>{label}</SectionLabel> */}
              <h1 className="font-display mt-7 text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-.02em] text-balance">
                {title}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-6 text-white/66 md:text-[17px]">
                {text}
              </p>
            </div>
          </motion.div>
          {/* Right Image */}

          {image && (
            <motion.div
              className="relative hidden h-[420px] flex-1 lg:block"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <div className="absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm" />
              <img
                src={image}
                alt={imageAlt ?? ""}
                className="absolute inset-0 h-full w-full rounded-3xl object-cover p-2"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
