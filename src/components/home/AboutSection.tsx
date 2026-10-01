import {
  ArrowUpRight,
  Calculator,
  // CheckCircle2,
  ClipboardList,
  Cpu,
  LifeBuoy,
  Rocket,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Calculator,
    title: "Financial specialists",
    text: "Accountants, auditors and tax professionals who care about the detail, so your numbers stand up to scrutiny.",
  },
  {
    icon: Cpu,
    title: "Technology teams",
    text: "Engineers and ERP consultants who turn finance and operations into systems that actually work.",
  },
  {
    icon: ShieldCheck,
    title: "Accountable delivery",
    text: "Clear scope, clear timelines and one team that answers for the outcome.",
  },
  {
    icon: Users,
    title: "A team that stays close",
    text: "Direct access to the people doing the work, from the first conversation to long after go-live.",
  },
];

const steps = [
  {
    icon: Search,
    title: "Understand",
    text: "We learn your business, your goals and your pain points before recommending anything.",
  },
  {
    icon: ClipboardList,
    title: "Plan",
    text: "A practical roadmap with clear priorities, ownership and milestones.",
  },
  {
    icon: Rocket,
    title: "Deliver",
    text: "Specialists get to work with regular updates, so you always know where things stand.",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    text: "We stay on hand as you grow, refining processes and systems over time.",
  },
];

const clients = [
  "Growing companies setting up their first books",
  "Established businesses tightening compliance and reporting",
  "Multi-market operations rolling out an ERP",
  "Founders forming and structuring new companies",
];

const services = [
  "Accounting",
  "Taxation",
  "Auditing",
  "Company Formation",
  "Compliance",
  "Business Consulting",
  "ERP & Technology",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export function AboutSection() {
  return (
    <section className="container-tajin py-24 md:py-32">
      {/* ------------------------------ intro ------------------------------ */}
      <div className="grid gap-14 md:grid-cols-[.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="reveal">
            <span className="inline-flex items-center rounded-full bg-[hsl(var(--accent)/.12)] px-3 py-1 font-mono-brand text-[10px] font-semibold tracking-[.16em] text-[hsl(var(--accent))]">
              THE THIJAR APPROACH
            </span>
            <h2 className="font-display mt-6 max-w-md text-4xl font-extrabold leading-[1.02] tracking-[-.055em] text-[hsl(var(--primary))] md:text-5xl">
              Business clarity for your most important moves.
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="reveal reveal-delay-1">
            <p className="max-w-[620px] text-xl leading-8 text-[hsl(var(--foreground)/.78)]">
              THIJAR brings the right people into the room — financial
              specialists who understand the detail, and technology teams who
              know how to turn it into progress.
            </p>
            <p className="mt-6 max-w-[570px] text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
              From a growing company&apos;s first books to a multi-market
              operation&apos;s ERP rollout, we make complexity more useful.
              Clear advice. Accountable delivery. A team that stays close.
            </p>
            <Link
              to="/about-us"
              className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] underline decoration-[hsl(var(--accent)/.45)] decoration-2 underline-offset-8 hover:text-[hsl(var(--accent))]"
              data-testid="link-home-about"
            >
              See how we work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ----------------------------- pillars ----------------------------- */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
        {pillars.map(({ icon: Icon, title, text }, i) => (
          <motion.article
            key={title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="group rounded-2xl border border-[hsl(var(--primary)/.12)] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[hsl(var(--accent)/.5)] hover:shadow-md"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent)/.12)] text-[hsl(var(--accent))] transition group-hover:bg-[hsl(var(--accent))] group-hover:text-white">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-5 text-lg font-bold tracking-[-.02em] text-[hsl(var(--primary))]">
              {title}
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-[hsl(var(--muted-foreground))]">
              {text}
            </p>
          </motion.article>
        ))}
      </div>

      {/* ------------------------ how we work + who ------------------------ */}


      {/* ----------------------------- services ---------------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-10 flex flex-col gap-5 rounded-2xl border border-[hsl(var(--primary)/.12)] bg-white px-6 py-6 md:flex-row md:items-center md:gap-8 md:px-8"
      >
        <span className="shrink-0 font-mono-brand text-[10px] font-semibold tracking-[.16em] text-[hsl(var(--accent))]">
          ONE TEAM, MANY DISCIPLINES
        </span>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-[hsl(var(--primary)/.06)] px-3.5 py-1.5 text-[13px] font-semibold text-[hsl(var(--primary))]"
            >
              {service}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}