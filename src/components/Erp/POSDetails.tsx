import {
    AlertTriangle,
    ArrowRight,
    Banknote,
    Barcode,
    LayoutGrid,
    Pause,
    Undo2,
  } from "lucide-react";
  import { SectionLabel } from "../shared/SectionLabel";
  import { RevealLeft, RevealRight } from "@/lib/revealAnimation";
  import posImage from "../../assets/images/pos-screen.png";
  
  /* ---------- Content ---------- */
  
  const features = [
    {
      icon: LayoutGrid,
      title: "Touch-first item grid",
      text: "One-tap product tiles with price badges and category filters, built for fast counters.",
    },
    {
      icon: Barcode,
      title: "Barcode and quick search",
      text: "Scan or type a code and the line is added instantly, with quantity controls beside it.",
    },
    {
      icon: Pause,
      title: "Hold and recall bills",
      text: "Park a basket, serve the next shopper, and bring the first bill back when they return.",
    },
    {
      icon: AlertTriangle,
      title: "Low-stock flags at the till",
      text: "Items running short are marked right on their tile, so cashiers see it before the shelf is empty.",
    },
    {
      icon: Banknote,
      title: "Fast tender and printing",
      text: "Cash received, balance, discount, tax and round off in one place, then Save & Print.",
    },
    {
      icon: Undo2,
      title: "Returns, reprints, price override",
      text: "Handle sales returns, reprint past invoices and adjust a price without leaving the screen.",
    },
  ];
  
  /* ---------- Section ---------- */
  
  export function PosSection() {
    return (
      <section
        className="overflow-hidden bg-[#eaf5f6] py-20 md:py-28"
        aria-label="TAJIN POS"
      >
        <div className="container-tajin">
          {/* Header: title left, description + CTA right */}
          <RevealLeft>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
              <div>
                <SectionLabel>POINT OF SALE / SEPARATE PRODUCT</SectionLabel>
                <h2 className="font-display mt-6 max-w-xl text-4xl font-extrabold leading-[1.02] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
                  A checkout counter that keeps up with the queue.
                </h2>
              </div>
              <div className="max-w-sm">
                <p className="text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
                  Our POS is a standalone product you can run on its own at the
                  counter, or connect to the ERP so every sale updates stock,
                  accounts, and reports.
                </p>
                <a
                  href="/contact"
                  className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] hover:opacity-70"
                >
                  Request a POS demo <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </RevealLeft>
  
          {/* Screen: full width, so nothing sits next to it to leave a gap */}
          <RevealLeft>
            <div className="mt-12 overflow-hidden rounded-2xl border border-[hsl(var(--primary)/0.15)] bg-white shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.45)] md:mt-14">
              <img
                src={posImage}
                alt="TAJIN POS sales screen with supermarket items"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </RevealLeft>
  
          {/* Features: 3 x 2 grid of equal cards */}
          <RevealRight>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="rounded-2xl border border-[hsl(var(--primary)/0.1)] bg-white p-6"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--accent))]">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display mt-5 text-base font-extrabold tracking-[-.02em] text-[hsl(var(--primary))]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </RevealRight>
        </div>
      </section>
    );
  }