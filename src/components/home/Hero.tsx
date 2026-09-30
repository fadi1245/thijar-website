import { slides } from "@/data/siteData";
import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */
const DURATION = 8000; // autoplay per slide (ms)
const TRANSITION_MS = 1500; // 3D transition length (ms)
const GLOBE_R = 1.6;

// Where the glow / ripple centre sits (uv space) for each slide
const FIELD_POS: [number, number][] = [
  [0.76, 0.52],
  [0.7, 0.34],
  [0.82, 0.66],
  [0.68, 0.5],
];

/* -------------------------------------------------------------------------- */
/*  Shaders                                                                   */
/* -------------------------------------------------------------------------- */
const BG_VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const BG_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime, uProgress;
uniform vec2 uRes, uMouse, uFromPos, uToPos;
uniform vec3 uBase, uAccent, uLight;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

vec3 field(vec2 uv, vec2 pos){
  vec2 p = uv - pos;
  p.x *= uRes.x / uRes.y;
  float d = length(p);
  float warp = fbm(uv * 3.0 + uTime * 0.04);
  float glow = exp(-d * 2.4);
  return uAccent * glow * 0.5;
}

void main(){
  vec2 uv = vUv;
  vec2 m = uMouse * 0.03;

  // noisy diagonal wipe from old slide field to new slide field
  float n = fbm(uv * 3.5 + uTime * 0.08);
  float c = uv.x * 0.75 + uv.y * 0.25 + (n - 0.5) * 0.45;
  float front = mix(-0.5, 1.5, uProgress);
  float showNew = 1.0 - smoothstep(front - 0.12, front + 0.12, c);

  vec3 col = uBase;
  col += mix(field(uv + m, uFromPos), field(uv + m, uToPos), showNew);


  // keep the text side calm
  col = mix(col, uBase * 0.7, smoothstep(0.75, 0.0, uv.x) * 0.25);
  col *= mix(0.75, 1.0, smoothstep(1.2, 0.3, length(uv - 0.5)));

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

const PT_VERT = /* glsl */ `
attribute float aRand;
uniform float uTime, uScatter, uSize, uPixel;
varying float vA;
varying float vMix;
void main(){
  vec3 p = position;
  vec3 dir = normalize(p);
  p *= 1.0 + sin(uTime * 0.8 + aRand * 40.0) * 0.015;
  p += dir * uScatter * (0.6 + aRand * 1.6);
  p += vec3(sin(aRand * 20.0 + uTime), cos(aRand * 13.0 + uTime), sin(aRand * 7.0)) * uScatter * 0.35;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * uPixel * (0.6 + aRand * 0.9) * (8.0 / -mv.z) * (1.0 + uScatter * 0.4);
  gl_Position = projectionMatrix * mv;

  vec3 wn = normalize((modelMatrix * vec4(dir, 0.0)).xyz);
  vA = (0.25 + 0.75 * smoothstep(-0.6, 0.9, wn.z)) * (1.0 - uScatter * 0.3);
  vMix = aRand;
}
`;

const PT_FRAG = /* glsl */ `
precision highp float;
varying float vA;
varying float vMix;
uniform vec3 uAccent, uLight;
uniform float uOpacity;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = pow(smoothstep(0.5, 0.0, d), 1.6);
  vec3 col = mix(uAccent, uLight, vMix);
  gl_FragColor = vec4(col, a * vA * uOpacity);
  #include <colorspace_fragment>
}
`;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
// Reads "--primary" / "--accent" so the 3D scene always matches the site theme
function themeColor(name: string, fallback: string) {
  try {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    if (!raw) return new THREE.Color(fallback);
    if (raw.startsWith("#")) return new THREE.Color(raw);
    const [h, s, l] = raw.replace(/[,/]/g, " ").split(/\s+/).filter(Boolean);
    return new THREE.Color().setStyle(`hsl(${parseFloat(h)}, ${s}, ${l})`);
  } catch {
    return new THREE.Color(fallback);
  }
}

const pad = (n: number) => String(n).padStart(2, "0");

/* -------------------------------------------------------------------------- */
/*  Text motion                                                               */
/* -------------------------------------------------------------------------- */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
  exit: (dir: number) => ({
    opacity: 0,
    x: -36 * dir,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

const word: Variants = {
  hidden: { y: "115%", rotate: 4 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.75, ease: [0.2, 0.7, 0.1, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] },
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
export function Hero() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const slide = slides[active];
  const total = slides.length;

  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<{ go: (i: number) => void } | null>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const elapsed = useRef(0);
  const activeRef = useRef(0);
  activeRef.current = active;

  /* ---------------------------- navigation ---------------------------- */
  const goTo = useCallback(
    (next: number, direction?: number) => {
      const n = (next + total) % total;
      const current = activeRef.current;
      if (n === current) return;
      elapsed.current = 0;
      setDir(direction ?? (n > current ? 1 : -1));
      setActive(n);
      stage.current?.go(n);
    },
    [total],
  );

  /* ---------------------------- autoplay ------------------------------ */
  useEffect(() => {
    bars.current.forEach((bar, i) => {
      if (bar) bar.style.transform = `scaleX(${i < active || reduced ? 1 : 0})`;
    });
  }, [active, reduced]);

  useEffect(() => {
    if (paused || reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.min(now - last, 100);
      last = now;
      const bar = bars.current[active];
      if (bar)
        bar.style.transform = `scaleX(${Math.min(elapsed.current / DURATION, 1)})`;
      if (elapsed.current >= DURATION) {
        goTo(active + 1, 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, reduced, goTo]);

  /* ------------------------------ Three.js ---------------------------- */
  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // no WebGL: the CSS background stays as a fallback
    }

    const noMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const small = el.clientWidth < 768;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 8;

    /* theme colours */
    const base = themeColor("--primary", "#1a3564");
    const accent = themeColor("--accent", "#1792a6");
    const light = accent.clone().lerp(new THREE.Color("#ffffff"), 0.55);

    /* ------------------------ background shader ------------------------ */
    const bgU = {
      uTime: { value: 0 },
      uProgress: { value: 1 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2() },
      uFromPos: { value: new THREE.Vector2(...FIELD_POS[0]) },
      uToPos: { value: new THREE.Vector2(...FIELD_POS[0]) },
      uBase: { value: base },
      uAccent: { value: accent },
      uLight: { value: light },
    };
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERT,
      fragmentShader: BG_FRAG,
      uniforms: bgU,
      depthTest: false,
      depthWrite: false,
    });
    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.frustumCulled = false;
    bg.renderOrder = -1;
    scene.add(bg);

    /* ---------------------------- globe group -------------------------- */
    const group = new THREE.Group();
    scene.add(group);

    // point sphere
    const count = small ? 1100 : 2200;
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos[i * 3] = Math.cos(th) * r * GLOBE_R;
      pos[i * 3 + 1] = y * GLOBE_R;
      pos[i * 3 + 2] = Math.sin(th) * r * GLOBE_R;
      rnd[i] = Math.random();
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    ptGeo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
    const ptU = {
      uTime: { value: 0 },
      uScatter: { value: 0 },
      uSize: { value: 4.6 },
      uPixel: { value: renderer.getPixelRatio() },
      uOpacity: { value: 1 },
      uAccent: { value: accent },
      uLight: { value: light },
    };
    const ptMat = new THREE.ShaderMaterial({
      vertexShader: PT_VERT,
      fragmentShader: PT_FRAG,
      uniforms: ptU,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(ptGeo, ptMat));

    // faint inner wireframe
    const wireGeo = new THREE.IcosahedronGeometry(GLOBE_R * 0.985, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: light,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    group.add(new THREE.Mesh(wireGeo, wireMat));

    // orbit rings with travelling beads
    const ringGeo = new THREE.TorusGeometry(2.45, 0.008, 8, 180);
    const beadGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const ringMats: THREE.MeshBasicMaterial[] = [];
    const pivots: THREE.Object3D[] = [];
    (
      [
        { rx: 1.2, rz: 0.3, speed: 0.5 },
        { rx: 1.9, rz: -0.6, speed: -0.35 },
      ] as const
    ).forEach(({ rx, rz, speed }) => {
      const ringMat = new THREE.MeshBasicMaterial({
        color: light,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      });
      ringMats.push(ringMat);
      const holder = new THREE.Group();
      holder.rotation.set(rx, 0, rz);
      holder.add(new THREE.Mesh(ringGeo, ringMat));
      const pivot = new THREE.Object3D();
      pivot.userData.speed = speed;
      const bead = new THREE.Mesh(
        beadGeo,
        new THREE.MeshBasicMaterial({ color: "#ffffff" }),
      );
      bead.position.x = 2.45;
      pivot.add(bead);
      holder.add(pivot);
      pivots.push(pivot);
      group.add(holder);
    });

    /* ------------------------------ layout ----------------------------- */
    let baseScale = 1;
    let desktop = true;
    const layout = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      bgU.uRes.value.set(w, h);
      ptU.uPixel.value = renderer.getPixelRatio();

      const vh =
        2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const vw = vh * camera.aspect;
      desktop = w >= 1024;
      baseScale = (vh * (desktop ? 0.3 : 0.21)) / GLOBE_R;
      group.position.set(
        vw * (desktop ? 0.27 : 0.25),
        desktop ? vh * 0.03 : vh * 0.16,
        0,
      );
      ptU.uOpacity.value = desktop ? 1 : 0.55;
      ringMats.forEach((m) => (m.opacity = desktop ? 0.4 : 0.22));
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);

    /* ---------------------------- interaction -------------------------- */
    const target = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const section = el.parentElement!;
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    section.addEventListener("pointermove", onMove);

    /* ---------------------------- transition --------------------------- */
    const tr = { start: -1 };
    let spin = 0;
    let spinTarget = 0;

    stage.current = {
      go: (index: number) => {
        bgU.uFromPos.value.copy(bgU.uToPos.value);
        bgU.uToPos.value.set(...FIELD_POS[index % FIELD_POS.length]);
        if (noMotion) {
          bgU.uFromPos.value.copy(bgU.uToPos.value);
          return;
        }
        tr.start = performance.now();
        spinTarget += Math.PI * 0.8;
      },
    };

    /* ------------------------------ render ----------------------------- */
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);

    let raf = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const t = now / 1000;

      const p = tr.start < 0 ? 1 : Math.min((now - tr.start) / TRANSITION_MS, 1);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const bump = Math.sin(p * Math.PI);

      bgU.uTime.value = noMotion ? 0 : t;
      bgU.uProgress.value = e;
      bgU.uMouse.value.set(mouse.x, mouse.y);
      ptU.uTime.value = noMotion ? 0 : t;
      ptU.uScatter.value = Math.pow(bump, 1.6) * 1.1;

      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      spin += (spinTarget - spin) * 0.045;

      group.rotation.y = spin + (noMotion ? 0 : t * 0.12) + mouse.x * 0.3;
      group.rotation.x = 0.25 + mouse.y * 0.18;
      group.scale.setScalar(baseScale * (1 + bump * 0.06));
      pivots.forEach((pv) => (pv.rotation.z = t * pv.userData.speed));

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      stage.current = null;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      section.removeEventListener("pointermove", onMove);
      [bgGeo, ptGeo, wireGeo, ringGeo, beadGeo].forEach((g) => g.dispose());
      [bgMat, ptMat, wireMat, ...ringMats].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  /* ------------------------------- render ------------------------------ */
  const words = String(slide.heading).split(" ");

  return (
    <section
      className="hero-slice relative min-h-[560px] overflow-hidden bg-[hsl(var(--primary))] text-white"
      // fills the first screen on every viewport. If your header is NOT overlaying
      // the hero, set --header-h (e.g. 80px) so hero + header = exactly one screen.
      style={{ height: "calc(100svh - var(--header-h, 0px))" }}
    >
      {/* 3D stage (background field + particle globe) */}
      <div ref={host} aria-hidden className="absolute inset-0" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="container-tajin relative h-full">
        {/* ---------------------------- copy ---------------------------- */}
        <div className="absolute inset-x-0 bottom-28 top-20 flex max-w-[700px] items-center lg:bottom-40 lg:top-24">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono-brand text-[10px] tracking-[.18em] text-white/80 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--accent))]" />
                {pad(active + 1)} / {pad(total)}
              </motion.span>

              <h1 className="font-display mt-6 max-w-[760px] text-[clamp(2.1rem,min(4.8vw,7.5svh),4.5rem)] font-extrabold leading-[1.02] tracking-[-.02em]">
                {words.map((w, i) => (
                  <span
                    key={i}
                    className="-mb-[.1em] mr-[.26em] inline-block overflow-hidden pb-[.1em] align-top"
                  >
                    <motion.span variants={word} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.div
                variants={fadeUp}
                className="mt-6 h-1 w-14 rounded-full bg-[hsl(var(--accent))] lg:w-20"
              />

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-[590px] text-[15px] leading-6 text-white/70 md:text-[17px] lg:leading-7"
              >
                {slide.subheading}
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link
                  to={slide.action}
                  className="focus-ring group mt-8 inline-flex items-center gap-3 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(23,146,166,.26)] transition-all hover:-translate-y-0.5 hover:bg-[#36afc0]"
                  data-testid={`link-hero-cta-${slide.index}`}
                >
                  {slide.button}
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ------------------------- bottom controls ------------------------- */}
        <div className="absolute inset-x-0 bottom-8 lg:bottom-10">
          {/* desktop: slide cards with progress */}
          <div className="hidden items-end justify-between gap-10 lg:flex">
            <div className="flex w-full max-w-[880px] gap-5" role="tablist" aria-label="Hero slides">
              {slides.map((item, i) => (
                <button
                  type="button"
                  key={item.index}
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Show slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="focus-ring group relative min-w-0 flex-1 pt-4 text-left"
                  data-testid={`button-hero-slide-${i + 1}`}
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-white/20" />
                  <span
                    ref={(node) => {
                      bars.current[i] = node;
                    }}
                    className="absolute inset-x-0 top-[-0.5px] h-[2px] origin-left bg-[hsl(var(--accent))]"
                    style={{ transform: "scaleX(0)" }}
                  />
                  <span
                    className={`font-mono-brand text-[10px] tracking-[.18em] transition-colors ${active === i ? "text-[hsl(var(--accent))]" : "text-white/35"}`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    className={`mt-1 block truncate text-sm font-semibold transition-all group-hover:text-white ${active === i ? "text-white" : "text-white/45"}`}
                  >
                    {item.accent}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white"
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              >
                {paused ? (
                  <Play className="h-3.5 w-3.5" />
                ) : (
                  <Pause className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => goTo(active - 1, -1)}
                className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white"
                aria-label="Previous slide"
                data-testid="button-hero-previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1, 1)}
                className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white"
                aria-label="Next slide"
                data-testid="button-hero-next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* mobile / tablet: compact bar */}
          <div className="flex items-center justify-between border-t border-white/15 pt-4 lg:hidden">
            <span className="max-w-[45%] truncate font-mono-brand text-[10px] tracking-[.18em] text-white/40">
              {slide.accent}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(active - 1, -1)}
                className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5" aria-hidden>
                {slides.map((item, i) => (
                  <span
                    key={item.index}
                    className={`h-1 rounded-full transition-all ${active === i ? "w-10 bg-[hsl(var(--accent))]" : "w-4 bg-white/25"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => goTo(active + 1, 1)}
                className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}