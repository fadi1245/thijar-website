import { useId } from "react";

/* -------------------------------------------------------------------------- */
/*  Animations (scoped with the "ci-" prefix, no global CSS needed)           */
/* -------------------------------------------------------------------------- */
const CSS = `
.ci-float{animation:ci-float 6s ease-in-out infinite}
@keyframes ci-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

.ci-drift{animation:ci-drift 9s ease-in-out infinite}
@keyframes ci-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,-14px)}}

.ci-cloud{animation:ci-cloud 30s ease-in-out infinite}
@keyframes ci-cloud{0%,100%{transform:translateX(-14px)}50%{transform:translateX(18px)}}

.ci-flow{stroke-dasharray:4 6;animation:ci-flow 1.6s linear infinite}
@keyframes ci-flow{to{stroke-dashoffset:-20}}

.ci-pulse{transform-box:fill-box;transform-origin:center;animation:ci-pulse 2.6s ease-out infinite}
@keyframes ci-pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(3.2);opacity:0}}

.ci-type{animation:ci-type 1.4s ease-in-out infinite}
@keyframes ci-type{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-1.6px)}}

.ci-sway{transform-box:fill-box;transform-origin:50% 100%;animation:ci-sway 5s ease-in-out infinite}
@keyframes ci-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}

.ci-spin{transform-box:fill-box;transform-origin:center;animation:ci-spin 40s linear infinite}
@keyframes ci-spin{to{transform:rotate(360deg)}}

@media (prefers-reduced-motion:reduce){
  .ci-float,.ci-drift,.ci-cloud,.ci-flow,.ci-pulse,.ci-type,.ci-sway,.ci-spin{animation:none!important}
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
/*  Flat character (same construction as the hero illustration)               */
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
  headset?: boolean;
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
  headset = false,
}: PersonProps) {
  const armPath = item === "point" ? ["M12 26 L34 8", "M34 8 L52 -6"] : ["M12 26 L24 52", "M24 52 L38 46"];
  const hand: [number, number] = item === "point" ? [53, -7] : [39, 46];

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx="0" cy="151" rx="28" ry="5" fill={C.navy} opacity=".1" />

      <rect x="-14" y="74" width="12" height="70" rx="6" fill={bottom} />
      <rect x="2" y="74" width="12" height="70" rx="6" fill={bottom} />
      <rect x="-17" y="140" width="18" height="9" rx="4.5" fill={shoe} />
      <rect x="0" y="140" width="18" height="9" rx="4.5" fill={shoe} />

      <path d="M-14 26 L-20 50" stroke={top} strokeWidth="10" strokeLinecap="round" />
      <path d="M-20 50 L-17 68" stroke={skin} strokeWidth="8" strokeLinecap="round" />
      <circle cx="-17" cy="69" r="5" fill={skin} />

      <rect x="-4.5" y="6" width="9" height="14" rx="3" fill={skin} />
      <rect x="-20" y="14" width="40" height="66" rx="16" fill={top} />

      {hairStyle === "curly" && (
        <g fill={hair}>
          <circle cx="-9" cy="-9" r="7" />
          <circle cx="0" cy="-13" r="8" />
          <circle cx="9" cy="-9" r="7" />
          <circle cx="-12" cy="-1" r="6" />
        </g>
      )}
      {hairStyle === "long" && <path d="M-16 -4 L-2 -4 L-2 26 Q-9 35 -18 30 Z" fill={hair} />}

      <circle cx="0" cy="0" r="13.5" fill={skin} />

      {hairStyle !== "curly" && <path d={CAP} fill={hair} />}
      {hairStyle === "bun" && <circle cx="-4" cy="-17" r="6" fill={hair} />}

      {/* support headset */}
      {headset && (
        <g fill="none" strokeLinecap="round">
          <path d="M-15 0 C-16 -22 16 -22 15 0" stroke={C.navy} strokeWidth="2.6" />
          <rect x="-18" y="-4" width="6" height="10" rx="3" fill={C.coral} stroke="none" />
          <path d="M-15 6 Q-14 15 -5 15" stroke={C.coral} strokeWidth="2" />
          <circle cx="-4" cy="15" r="2.2" fill={C.coral} stroke="none" />
        </g>
      )}

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
      <circle className="ci-pulse" cx={x} cy={y} r="3.5" fill={C.b400} style={{ animationDelay: `${delay}s` }} />
      <circle cx={x} cy={y} r="3.5" fill="#fff" stroke={C.b600} strokeWidth="1.6" />
    </g>
  );
}

function Chip({
  x,
  y,
  r = 22,
  duration,
  delay,
  filter,
  badge = false,
  badgeDelay = 0,
  children,
}: {
  x: number;
  y: number;
  r?: number;
  duration: string;
  delay: string;
  filter: string;
  badge?: boolean;
  badgeDelay?: number;
  children: React.ReactNode;
}) {
  const bx = r * 0.68;
  const by = -r * 0.68;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ci-float" style={{ animationDuration: duration, animationDelay: delay }}>
        <circle r={r} fill="#fff" filter={filter} />
        {children}
        {badge && (
          <g>
            <circle className="ci-pulse" cx={bx} cy={by} r="4" fill={C.coral} style={{ animationDelay: `${badgeDelay}s` }} />
            <circle cx={bx} cy={by} r="4.2" fill={C.coral} stroke="#fff" strokeWidth="1.5" />
          </g>
        )}
      </g>
    </g>
  );
}

function Bubble({
  x,
  y,
  dark = false,
  variant = "dots",
  duration,
  delay,
  filter,
}: {
  x: number;
  y: number;
  dark?: boolean;
  variant?: "dots" | "lines";
  duration: string;
  delay: string;
  filter: string;
}) {
  const w = 50;
  const h = 30;
  const bg = dark ? C.b600 : "#fff";
  const fg = dark ? "#fff" : C.b400;
  const d = `M8 0 H${w - 8} A8 8 0 0 1 ${w} 8 V${h - 8} A8 8 0 0 1 ${w - 8} ${h} H24 L12 ${h + 9} L12 ${h} H8 A8 8 0 0 1 0 ${h - 8} V8 A8 8 0 0 1 8 0 Z`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="ci-float" style={{ animationDuration: duration, animationDelay: delay }}>
        <path d={d} fill={bg} filter={filter} />
        {variant === "dots" ? (
          [-9, 0, 9].map((dx, i) => (
            <circle
              key={i}
              className="ci-type"
              cx={w / 2 + dx}
              cy={h / 2}
              r="2.6"
              fill={dark ? "#fff" : C.b500}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))
        ) : (
          <g>
            <rect x="9" y="8" width="32" height="4" rx="2" fill={fg} />
            <rect x="9" y="17" width="20" height="4" rx="2" fill={fg} opacity=".6" />
          </g>
        )}
      </g>
    </g>
  );
}

function Cloud({ x, y, s = 1, duration = 30, delay = 0 }: { x: number; y: number; s?: number; duration?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="ci-cloud" style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }} fill={C.b100} opacity=".85">
        <rect x="-14" y="-2" width="66" height="16" rx="8" />
        <circle cx="6" cy="-2" r="12" />
        <circle cx="26" cy="-9" r="16" />
        <circle cx="42" cy="-1" r="11" />
      </g>
    </g>
  );
}

function Plant({ x, y = 410, s = 1, delay = 0 }: { x: number; y?: number; s?: number; delay?: number }) {
  const leaves: [number, string][] = [
    [-38, C.b300],
    [-14, C.b600],
    [12, C.b400],
    [36, C.b500],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="ci-sway" style={{ animationDelay: `${delay}s` }}>
        {leaves.map(([a, fill], i) => (
          <ellipse key={i} cx="0" cy="-46" rx="9" ry="28" fill={fill} transform={`rotate(${a} 0 -16)`} />
        ))}
      </g>
      <path d="M-17 -24 L17 -24 L12 0 L-12 0 Z" fill={C.b700} />
      <rect x="-19" y="-29" width="38" height="8" rx="3" fill={C.navy} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

// x, y, radius, duration, delay
const PARTICLES: [number, number, number, number, number][] = [
  [90, 250, 2.5, 9, 0],
  [40, 340, 3, 8, -5],
  [230, 30, 2, 10, -2],
  [340, 24, 2.5, 12, -6],
  [470, 34, 2, 9, -4],
  [720, 240, 2.5, 10, -7],
  [760, 330, 2, 8, -3],
  [300, 300, 2, 9, -8],
  [510, 300, 2, 10, -2],
  [110, 20, 2, 11, -6],
  [690, 110, 2, 9, -4],
];

const LEFT_ARC = "M82 150 C150 195 240 195 300 130";
const RIGHT_ARC = "M718 150 C650 195 560 195 500 130";
const RIGHT_ARC_REV = "M500 130 C560 195 650 195 718 150";

export default function ContactHeroIllustration({
  className = "w-full max-w-xl",
}: {
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const shadow = `url(#${uid}-sh)`;

  return (
    <svg
      viewBox="0 0 800 450"
      className={`h-auto ${className}`}
      role="img"
      aria-label="Friendly consultants and support staff welcoming clients across India and the GCC through video meetings, chat, email and phone"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{CSS}</style>

      <defs>
        <filter id={`${uid}-sh`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={C.b700} floodOpacity=".18" />
        </filter>
        <linearGradient id={`${uid}-ped`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor={C.b100} />
        </linearGradient>
        <linearGradient id={`${uid}-hdr`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.b600} />
          <stop offset="1" stopColor={C.b400} />
        </linearGradient>
        <linearGradient id={`${uid}-tile`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.b100} />
          <stop offset="1" stopColor={C.b200} />
        </linearGradient>
      </defs>

      {/* ---------------------------- backdrop ---------------------------- */}
      <circle cx="400" cy="225" r="210" fill={C.b50} />
      <ellipse cx="400" cy="410" rx="340" ry="26" fill={C.b100} opacity=".55" />
      <line x1="40" y1="410" x2="760" y2="410" stroke={C.b200} strokeWidth="1.5" />

      <Cloud x={24} y={46} s={1} duration={32} />
      <Cloud x={690} y={50} s={1.1} duration={38} delay={-10} />
      <Cloud x={452} y={22} s={0.6} duration={26} delay={-4} />

      {PARTICLES.map(([px, py, pr, dur, delay], i) => (
        <circle
          key={i}
          className="ci-drift"
          cx={px}
          cy={py}
          r={pr}
          fill={i % 3 === 0 ? C.b300 : C.b400}
          opacity=".7"
          style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        />
      ))}

      {/* ------------------- global connection lines (offices) ------------------- */}
      <g fill="none" stroke={C.b400} strokeWidth="1.6" strokeLinecap="round">
        <path className="ci-flow" d={LEFT_ARC} />
        <path className="ci-flow" d={RIGHT_ARC} />
        <path className="ci-flow" d="M400 42 L400 56" />
        {[316, 372, 428, 484].map((cx, i) => {
          const ex = 370 + i * 20;
          return <path key={cx} className="ci-flow" d={`M${cx} 210 C${cx} 194 ${ex} 196 ${ex} 178`} opacity=".8" style={{ animationDelay: `${-i * 0.35}s` }} />;
        })}
      </g>
      <Node x={300} y={130} delay={0.2} />
      <Node x={500} y={130} delay={0.9} />
      <Node x={194} y={181} delay={1.4} />
      <Node x={606} y={181} delay={0.5} />

      {/* travelling emails between offices and the meeting */}
      <g>
        <rect x="-6.5" y="-4.5" width="13" height="9" rx="1.8" fill="#fff" stroke={C.b600} strokeWidth="1.4" />
        <path d="M-6 -3.5 L0 1 L6 -3.5" fill="none" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <animateMotion dur="7s" repeatCount="indefinite" path={LEFT_ARC} />
      </g>
      <g>
        <rect x="-6.5" y="-4.5" width="13" height="9" rx="1.8" fill="#fff" stroke={C.b600} strokeWidth="1.4" />
        <path d="M-6 -3.5 L0 1 L6 -3.5" fill="none" stroke={C.coral} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <animateMotion dur="7s" begin="-3.5s" repeatCount="indefinite" path={RIGHT_ARC_REV} />
      </g>

      {/* ------------------------- office chips ------------------------- */}
      {/* India office */}
      <Chip x={60} y={150} duration="6.5s" delay="-1s" filter={shadow}>
        <rect x="-8" y="-11" width="12" height="22" rx="1.5" fill={C.b600} />
        <rect x="4" y="-3" width="6" height="14" rx="1.5" fill={C.b400} />
        {[-7, -2, 3].map((yy) =>
          [-5.5, -1].map((xx) => <rect key={`${xx}-${yy}`} x={xx} y={yy} width="2.6" height="2.6" rx=".6" fill="#fff" />)
        )}
      </Chip>
      {/* GCC office */}
      <Chip x={740} y={150} duration="7s" delay="-3s" filter={shadow}>
        <rect x="-3" y="-6" width="6" height="17" rx="1.5" fill={C.b600} />
        <path d="M0 -12 V-6" stroke={C.coral} strokeWidth="1.8" strokeLinecap="round" />
        <rect x="-10" y="1" width="6" height="10" rx="1.5" fill={C.b400} />
        <rect x="4" y="-1" width="6" height="12" rx="1.5" fill={C.b400} />
        <path d="M-1 -2 V8 M1 -2 V8" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      </Chip>

      {/* globe chip above the meeting */}
      <Chip x={400} y={26} r={16} duration="5.5s" delay="0s" filter={shadow}>
        <circle r="9" fill="none" stroke={C.b600} strokeWidth="1.6" />
        <ellipse rx="4" ry="9" fill="none" stroke={C.b400} strokeWidth="1.3" />
        <path d="M-9 0 H9" stroke={C.b400} strokeWidth="1.3" />
        <circle className="ci-pulse" cx="6" cy="-6" r="2.2" fill={C.coral} />
        <circle cx="6" cy="-6" r="2.2" fill={C.coral} />
      </Chip>

      {/* --------------------------- calendar card --------------------------- */}
      <g transform="translate(170 40)">
        <g className="ci-float" style={{ animationDuration: "7.5s", animationDelay: "-1s" }}>
          <rect width="96" height="80" rx="10" fill="#fff" filter={shadow} />
          <path d="M0 10 A10 10 0 0 1 10 0 H86 A10 10 0 0 1 96 10 V20 H0 Z" fill={`url(#${uid}-hdr)`} />
          <rect x="24" y="-4" width="4" height="11" rx="2" fill={C.b300} />
          <rect x="68" y="-4" width="4" height="11" rx="2" fill={C.b300} />
          <rect x="30" y="7" width="36" height="5" rx="2.5" fill="#fff" opacity=".85" />
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4].map((col) => {
              const hot = row === 1 && col === 3;
              return <rect key={`${row}-${col}`} x={10 + col * 17} y={28 + row * 15} width="11" height="9" rx="2.5" fill={hot ? C.coral : C.b100} />;
            })
          )}
          <circle className="ci-pulse" cx="66.5" cy="47.5" r="4" fill={C.coral} />
        </g>
      </g>

      {/* --------------------------- planning card --------------------------- */}
      <g transform="translate(534 40)">
        <g className="ci-float" style={{ animationDuration: "8s", animationDelay: "-3s" }}>
          <rect width="100" height="80" rx="10" fill="#fff" filter={shadow} />
          <circle cx="12" cy="12" r="2.6" fill={C.b200} />
          <circle cx="21" cy="12" r="2.6" fill={C.b300} />
          <circle cx="30" cy="12" r="2.6" fill={C.b400} />
          {[0, 1, 2].map((col) => (
            <rect key={col} x={9 + col * 30} y="22" width="26" height="4" rx="2" fill={C.b300} />
          ))}
          <rect x="9" y="30" width="26" height="10" rx="3" fill={C.b100} />
          <rect x="9" y="43" width="26" height="10" rx="3" fill={C.b100} />
          <rect x="39" y="30" width="26" height="13" rx="3" fill={C.b400} />
          <rect x="69" y="30" width="26" height="10" rx="3" fill={C.coral} />
          <rect x="69" y="43" width="26" height="10" rx="3" fill={C.b100} />
          <rect x="9" y="62" width="82" height="6" rx="3" fill={C.b100} />
          <rect x="9" y="62" width="52" height="6" rx="3" fill={C.b600} />
        </g>
      </g>

      {/* ------------------------ video meeting screen ------------------------ */}
      <g transform="translate(300 56)">
        <g className="ci-float" style={{ animationDuration: "7s", animationDelay: "-2s" }}>
          <rect width="200" height="120" rx="12" fill="#fff" filter={shadow} />
          <circle cx="14" cy="12" r="3" fill={C.b200} />
          <circle cx="24" cy="12" r="3" fill={C.b300} />
          <circle cx="34" cy="12" r="3" fill={C.b400} />
          <circle className="ci-pulse" cx="186" cy="12" r="3" fill={C.coral} />
          <circle cx="186" cy="12" r="3" fill={C.coral} />

          {/* main speaker */}
          <rect x="10" y="22" width="118" height="72" rx="7" fill={`url(#${uid}-tile)`} stroke={C.b500} strokeWidth="1.6" />
          <path d="M45 94 Q45 63 69 63 Q93 63 93 94 Z" fill={C.b600} />
          <circle cx="69" cy="48" r="10.5" fill="#e0ac69" />
          <path d="M58.5 46 C58 34 80 34 79.5 46 C76 41 63 41 58.5 46 Z" fill="#4b2e1a" />

          {/* participants */}
          <rect x="134" y="22" width="56" height="34" rx="6" fill={C.b50} stroke={C.b200} />
          <path d="M152 56 Q152 45 162 45 Q172 45 172 56 Z" fill={C.navy} />
          <circle cx="162" cy="37" r="6" fill="#8d5524" />
          <rect x="134" y="60" width="56" height="34" rx="6" fill={C.b50} stroke={C.b200} />
          <path d="M152 94 Q152 83 162 83 Q172 83 172 94 Z" fill={C.b400} />
          <circle cx="162" cy="75" r="6" fill="#f2c6a0" />

          {/* controls */}
          <circle cx="78" cy="107" r="5" fill={C.b100} />
          <circle cx="94" cy="107" r="5" fill={C.b100} />
          <circle cx="110" cy="107" r="5" fill={C.b100} />
          <circle cx="126" cy="107" r="5" fill={C.coral} />
        </g>
      </g>

      {/* -------------------------- contact channels -------------------------- */}
      {/* phone */}
      <Chip x={316} y={232} duration="6s" delay="-1s" filter={shadow} badge badgeDelay={0}>
        <rect x="-6" y="-10" width="12" height="20" rx="3" fill="none" stroke={C.b600} strokeWidth="1.8" />
        <circle cx="0" cy="6.5" r="1.2" fill={C.b600} />
        <path d="M9 -4 Q12 0 9 4 M12.5 -7 Q17 0 12.5 7" fill="none" stroke={C.coral} strokeWidth="1.6" strokeLinecap="round" />
      </Chip>
      {/* email */}
      <Chip x={372} y={232} duration="6.6s" delay="-3s" filter={shadow} badge badgeDelay={0.8}>
        <rect x="-10" y="-7" width="20" height="14" rx="2.5" fill="none" stroke={C.b600} strokeWidth="1.8" />
        <path d="M-10 -5.5 L0 2 L10 -5.5" fill="none" stroke={C.coral} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </Chip>
      {/* chat */}
      <Chip x={428} y={232} duration="6.2s" delay="-2s" filter={shadow} badge badgeDelay={1.5}>
        <path d="M-10 -8 H10 A2.5 2.5 0 0 1 12.5 -5.5 V4 A2.5 2.5 0 0 1 10 6.5 H-2 L-7 11 V6.5 H-10 A2.5 2.5 0 0 1 -12.5 4 V-5.5 A2.5 2.5 0 0 1 -10 -8 Z" fill="none" stroke={C.b600} strokeWidth="1.8" strokeLinejoin="round" />
        {[-5.5, 0, 5.5].map((dx, i) => (
          <circle key={i} className="ci-type" cx={dx} cy="-0.5" r="1.5" fill={C.coral} style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </Chip>
      {/* meeting request */}
      <Chip x={484} y={232} duration="6.8s" delay="-4s" filter={shadow} badge badgeDelay={2.2}>
        <rect x="-10" y="-8" width="20" height="17" rx="3" fill="none" stroke={C.b600} strokeWidth="1.8" />
        <path d="M-10 -3 H10 M-5 -11 V-6 M5 -11 V-6" stroke={C.b600} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M0 1 V7 M-3 4 H3" stroke={C.coral} strokeWidth="2" strokeLinecap="round" />
      </Chip>

      {/* ---------------------- appointment card (centre) ---------------------- */}
      <g transform="translate(338 274)">
        <g className="ci-float" style={{ animationDuration: "6.4s", animationDelay: "-2.5s" }}>
          <rect width="124" height="48" rx="10" fill="#fff" filter={shadow} />
          <rect x="10" y="9" width="30" height="30" rx="7" fill={C.b100} />
          <path d="M10 16 A7 7 0 0 1 17 9 H33 A7 7 0 0 1 40 16 V21 H10 Z" fill={C.coral} />
          <rect x="18" y="27" width="14" height="4" rx="2" fill={C.b600} />
          <rect x="48" y="13" width="44" height="6" rx="3" fill={C.b200} />
          <rect x="48" y="26" width="30" height="6" rx="3" fill={C.b100} />
          <circle cx="107" cy="24" r="9" fill={C.b100} />
          <path d="M102.5 24 L106 27.5 L112 20.5" fill="none" stroke={C.b600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* ------------------------ reception credenza ------------------------ */}
      <rect x="326" y="368" width="148" height="42" rx="6" fill={`url(#${uid}-ped)`} stroke={C.b200} strokeWidth="1.5" />
      <path d="M400 372 V410" stroke={C.b200} strokeWidth="1.5" />
      <rect x="374" y="386" width="14" height="3" rx="1.5" fill={C.b300} />
      <rect x="412" y="386" width="14" height="3" rx="1.5" fill={C.b300} />

      {/* calculator */}
      <g transform="translate(340 336)">
        <rect width="26" height="32" rx="4" fill={C.b700} />
        <rect x="4" y="4" width="18" height="8" rx="2" fill={C.b100} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}-${c}`} x={4 + c * 6.5} y={16 + r * 5.5} width="5" height="4" rx="1" fill={r === 2 && c === 2 ? C.coral : C.b200} />
          ))
        )}
      </g>
      {/* ledger books */}
      <rect x="378" y="360" width="38" height="8" rx="2" fill={C.b600} />
      <rect x="382" y="352" width="32" height="8" rx="2" fill={C.b300} />
      <path d="M386 356 H404" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      {/* coins */}
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx="432" cy={365 - i * 4.5} rx="9" ry="3.5" fill={C.coral} stroke="#fff" strokeWidth="1" />
      ))}
      <Plant x={458} y={368} s={0.5} delay={-2} />

      {/* ------------------------------ tables ------------------------------ */}
      {/* left: support desk with laptop */}
      <g>
        <rect x="155" y="350" width="50" height="6" rx="3" fill={C.b200} />
        <rect x="162" y="356" width="3" height="54" fill={C.b200} />
        <rect x="195" y="356" width="3" height="54" fill={C.b200} />
        <rect x="166" y="324" width="28" height="20" rx="2.5" fill={C.navy} />
        <rect x="168" y="326" width="24" height="16" rx="1.5" fill={C.b100} />
        <rect x="171" y="335" width="3" height="5" rx="1" fill={C.b600} />
        <rect x="176" y="331" width="3" height="9" rx="1" fill={C.b400} />
        <rect x="181" y="329" width="3" height="11" rx="1" fill={C.coral} />
        <rect x="186" y="333" width="3" height="7" rx="1" fill={C.b500} />
        <rect x="162" y="344" width="36" height="5" rx="2.5" fill={C.b300} />
      </g>
      {/* right: consultation table with coffee and documents */}
      <g>
        <rect x="595" y="350" width="50" height="6" rx="3" fill={C.b200} />
        <rect x="602" y="356" width="3" height="54" fill={C.b200} />
        <rect x="635" y="356" width="3" height="54" fill={C.b200} />
        <rect x="602" y="339" width="10" height="11" rx="2.5" fill="#fff" stroke={C.b600} strokeWidth="1.6" />
        <path d="M612 342 Q616 344 612 347" fill="none" stroke={C.b600} strokeWidth="1.4" strokeLinecap="round" />
        <rect x="620" y="346" width="22" height="4" rx="1.5" fill="#fff" stroke={C.b300} />
        <rect x="622" y="342" width="18" height="4" rx="1.5" fill={C.b100} stroke={C.b300} />
      </g>

      {/* ------------------------------ people ------------------------------ */}
      {/* support representative + business owner */}
      <Person x={115} skin="#e0ac69" hair="#4b2e1a" top={C.b600} bottom={C.navy} shoe={C.coral} hairStyle="bun" item="point" headset />
      <Person x={245} flip skin="#8d5524" hair="#111827" top={C.b200} bottom="#1e293b" shoe={C.navy} hairStyle="short" item="tablet" />
      {/* consultant + client */}
      <Person x={555} skin="#f2c6a0" hair="#7c2d12" top={C.navy} bottom="#94a3b8" shoe={C.coral} hairStyle="long" item="tablet" />
      <Person x={685} flip skin="#c68642" hair="#1f2937" top={C.b400} bottom="#1e3a8a" shoe={C.navy} hairStyle="curly" item="point" />

      {/* --------------------------- message bubbles --------------------------- */}
      <Bubble x={68} y={204} variant="dots" duration="5.6s" delay="-1s" filter={shadow} />
      <Bubble x={222} y={198} dark variant="lines" duration="6.2s" delay="-3s" filter={shadow} />
      <Bubble x={532} y={198} dark variant="dots" duration="6s" delay="-2s" filter={shadow} />
      <Bubble x={668} y={206} variant="lines" duration="5.8s" delay="-4s" filter={shadow} />

      {/* ------------------------------ plants ------------------------------ */}
      <Plant x={38} s={1} delay={0} />
      <Plant x={762} s={1.05} delay={-2.5} />
    </svg>
  );
}