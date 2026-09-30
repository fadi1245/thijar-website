import { useId } from "react";

/* -------------------------------------------------------------------------- */
/*  Animations (scoped with the "cl-" prefix, no global CSS needed)           */
/* -------------------------------------------------------------------------- */
const CSS = `
.cl-float{animation:cl-float 6s ease-in-out infinite}
@keyframes cl-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

.cl-drift{animation:cl-drift 9s ease-in-out infinite}
@keyframes cl-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,-14px)}}

.cl-flow{stroke-dasharray:5 7;animation:cl-flow 1.6s linear infinite}
@keyframes cl-flow{to{stroke-dashoffset:-24}}

.cl-pulse{transform-box:fill-box;transform-origin:center;animation:cl-pulse 2.6s ease-out infinite}
@keyframes cl-pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(3.2);opacity:0}}

.cl-glow{transform-box:fill-box;transform-origin:center;animation:cl-glow 3s ease-in-out infinite}
@keyframes cl-glow{0%,100%{transform:scale(1);opacity:.28}50%{transform:scale(1.5);opacity:.08}}

.cl-sway{transform-box:fill-box;transform-origin:50% 100%;animation:cl-sway 4.5s ease-in-out infinite}
@keyframes cl-sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}

.cl-cloud{animation:cl-cloud 46s linear infinite}
@keyframes cl-cloud{from{transform:translateX(-90px)}to{transform:translateX(260px)}}

.cl-wave{transform-box:fill-box;transform-origin:left center;animation:cl-wave 1.6s ease-in-out infinite}
@keyframes cl-wave{0%,100%{transform:skewY(-7deg) scaleX(1)}50%{transform:skewY(7deg) scaleX(.9)}}

.cl-dot{animation:cl-dot 1.6s ease-in-out infinite}
@keyframes cl-dot{0%,100%{opacity:.25}50%{opacity:1}}

.cl-bar{transform-box:fill-box;transform-origin:bottom;animation:cl-bar 1.2s ease-in-out infinite}
@keyframes cl-bar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.4)}}

@media (prefers-reduced-motion:reduce){
  .cl-float,.cl-drift,.cl-flow,.cl-pulse,.cl-glow,.cl-sway,.cl-cloud,.cl-wave,.cl-dot,.cl-bar{animation:none!important}
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
  coralSoft: "#ffd9d3",
};

/* -------------------------------------------------------------------------- */
/*  Flat character                                                            */
/* -------------------------------------------------------------------------- */
type HairStyle = "short" | "long" | "bun" | "curly";
type Item = "tablet" | "report" | "point" | "palette" | "laptop";

interface PersonProps {
  x: number;
  y: number;
  scale?: number;
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
  y,
  scale = 1,
  flip = false,
  skin,
  hair,
  top,
  bottom,
  shoe,
  hairStyle,
  item,
}: PersonProps) {
  const armPath =
    item === "point"
      ? ["M12 26 L34 8", "M34 8 L52 -6"]
      : ["M12 26 L24 52", "M24 52 L38 46"];
  const hand: [number, number] = item === "point" ? [53, -7] : [39, 46];

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
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

      {/* hair behind head */}
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

      {/* head + front hair */}
      <circle cx="0" cy="0" r="13.5" fill={skin} />
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
      {item === "palette" && (
        <g transform="rotate(-10 46 38)">
          <path
            d="M34 40 C34 30 46 26 54 30 C62 34 60 44 52 44 C48 44 48 48 44 50 C38 52 34 48 34 40 Z"
            fill="#fff"
            stroke={C.b200}
            strokeWidth="1.2"
          />
          <circle cx="41" cy="36" r="2.4" fill={C.coral} />
          <circle cx="48" cy="33" r="2.4" fill={C.b600} />
          <circle cx="55" cy="37" r="2.4" fill={C.b400} />
        </g>
      )}
      {item === "laptop" && (
        <g>
          <rect x="34" y="26" width="24" height="17" rx="2.5" fill={C.navy} />
          <rect x="36" y="28" width="20" height="13" rx="1.5" fill={C.b100} />
          <rect x="38" y="35" width="3" height="4" fill={C.b600} />
          <rect x="43" y="32" width="3" height="7" fill={C.b400} />
          <rect x="48" y="30" width="3" height="9" fill={C.coral} />
          <path d="M30 46 H62 L59 43 H33 Z" fill="#94a3b8" />
        </g>
      )}

      <path d={armPath[1]} stroke={skin} strokeWidth="8" strokeLinecap="round" />
      <circle cx={hand[0]} cy={hand[1]} r="5" fill={skin} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Building blocks                                                           */
/* -------------------------------------------------------------------------- */
/** Swaying potted plant standing on the floor */
function Plant({ x, scale = 1, pot }: { x: number; scale?: number; pot: string }) {
  const leaves: [number, number][] = [
    [-40, 0.75],
    [-20, 0.95],
    [0, 1.1],
    [20, 0.95],
    [40, 0.75],
  ];
  return (
    <g transform={`translate(${x} ${410 - 26 * scale}) scale(${scale})`}>
      {leaves.map(([angle, len], i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <g
            className="cl-sway"
            style={{ animationDelay: `${-i * 0.8}s`, animationDuration: `${4 + i * 0.4}s` }}
          >
            <path
              d="M0 0 C-11 -22 -9 -52 0 -76 C9 -52 11 -22 0 0 Z"
              transform={`scale(1 ${len})`}
              fill={i % 2 ? C.b400 : C.b300}
            />
          </g>
        </g>
      ))}
      <path d="M-16 0 L16 0 L12 26 L-12 26 Z" fill={pot} />
      <rect x="-18" y="-3" width="36" height="6" rx="3" fill={pot} />
    </g>
  );
}

/** Floating achievement badge */
function Badge({
  x,
  y,
  dur,
  delay,
  filter,
  children,
}: {
  x: number;
  y: number;
  dur: string;
  delay: string;
  filter: string;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="cl-float" style={{ animationDuration: dur, animationDelay: delay }}>
        <circle className="cl-glow" r="16" fill={C.b400} style={{ animationDelay: delay }} />
        <circle r="17" fill="#fff" filter={filter} />
        {children}
      </g>
    </g>
  );
}

/** Sticky note on the whiteboard */
function Note({
  x,
  y,
  rot,
  fill,
}: {
  x: number;
  y: number;
  rot: number;
  fill: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot} 16 14)`}>
      <rect width="32" height="28" rx="4" fill={fill} />
      <rect x="6" y="8" width="20" height="3.5" rx="1.7" fill={C.navy} opacity=".25" />
      <rect x="6" y="15" width="13" height="3.5" rx="1.7" fill={C.navy} opacity=".18" />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Layout data                                                               */
/* -------------------------------------------------------------------------- */
const STEPS = [
  { x: 290, top: 384, arc: 44 },
  { x: 360, top: 358, arc: 44 },
  { x: 430, top: 332, arc: 29 },
  { x: 500, top: 306, arc: 13 },
];
const CAREER_PATH = "M296 370 L360 370 L360 344 L430 344 L430 318 L500 318 L500 292 L578 292";
const HYBRID_PATH = "M655 208 C688 184 707 184 725 208";

const STAR = "M0 -8 L2.4 -2.6 L8 -2.2 L3.6 1.6 L5 7.2 L0 4.2 L-5 7.2 L-3.6 1.6 L-8 -2.2 L-2.4 -2.6 Z";

// x, y, radius, duration, delay
const PARTICLES: [number, number, number, number, number][] = [
  [30, 40, 2.5, 9, 0],
  [270, 60, 2, 11, -3],
  [300, 250, 3, 8, -5],
  [520, 40, 2, 10, -2],
  [590, 140, 2.5, 12, -6],
  [780, 60, 2, 9, -4],
  [610, 400, 3, 11, -1],
  [780, 350, 2.5, 10, -7],
  [240, 200, 2, 8, -3],
  [60, 250, 3, 12, -5],
];

const TILES: { x: number; y: number; skin: string; body: string; active?: boolean }[] = [
  { x: 8, y: 8, skin: "#f2c6a0", body: C.b400 },
  { x: 84, y: 8, skin: "#8d5524", body: C.b600, active: true },
  { x: 8, y: 52, skin: "#e0ac69", body: C.navy },
  { x: 84, y: 52, skin: "#c68642", body: C.b300 },
];

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */
export default function CultureIllustration({
  className = "w-full max-w-xl",
}: {
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const shadow = `url(#${uid}-sh)`;
  const windowPath = "M320 250 V130 A80 80 0 0 1 480 130 V250 Z";

  return (
    <svg
      viewBox="0 0 800 450"
      className={`h-auto ${className}`}
      role="img"
      aria-label="A collaborative team brainstorming, mentoring and growing their careers together in a hybrid workplace"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{CSS}</style>

      <defs>
        <filter id={`${uid}-sh`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={C.b700} floodOpacity=".18" />
        </filter>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.b200} />
          <stop offset="1" stopColor="#f5faff" />
        </linearGradient>
        <linearGradient id={`${uid}-step`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.b100} />
          <stop offset="1" stopColor={C.b200} />
        </linearGradient>
        <clipPath id={`${uid}-win`}>
          <path d={windowPath} />
        </clipPath>
      </defs>

      {/* ---------------------------- backdrop ---------------------------- */}
      <circle cx="400" cy="225" r="215" fill={C.b50} />
      <ellipse cx="400" cy="410" rx="370" ry="26" fill={C.b100} opacity=".55" />

      {PARTICLES.map(([px, py, pr, dur, delay], i) => (
        <circle
          key={i}
          className="cl-drift"
          cx={px}
          cy={py}
          r={pr}
          fill={i % 3 === 0 ? C.b300 : C.b400}
          opacity=".7"
          style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        />
      ))}

      {/* window with drifting clouds */}
      <path d={windowPath} fill={`url(#${uid}-sky)`} />
      <g clipPath={`url(#${uid}-win)`}>
        {[
          { y: 118, s: 1.1, d: "0s" },
          { y: 180, s: 0.8, d: "-22s" },
          { y: 82, s: 0.7, d: "-34s" },
        ].map((c, i) => (
          <g key={i} transform={`translate(330 ${c.y}) scale(${c.s})`}>
            <g className="cl-cloud" style={{ animationDelay: c.d }}>
              <path d="M0 16 C-12 16 -12 2 0 2 C2 -10 20 -12 25 0 C36 -3 44 13 32 16 Z" fill="#fff" opacity=".95" />
            </g>
          </g>
        ))}
      </g>
      <path d={windowPath} fill="none" stroke={C.b300} strokeWidth="5" />
      <rect x="312" y="250" width="176" height="8" rx="4" fill={C.b300} />

      <line x1="10" y1="410" x2="790" y2="410" stroke={C.b200} strokeWidth="1.5" />

      {/* ------------------- brainstorming whiteboard --------------------- */}
      <g transform="translate(40 56)">
        <rect width="170" height="134" rx="10" fill="#fff" stroke={C.b200} strokeWidth="2" filter={shadow} />
        <g fill="none" stroke={C.b400} strokeWidth="1.6" strokeLinecap="round">
          <path className="cl-flow" d="M85 67 L30 28" />
          <path className="cl-flow" d="M85 67 L140 30" />
          <path className="cl-flow" d="M85 67 L28 106" />
          <path className="cl-flow" d="M85 67 L142 104" />
        </g>
        <Note x={14} y={14} rot={-5} fill={C.b200} />
        <Note x={124} y={16} rot={4} fill={C.coralSoft} />
        <Note x={12} y={92} rot={3} fill={C.b100} />
        <Note x={126} y={90} rot={-4} fill={C.b300} />
        <circle className="cl-pulse" cx="85" cy="67" r="13" fill={C.b400} />
        <circle cx="85" cy="67" r="13" fill={C.b600} />
        <path d={STAR} transform="translate(85 67) scale(.85)" fill="#fff" />
      </g>
      {/* glowing idea bulb */}
      <g transform="translate(125 30)">
        <circle className="cl-glow" r="22" fill={C.b400} />
        <g stroke={C.coral} strokeWidth="1.8" strokeLinecap="round">
          {[-60, -30, 0, 30, 60].map((a, i) => (
            <path
              key={a}
              className="cl-dot"
              d="M0 -17 V-22"
              transform={`rotate(${a})`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </g>
        <circle r="10" fill="#fff7ed" stroke={C.coral} strokeWidth="2" />
        <rect x="-5" y="9" width="10" height="5" rx="2" fill={C.b600} />
        <path d="M-3 -1 L0 3 L3 -1" fill="none" stroke={C.coral} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* --------------------- career growth staircase -------------------- */}
      {STEPS.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={s.top} width="70" height={410 - s.top} fill={`url(#${uid}-step)`} />
          <rect x={s.x} y={s.top} width="70" height="6" fill="#fff" opacity=".9" />
          <circle className="cl-glow" cx={s.x + 35} cy="399" r="8" fill={C.b400} style={{ animationDelay: `${-i * 0.7}s` }} />
          <circle cx={s.x + 35} cy="399" r="6.5" fill="#fff" stroke={C.b200} strokeWidth="2.5" />
          <circle
            cx={s.x + 35}
            cy="399"
            r="7"
            fill="none"
            stroke={C.b600}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${s.arc} 44`}
            transform={`rotate(-90 ${s.x + 35} 399)`}
          />
        </g>
      ))}

      {/* career pathway line + travelling marker */}
      <path className="cl-flow" d={CAREER_PATH} fill="none" stroke={C.b500} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M574 285 L585 292 L574 299 Z" fill={C.b500} />
      <g>
        <circle className="cl-glow" r="9" fill={C.coral} />
        <circle r="5" fill="#fff" stroke={C.coral} strokeWidth="2.2" />
        <animateMotion dur="10s" repeatCount="indefinite" path={CAREER_PATH} />
      </g>

      {/* goal flag */}
      <rect x="539" y="262" width="2.5" height="44" rx="1" fill={C.navy} />
      <path className="cl-wave" d="M541.5 264 L567 271 L541.5 278 Z" fill={C.coral} />

      {/* --------------------------- hybrid work -------------------------- */}
      <g transform="translate(610 84)">
        <rect width="160" height="100" rx="10" fill={C.navy} filter={shadow} />
        <circle cx="80" cy="3" r="1.2" fill={C.b300} />
        <rect x="6" y="6" width="148" height="88" rx="6" fill={C.b50} />
        {TILES.map((t, i) => (
          <g key={i}>
            <rect x={t.x} y={t.y} width="68" height="40" rx="6" fill="#fff" stroke={C.b100} />
            <circle cx={t.x + 34} cy={t.y + 16} r="7" fill={t.skin} />
            <path d={`M${t.x + 21} ${t.y + 40} Q${t.x + 21} ${t.y + 27} ${t.x + 34} ${t.y + 27} Q${t.x + 47} ${t.y + 27} ${t.x + 47} ${t.y + 40} Z`} fill={t.body} />
            {t.active && (
              <>
                <rect className="cl-dot" x={t.x} y={t.y} width="68" height="40" rx="6" fill="none" stroke={C.b600} strokeWidth="2" />
                {[0, 1, 2].map((b) => (
                  <rect key={b} className="cl-bar" x={t.x + 6 + b * 4} y={t.y + 30} width="2.4" height="6" rx="1.2" fill={C.coral} style={{ animationDelay: `${-b * 0.3}s` }} />
                ))}
              </>
            )}
          </g>
        ))}
      </g>

      {/* home ↔ office */}
      <path className="cl-flow" d={HYBRID_PATH} fill="none" stroke={C.b400} strokeWidth="1.8" strokeLinecap="round" />
      <g>
        <circle r="4" fill="#fff" stroke={C.coral} strokeWidth="2" />
        <animateMotion dur="4s" repeatCount="indefinite" path={HYBRID_PATH} />
      </g>
      <g transform="translate(640 214)">
        <g className="cl-float" style={{ animationDuration: "6s", animationDelay: "-1s" }}>
          <circle r="16" fill="#fff" filter={shadow} />
          <path d="M-8 1 L0 -7 L8 1 M-5.5 -1 V7 H5.5 V-1" fill="none" stroke={C.b600} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <g transform="translate(740 214)">
        <g className="cl-float" style={{ animationDuration: "6.6s", animationDelay: "-3s" }}>
          <circle r="16" fill="#fff" filter={shadow} />
          <rect x="-6" y="-8" width="12" height="16" rx="2" fill="none" stroke={C.b600} strokeWidth="1.9" />
          <path d="M-3 -4 H-1 M2 -4 H4 M-3 0 H-1 M2 0 H4" stroke={C.b400} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </g>

      {/* ----------------------- learning & development ------------------- */}
      <g>
        <rect x="577" y="398" width="46" height="12" rx="2.5" fill={C.b600} />
        <rect x="583" y="398" width="3" height="12" fill="#fff" opacity=".5" />
        <rect x="581" y="386" width="40" height="12" rx="2.5" fill={C.navy} />
        <rect x="587" y="386" width="3" height="12" fill="#fff" opacity=".4" />
        <rect x="579" y="374" width="44" height="12" rx="2.5" fill={C.b400} />
        <rect x="585" y="374" width="3" height="12" fill="#fff" opacity=".6" />
      </g>
      <g transform="translate(601 340)">
        <g className="cl-float" style={{ animationDuration: "5.5s", animationDelay: "-2s" }}>
          <circle className="cl-glow" r="18" fill={C.b400} />
          <circle r="19" fill="#fff" filter={shadow} />
          <path d="M-12 -1 L0 -8 L12 -1 L0 6 Z" fill={C.navy} />
          <path d="M-7 3 V8 Q0 12 7 8 V3" fill="none" stroke={C.b600} strokeWidth="2" strokeLinecap="round" />
          <path d="M12 -1 V7" stroke={C.coral} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="8.5" r="1.8" fill={C.coral} />
        </g>
      </g>

      {/* ------------------------------ plants ---------------------------- */}
      <Plant x={24} scale={0.85} pot={C.coral} />
      <Plant x={240} scale={1.1} pot={C.b600} />
      <Plant x={766} scale={0.95} pot={C.coral} />

      {/* ------------------------------ people ---------------------------- */}
      {/* brainstorm team */}
      <Person x={95} y={260} skin="#8d5524" hair="#1f2937" top={C.b700} bottom={C.navy} shoe={C.coral} hairStyle="short" item="point" />
      <Person x={165} y={260} flip skin="#f2c6a0" hair="#7c2d12" top={C.b200} bottom="#1e3a8a" shoe={C.navy} hairStyle="long" item="palette" />

      {/* mentorship on the career staircase */}
      <Person x={325} y={235} skin="#e0ac69" hair="#4b2e1a" top={C.b400} bottom="#1e293b" shoe={C.navy} hairStyle="bun" item="tablet" />
      <Person x={465} y={183} flip skin="#c68642" hair="#111827" top={C.navy} bottom="#94a3b8" shoe={C.coral} hairStyle="curly" item="report" />

      {/* hybrid teammate */}
      <Person x={690} y={260} flip skin="#f2c6a0" hair="#b45309" top={C.b600} bottom="#1e3a8a" shoe={C.navy} hairStyle="short" item="laptop" />

      {/* --------------------------- achievement badges ------------------- */}
      <Badge x={236} y={92} dur="6s" delay="-1s" filter={shadow}>
        <path d={STAR} fill={C.coral} />
      </Badge>
      <Badge x={288} y={158} dur="7s" delay="-3s" filter={shadow}>
        <circle cy="3" r="5.5" fill={C.coral} />
        <path d="M-4.5 -9 L0 -2 L4.5 -9" fill="none" stroke={C.b600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Badge>
      <Badge x={590} y={262} dur="6.5s" delay="-2s" filter={shadow}>
        <g fill="none" stroke={C.b600} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-5.5 -7 H5.5 V-2 C5.5 3 -5.5 3 -5.5 -2 Z" />
          <path d="M-5.5 -5 H-8.5 C-8.5 0 -5.5 1 -5.5 1 M5.5 -5 H8.5 C8.5 0 5.5 1 5.5 1" />
          <path d="M0 3 V6 M-4 7 H4" />
        </g>
      </Badge>
      <Badge x={744} y={236} dur="7.4s" delay="-4s" filter={shadow}>
        <path d="M0 -10 L9 -6.5 V1.5 C9 7.5 4 11 0 13 C-4 11 -9 7.5 -9 1.5 V-6.5 Z" fill={C.b600} />
        <path d="M-4 1 L-1 4 L5 -3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Badge>
    </svg>
  );
}