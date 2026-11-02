import {
  ArrowUpRight,
  Calculator,
  // CheckCircle2,
  // ClipboardList,
  Cpu,
  // LifeBuoy,
  // Rocket,
  // Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
// Adjust this path to wherever you put the hook file
import { useMotionMode } from "../../hooks/useMotionMode";

const pillars = [
  {
    icon: Calculator,
    title: "Financial specialists",
    text: "Accountants, auditors and tax professionals who care about the detail, so your numbers are always audit-ready.",
  },
  {
    icon: Cpu,
    title: "Technology teams",
    text: "Engineers and ERP consultants who turn finance and operations into systems that actually work.",
  },
  {
    icon: ShieldCheck,
    title: "Accountable delivery",
    text: "Clear goals. strict timelines, and a single team that takes full ownership of the result.",
  },
  {
    icon: Users,
    title: "A team that stays close",
    text: "Direct access to the experts doing the work, from day one and long after launch.",
  },
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

export function AboutSection() {
  const mode = useMotionMode();
  const isFull = mode === "full"; // desktop only: keeps the original rich animation

  // Shared fade-up variants. Mobile: small shift, no stagger delay
  // (each card reveals on its own when it enters the viewport).
  const fadeUp = {
    hidden: { opacity: 0, y: isFull ? 28 : mode === "lite" ? 16 : 0 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: isFull ? 0.5 : 0.4,
        delay: isFull ? i * 0.08 : 0,
      },
    }),
  };

  // Intro columns: big horizontal slides on desktop, simple fade-up elsewhere.
  const introInitial = (dir: -1 | 1) =>
    isFull
      ? { opacity: 0, x: 100 * dir }
      : { opacity: 0, y: mode === "lite" ? 20 : 0 };
  const introShow = isFull ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 };
  const introTransition = { duration: isFull ? 0.6 : 0.4 };

  // Lower threshold on mobile so tall stacked blocks reliably trigger.
  const amount = isFull ? 0.2 : 0.1;

  // The CSS .reveal keyframe used to run inside the Framer wrapper (two
  // animations on one subtree). Keep it on desktop only.
  const rv = (extra = "") => (isFull ? `reveal ${extra}`.trim() : "");

  return (
    <section className="container-tajin py-24 md:py-32">
      {/* ------------------------------ intro ------------------------------ */}
      <div className="grid gap-14 md:grid-cols-[.8fr_1.2fr]">
        <motion.div
          initial={introInitial(-1)}
          whileInView={introShow}
          viewport={{ once: true, amount }}
          transition={introTransition}
        >
          <div className={rv()}>
            <span className="inline-flex items-center rounded-full bg-[hsl(var(--accent)/.12)] px-3 py-1 font-mono-brand text-[11px] font-semibold tracking-[.16em] text-[hsl(var(--accent))]">
              THE THIJAR APPROACH
            </span>
            <h2 className="font-display mt-6 max-w-md text-4xl font-extrabold leading-[1.02] tracking-[-.055em] text-[hsl(var(--primary))] md:text-5xl">
            Clear direction for your biggest business decisions.
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={introInitial(1)}
          whileInView={introShow}
          viewport={{ once: true, amount }}
          transition={introTransition}
        >
          <div className={rv("reveal-delay-1")}>
            <p className="max-w-[620px] text-xl leading-8 text-[hsl(var(--foreground)/.78)]">
            THIJAR brings experts together—financial pros who know the numbers and tech teams who build real solutions.
            </p>
            <p className="mt-6 max-w-[570px] text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
            Whether you are setting up early-stage books or launching a global ERP system, we make complex challenges simple and actionable. Straightforward guidance, reliable results, and a partner you can trust.
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
            viewport={{ once: true, amount }}
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
        viewport={{ once: true, amount: isFull ? 0.3 : 0.1 }}
        className="mt-10 flex flex-col gap-5 rounded-2xl border border-[hsl(var(--primary)/.12)] bg-white px-6 py-6 md:flex-row md:items-center md:gap-8 md:px-8"
      >
        <span className="shrink-0 font-mono-brand text-[11px] font-semibold tracking-[.16em] text-[hsl(var(--accent))]">
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