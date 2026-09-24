import { useEffect, useState } from "react";

export function MetricCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const duration = 1500;
      const start = performance.now();
      let frame = 0;
  
      const animate = (timestamp: number) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(value * eased));
        if (progress < 1) frame = window.requestAnimationFrame(animate);
      };
  
      frame = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(frame);
    }, [value]);
  
    return (
      <div className="border-t border-[hsl(var(--primary)/.16)] pt-5">
        <p className="font-display text-5xl font-extrabold tracking-[-.06em] text-[hsl(var(--accent))] md:text-6xl" aria-label={`${value}${suffix} ${label}`}>
          {count}
          <span className="text-3xl md:text-4xl">{suffix}</span>
        </p>
        <p className="mt-3 text-sm font-semibold text-[hsl(var(--primary))]">{label}</p>
      </div>
    );
  }