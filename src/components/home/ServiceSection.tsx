import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { services } from "@/data/siteData";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export function ServiceSection() {
  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hoveredIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveService((current) => (current + 1) % services.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handlePointerEnter = (index: number) => {
    hoveredIndexRef.current = index;
    setIsPaused(true);
    setActiveService(index);
  };

  const handlePointerLeave = (index: number) => {
    // only resume if we're leaving the tab that's currently tracked as hovered
    // (guards against stale leave events firing after a fast enter on another tab)
    if (hoveredIndexRef.current === index) {
      hoveredIndexRef.current = null;
      setIsPaused(false);
    }
  };

  return (
    <section className="bg-[#eaf5f6] py-24 md:py-32">
      <div className="container-tajin">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <SectionLabel>WHAT WE DO</SectionLabel>
            <h2 className="font-display mt-5 max-w-xl text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
            Financial precision meets technical momentum.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">
          Connected services spanning core financial foundations, enterprise systems, and product deployment.
          </p>
        </div>
        <div className="mt-14 flex flex-col border-t border-[hsl(var(--primary)/.14)] md:flex-row">
          {services.map(
            ({ id, number, title, description, icon: Icon }, index) => {
              const isActive = activeService === index;

              return (
                <Link
                  key={id}
                  to={id === "erp" ? "/erp" : "/contact-us"}
                  onPointerEnter={() => handlePointerEnter(index)}
                  onPointerLeave={() => handlePointerLeave(index)}
                  onPointerDown={() => handlePointerEnter(index)}
                  onFocus={() => handlePointerEnter(index)}
                  onBlur={() => handlePointerLeave(index)}
                  className={`focus-ring group overflow-hidden border-b border-[hsl(var(--primary)/.14)] py-7 transition-colors duration-300 ease-out hover:bg-white/45 md:min-w-0 md:flex-1 md:border-b-0 md:border-r md:px-5 md:last:border-r-0 ${isActive ? "bg-white/35 md:flex-[2]" : "md:flex-[1]"}`}
                  data-testid={`link-service-${id}`}
                  data-active={isActive}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div className="flex items-start justify-between">
                    {/* <span className="font-mono-brand text-[10px] text-[hsl(var(--accent))]">
                      {number}
                    </span> */}
                    <Icon
                      className={`h-6 w-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 ${isActive ? "text-[hsl(var(--accent))]" : "text-[hsl(var(--primary)/.55)]"}`}
                      strokeWidth={1.6}
                    />
                  </div>
                  <h3 className="mt-9 min-h-[2.8rem] font-display text-xl font-bold leading-tight text-[hsl(var(--primary))]">
                    {title}
                  </h3>
                  <p className="mt-3 min-h-[6rem] text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                    {description}
                  </p>
                  <ArrowUpRight
                    className={`mt-6 h-4 w-4 text-[hsl(var(--accent))] transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  />
                </Link>
              );
            },
          )}
        </div>

        <div className="mt-12 flex justify-center md:justify-start">
          <Link
            to="/"
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/.25)] px-6 py-3 text-sm font-semibold text-[hsl(var(--primary))] transition-colors duration-300 hover:bg-[hsl(var(--primary))] hover:text-white"
            data-testid="link-explore-services"
          >
            Explore Services
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}