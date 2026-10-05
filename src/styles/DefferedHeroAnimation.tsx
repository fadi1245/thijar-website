import { useEffect, useRef, useState } from "react";

interface DeferredHeroAnimationProps {
  className?: string;
}

type HeroAnimationComponent = React.ComponentType<{ className?: string;
    onReady?: () => void;
 }>;

let heroPromise: Promise<HeroAnimationComponent> | null = null;
const loadHero = () =>
  (heroPromise ??= import("@/styles/three").then((m) => m.default));

/**
 * Static stand-in sized to match the 3D scene:
 * the card takes roughly a third of the box, centred, with a soft glow
 * that stays well inside the bounds.
 */
function HeroPoster() {
  return (
    <svg
      viewBox="-5.5 -5.5 11 11"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="-1.75" y="-1.75" width="3.5" height="3.5" rx="0.42" fill="#4aa3ff" opacity="0.35" />
      <rect x="-1.7" y="-1.7" width="3.4" height="3.4" rx="0.38" fill="#0b4fae" />
      <g fill="#fff">
        <rect x="-0.975" y="-1.085" width="1.25" height="0.41" />
        <rect x="-0.225" y="-0.675" width="0.49" height="1.85" />
        <rect x="0.54" y="-1.085" width="0.48" height="0.41" />
      </g>
    </svg>
  );
}

function observe(
  el: Element,
  rootMargin: string,
  onHit: () => void
): () => void {
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      onHit();
      io.disconnect();
    },
    { rootMargin, threshold: 0 }
  );
  io.observe(el);
  return () => io.disconnect();
}

export default function DeferredHeroAnimation({
  className,
}: DeferredHeroAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [HeroAnimation, setHeroAnimation] =
    useState<HeroAnimationComponent | null>(null);
  const [near, setNear] = useState(false); // within 600px
  const [inView, setInView] = useState(false); // actually visible
  const [settled, setSettled] = useState(false); // hero finished animating
  const [ready, setReady] = useState(false);

  // 1. Start downloading right after page load
  useEffect(() => {
    let cancelled = false;
    const start = () =>
      loadHero()
        .then((C) => !cancelled && setHeroAnimation(() => C))
        .catch((e) => console.error("Failed to load Three.js:", e));

    const run = () => window.setTimeout(start, 300);
    let t = 0;
    if (document.readyState === "complete") t = run();
    else {
      const onLoad = () => (t = run());
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        cancelled = true;
        window.removeEventListener("load", onLoad);
        clearTimeout(t);
      };
    }
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  // 2. Hero "settled" gate: ~1s after load
  useEffect(() => {
    let t = 0;
    const go = () => (t = window.setTimeout(() => setSettled(true), 1000));
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      clearTimeout(t);
    };
  }, []);

  // 3. Two observers: early (600px) and real (visible)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const a = observe(el, "600px 0px", () => setNear(true));
    const b = observe(el, "0px", () => setInView(true));
    return () => {
      a();
      b();
    };
  }, []);

  // If the user is already looking at the section, mount right away.
  // Mount rule: never mount WHILE the reveal animation is playing.
  //  - not in view yet: pre-warm once near + settled (during the hero)
  //  - arrived early (fast scroll): wait for the reveal to finish first
  const REVEAL_MS = 900; // set this to your RevealRight duration + a little
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (mount || !HeroAnimation) return;

    if (inView) {
      const t = window.setTimeout(() => setMount(true), REVEAL_MS);
      return () => clearTimeout(t);
    }
    if (near && settled) setMount(true);
  }, [mount, HeroAnimation, inView, near, settled]);

  const shouldMount = mount && !!HeroAnimation;
  // 4. Cross-fade poster -> live canvas
  // 4. Fade the live canvas in on top of the poster.
  //    Wait ~300ms after mount so the first WebGL frames are drawn.
  useEffect(() => {
    if (!shouldMount) return;
    const t = window.setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(t);
  }, [shouldMount]);

  // 5. Remove the poster only after the canvas has fully faded in.
  const [posterGone, setPosterGone] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setPosterGone(true), 800); // > duration-700
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      {/* Poster stays solid underneath until the 3D is fully visible */}
      {!posterGone && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <HeroPoster />
        </div>
      )}

      {shouldMount && HeroAnimation && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <HeroAnimation className="h-full w-full"
          onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}