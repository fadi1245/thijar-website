import { useId } from "react";

/* -------------------------------------------------------------------------- */
/*  Animations (scoped with the "erp-" prefix, no global CSS needed)          */
/* -------------------------------------------------------------------------- */
const CSS = `
.erp-float{animation:erp-float 6s ease-in-out infinite}
@keyframes erp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

.erp-drift{animation:erp-drift 9s ease-in-out infinite}
@keyframes erp-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,-14px)}}

.erp-flow{stroke-dasharray:4 6;animation:erp-flow 1.6s linear infinite}
@keyframes erp-flow{to{stroke-dashoffset:-20}}

.erp-pulse{transform-box:fill-box;transform-origin:center;animation:erp-pulse 2.6s ease-out infinite}
@keyframes erp-pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(3.4);opacity:0}}

.erp-bar{transform-box:fill-box;transform-origin:bottom;animation:erp-bar 3.4s ease-in-out infinite}
@keyframes erp-bar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.6)}}

.erp-prog{transform-box:fill-box;transform-origin:left;animation:erp-prog 4s ease-in-out infinite}
@keyframes erp-prog{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.5)}}

.erp-spin{transform-box:fill-box;transform-origin:center;animation:erp-spin 14s linear infinite}
@keyframes erp-spin{to{transform:rotate(360deg)}}
.erp-spin-rev{transform-box:fill-box;transform-origin:center;animation:erp-spin-rev 14s linear infinite}
@keyframes erp-spin-rev{to{transform:rotate(-360deg)}}

.erp-draw{stroke-dasharray:200;animation:erp-draw 5s ease-in-out infinite}
@keyframes erp-draw{0%{stroke-dashoffset:200}60%,100%{stroke-dashoffset:0}}

.erp-tick{stroke-dasharray:14;stroke-dashoffset:14;animation:erp-tick 5s ease-in-out infinite}
@keyframes erp-tick{0%,8%{stroke-dashoffset:14}22%,80%{stroke-dashoffset:0}95%,100%{stroke-dashoffset:14}}

.erp-slide{animation:erp-slide 12s ease-in-out infinite}
@keyframes erp-slide{
  0%,16%{transform:translateY(0)}
  20%,36%{transform:translateY(30px)}
  40%,56%{transform:translateY(60px)}
  60%,76%{transform:translateY(90px)}
  80%,96%{transform:translateY(120px)}
  100%{transform:translateY(0)}
}

.erp-knob{animation:erp-knob 4s ease-in-out infinite}
@keyframes erp-knob{0%,40%{transform:translateX(0)}50%,90%{transform:translateX(12px)}100%{transform:translateX(0)}}

.erp-dot{animation:erp-dot 1.4s ease-in-out infinite}
@keyframes erp-dot{0%,100%{opacity:.25}50%{opacity:1}}

.erp-blink{animation:erp-blink 2s steps(1) infinite}
@keyframes erp-blink{0%,55%{opacity:1}56%,75%{opacity:.25}76%,100%{opacity:1}}

.erp-updown{animation:erp-updown 1.8s ease-in-out infinite}
@keyframes erp-updown{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}

@media (prefers-reduced-motion:reduce){
  .erp-float,.erp-drift,.erp-flow,.erp-pulse,.erp-bar,.erp-prog,.erp-spin,.erp-spin-rev,
  .erp-draw,.erp-slide,.erp-knob,.erp-dot,.erp-blink,.erp-updown{animation:none!important}
  .erp-tick{animation:none!important;stroke-dashoffset:0}
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
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
function gearPath(r: number, teeth: number) {
  const ri = r * 0.78;
  const step = (Math.PI * 2) / teeth;
  let d = "";
  for (let k = 0; k < teeth; k++) {
    const a = k * step;
    const pts: [number, number][] = [
      [a - 0.32 * step, ri],
      [a - 0.16 * step, r],
      [a + 0.16 * step, r],
      [a + 0.32 * step, ri],
    ];
    pts.forEach(([ang, rad], i) => {
      d += `${k === 0 && i === 0 ? "M" : "L"}${(Math.cos(ang) * rad).toFixed(1)} ${(Math.sin(ang) * rad).toFixed(1)} `;
    });
  }
  return `${d}Z`;
}
const GEAR_L = gearPath(12, 8);
const GEAR_S = gearPath(8, 6);

function Node({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g>
      <circle
        className="erp-pulse"
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

/** Small data packet travelling along a path */
function Packet({
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
  const col = accent ? C.coral : C.b600;
  return (
    <g>
      <rect x="-5" y="-5" width="10" height="10" rx="3" fill="#fff" stroke={col} strokeWidth="1.6" />
      <circle r="1.8" fill={col} />
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
    </g>
  );
}

/** ERP module card (icon + placeholder header + custom body) */
function Module({
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
      <g className="erp-float" style={{ animationDuration: dur, animationDelay: delay }}>
        <rect width="100" height="72" rx="12" fill="#fff" filter={filter} />
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
        <rect x="40" y="15" width="48" height="5" rx="2.5" fill={C.b100} />
        <rect x="40" y="24" width="30" height="4" rx="2" fill={C.b50} />
        {children}
      </g>
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Layout data                                                               */
/* -------------------------------------------------------------------------- */
const LEFT_X = 28;
const RIGHT_X = 672;
const ROWS = [36, 126, 216, 306];

const IN_PATHS = [
  "M120 72 C200 72 210 150 260 150",
  "M120 162 C200 162 220 190 260 190",
  "M120 252 C200 252 220 230 260 230",
  "M120 342 C200 342 210 270 260 270",
];
const OUT_PATHS = [
  "M540 150 C590 150 600 72 680 72",
  "M540 190 C590 190 580 162 680 162",
  "M540 230 C590 230 580 252 680 252",
  "M540 270 C590 270 600 342 680 342",
];

// x, y, radius, duration, delay
const PARTICLES: [number, number, number, number, number][] = [
  [170, 30, 2.5, 9, 0],
  [200, 400, 2, 11, -3],
  [20, 420, 3, 8, -5],
  [300, 24, 2, 10, -2],
  [520, 20, 2.5, 12, -6],
  [780, 20, 2, 9, -4],
  [610, 415, 3, 11, -1],
  [790, 430, 2.5, 10, -7],
  [150, 300, 2, 8, -3],
  [650, 40, 3, 12, -5],
  [240, 120, 2, 9, -8],
  [560, 350, 2, 10, -2],
];

const SIDEBAR_ICONS: React.ReactNode[] = [
  <g key="0" fill={C.b600}>
    <rect x="-6" y="-6" width="5" height="5" rx="1.2" />
    <rect x="1" y="-6" width="5" height="5" rx="1.2" />
    <rect x="-6" y="1" width="5" height="5" rx="1.2" />
    <rect x="1" y="1" width="5" height="5" rx="1.2" />
  </g>,
  <g key="1" fill={C.b600}>
    <rect x="-6" y="0" width="3.5" height="6" rx="1" />
    <rect x="-1.7" y="-4" width="3.5" height="10" rx="1" />
    <rect x="2.6" y="-7" width="3.5" height="13" rx="1" />
  </g>,
  <circle key="2" r="6" fill="none" stroke={C.b600} strokeWidth="2" />,
  <g key="3" stroke={C.b600} strokeWidth="2" strokeLinecap="round">
    <path d="M-6 -5 H6 M-6 0 H6 M-6 5 H2" />
  </g>,
  <g key="4" fill="none" stroke={C.b600} strokeWidth="2">
    <circle r="3" />
    <circle r="6.5" strokeDasharray="3 3.1" />
  </g>,
];

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */
export default function ERPIllustration({
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
      aria-label="An ERP platform connecting inventory, finance, purchasing, sales, reporting, CRM, HR and analytics through a central dashboard and the cloud"
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
        <pattern id={`${uid}-grid`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill={C.b200} />
        </pattern>
        <clipPath id={`${uid}-dash`}>
          <rect width="280" height="210" rx="14" />
        </clipPath>
      </defs>

      {/* ---------------------------- backdrop ---------------------------- */}
      <circle cx="400" cy="225" r="215" fill={C.b50} />
      <circle cx="400" cy="225" r="215" fill={`url(#${uid}-grid)`} opacity=".6" />
      <circle className="erp-spin" style={{ animationDuration: "70s" }} cx="400" cy="225" r="200" fill="none" stroke={C.b300} strokeWidth="1.3" strokeDasharray="2 10" strokeLinecap="round" />
      <circle className="erp-spin-rev" style={{ animationDuration: "55s" }} cx="400" cy="225" r="165" fill="none" stroke={C.b200} strokeWidth="1.3" strokeDasharray="6 10" strokeLinecap="round" />

      {PARTICLES.map(([px, py, pr, dur, delay], i) => (
        <circle
          key={i}
          className="erp-drift"
          cx={px}
          cy={py}
          r={pr}
          fill={i % 3 === 0 ? C.b300 : C.b400}
          opacity=".7"
          style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        />
      ))}

      {/* ------------------------- data flow lines ------------------------ */}
      <g fill="none" stroke={C.b400} strokeWidth="1.6" strokeLinecap="round">
        {[...IN_PATHS, ...OUT_PATHS].map((d, i) => (
          <path key={i} className="erp-flow" d={d} style={{ animationDelay: `${-i * 0.3}s` }} />
        ))}
        <path className="erp-flow" d="M400 78 L400 110" />
        <path className="erp-flow" d="M400 320 L400 350" />
        {/* automation workflow (left of cloud) */}
        <path className="erp-flow" d="M301 56 L318 56" />
        <path className="erp-flow" d="M330 56 L347 56" />
      </g>

      {/* --------------------------- cloud + servers ---------------------- */}
      <g transform="translate(400 52)">
        <g className="erp-float" style={{ animationDuration: "7s" }}>
          <path d="M-26 12 C-42 12 -42 -8 -25 -8 C-23 -24 3 -28 11 -13 C26 -17 38 -1 29 12 Z" fill="#fff" filter={shadow} />
          <g fill="none" stroke={C.b600} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <g className="erp-updown">
              <path d="M-6 6 V-6 M-10 -2 L-6 -6 L-2 -2" />
            </g>
            <g className="erp-updown" style={{ animationDelay: "-0.9s" }}>
              <path d="M8 -6 V6 M4 2 L8 6 L12 2" />
            </g>
          </g>
        </g>
      </g>

      {/* automation workflow */}
      <circle className="erp-pulse" cx="296" cy="56" r="5" fill={C.b400} />
      <circle cx="296" cy="56" r="5" fill="#fff" stroke={C.b600} strokeWidth="1.8" />
      <rect x="318" y="50" width="12" height="12" rx="3" fill="#fff" stroke={C.b600} strokeWidth="1.8" />
      <path className="erp-tick" d="M321 56 L324 59 L328 53" fill="none" stroke={C.coral} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="352" cy="56" r="5" fill="#fff" stroke={C.b600} strokeWidth="1.8" />
      <circle className="erp-pulse" cx="352" cy="56" r="5" fill={C.b400} style={{ animationDelay: "1.2s" }} />

      {/* gears */}
      <g transform="translate(452 52)">
        <g className="erp-spin" style={{ animationDuration: "10s" }}>
          <path d={GEAR_L} fill={C.b500} />
          <circle r="4.5" fill="#fff" />
        </g>
      </g>
      <g transform="translate(472 70)">
        <g className="erp-spin-rev" style={{ animationDuration: "7.5s" }}>
          <path d={GEAR_S} fill={C.b300} />
          <circle r="3" fill="#fff" />
        </g>
      </g>

      {/* server stack */}
      <g>
        {[350, 367, 384].map((sy, i) => (
          <g key={sy}>
            <rect x="365" y={sy} width="70" height="14" rx="7" fill={i === 1 ? C.b200 : C.b100} stroke={C.b300} strokeWidth="1.2" />
            <circle cx="380" cy={sy + 7} r="2.4" fill={C.b600} />
            <circle className="erp-blink" cx="390" cy={sy + 7} r="2.4" fill={C.coral} style={{ animationDelay: `${-i * 0.7}s` }} />
            <rect x="404" y={sy + 5} width="22" height="4" rx="2" fill="#fff" opacity=".8" />
          </g>
        ))}
      </g>

      {/* ----------------------- central ERP dashboard -------------------- */}
      <g transform="translate(260 110)">
        <rect width="280" height="210" rx="14" fill="#fff" filter={shadow} />
        <g clipPath={`url(#${uid}-dash)`}>
          {/* top bar */}
          <rect width="280" height="28" fill={C.b50} />
          <circle cx="16" cy="14" r="3" fill={C.b200} />
          <circle cx="27" cy="14" r="3" fill={C.b300} />
          <circle cx="38" cy="14" r="3" fill={C.b400} />
          <rect x="60" y="8" width="90" height="12" rx="6" fill="#fff" />
          <circle cx="238" cy="14" r="4" fill={C.b200} />
          <circle className="erp-pulse" cx="250" cy="10" r="2.5" fill={C.coral} />
          <circle cx="258" cy="14" r="7" fill={C.b400} />

          {/* sidebar */}
          <rect y="28" width="44" height="182" fill={C.b50} />
          <rect className="erp-slide" x="6" y="35" width="32" height="30" rx="9" fill={C.b100} />
          {SIDEBAR_ICONS.map((icon, i) => (
            <g key={i} transform={`translate(22 ${50 + i * 30})`}>
              {icon}
            </g>
          ))}
        </g>

        {/* KPI cards */}
        {[
          { x: 52, w: 38, col: C.b600, d: "0s" },
          { x: 129, w: 44, col: C.b400, d: "-1.3s" },
          { x: 206, w: 30, col: C.coral, d: "-2.6s" },
        ].map((k) => (
          <g key={k.x}>
            <rect x={k.x} y="38" width="68" height="40" rx="8" fill="#fff" stroke={C.b100} />
            <circle cx={k.x + 12} cy="50" r="6" fill={C.b100} />
            <circle cx={k.x + 12} cy="50" r="2" fill={k.col} />
            <rect x={k.x + 24} y="46" width="28" height="6" rx="3" fill={C.b200} />
            <path d={`M${k.x + 55} 53 L${k.x + 58} 49 L${k.x + 61} 53`} fill="none" stroke={C.b600} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x={k.x + 8} y="64" width="52" height="5" rx="2.5" fill={C.b100} />
            <rect className="erp-prog" x={k.x + 8} y="64" width={k.w} height="5" rx="2.5" fill={k.col} style={{ animationDelay: k.d }} />
          </g>
        ))}

        {/* chart panel */}
        <rect x="52" y="86" width="116" height="116" rx="10" fill={C.b50} />
        {[26, 40, 32, 54, 44, 64, 52].map((h, i) => (
          <rect
            key={i}
            className="erp-bar"
            x={62 + i * 14}
            y={190 - h}
            width="9"
            height={h}
            rx="3"
            fill={`url(#${uid}-bar)`}
            style={{ animationDelay: `${-i * 0.45}s` }}
          />
        ))}
        <path d="M67 154 L81 140 L95 148 L109 126 L123 136 L137 116 L151 128 L151 190 L67 190 Z" fill={`url(#${uid}-area)`} opacity=".6" />
        <path className="erp-draw" d="M67 154 L81 140 L95 148 L109 126 L123 136 L137 116 L151 128" fill="none" stroke={C.coral} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="151" cy="128" r="3.5" fill={C.coral} />

        {/* analytics rings */}
        <rect x="176" y="86" width="98" height="116" rx="10" fill={C.b50} />
        <g fill="none">
          <circle cx="225" cy="128" r="26" stroke={C.b100} strokeWidth="6" />
          <circle cx="225" cy="128" r="17" stroke={C.b100} strokeWidth="5" />
          <circle cx="225" cy="128" r="9" stroke={C.b100} strokeWidth="4" />
          <g className="erp-spin" style={{ animationDuration: "14s" }}>
            <circle cx="225" cy="128" r="26" stroke={C.b600} strokeWidth="6" strokeLinecap="round" strokeDasharray="100 63.4" />
          </g>
          <g className="erp-spin-rev" style={{ animationDuration: "10s" }}>
            <circle cx="225" cy="128" r="17" stroke={C.b400} strokeWidth="5" strokeLinecap="round" strokeDasharray="56 50.8" />
          </g>
          <g className="erp-spin" style={{ animationDuration: "7s" }}>
            <circle cx="225" cy="128" r="9" stroke={C.coral} strokeWidth="4" strokeLinecap="round" strokeDasharray="30 26.5" />
          </g>
        </g>
        <circle cx="225" cy="128" r="3" fill={C.b600} />
        <rect x="186" y="172" width="78" height="5" rx="2.5" fill={C.b100} />
        <rect className="erp-prog" x="186" y="172" width="52" height="5" rx="2.5" fill={C.b600} />
        <rect x="186" y="187" width="78" height="5" rx="2.5" fill={C.b100} />
        <rect className="erp-prog" x="186" y="187" width="36" height="5" rx="2.5" fill={C.b400} style={{ animationDelay: "-1.6s" }} />
      </g>

      {/* nodes where data lines meet the dashboard */}
      {[150, 190, 230, 270].map((ny, i) => (
        <g key={ny}>
          <Node x={260} y={ny} delay={i * 0.4} />
          <Node x={540} y={ny} delay={i * 0.4 + 0.2} />
        </g>
      ))}
      <Node x={400} y={110} delay={0.3} />
      <Node x={400} y={320} delay={0.9} />

      {/* data packets */}
      {IN_PATHS.map((d, i) => (
        <Packet key={`in${i}`} path={d} dur={`${5 + i * 0.6}s`} begin={`${-i * 1.3}s`} accent={i === 2} />
      ))}
      {OUT_PATHS.map((d, i) => (
        <Packet key={`out${i}`} path={d} dur={`${5.5 + i * 0.5}s`} begin={`${-i * 1.1 - 0.5}s`} accent={i === 1} />
      ))}
      <Packet path="M400 78 L400 110" dur="2.4s" />
      <Packet path="M400 320 L400 350" dur="2.4s" begin="-1.2s" accent />

      {/* ------------------------ floating UI cards ----------------------- */}
      {/* automation toggle */}
      <g transform="translate(506 82)">
        <g className="erp-float" style={{ animationDuration: "6.5s", animationDelay: "-2s" }}>
          <rect width="80" height="42" rx="10" fill="#fff" filter={shadow} />
          <rect x="12" y="13" width="28" height="16" rx="8" fill={C.b600} />
          <circle className="erp-knob" cx="21" cy="21" r="5.5" fill="#fff" />
          <rect x="48" y="14" width="22" height="4" rx="2" fill={C.b200} />
          <rect x="48" y="23" width="14" height="4" rx="2" fill={C.b100} />
          <circle className="erp-pulse" cx="74" cy="6" r="3" fill={C.coral} />
          <circle cx="74" cy="6" r="3" fill={C.coral} />
        </g>
      </g>
      {/* inventory tracker */}
      <g transform="translate(220 290)">
        <g className="erp-float" style={{ animationDuration: "7.4s", animationDelay: "-4s" }}>
          <rect width="94" height="48" rx="10" fill="#fff" filter={shadow} />
          {[14, 22, 12, 26, 18].map((h, i) => (
            <rect
              key={i}
              className="erp-bar"
              x={12 + i * 11}
              y={38 - h}
              width="7"
              height={h}
              rx="2.5"
              fill={i === 2 ? C.coral : C.b400}
              style={{ animationDelay: `${-i * 0.5}s` }}
            />
          ))}
          <circle cx="76" cy="24" r="12" fill="none" stroke={C.b100} strokeWidth="5" />
          <g className="erp-spin" style={{ animationDuration: "9s" }}>
            <circle cx="76" cy="24" r="12" fill="none" stroke={C.b600} strokeWidth="5" strokeLinecap="round" strokeDasharray="46 29.4" />
          </g>
        </g>
      </g>

      {/* ---------------------------- ERP modules ------------------------- */}
      {/* left column */}
      <Module
        x={LEFT_X}
        y={ROWS[0]}
        dur="7s"
        delay="-1s"
        filter={shadow}
        icon={<path d="M0 -7 L6 -4 V3 L0 6 L-6 3 V-4 Z M-6 -4 L0 0 L6 -4 M0 0 V6" />}
      >
        {[
          { y: 40, w: 66, col: C.b600 },
          { y: 49, w: 48, col: C.b400 },
          { y: 58, w: 26, col: C.coral },
        ].map((r, i) => (
          <g key={r.y}>
            <rect x="12" y={r.y} width="76" height="5" rx="2.5" fill={C.b100} />
            <rect className="erp-prog" x="12" y={r.y} width={r.w} height="5" rx="2.5" fill={r.col} style={{ animationDelay: `${-i * 1.1}s` }} />
          </g>
        ))}
      </Module>

      <Module
        x={LEFT_X}
        y={ROWS[1]}
        dur="7.6s"
        delay="-3s"
        filter={shadow}
        icon={
          <>
            <path d="M-7 -5 H-4 L-2 2 H5 L7 -3 H-3.5" />
            <circle cx="-1" cy="5.5" r="1.2" fill={C.b600} />
            <circle cx="4" cy="5.5" r="1.2" fill={C.b600} />
          </>
        }
      >
        {[42, 52, 62].map((cy, i) => (
          <g key={cy}>
            <rect x="12" y={cy - 4} width="8" height="8" rx="2.5" fill={C.b50} stroke={C.b300} strokeWidth="1" />
            <path className="erp-tick" d={`M13.5 ${cy} L15.5 ${cy + 2} L18.5 ${cy - 2.5}`} fill="none" stroke={C.b600} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ animationDelay: `${i * 0.7}s` }} />
            <rect x="26" y={cy - 2.5} width={[54, 42, 48][i]} height="5" rx="2.5" fill={C.b100} />
          </g>
        ))}
      </Module>

      <Module
        x={LEFT_X}
        y={ROWS[2]}
        dur="8s"
        delay="-2s"
        filter={shadow}
        icon={<path d="M-6 4 L-1 -1 L2 2 L6 -4 M2 -4 H6 V0" />}
      >
        <path d="M12 64 L28 54 L42 58 L60 46 L76 42 L88 36 L88 66 L12 66 Z" fill={`url(#${uid}-area)`} />
        <path className="erp-draw" d="M12 64 L28 54 L42 58 L60 46 L76 42 L88 36" fill="none" stroke={C.b600} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="88" cy="36" r="3.2" fill={C.coral} />
      </Module>

      <Module
        x={LEFT_X}
        y={ROWS[3]}
        dur="7.3s"
        delay="-4s"
        filter={shadow}
        icon={
          <>
            <circle cx="0" cy="-2.5" r="3" />
            <path d="M-6 6 Q-6 1 0 1 Q6 1 6 6" />
          </>
        }
      >
        <circle cx="22" cy="52" r="8" fill={C.b400} stroke="#fff" strokeWidth="2" />
        <circle cx="34" cy="52" r="8" fill={C.b600} stroke="#fff" strokeWidth="2" />
        <circle cx="46" cy="52" r="8" fill={C.navy} stroke="#fff" strokeWidth="2" />
        <rect x="58" y="42" width="32" height="18" rx="9" fill={C.b100} />
        {[68, 74, 80].map((cx, i) => (
          <circle key={cx} className="erp-dot" cx={cx} cy="51" r="2" fill={C.b600} style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </Module>

      {/* right column */}
      <Module
        x={RIGHT_X}
        y={ROWS[0]}
        dur="7.2s"
        delay="-2s"
        filter={shadow}
        icon={
          <>
            <circle r="6" />
            <circle r="2.4" />
          </>
        }
      >
        {[10, 16, 12, 22, 18, 26].map((h, i) => (
          <rect
            key={i}
            className="erp-bar"
            x={14 + i * 12}
            y={66 - h}
            width="8"
            height={h}
            rx="2.5"
            fill={i === 5 ? C.coral : C.b400}
            style={{ animationDelay: `${-i * 0.5}s` }}
          />
        ))}
      </Module>

      <Module
        x={RIGHT_X}
        y={ROWS[1]}
        dur="7.8s"
        delay="-5s"
        filter={shadow}
        icon={
          <>
            <rect x="-5" y="-6" width="10" height="12" rx="2" />
            <path d="M-2 -2 H2 M-2 1 H2" />
          </>
        }
      >
        <circle cx="28" cy="52" r="11" fill="none" stroke={C.b100} strokeWidth="6" />
        <g className="erp-spin" style={{ animationDuration: "12s" }}>
          <circle cx="28" cy="52" r="11" fill="none" stroke={C.b600} strokeWidth="6" strokeDasharray="34 35" />
          <circle cx="28" cy="52" r="11" fill="none" stroke={C.coral} strokeWidth="6" strokeDasharray="12 57" strokeDashoffset="-40" />
        </g>
        <rect x="50" y="42" width="38" height="4" rx="2" fill={C.b200} />
        <rect x="50" y="51" width="28" height="4" rx="2" fill={C.b100} />
        <rect x="50" y="60" width="34" height="4" rx="2" fill={C.b100} />
      </Module>

      <Module
        x={RIGHT_X}
        y={ROWS[2]}
        dur="8.2s"
        delay="-1s"
        filter={shadow}
        icon={
          <>
            <rect x="-5" y="-6" width="10" height="12" rx="2" />
            <circle cy="-1.5" r="2" />
            <path d="M-3 4 Q0 1 3 4" />
          </>
        }
      >
        <path className="erp-flow" d="M50 47 V52 H28 V56 M50 52 H72 V56" fill="none" stroke={C.b300} strokeWidth="1.5" />
        <circle cx="50" cy="42" r="5" fill={C.b600} />
        <circle cx="28" cy="60" r="5" fill={C.b400} />
        <circle cx="72" cy="60" r="5" fill={C.b400} />
        <circle className="erp-pulse" cx="50" cy="42" r="5" fill={C.b400} />
      </Module>

      <Module
        x={RIGHT_X}
        y={ROWS[3]}
        dur="7.5s"
        delay="-3s"
        filter={shadow}
        icon={
          <>
            <circle r="6" />
            <path d="M0 0 V-6 M0 0 L5 3.5" />
          </>
        }
      >
        <g fill="none" strokeLinecap="round">
          <circle cx="28" cy="52" r="12" stroke={C.b100} strokeWidth="3" />
          <circle cx="28" cy="52" r="7" stroke={C.b100} strokeWidth="3" />
          <g className="erp-spin" style={{ animationDuration: "9s" }}>
            <circle cx="28" cy="52" r="12" stroke={C.b600} strokeWidth="3" strokeDasharray="40 35.4" />
          </g>
          <g className="erp-spin-rev" style={{ animationDuration: "6s" }}>
            <circle cx="28" cy="52" r="7" stroke={C.coral} strokeWidth="3" strokeDasharray="22 22" />
          </g>
        </g>
        <rect x="50" y="42" width="38" height="5" rx="2.5" fill={C.b100} />
        <rect className="erp-prog" x="50" y="42" width="28" height="5" rx="2.5" fill={C.b600} />
        <rect x="50" y="53" width="38" height="5" rx="2.5" fill={C.b100} />
        <rect className="erp-prog" x="50" y="53" width="20" height="5" rx="2.5" fill={C.b400} style={{ animationDelay: "-1.4s" }} />
      </Module>
    </svg>
  );
}