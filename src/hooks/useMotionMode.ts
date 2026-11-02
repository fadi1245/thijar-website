import { useState, useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 1023px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false // server snapshot (not used in a Vite SPA, but safe)
  );
}

/** True below Tailwind's `lg` breakpoint (1024px). */
export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY);
}

export type MotionMode = "full" | "lite" | "none";

function readMotionMode(): MotionMode {
  if (window.matchMedia(REDUCED_QUERY).matches) return "none";
  return window.matchMedia(MOBILE_QUERY).matches ? "lite" : "full";
}

/**
 * full -> desktop: keep the rich animations
 * lite -> mobile/tablet: opacity + small translateY only
 * none -> user prefers reduced motion: opacity only / no movement
 *
 * The mode is decided ONCE, when the component mounts, and never changes
 * while it stays mounted. Framer Motion only reads `initial` on mount, so
 * switching mode later (window resize, browser zoom, device toolbar,
 * rotating a tablet) would leave elements stuck at their old starting
 * offset (e.g. translateX(-100px)). It is re-read on the next mount, e.g.
 * after navigating to another page or reloading.
 */
export function useMotionMode(): MotionMode {
  const [mode] = useState<MotionMode>(readMotionMode);
  return mode;
}