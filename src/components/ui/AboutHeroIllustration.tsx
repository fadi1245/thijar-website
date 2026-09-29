import { useId } from "react";

/* -------------------------------------------------------------------------- */
/*  Animations (scoped with the "hi-" prefix, no global CSS needed)           */
/* -------------------------------------------------------------------------- */
const CSS = `
.hi-float{animation:hi-float 6s ease-in-out infinite}
@keyframes hi-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

.hi-drift{animation:hi-drift 9s ease-in-out infinite}
@keyframes hi-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,-14px)}}

.hi-flow{stroke-dasharray:4 6;animation:hi-flow 1.6s linear infinite}
@keyframes hi-flow{to{stroke-dashoffset:-20}}

.hi-pulse{transform-box:fill-box;transform-origin:center;animation:hi-pulse 2.6s ease-out infinite}
@keyframes hi-pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(3.4);opacity:0}}

.hi-bar{transform-box:fill-box;transform-origin:bottom;animation:hi-bar 3.4s ease-in-out infinite}
@keyframes hi-bar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.62)}}

.hi-meridian{transform-box:fill-box;transform-origin:center;animation:hi-mer 24s linear infinite}
@keyframes hi-mer{0%,100%{transform:scaleX(1)}25%,75%{transform:scaleX(.71)}50%{transform:scaleX(.02)}}

.hi-spin{transform-box:fill-box;transform-origin:center;animation:hi-spin 40s linear infinite}
@keyframes hi-spin{to{transform:rotate(360deg)}}

.hi-draw{stroke-dasharray:200;animation:hi-draw 5s ease-in-out infinite}
@keyframes hi-draw{0%{stroke-dashoffset:200}60%,100%{stroke-dashoffset:0}}

@media (prefers-reduced-motion:reduce){
  .hi-float,.hi-drift,.hi-flow,.hi-pulse,.hi-bar,.hi-meridian,.hi-spin,.hi-draw{animation:none!important}
}
`;

/* -------------------------------------------------------------------------- */
/*  Palette                                                                   */
/* -------------------------------------------------------------------------- */
const C = {
  navy: "#0b1f4d",
  b700: "#1d4ed8",
  b600: "#2563eb",
  b500: "#3b82f6",
  b400: "#60a5fa",
  b300: "#93c5fd",
  b200: "#bfdbfe",
  b100: "#dbeafe",
  b50: "#eff6ff",
  coral: "#f97362",
};

/* -------------------------------------------------------------------------- */
/*  Flat character                                                            */
/* -------------------------------------------------------------------------- */
type HairStyle = "short" | "long" | "bun" | "curly";
type Item = "tablet" | "report" | "point";

interface PersonProps {
  x: number;
  y?: number;
  flip?: boolean;
  skin: string;
  hair: string;
  top: string;
  bottom: string;
  shoe: string;
  hairStyle: HairStyle;
  item: Item;
}

const CAP = "M-14.5 -1 C-15 -19 15 -19 14.5 -1 C9 -9 -7 -9 -14.5 -1 Z";

function Person({
  x,
  y = 260,
  flip = false,
  skin,
  hair,
  top,
  bottom,
  shoe,
  hairStyle,
  item,
}: PersonProps) {
  const armPath = item === "point" ? ["M12 26 L34 8", "M34 8 L52 -6"] : ["M12 26 L24 52", "M24 52 L38 46"];
  const hand: [number, number] = item === "point" ? [53, -7] : [39, 46];

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      {/* ground shadow */}
      <ellipse cx="0" cy="151" rx="28" ry="5" fill={C.navy} opacity=".1" />

      {/* legs + shoes */}
      <rect x="-14" y="74" width="12" height="70" rx="6" fill={bottom} />
      <rect x="2" y="74" width="12" height="70" rx="6" fill={bottom} />
      <rect x="-17" y="140" width="18" height="9" rx="4.5" fill={shoe} />
      <rect x="0" y="140" width="18" height="9" rx="4.5" fill={shoe} />

      {/* back arm */}
      <path d="M-14 26 L-20 50" stroke={top} strokeWidth="10" strokeLinecap="round" />
      <path d="M-20 50 L-17 68" stroke={skin} strokeWidth="8" strokeLinecap="round" />
      <circle cx="-17" cy="69" r="5" fill={skin} />

      {/* neck + torso */}
      <rect x="-4.5" y="6" width="9" height="14" rx="3" fill={skin} />
      <rect x="-20" y="14" width="40" height="66" rx="16" fill={top} />

      {/* hair (behind head) */}
      {hairStyle === "curly" && (
        <g fill={hair}>
          <circle cx="-9" cy="-9" r="7" />
          <circle cx="0" cy="-13" r="8" />
          <circle cx="9" cy="-9" r="7" />
          <circle cx="-12" cy="-1" r="6" />
        </g>
      )}
      {hairStyle === "long" && (
        <path d="M-16 -4 L-2 -4 L-2 26 Q-9 35 -18 30 Z" fill={hair} />
      )}

      {/* head */}
      <circle cx="0" cy="0" r="13.5" fill={skin} />

      {/* hair (front) */}
      {hairStyle !== "curly" && <path d={CAP} fill={hair} />}
      {hairStyle === "bun" && <circle cx="-4" cy="-17" r="6" fill={hair} />}

      {/* front arm + item */}
      <path d={armPath[0]} stroke={C.navy} strokeOpacity=".18" strokeWidth="13" strokeLinecap="round" />
      <path d={armPath[0]} stroke={top} strokeWidth="10" strokeLinecap="round" />

      {item === "report" && (
        <g transform="rotate(-8 46 40)">
          <rect x="36" y="22" width="24" height="30" rx="2" fill="#fff" stroke={C.b200} />
          <rect x="40" y="27" width="16" height="2.5" rx="1" fill={C.b300} />
          <rect x="40" y="32" width="11" height="2.5" rx="1" fill={C.b200} />
          <rect x="40" y="43" width="4" height="6" rx="1" fill={C.b600} />
          <rect x="46" y="39" width="4" height="10" rx="1" fill={C.b400} />
          <rect x="52" y="36" width="4" height="13" rx="1" fill={C.coral} />
        </g>
      )}
      {item === "tablet" && (
        <g>
          <rect x="36" y="24" width="22" height="30" rx="3" fill={C.navy} />
          <rect x="38.5" y="26.5" width="17" height="25" rx="1.5" fill={C.b100} />
          <rect x="41" y="40" width="3" height="8" rx="1" fill={C.b600} />
          <rect x="46" y="35" width="3" height="13" rx="1" fill={C.b400} />
          <rect x="51" y="31" width="3" height="17" rx="1" fill={C.coral} />
        </g>
      )}

      <path d={armPath[1]} stroke={skin} strokeWidth="8" strokeLinecap="round" />
      <circle cx={hand[0]} cy={hand[1]} r="5" fill={skin} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */
function Node({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g>
      <circle
        className="hi-pulse"
        cx={x}
        cy={y}
        r="3.5"
        fill={C.b400}
        style={{ animationDelay: `${delay}s` }}
      />
      <circle cx={x} cy={y} r="3.5" fill="#fff" stroke={C.b600} strokeWidth="1.6" />
    </g>
  );
}

function Chip({
  x,
  y,
  duration,
  delay,
  filter,
  children,
}: {
  x: number;
  y: number;
  duration: string;
  delay: string;
  filter: string;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="hi-float" style={{ animationDuration: duration, animationDelay: delay }}>
        <circle r="22" fill="#fff" filter={filter} />
        {children}
      </g>
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */
const GX = 400;
const GY = 168;
const R = 92;

const LATS = [-62, -32, 0, 32, 62].map((dy) => ({
  dy,
  w: Math.sqrt(R * R - dy * dy),
}));

// globe nodes (offsets from the globe centre)
const GN: [number, number][] = [
  [-45, -25],
  [20, -55],
  [52, 12],
  [-15, 38],
  [25, -10],
];
const GLINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 4],
  [4, 2],
  [4, 3],
  [0, 3],
];

// x, y, radius, duration, delay
const PARTICLES: [number, number, number, number, number][] = [
  [90, 210, 2.5, 9, 0],
  [150, 300, 2, 11, -3],
  [60, 340, 3, 8, -5],
  [230, 60, 2, 10, -2],
  [330, 40, 2.5, 12, -6],
  [470, 30, 2, 9, -4],
  [560, 70, 3, 11, -1],
  [720, 200, 2.5, 10, -7],
  [740, 320, 2, 8, -3],
  [650, 280, 3, 12, -5],
  [300, 250, 2, 9, -8],
  [500, 260, 2, 10, -2],
  [110, 120, 2, 11, -6],
  [690, 120, 2, 9, -4],
];

export default function HeroIllustration({
  className = "w-full max-w-xl",
}: {
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const shadow = `url(#${uid}-sh)`;

  const globeLinks = GLINKS.map(([a, b]) => {
    const [x1, y1] = [GX + GN[a][0], GY + GN[a][1]];
    const [x2, y2] = [GX + GN[b][0], GY + GN[b][1]];
    return `M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - 14} ${x2} ${y2}`;
  });

  return (
    <svg
      viewBox="0 0 800 450"
      className={`h-auto ${className}`}
      role="img"
      aria-label="A diverse team of accountants, auditors and engineers collaborating around a digital globe"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{CSS}</style>

      <defs>
        <filter id={`${uid}-sh`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={C.b700} floodOpacity=".18" />
        </filter>
        <radialGradient id={`${uid}-globe`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor={C.b400} />
          <stop offset="0.55" stopColor={C.b600} />
          <stop offset="1" stopColor={C.b700} />
        </radialGradient>
        <linearGradient id={`${uid}-beam`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={C.b400} stopOpacity=".45" />
          <stop offset="1" stopColor={C.b400} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-ped`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor={C.b100} />
        </linearGradient>
        <linearGradient id={`${uid}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.b400} />
          <stop offset="1" stopColor={C.b600} />
        </linearGradient>
        <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.b400} stopOpacity=".4" />
          <stop offset="1" stopColor={C.b400} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ---------------------------- backdrop ---------------------------- */}
      <circle cx="400" cy="225" r="210" fill={C.b50} />
      <ellipse cx="400" cy="410" rx="340" ry="26" fill={C.b100} opacity=".55" />
      <line x1="40" y1="410" x2="760" y2="410" stroke={C.b200} strokeWidth="1.5" />

      {/* drifting particles */}
      {PARTICLES.map(([px, py, pr, dur, delay], i) => (
        <circle
          key={i}
          className="hi-drift"
          cx={px}
          cy={py}
          r={pr}
          fill={i % 3 === 0 ? C.b300 : C.b400}
          opacity=".7"
          style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        />
      ))}

      {/* orbit ring (back half) */}
      <g transform={`translate(${GX} ${GY}) rotate(-16)`}>
        <ellipse rx="150" ry="38" fill="none" stroke={C.b300} strokeWidth="1.2" strokeDasharray="3 6" opacity=".7" />
      </g>

      {/* ---------------------------- pedestal ---------------------------- */}
      <path
        d="M344 326 L344 400 Q344 410 400 410 Q456 410 456 400 L456 326 Z"
        fill={`url(#${uid}-ped)`}
      />
      <ellipse cx="400" cy="326" rx="56" ry="11" fill="#fff" stroke={C.b200} strokeWidth="1.5" />
      <ellipse cx="400" cy="326" rx="38" ry="7" fill="none" stroke={C.b400} strokeWidth="1.5" />
      <path d="M372 326 L428 326 L446 262 L354 262 Z" fill={`url(#${uid}-beam)`} />

      {/* ------------------------------ globe ----------------------------- */}
      <g className="hi-float" style={{ animationDuration: "7s" }}>
        <circle className="hi-spin" cx={GX} cy={GY} r={R + 16} fill="none" stroke={C.b300} strokeWidth="1.3" strokeDasharray="2 9" strokeLinecap="round" />
        <circle cx={GX} cy={GY} r={R} fill={`url(#${uid}-globe)`} filter={shadow} />

        {/* latitudes */}
        {LATS.map(({ dy, w }) => (
          <ellipse key={dy} cx={GX} cy={GY + dy} rx={w} ry={w * 0.16} fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth="1.2" />
        ))}

        {/* rotating longitudes */}
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            className="hi-meridian"
            cx={GX}
            cy={GY}
            rx={R}
            ry={R}
            fill="none"
            stroke="#fff"
            strokeOpacity=".55"
            strokeWidth="1.3"
            style={{ animationDelay: `${-i * 6}s` }}
          />
        ))}

        {/* highlight */}
        <ellipse cx={GX - 34} cy={GY - 44} rx="30" ry="16" fill="#fff" opacity=".14" transform={`rotate(-30 ${GX - 34} ${GY - 44})`} />

        {/* network on globe */}
        {globeLinks.map((d, i) => (
          <path key={i} className="hi-flow" d={d} fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" style={{ animationDelay: `${-i * 0.3}s` }} />
        ))}
        {GN.map(([dx, dy], i) => (
          <Node key={i} x={GX + dx} y={GY + dy} delay={i * 0.5} />
        ))}
      </g>

      {/* orbit ring (front half) + travelling beads */}
      <g transform={`translate(${GX} ${GY}) rotate(-16)`}>
        <path d="M -150 0 A 150 38 0 0 0 150 0" fill="none" stroke={C.b500} strokeWidth="1.6" opacity=".8" />
        <circle r="5" fill="#fff" stroke={C.b600} strokeWidth="2">
          <animateMotion dur="16s" repeatCount="indefinite" path="M -150 0 A 150 38 0 1 1 150 0 A 150 38 0 1 1 -150 0" />
        </circle>
        <circle r="3.5" fill={C.coral}>
          <animateMotion dur="16s" begin="-8s" repeatCount="indefinite" path="M -150 0 A 150 38 0 1 1 150 0 A 150 38 0 1 1 -150 0" />
        </circle>
      </g>

      {/* --------------------------- connections -------------------------- */}
      <g fill="none" stroke={C.b400} strokeWidth="1.6" strokeLinecap="round">
        <path className="hi-flow" d="M206 96 C250 92 268 118 316 140" />
        <path className="hi-flow" d="M594 102 C550 98 532 122 484 140" />
        <path className="hi-flow" d="M274 176 C292 172 300 168 312 166" />
        <path className="hi-flow" d="M526 176 C508 172 500 168 488 166" />
        <path className="hi-flow" d="M400 64 L400 76" />
        <path className="hi-flow" d="M120 152 C130 176 200 182 228 182" opacity=".6" />
        <path className="hi-flow" d="M680 156 C670 178 600 184 572 182" opacity=".6" />
      </g>
      <Node x={316} y={140} delay={0.2} />
      <Node x={484} y={140} delay={0.9} />
      <Node x={312} y={166} delay={1.4} />
      <Node x={488} y={166} delay={0.5} />

      {/* ------------------------- left dashboard ------------------------- */}
      <g transform="translate(36 40)">
        <g className="hi-float" style={{ animationDuration: "7.5s", animationDelay: "-1s" }}>
          <rect width="170" height="112" rx="12" fill="#fff" filter={shadow} />
          <circle cx="14" cy="14" r="3" fill={C.b200} />
          <circle cx="24" cy="14" r="3" fill={C.b300} />
          <circle cx="34" cy="14" r="3" fill={C.b400} />
          {[26, 40, 32, 54, 46, 66].map((h, i) => (
            <rect
              key={i}
              className="hi-bar"
              x={16 + i * 15}
              y={98 - h}
              width="10"
              height={h}
              rx="3"
              fill={`url(#${uid}-bar)`}
              style={{ animationDelay: `${-i * 0.45}s` }}
            />
          ))}
          <path className="hi-draw" d="M21 68 L36 54 L51 60 L66 40 L81 46 L96 26" fill="none" stroke={C.coral} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="96" cy="26" r="3.5" fill={C.coral} />
          <rect x="118" y="30" width="38" height="6" rx="3" fill={C.b100} />
          <rect x="118" y="44" width="28" height="6" rx="3" fill={C.b100} />
          <rect x="118" y="58" width="34" height="6" rx="3" fill={C.b100} />
          <rect x="118" y="78" width="38" height="16" rx="8" fill={C.b100} />
          <path d="M128 87 L134 81 L140 87" fill="none" stroke={C.b600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* ------------------------ right dashboard ------------------------- */}
      <g transform="translate(594 46)">
        <g className="hi-float" style={{ animationDuration: "8s", animationDelay: "-3s" }}>
          <rect width="170" height="112" rx="12" fill="#fff" filter={shadow} />
          <circle cx="14" cy="14" r="3" fill={C.b200} />
          <circle cx="24" cy="14" r="3" fill={C.b300} />
          <circle cx="34" cy="14" r="3" fill={C.b400} />

          <circle cx="48" cy="66" r="24" fill="none" stroke={C.b100} strokeWidth="12" />
          <g className="hi-spin">
            <g transform="rotate(-90 48 66)" fill="none" strokeWidth="12">
              <circle cx="48" cy="66" r="24" stroke={C.b600} strokeDasharray="78 73" />
              <circle cx="48" cy="66" r="24" stroke={C.b400} strokeDasharray="38 113" strokeDashoffset="-80" />
              <circle cx="48" cy="66" r="24" stroke={C.coral} strokeDasharray="18 133" strokeDashoffset="-122" />
            </g>
          </g>
          <circle cx="48" cy="66" r="13" fill="#fff" />

          <path d="M92 90 C104 82 110 86 120 70 S140 64 156 42 L156 98 L92 98 Z" fill={`url(#${uid}-area)`} />
          <path className="hi-draw" d="M92 90 C104 82 110 86 120 70 S140 64 156 42" fill="none" stroke={C.b600} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="156" cy="42" r="3.5" fill={C.b600} />
        </g>
      </g>

      {/* ------------------------------ chips ----------------------------- */}
      {/* audit */}
      <Chip x={252} y={182} duration="6s" delay="-2s" filter={shadow}>
        <rect x="-8" y="-10" width="16" height="20" rx="2.5" fill="none" stroke={C.b600} strokeWidth="1.8" />
        <path d="M-4 -4 H4 M-4 0 H1" stroke={C.b300} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M-3 5 L0 8 L6 1" fill="none" stroke={C.coral} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Chip>
      {/* code */}
      <Chip x={548} y={182} duration="6.5s" delay="-4s" filter={shadow}>
        <path d="M-4 -7 L-11 0 L-4 7 M4 -7 L11 0 L4 7" fill="none" stroke={C.b600} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 -9 L-2 9" stroke={C.coral} strokeWidth="2" strokeLinecap="round" />
      </Chip>
      {/* trust shield */}
      <g transform="translate(400 42)">
        <g className="hi-float" style={{ animationDuration: "5.5s" }}>
          <circle r="22" fill="#fff" filter={shadow} />
          <path d="M0 -12 L11 -8 V2 C11 9 5 13 0 15 C-5 13 -11 9 -11 2 V-8 Z" fill={C.b600} />
          <path d="M-5 1 L-1 5 L6 -3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* ------------------------------ people ---------------------------- */}
      <Person x={170} skin="#8d5524" hair="#1f2937" top={C.b700} bottom={C.navy} shoe={C.coral} hairStyle="short" item="point" />
      <Person x={270} skin="#f2c6a0" hair="#7c2d12" top={C.b200} bottom="#1e3a8a" shoe={C.navy} hairStyle="long" item="report" />
      <Person x={530} flip skin="#c68642" hair="#111827" top={C.navy} bottom="#94a3b8" shoe={C.coral} hairStyle="curly" item="tablet" />
      <Person x={630} flip skin="#e0ac69" hair="#4b2e1a" top={C.b400} bottom="#1e293b" shoe={C.navy} hairStyle="bun" item="report" />
    </svg>
  );
}