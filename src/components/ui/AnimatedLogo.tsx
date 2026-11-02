import { useEffect, useId, useRef, useState } from "react";
import { useMotionMode } from "@/hooks/useMotionMode";
import "./AnimatedLogo.css";

/* -------------------------------------------------------------------------- */
/*  Palette (same blues as the old 3D scene)                                  */
/* -------------------------------------------------------------------------- */
const C = {
  rim: "#4aa3ff",
  body: "#0b4fae",
  bodyLight: "#1b6fe0",
  ring: "#2f7bff",
  ringCore: "#4b95ff",
  bead: "#d8f0ff",
  glass: "#2a6be0",
  orb: "#3b82f6",
  glow: "#8cc8ff",
};

/* -------------------------------------------------------------------------- */
/*  Static layout data (1 old 3D unit = 50px in this 600x600 canvas)          */
/* -------------------------------------------------------------------------- */
const CX = 300;
const CY = 300;
const RING_RX = 185;
const RING_RY = 75;

// x, y, size, animation duration (s), delay (s)
const SQUARES: [number, number, number, number, number][] = [
  [115, 225, 37, 9, 0],
  [490, 395, 42, 11, -3],
  [65, 410, 25, 8, -5],
  [525, 190, 22, 10, -2],
  [425, 150, 15, 12, -6],
];

// x, y, radius, animation duration (s), delay (s)
const ORBS: [number, number, number, number, number][] = [
  [165, 350, 8.5, 7, 0],
  [415, 170, 6.5, 8, -3],
  [240, 150, 4.5, 6, -2],
];

// deterministic pseudo-random so the layout is identical on every render
function seeded(seed: number) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}
const rand = seeded(7);
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  x: 20 + rand() * 560,
  y: 20 + rand() * 560,
  r: 1 + rand() * 2,
  dur: 3 + rand() * 4,
  delay: -rand() * 5,
  twinkle: i % 2 === 0,
}));

const BEAD_PATH = `M ${-RING_RX} 0 A ${RING_RX} ${RING_RY} 0 0 1 ${RING_RX} 0 A ${RING_RX} ${RING_RY} 0 0 1 ${-RING_RX} 0`;

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */
function Bead({ glowId }: { glowId: string }) {
  return (
    <g>
      <circle r="14" fill={`url(#${glowId})`}>
        <animateMotion dur="9s" repeatCount="indefinite" path={BEAD_PATH} />
      </circle>
      <circle r="4" fill={C.bead}>
        <animateMotion dur="9s" repeatCount="indefinite" path={BEAD_PATH} />
      </circle>
    </g>
  );
}

/** The tilted orbit ring is drawn twice: its back half behind the card, its front half in front */
function RingHalf({ half }: { half: "back" | "front" }) {
  const d =
    half === "back"
      ? `M ${-RING_RX} 0 A ${RING_RX} ${RING_RY} 0 0 1 ${RING_RX} 0`
      : `M ${-RING_RX} 0 A ${RING_RX} ${RING_RY} 0 0 0 ${RING_RX} 0`;
  return (
    <>
      <path d={d} fill="none" stroke={C.ring} strokeOpacity=".14" strokeWidth="9" strokeLinecap="round" />
      <path d={d} fill="none" stroke={C.ringCore} strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Illustration                                                              */
/* -------------------------------------------------------------------------- */
function LogoIllustration() {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${uid}-${n}`;

  return (
    <svg
      viewBox="0 0 600 600"
      className="h-auto w-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={id("halo")}>
          <stop offset="0" stopColor={C.glow} stopOpacity=".55" />
          <stop offset=".45" stopColor="#2878ff" stopOpacity=".18" />
          <stop offset="1" stopColor="#003cc8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("floor")}>
          <stop offset="0" stopColor={C.glow} stopOpacity=".9" />
          <stop offset=".35" stopColor="#2878ff" stopOpacity=".45" />
          <stop offset="1" stopColor="#003cc8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("bead")}>
          <stop offset="0" stopColor={C.glow} stopOpacity=".9" />
          <stop offset="1" stopColor={C.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("body")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.bodyLight} />
          <stop offset="1" stopColor={C.body} />
        </linearGradient>
        <linearGradient id={id("gloss")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* ring frame: upper half is "behind" the card, lower half "in front" */}
        <clipPath id={id("clip-back")}>
          <rect x="-260" y="-120" width="520" height="120" />
        </clipPath>
        <clipPath id={id("clip-front")}>
          <rect x="-260" y="0" width="520" height="120" />
        </clipPath>
      </defs>

      {/* drifting particles */}
      {PARTICLES.map((p, i) => (
        <circle
          key={i}
          className={`lg-extra ${p.twinkle ? "lg-twinkle" : "lg-drift"}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={C.orb}
          opacity=".55"
          style={{ animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        />
      ))}

      {/* pulsing floor glow */}
      <ellipse
        className="lg-extra lg-glow"
        cx={CX}
        cy={427}
        rx="175"
        ry="40"
        fill={`url(#${id("floor")})`}
      />

      {/* ring: back half + bead behind the card */}
      <g transform={`translate(${CX} ${CY}) rotate(-7)`}>
        <RingHalf half="back" />
        <g clipPath={`url(#${id("clip-back")})`}>
          <Bead glowId={id("bead")} />
        </g>
      </g>

      {/* logo card */}
      <g transform={`translate(${CX} ${CY})`}>
        <g className="lg-card">
          <circle r="175" fill={`url(#${id("halo")})`} />
          <rect x="-87.5" y="-87.5" width="175" height="175" rx="22" fill={C.rim} opacity=".4" />
          <rect x="-85" y="-85" width="170" height="170" rx="19" fill={`url(#${id("body")})`} />
          <rect x="-85" y="-85" width="170" height="85" rx="19" fill={`url(#${id("gloss")})`} />
          {/* "T" mark: bar, stem and small square */}
          <g fill="#fff">
            <rect x="-48.75" y="-54.25" width="62.5" height="20.5" />
            <rect x="-11.25" y="-33.75" width="24.5" height="92.5" />
            <rect x="27" y="-54.25" width="24" height="20.5" />
          </g>
        </g>
      </g>

      {/* ring: front half + bead in front of the card */}
      <g transform={`translate(${CX} ${CY}) rotate(-7)`}>
        <RingHalf half="front" />
        <g clipPath={`url(#${id("clip-front")})`}>
          <Bead glowId={id("bead")} />
        </g>
      </g>

      {/* glass squares */}
      {SQUARES.map(([x, y, s, dur, delay], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <g className="lg-extra lg-drift" style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
            <rect x={-s * 0.54} y={-s * 0.54} width={s * 1.08} height={s * 1.08} rx={s * 0.22} fill={C.rim} opacity=".3" />
            <rect x={-s / 2} y={-s / 2} width={s} height={s} rx={s * 0.2} fill={C.glass} opacity=".3" />
          </g>
        </g>
      ))}

      {/* small orbs */}
      {ORBS.map(([x, y, r, dur, delay], i) => (
        <circle
          key={i}
          className="lg-extra lg-orb"
          cx={x}
          cy={y}
          r={r}
          fill={C.orb}
          opacity=".55"
          style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Public component                                                          */
/* -------------------------------------------------------------------------- */
/**
 * Pure SVG + CSS replacement for the old Three.js logo scene.
 *  - everything pauses while it is off-screen (or with reduced motion)
 *  - on phones/tablets only the card float and the orbit bead keep moving;
 *    the extras (particles, squares, orbs, glow) are frozen
 */
export function AnimatedLogo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const mode = useMotionMode();
  const paused = !visible || mode === "none";
  const lite = mode !== "full";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the orbit beads are SMIL <animateMotion>, which CSS cannot pause
  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    if (paused) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused]);

  return (
    <div
      ref={ref}
      data-paused={paused}
      data-lite={lite}
      className={`lg-wrap ${className}`}
    >
      <LogoIllustration />
    </div>
  );
}

export default AnimatedLogo;