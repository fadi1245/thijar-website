import { useSyncExternalStore } from "react";

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

/**
 * full -> desktop: keep the rich animations
 * lite -> mobile/tablet: opacity + small translateY only
 * none -> user prefers reduced motion: opacity only / no movement
 */
export function useMotionMode(): MotionMode {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reduced = useMediaQuery(REDUCED_QUERY);
  if (reduced) return "none";
  return isMobile ? "lite" : "full";
}