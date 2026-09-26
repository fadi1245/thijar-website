import { RevealLeft, RevealUp } from "@/lib/revealAnimation";
import { SectionLabel } from "../shared/SectionLabel";
import { motion, type Variants } from "framer-motion";

const taxServices = [
  {
    region: "INDIA",
    title: "GST & Income Tax",
    description:
      "Timely monthly GST filings (GSTR-1 & 3B), TDS returns, annual reconciliations, and corporate tax assistance.",
    tag: "FILINGS & REFUNDS",
  },
  {
    region: "SAUDI ARABIA",
    title: "ZATCA VAT & Zakat",
    description:
      "Phase-2 compliant e-invoicing assistance, quarterly VAT returns, Zakat estimations, and portal management.",
    tag: "KSA COMPLIANCE",
  },
  {
    region: "UNITED ARAB EMIRATES",
    title: "Corporate Tax & VAT",
    description:
      "FTA registration, 9% Corporate Tax advisory, free zone relief review, and accurate periodic VAT returns.",
    tag: "UAE FTA COMPLIANT",
  },
  {
    region: "BAHRAIN & OMAN",
    title: "VAT & Tax Portals",
    description:
      "Bahrain NBR 10% VAT returns and Oman Tax Authority filings prepared and submitted accurately.",
    tag: "REGIONAL EXPERTISE",
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

export function TaxConsultationSection() {
  return (
    <section className="py-12 md:py-12">
      <div className="container-tajin">
        <RevealLeft>
        <div className="max-w-5xl">
          {/* <SectionLabel>SERVICE 02</SectionLabel> */}

          <h2 className="font-display mt-5 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
            Straightforward Tax Consultation
          </h2>

          <p className="mt-6 max-w-4xl text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">
            Straightforward corporate tax, VAT, and GST advice across India,
            Saudi Arabia, UAE, Bahrain, and Oman. Practical guidance,
            compliant filings, and regional expertise without unnecessary
            complexity.
          </p>
        </div>
        </RevealLeft>
        <motion.div
          className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {taxServices.map((service) => (
            <motion.div
              key={service.title}
              variants={cardItemVariants}
              className="group flex h-full flex-col rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--accent)/.35)] hover:shadow-lg"
            >
              <span className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--accent))]">
                {service.region}
              </span>

              <h3 className="mt-5 text-2xl font-bold text-[hsl(var(--primary))]">
                {service.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                {service.description}
              </p>

              {/* <div className="mt-8 border-t border-[hsl(var(--border))] pt-5">
                <span className="font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
                  {service.tag}
                </span>
              </div> */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}