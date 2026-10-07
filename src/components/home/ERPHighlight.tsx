import { Link } from "@tanstack/react-router";
import { MotionConfig, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Calculator,
  CheckCircle2,
  Cloud,
  FileText,
  ShieldCheck,
  ShoppingCart,
  Users,
  Zap,
} from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import erpDashboard from "../../assets/images/erpDashboard.png";
import { RevealLeft, RevealRight } from "@/lib/revealAnimation";

const chips = ["Billing", "Accounting", "Inventory", "Reports"];

const points = [
  "One system for invoices, books, stock and reports",
  "Live figures instead of end-of-month surprises",
  "Built to grow as your business and team grow",
];

const modules = [
  {
    icon: FileText,
    title: "Billing & Invoicing",
    text: "Create professional invoices, record payments and keep track of what is still outstanding.",
  },
  {
    icon: Calculator,
    title: "Accounting",
    text: "Receivables, payables and ledgers stay in sync, so your books are always ready for review.",
  },
  {
    icon: Boxes,
    title: "Inventory & Stock",
    text: "Monitor your stock levels, track item movement, and get alerts before items run out.",
  },
  {
    icon: ShoppingCart,
    title: "Purchasing",
    text: "Manage suppliers and purchase orders while keeping a close eye on incoming costs.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    text: "Clear financial and operational reports on demand, from a quick snapshot to a full breakdown.",
  },
  {
    icon: Users,
    title: "Users & Roles",
    text: "Give each team member the right level of access, with a clear record of who did what.",
  },
];

const highlights = [
  {
    icon: Cloud,
    title: "Cloud-based",
    text: "Access your work securely from anywhere—office, home, or on the go, on any device.",
  },
  {
    icon: ShieldCheck,
    title: "Controlled access",
    text: "Role-based permissions keep sensitive data with the right people.",
  },
  {
    icon: Zap,
    title: "Quick to adopt",
    text: "A clean, familiar interface your team can start using without long training.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Scroll-reveal variants                                                    */
/* -------------------------------------------------------------------------- */
const viewport = { once: true, amount: 0.2 } as const;

// parent: staggers its children as it scrolls into view
const stagger = (gap = 0.1, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

// child: fade + rise
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// child: fade + slide in from the left (list rows)
const slideIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// child: fade + scale up (cards, chips)
const popIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ERPHighlight() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--primary))] py-20 text-white md:py-28">
      {/* respects the visitor's "reduce motion" setting */}
      <MotionConfig reducedMotion="user">
        {/* background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(hsl(var(--accent)/.35)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_70%)]"
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[hsl(var(--accent)/.14)] blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[hsl(var(--accent)/.08)] blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-tajin relative">
          {/* ------------------------------ hero ------------------------------ */}
          <div className="grid gap-14 md:grid-cols-[.85fr_1.15fr] md:items-center">
            <RevealLeft>
              <div className="reveal">
                <SectionLabel light>THIJAR ERP</SectionLabel>

                <h2 className="font-display mt-6 max-w-lg text-4xl font-extrabold leading-[1.02] tracking-[-.055em] md:text-6xl">
                  Run the numbers. Move the business.
                </h2>

                <p className="mt-7 max-w-md text-[16px] leading-7 text-white/60">
                  THIJAR ERP brings billing, accounting, stock, and reporting
                  into one easy-to-use platform — so every decision starts from
                  a clearer view of the business.
                </p>

                {/* benefit points: slide in one after another */}
                <motion.ul
                  className="mt-7 space-y-3"
                  variants={stagger(0.15, 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                >
                  {points.map((point) => (
                    <motion.li
                      key={point}
                      variants={slideIn}
                      className="flex items-start gap-3 text-[15px] leading-6 text-white/75"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--accent))]" />
                      {point}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* chips: pop in */}
                <motion.div
                  className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-white/70"
                  variants={stagger(0.08, 0.5)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                >
                  {chips.map((item) => (
                    <motion.span
                      key={item}
                      variants={popIn}
                      className="rounded-full border border-white/15 bg-white/[.06] px-3 py-2"
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>

                {/* <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/erp"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#36afc0]"
                  data-testid="link-home-erp"
                >
                  Explore THIJAR ERP <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#erp-modules"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:bg-white/[.06] hover:text-white"
                >
                  See what&apos;s inside
                </a>
              </div> */}
              </div>
            </RevealLeft>

            <RevealRight>
              <div className="reveal reveal-delay-1 relative">
                <div className="absolute -inset-4 rounded-[28px] bg-[hsl(var(--accent)/.14)] blur-2xl" />

                {/* dashboard: scales up gently as it arrives */}
                <motion.div
                  className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-2 shadow-[0_22px_60px_rgba(0,0,0,.2)]"
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                >
                  <img
                    src={erpDashboard}
                    alt="THIJAR ERP financial dashboard showing receivables, payables, stock, and business reports"
                    className="w-full rounded-xl object-cover"
                  />
                </motion.div>

                {/* floating UI cards (decorative) */}
                {/* <div className="absolute -left-2 -top-5 hidden items-center gap-3 rounded-xl bg-white p-3 pr-5 text-[hsl(var(--primary))] shadow-xl sm:flex md:-left-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--accent)/.15)] text-[hsl(var(--accent))]">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[13px] font-bold leading-4">
                    Invoice paid
                  </span>
                  <span className="block text-[11px] text-[hsl(var(--muted-foreground))]">
                    Receivables updated
                  </span>
                </span>
              </div> */}

                {/* <div className="absolute -bottom-6 -right-2 hidden w-48 rounded-xl bg-white p-3 text-[hsl(var(--primary))] shadow-xl sm:block md:-right-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary)/.08)]">
                    <Boxes className="h-4 w-4" />
                  </span>
                  <span className="text-[13px] font-bold leading-4">
                    Stock level
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--primary)/.1)]">
                  <div className="h-full w-2/3 rounded-full bg-[hsl(var(--accent))]" />
                </div>
                <span className="mt-2 block text-[11px] text-[hsl(var(--muted-foreground))]">
                  Reorder suggested soon
                </span>
              </div> */}
              </div>
            </RevealRight>
          </div>

          {/* ----------------------------- modules ---------------------------- */}
          <div id="erp-modules" className="mt-24 scroll-mt-24 md:mt-32">
            {/* heading block */}
            <motion.div
              className="mx-auto max-w-2xl text-center"
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel light>WHAT&apos;S INSIDE</SectionLabel>
              </motion.div>
              <motion.h3
                variants={fadeUp}
                className="font-display mt-6 text-3xl font-extrabold leading-[1.05] tracking-[-.05em] md:text-5xl"
              >
                Every part of your operations, connected.
              </motion.h3>
              <motion.p
                variants={fadeUp}
                className="mt-5 text-[15px] leading-7 text-white/60"
              >
                Each module works on the same live data, so a sale, a purchase
                or a payment shows up everywhere it matters — with no double
                entry.
              </motion.p>
            </motion.div>

            {/* module cards: staggered pop-in */}
            <motion.div
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {modules.map(({ icon: Icon, title, text }) => (
                <motion.article
                  key={title}
                  variants={popIn}
                  className="group rounded-2xl border border-white/10 bg-white/[.05] p-6 transition duration-200 hover:-translate-y-1 hover:border-[hsl(var(--accent)/.5)] hover:bg-white/[.08]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent)/.15)] text-[hsl(var(--accent))] transition group-hover:bg-[hsl(var(--accent))] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="font-display mt-5 text-lg font-bold tracking-[-.02em]">
                    {title}
                  </h4>
                  <p className="mt-2 text-[14px] leading-6 text-white/60">
                    {text}
                  </p>
                </motion.article>
              ))}
            </motion.div>

            {/* ---------------------------- highlights --------------------------- */}
            <motion.div
              className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3"
              variants={stagger(0.15)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {highlights.map(({ icon: Icon, title, text }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="flex items-start gap-4 bg-[hsl(var(--primary))] p-6"
                >
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[hsl(var(--accent))]" />
                  <div>
                    <h4 className="text-[15px] font-bold">{title}</h4>
                    <p className="mt-1 text-[13px] leading-6 text-white/55">
                      {text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* -------------------------------- CTA ------------------------------ */}
            <motion.div
              className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[.08] to-white/[.03] p-7 md:flex-row md:items-center md:p-10"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="max-w-xl">
                <h4 className="font-display text-2xl font-extrabold tracking-[-.04em] md:text-3xl">
                  Ready to see it in action?
                </h4>
                <p className="mt-2 text-[15px] leading-7 text-white/60">
                  Take a closer look at how THIJAR ERP can simplify the way your
                  business runs day to day.
                </p>
              </div>
              <Link
                to="/erp"
                className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#36afc0]"
              >
                Explore THIJAR ERP <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}