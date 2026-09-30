import { useId, type ReactElement } from "react";

/* -------------------------------------------------------------------------- */
/*  Animations (scoped with the "sv-" prefix, no global CSS needed)           */
/* -------------------------------------------------------------------------- */
const CSS = `
.sv-float{animation:sv-float 6s ease-in-out infinite}
@keyframes sv-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

.sv-drift{animation:sv-drift 9s ease-in-out infinite}
@keyframes sv-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,-14px)}}

.sv-flow{stroke-dasharray:4 6;animation:sv-flow 1.6s linear infinite}
@keyframes sv-flow{to{stroke-dashoffset:-20}}

.sv-pulse{transform-box:fill-box;transform-origin:center;animation:sv-pulse 2.6s ease-out infinite}
@keyframes sv-pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(3.4);opacity:0}}

.sv-bar{transform-box:fill-box;transform-origin:bottom;animation:sv-bar 3.4s ease-in-out infinite}
@keyframes sv-bar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.6)}}

.sv-spin{transform-box:fill-box;transform-origin:center;animation:sv-spin 40s linear infinite}
@keyframes sv-spin{to{transform:rotate(360deg)}}

.sv-draw{stroke-dasharray:200;animation:sv-draw 5s ease-in-out infinite}
@keyframes sv-draw{0%{stroke-dashoffset:200}60%,100%{stroke-dashoffset:0}}

.sv-tick{stroke-dasharray:14;stroke-dashoffset:14;animation:sv-tick 5s ease-in-out infinite}
@keyframes sv-tick{0%,8%{stroke-dashoffset:14}22%,80%{stroke-dashoffset:0}95%,100%{stroke-dashoffset:14}}

.sv-scan{animation:sv-scan 5s ease-in-out infinite}
@keyframes sv-scan{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,-2px)}}

.sv-beat{transform-box:fill-box;transform-origin:center;animation:sv-beat 2.4s ease-in-out infinite}
@keyframes sv-beat{0%,100%{transform:scale(1)}50%{transform:scale(1.16)}}

.sv-dot{animation:sv-dot 1.4s ease-in-out infinite}
@keyframes sv-dot{0%,100%{opacity:.25}50%{opacity:1}}

@media (prefers-reduced-motion:reduce){
  .sv-float,.sv-drift,.sv-flow,.sv-pulse,.sv-bar,.sv-spin,.sv-draw,.sv-scan,.sv-beat,.sv-dot{animation:none!important}
  .sv-tick{animation:none!important;stroke-dashoffset:0}
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
  coralDark: "#ea5a48",
};

/* -------------------------------------------------------------------------- */
/*  Flat character                                                            */
/* -------------------------------------------------------------------------- */
type HairStyle = "short" | "long" | "bun" | "curly";
type Item = "tablet" | "report" | "point";

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

      <path d={armPath[1]} stroke={skin} strokeWidth="8" strokeLinecap="round" />
      <circle cx={hand[0]} cy={hand[1]} r="5" fill={skin} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Building blocks                                                           */
/* -------------------------------------------------------------------------- */
function Node({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g>
      <circle
        className="sv-pulse"
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

/** A client company building standing on the ground line */
function Building({
  x,
  w,
  h,
  color,
  cols,
  rows,
}: {
  x: number;
  w: number;
  h: number;
  color: string;
  cols: number;
  rows: number;
}) {
  const top = 410 - h;
  const cell = (w - 12) / cols;
  const wins: ReactElement[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      wins.push(
        <rect
          key={`${r}-${c}`}
          x={x + 6 + c * cell + 2}
          y={top + 12 + r * 17}
          width={cell - 4}
          height="9"
          rx="2"
          fill="#fff"
          opacity={(r + c) % 3 === 0 ? 0.95 : 0.55}
        />
      );
    }
  }
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} rx="5" fill={color} />
      <rect x={x} y={top} width={w} height="6" rx="3" fill="#fff" opacity=".18" />
      {wins}
      <rect x={x + w / 2 - 5} y={410 - 16} width="10" height="16" rx="2" fill="#fff" opacity=".9" />
    </g>
  );
}

/** Small company token that travels along a path */
function Token({
  path,
  dur,
  begin = "0s",
  accent = false,
}: {
  path: string;
  dur: string;
  begin?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect x="-7" y="-8" width="14" height="16" rx="3" fill="#fff" stroke={accent ? C.coral : C.b600} strokeWidth="1.6" />
      <rect x="-4" y="-5" width="3" height="3" rx="1" fill={accent ? C.coral : C.b400} />
      <rect x="1" y="-5" width="3" height="3" rx="1" fill={accent ? C.coral : C.b400} />
      <rect x="-4" y="1" width="3" height="3" rx="1" fill={accent ? C.coral : C.b400} />
      <rect x="1" y="1" width="3" height="3" rx="1" fill={accent ? C.coral : C.b400} />
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
    </g>
  );
}

/** Service card with a header icon; content is passed as children */
function Card({
  x,
  y,
  dur,
  delay,
  filter,
  icon,
  children,
}: {
  x: number;
  y: number;
  dur: string;
  delay: string;
  filter: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="sv-float" style={{ animationDuration: dur, animationDelay: delay }}>
        <rect width="96" height="92" rx="12" fill="#fff" filter={filter} />
        <circle cx="20" cy="20" r="12" fill={C.b100} />
        <g
          transform="translate(20 20)"
          fill="none"
          stroke={C.b600}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </g>
        <rect x="40" y="15" width="44" height="5" rx="2.5" fill={C.b100} />
        <rect x="40" y="24" width="28" height="4" rx="2" fill={C.b50} />
        {children}
      </g>
    </g>
  );
}

/** Loose floating document sheet */
function Sheet({
  x,
  y,
  rot,
  dur,
  delay,
  filter,
  children,
}: {
  x: number;
  y: number;
  rot: number;
  dur: string;
  delay: string;
  filter: string;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="sv-float" style={{ animationDuration: dur, animationDelay: delay }}>
        <g transform={`rotate(${rot})`}>
          <rect width="46" height="58" rx="6" fill="#fff" filter={filter} />
          {children}
        </g>
      </g>
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Layout data                                                               */
/* -------------------------------------------------------------------------- */
const HUB = { x: 330, y: 128 };

const COMPANY_PATHS = [
  "M52 288 C52 190 190 150 304 134",
  "M101 324 C110 240 220 170 306 140",
  "M151 304 C160 230 240 180 308 146",
];
const TOP_ARC = "M346 108 C420 8 690 8 720 62";

const COLS = [440, 556, 672];
const ROWS = [62, 192];

// x, y, radius, duration, delay
const PARTICLES: [number, number, number, number, number][] = [
  [190, 60, 2.5, 9, 0],
  [250, 340, 2, 11, -3],
  [30, 200, 3, 8, -5],
  [420, 30, 2, 10, -2],
  [780, 30, 2.5, 12, -6],
  [790, 190, 2, 9, -4],
  [420, 300, 3, 11, -1],
  [770, 300, 2.5, 10, -7],
  [370, 280, 2, 8, -3],
  [120, 90, 3, 12, -5],
  [640, 320, 2, 9, -8],
  [230, 220, 2, 10, -2],
];

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */
export default function ServicesIllustration({
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
      aria-label="A business advisor guiding client companies through tax, audit, registration, compliance and consulting services"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{CSS}</style>

      <defs>
        <filter id={`${uid}-sh`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={C.b700} floodOpacity=".18" />
        </filter>
        <linearGradient id={`${uid}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.b400} />
          <stop offset="1" stopColor={C.b600} />
        </linearGradient>
        <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.b400} stopOpacity=".4" />
          <stop offset="1" stopColor={C.b400} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${uid}-hub`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor={C.b400} />
          <stop offset="1" stopColor={C.b700} />
        </radialGradient>
      </defs>

      {/* ---------------------------- backdrop ---------------------------- */}
      <circle cx="400" cy="225" r="210" fill={C.b50} />
      <ellipse cx="400" cy="410" rx="350" ry="26" fill={C.b100} opacity=".55" />
      <line x1="20" y1="410" x2="780" y2="410" stroke={C.b200} strokeWidth="1.5" />

      {PARTICLES.map(([px, py, pr, dur, delay], i) => (
        <circle
          key={i}
          className="sv-drift"
          cx={px}
          cy={py}
          r={pr}
          fill={i % 3 === 0 ? C.b300 : C.b400}
          opacity=".7"
          style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        />
      ))}

      {/* -------------------- client companies (left) --------------------- */}
      <Building x={30} w={44} h={122} color={C.b600} cols={2} rows={5} />
      <Building x={82} w={38} h={86} color={C.b400} cols={2} rows={3} />
      <Building x={128} w={46} h={106} color={C.navy} cols={2} rows={4} />

      {/* floating documents beside the advisor */}
      <Sheet x={196} y={296} rot={-8} dur="7s" delay="-1s" filter={shadow}>
        <rect x="8" y="10" width="26" height="4" rx="2" fill={C.b200} />
        <rect x="8" y="19" width="18" height="4" rx="2" fill={C.b100} />
        <rect x="8" y="28" width="22" height="4" rx="2" fill={C.b100} />
        <g className="sv-beat">
          <circle cx="30" cy="44" r="9" fill="none" stroke={C.coral} strokeWidth="2" />
          <circle cx="27" cy="41" r="1.6" fill="none" stroke={C.coral} strokeWidth="1.4" />
          <circle cx="33" cy="47" r="1.6" fill="none" stroke={C.coral} strokeWidth="1.4" />
          <path d="M34 40 L26 48" stroke={C.coral} strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </Sheet>
      <Sheet x={244} y={330} rot={6} dur="8s" delay="-3s" filter={shadow}>
        <rect x="8" y="10" width="20" height="4" rx="2" fill={C.b200} />
        <rect className="sv-bar" x="9" y="30" width="7" height="16" rx="2" fill={C.b300} style={{ animationDelay: "-0.4s" }} />
        <rect className="sv-bar" x="20" y="22" width="7" height="24" rx="2" fill={C.b600} style={{ animationDelay: "-1.2s" }} />
        <rect className="sv-bar" x="31" y="27" width="7" height="19" rx="2" fill={C.b400} style={{ animationDelay: "-2s" }} />
        <path className="sv-tick" d="M12 52 L16 56 L24 48" fill="none" stroke={C.coral} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Sheet>

      {/* ---------------------------- pathways ---------------------------- */}
      <g fill="none" stroke={C.b400} strokeWidth="1.6" strokeLinecap="round">
        {COMPANY_PATHS.map((d, i) => (
          <path key={i} className="sv-flow" d={d} style={{ animationDelay: `${-i * 0.4}s` }} />
        ))}
        <path className="sv-flow" d="M358 126 C398 124 412 110 440 108" />
        <path className="sv-flow" d="M350 150 C394 182 412 236 440 238" />
        <path className="sv-flow" d={TOP_ARC} />
        <path className="sv-flow" d={`M${HUB.x} 160 L${HUB.x} 214`} />
        {/* between cards */}
        <path className="sv-flow" d="M536 108 L556 108" />
        <path className="sv-flow" d="M652 108 L672 108" />
        <path className="sv-flow" d="M536 238 L556 238" />
        <path className="sv-flow" d="M652 238 L672 238" />
        <path className="sv-flow" d="M488 154 L488 192" />
        <path className="sv-flow" d="M604 154 L604 192" />
        <path className="sv-flow" d="M720 154 L720 192" />
      </g>
      {[
        [440, 108],
        [440, 238],
        [546, 108],
        [546, 238],
        [662, 108],
        [662, 238],
        [488, 173],
        [604, 173],
        [720, 173],
      ].map(([nx, ny], i) => (
        <Node key={i} x={nx} y={ny} delay={i * 0.35} />
      ))}

      {/* companies travelling along the pathways */}
      <Token path={COMPANY_PATHS[0]} dur="7s" />
      <Token path={COMPANY_PATHS[1]} dur="6s" begin="-2s" />
      <Token path={COMPANY_PATHS[2]} dur="6.5s" begin="-4s" />
      <Token path={TOP_ARC} dur="9s" begin="-3s" accent />

      {/* ------------------------------ hub ------------------------------- */}
      <g>
        <circle
          className="sv-spin"
          cx={HUB.x}
          cy={HUB.y}
          r="36"
          fill="none"
          stroke={C.b300}
          strokeWidth="1.3"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
        <circle className="sv-pulse" cx={HUB.x} cy={HUB.y} r="26" fill={C.b400} opacity=".4" />
        <circle cx={HUB.x} cy={HUB.y} r="26" fill="#fff" filter={shadow} />
        <circle cx={HUB.x} cy={HUB.y} r="19" fill={`url(#${uid}-hub)`} />
        <circle cx={HUB.x} cy={HUB.y} r="9" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx={HUB.x} cy={HUB.y} r="3.5" fill={C.coral} />
        <path d={`M${HUB.x} ${HUB.y - 13} V${HUB.y - 9} M${HUB.x} ${HUB.y + 9} V${HUB.y + 13} M${HUB.x - 13} ${HUB.y} H${HUB.x - 9} M${HUB.x + 9} ${HUB.y} H${HUB.x + 13}`} stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* ---------------------------- service cards ----------------------- */}
      {/* 1. tax */}
      <Card
        x={COLS[0]}
        y={ROWS[0]}
        dur="7s"
        delay="-1s"
        filter={shadow}
        icon={
          <>
            <circle cx="-4" cy="-4" r="2.2" />
            <circle cx="4" cy="4" r="2.2" />
            <path d="M5 -5 L-5 5" />
          </>
        }
      >
        <rect x="12" y="42" width="40" height="5" rx="2.5" fill={C.b100} />
        <rect x="12" y="53" width="30" height="5" rx="2.5" fill={C.b100} />
        <rect x="12" y="64" width="36" height="5" rx="2.5" fill={C.b100} />
        <g className="sv-beat">
          <circle cx="70" cy="66" r="12" fill="none" stroke={C.coral} strokeWidth="2.2" />
          <path d="M64 66 L69 71 L77 61" fill="none" stroke={C.coral} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Card>

      {/* 2. audit */}
      <Card
        x={COLS[1]}
        y={ROWS[0]}
        dur="7.5s"
        delay="-3s"
        filter={shadow}
        icon={
          <>
            <circle cx="-1" cy="-1" r="4.5" />
            <path d="M2.5 2.5 L6 6" />
          </>
        }
      >
        <rect className="sv-bar" x="14" y="64" width="9" height="16" rx="2.5" fill={C.b300} style={{ animationDelay: "-0.4s" }} />
        <rect className="sv-bar" x="28" y="54" width="9" height="26" rx="2.5" fill={C.b600} style={{ animationDelay: "-1.3s" }} />
        <rect className="sv-bar" x="42" y="60" width="9" height="20" rx="2.5" fill={C.b400} style={{ animationDelay: "-2.2s" }} />
        <g className="sv-scan">
          <circle cx="66" cy="62" r="11" fill="#fff" fillOpacity=".6" stroke={C.coral} strokeWidth="2.5" />
          <path d="M74 70 L82 78" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
        </g>
      </Card>

      {/* 3. financial dashboard */}
      <Card
        x={COLS[2]}
        y={ROWS[0]}
        dur="8s"
        delay="-2s"
        filter={shadow}
        icon={<path d="M-6 4 L-2 -1 L2 2 L6 -5" />}
      >
        {[14, 20, 16, 26, 22].map((h, i) => (
          <rect
            key={i}
            className="sv-bar"
            x={14 + i * 14}
            y={82 - h}
            width="8"
            height={h}
            rx="2.5"
            fill={C.b100}
            style={{ animationDelay: `${-i * 0.5}s` }}
          />
        ))}
        <path d="M12 76 C24 70 30 74 40 60 S58 56 70 46 S80 42 84 36 L84 82 L12 82 Z" fill={`url(#${uid}-area)`} />
        <path className="sv-draw" d="M12 76 C24 70 30 74 40 60 S58 56 70 46 S80 42 84 36" fill="none" stroke={C.b600} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="84" cy="36" r="3.5" fill={C.coral} />
      </Card>

      {/* 4. business registration */}
      <Card
        x={COLS[0]}
        y={ROWS[1]}
        dur="7.2s"
        delay="-4s"
        filter={shadow}
        icon={
          <>
            <rect x="-5" y="-6" width="10" height="12" rx="1.5" />
            <path d="M-2 -3 H-1 M2 -3 H3 M-2 1 H-1 M2 1 H3" />
          </>
        }
      >
        <rect x="12" y="44" width="32" height="38" rx="3" fill={C.b100} />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <rect key={`${r}${c}`} x={18 + c * 13} y={49 + r * 10} width="7" height="6" rx="1.5" fill={C.b600} opacity={(r + c) % 2 ? 0.6 : 1} />
          ))
        )}
        <rect x="50" y="46" width="34" height="30" rx="3" fill="#fff" stroke={C.b300} />
        <rect x="55" y="52" width="20" height="3" rx="1.5" fill={C.b200} />
        <rect x="55" y="59" width="14" height="3" rx="1.5" fill={C.b100} />
        <path d="M62 75 L60 86 L66 82 L72 86 L70 75 Z" fill={C.coralDark} />
        <circle className="sv-beat" cx="66" cy="72" r="7" fill={C.coral} />
        <path d="M63 72 L65.5 74.5 L69.5 69.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </Card>

      {/* 5. compliance checklist */}
      <Card
        x={COLS[1]}
        y={ROWS[1]}
        dur="8.2s"
        delay="-2s"
        filter={shadow}
        icon={
          <>
            <rect x="-5" y="-6" width="10" height="12" rx="2" />
            <path d="M-3 0 L-1 2 L3 -3" />
          </>
        }
      >
        {[46, 62, 78].map((cy, i) => (
          <g key={cy}>
            <rect x="12" y={cy - 6} width="12" height="12" rx="3" fill={C.b50} stroke={C.b300} strokeWidth="1.2" />
            <path
              className="sv-tick"
              d={`M14.5 ${cy} L17.5 ${cy + 3} L22 ${cy - 3.5}`}
              fill="none"
              stroke={C.b600}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
            <rect x="32" y={cy - 3} width={[46, 36, 42][i]} height="6" rx="3" fill={C.b100} />
          </g>
        ))}
      </Card>

      {/* 6. consulting meeting */}
      <Card
        x={COLS[2]}
        y={ROWS[1]}
        dur="7.8s"
        delay="-5s"
        filter={shadow}
        icon={
          <>
            <rect x="-6" y="-5" width="12" height="9" rx="3" />
            <path d="M-2 4 L-4 8 L1 4" />
          </>
        }
      >
        <rect x="12" y="38" width="34" height="18" rx="9" fill={C.b100} />
        <path d="M20 55 L17 62 L27 56 Z" fill={C.b100} />
        {[22, 29, 36].map((cx, i) => (
          <circle key={cx} className="sv-dot" cx={cx} cy="47" r="2" fill={C.b600} style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
        <rect x="50" y="46" width="34" height="18" rx="9" fill={C.b600} />
        <path d="M76 63 L80 70 L70 64 Z" fill={C.b600} />
        {[58, 65, 72].map((cx, i) => (
          <circle key={cx} className="sv-dot" cx={cx} cy="55" r="2" fill="#fff" style={{ animationDelay: `${0.4 + i * 0.25}s` }} />
        ))}
        <circle cx="24" cy="76" r="5" fill="#c68642" />
        <path d="M14 92 Q14 83 24 83 Q34 83 34 92 Z" fill={C.b400} />
        <circle cx="74" cy="78" r="5" fill="#f2c6a0" />
        <path d="M64 92 Q64 85 74 85 Q84 85 84 92 Z" fill={C.navy} />
      </Card>

      {/* ------------------------------ people ---------------------------- */}
      {/* platform */}
      <ellipse cx="330" cy="410" rx="62" ry="9" fill={C.b100} />
      <ellipse cx="330" cy="410" rx="44" ry="6" fill="none" stroke={C.b400} strokeWidth="1.4" />

      {/* advisor */}
      <Person x={330} y={237} scale={1.15} skin="#c68642" hair="#111827" top={C.b700} bottom={C.navy} shoe={C.coral} hairStyle="short" item="point" />

      {/* clients in a consulting meeting */}
      <Person x={520} y={319} scale={0.6} flip skin="#f2c6a0" hair="#7c2d12" top={C.b200} bottom="#1e3a8a" shoe={C.navy} hairStyle="long" item="tablet" />
      <Person x={600} y={319} scale={0.6} flip skin="#8d5524" hair="#1f2937" top={C.b400} bottom="#1e293b" shoe={C.coral} hairStyle="bun" item="report" />
    </svg>
  );
}