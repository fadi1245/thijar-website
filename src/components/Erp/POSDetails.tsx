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
import { RevealLeft} from "@/lib/revealAnimation";
import posImage from "../../assets/images/pos-screen.png";
import { useEffect, useRef, useState, type ReactNode } from "react";

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

function RevealCard({
  index,
  children,
  className = "",
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      style={{ transitionDelay: shown ? `${(index % 3) * 90}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </li>
  );
}

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

        {/* Screen: original, unchanged */}
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

        {/* Features: 2 columns on mobile, 2 on sm, 3 on lg.
              No reveal wrapper, so nothing can stay hidden. */}
        <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <RevealCard
              key={title}
              index={i}
              className="rounded-xl border border-[hsl(var(--primary)/0.1)] bg-white p-3 sm:rounded-2xl sm:p-6"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--accent))] sm:h-10 sm:w-10 sm:rounded-xl">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.6} />
              </span>
              <h3 className="font-display mt-3 text-[13px] font-extrabold leading-tight tracking-[-.02em] text-[hsl(var(--primary))] sm:mt-5 sm:text-base">
                {title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-[1.45] text-[hsl(var(--muted-foreground))] sm:mt-2 sm:text-sm sm:leading-6">
                {text}
              </p>
            </RevealCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
