import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CareerStatusSection() {
    return (
      <section className="bg-[#eaf5f6]">
        <div className="container-tajin">
          <div className="rounded-2xl border border-[hsl(var(--primary)/.15)] bg-white px-6 py-14 text-center md:px-10">
            <span className="inline-flex items-center rounded-full bg-[hsl(var(--accent)/.12)] px-3 py-1 font-mono-brand text-[10px] font-semibold tracking-[.16em] text-[hsl(var(--accent))]">
              CURRENT STATUS
            </span>
  
            <h2 className="font-display mt-6 text-3xl font-extrabold tracking-[-.05em] text-[hsl(var(--primary))] md:text-4xl">
              No open positions right now.
            </h2>
  
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
              We are not actively hiring at this moment, but that can change as
              our teams grow. Check back here for future openings, or introduce
              yourself so we can keep your details in mind.
            </p>
          </div>
        </div>
      </section>
    );
  }