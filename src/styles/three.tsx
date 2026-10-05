"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Preload  } from "@react-three/drei";

/* -------------------------------------------------------------------------- */
/*  Shared helpers                                                            */
/* -------------------------------------------------------------------------- */

// 1 = normal, ~0.15 when the visitor prefers reduced motion
const SpeedContext = createContext(1);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function makeTexture(draw: (ctx: CanvasRenderingContext2D, s: number) => void) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  draw(canvas.getContext("2d")!, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Soft blue radial glow */
function useGlowTexture() {
  return useMemo(
    () =>
      makeTexture((ctx, s) => {
        const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, "rgba(140,200,255,1)");
        g.addColorStop(0.3, "rgba(40,120,255,0.45)");
        g.addColorStop(1, "rgba(0,60,200,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
      }),
    []
  );
}

/** Small round dot for particles */
function useDotTexture() {
  return useMemo(
    () =>
      makeTexture((ctx, s) => {
        const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.35, "rgba(255,255,255,0.9)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
      }),
    []
  );
}

/* -------------------------------------------------------------------------- */
/*  Background layers                                                         */
/* -------------------------------------------------------------------------- */

/** Pulsing floor glow under the card */
function GlowPlane() {
  const glow = useGlowTexture();
  const speed = useContext(SpeedContext);
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    const pulse = 1 + Math.sin(t * 1.4) * 0.12;
    ref.current.scale.set(pulse, pulse, 1);
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.85 + Math.sin(t * 1.4) * 0.15;
  });

  return (
    <mesh ref={ref} position={[0, -2.55, -0.4]}>
      <planeGeometry args={[7, 1.6]} />
      <meshBasicMaterial
        map={glow}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/** Hundreds of drifting, twinkling particles */
function Particles({ count = 120 }: { count?: number }) {
  const dot = useDotTexture();
  const speed = useContext(SpeedContext);
  const ref = useRef<THREE.Points>(null!);

  const data = useMemo(() => {
    const base = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() - 0.5) * 17;
      base[i * 3 + 1] = (Math.random() - 0.5) * 10;
      base[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1;
      phase[i] = Math.random() * Math.PI * 2;
    }
    return { base, phase, pos: base.slice() };
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    const { base, phase, pos } = data;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = base[i * 3] + Math.sin(t * 0.3 + phase[i]) * 0.25;
      pos[i * 3 + 1] = base[i * 3 + 1] + Math.cos(t * 0.4 + phase[i]) * 0.3;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    (ref.current.material as THREE.PointsMaterial).opacity =
      0.7 + Math.sin(t * 1.5) * 0.15;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.pos, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={dot}
        color="#3b82f6"
        size={0.07}
        sizeAttenuation
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  Foreground layers                                                         */
/* -------------------------------------------------------------------------- */

/** Floating glass logo card with the white "T" mark */
function LogoCard() {
  const speed = useContext(SpeedContext);
  const glow = useGlowTexture();
  const group = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    group.current.position.y = Math.sin(t * 0.9) * 0.15;
    group.current.rotation.y = Math.sin(t * 0.5) * 0.08;
    group.current.rotation.x = Math.cos(t * 0.4) * 0.04;
  });

  const white = { color: "#ffffff", toneMapped: false };

  return (
    <group ref={group}>
      {/* outer halo */}
      <mesh position={[0, 0, -0.3]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial
          map={glow}
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>

      {/* glowing rim */}
      <RoundedBox args={[3.5, 3.5, 0.2]} radius={0.42} smoothness={6} position={[0, 0, -0.04]}>
        <meshBasicMaterial
          color="#4aa3ff"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </RoundedBox>

      {/* card body */}
      <RoundedBox args={[3.4, 3.4, 0.24]} radius={0.38} smoothness={6}>
        <meshPhysicalMaterial
          color="#0b4fae"
          emissive="#0a3a99"
          emissiveIntensity={0.4}
          metalness={0.2}
          roughness={0.3}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>

      {/* "T" mark: bar, stem and small square */}
      <mesh position={[-0.35, 0.88, 0.14]}>
        <boxGeometry args={[1.25, 0.41, 0.02]} />
        <meshBasicMaterial {...white} />
      </mesh>
      <mesh position={[0.02, -0.25, 0.14]}>
        <boxGeometry args={[0.49, 1.85, 0.02]} />
        <meshBasicMaterial {...white} />
      </mesh>
      <mesh position={[0.78, 0.88, 0.14]}>
        <boxGeometry args={[0.48, 0.41, 0.02]} />
        <meshBasicMaterial {...white} />
      </mesh>
    </group>
  );
}

/** Rotating orbital ring with a glowing bead travelling along it */
function OrbitRing() {
  const speed = useContext(SpeedContext);
  const glow = useGlowTexture();
  const spinner = useRef<THREE.Group>(null!);
  const R = 3.7;

  useFrame(({ clock }) => {
    spinner.current.rotation.z = clock.elapsedTime * speed * 0.35;
  });

  return (
    <group rotation={[1.15, -0.12, 0.12]}>
      <group ref={spinner}>
        {/* soft outer glow */}
        <mesh>
          <torusGeometry args={[R, 0.09, 12, 240]} />
          <meshBasicMaterial
            color="#2f7bff"
            transparent
            opacity={0.14}
            depthWrite={false}
            />
        </mesh>
        {/* bright core line */}
        <mesh>
          <torusGeometry args={[R, 0.022, 12, 240]} />
          <meshBasicMaterial color="#4b95ff" toneMapped={false} />
        </mesh>
        {/* bead */}
        <group position={[R, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#d8f0ff" toneMapped={false} />
          </mesh>
          <sprite scale={[0.9, 0.9, 1]}>
            <spriteMaterial
              map={glow}
              transparent
              depthWrite={false}
                />
          </sprite>
        </group>
      </group>
    </group>
  );
}

/** One slowly drifting glass square */
function GlassSquare({
  position,
  size,
  phase,
}: {
  position: [number, number, number];
  size: number;
  phase: number;
}) {
  const speed = useContext(SpeedContext);
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.x = position[0] + Math.sin(t * 0.35) * 0.25;
    ref.current.position.y = position[1] + Math.cos(t * 0.45) * 0.3;
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.25;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.3;
  });

  return (
    <group ref={ref} position={position}>
      <RoundedBox args={[size * 1.08, size * 1.08, 0.04]} radius={size * 0.2} smoothness={4} position={[0, 0, -0.02]}>
        <meshBasicMaterial
          color="#4aa3ff"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </RoundedBox>
      <RoundedBox args={[size, size, 0.06]} radius={size * 0.2} smoothness={4}>
        <meshPhysicalMaterial
          color="#2a6be0"
          transparent
          opacity={0.28}
          roughness={0.15}
          metalness={0.1}
          depthWrite={false}
        />
      </RoundedBox>
    </group>
  );
}

/** Small floating orbs */
function Orb({
  position,
  radius,
  phase,
}: {
  position: [number, number, number];
  radius: number;
  phase: number;
}) {
  const speed = useContext(SpeedContext);
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.25;
    ref.current.position.x = position[0] + Math.cos(t * 0.4) * 0.15;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.55} />
    </mesh>
  );
}

function FloatingSquares() {
  return (
    <>
      <GlassSquare position={[-3.7, 1.5, 0.4]} size={0.75} phase={0} />
      <GlassSquare position={[3.8, -1.9, 0.6]} size={0.85} phase={1.7} />
      <GlassSquare position={[-4.7, -2.2, -0.5]} size={0.5} phase={3.1} />
      <GlassSquare position={[4.5, 2.2, -0.6]} size={0.45} phase={4.4} />
      <GlassSquare position={[2.5, 3.0, -1]} size={0.3} phase={2.2} />
      <Orb position={[-2.7, -1.0, 0.2]} radius={0.17} phase={0.6} />
      <Orb position={[2.3, 2.6, -0.4]} radius={0.13} phase={2.4} />
      <Orb position={[-1.2, 3.0, -0.6]} radius={0.09} phase={4.0} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                     */
/* -------------------------------------------------------------------------- */

function Scene() {
  const { viewport } = useThree();

  // Shrink the whole scene on narrow screens so nothing gets cropped
  const scale = THREE.MathUtils.clamp(viewport.width / 11, 0.45, 1);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 6]} intensity={1.6} />
      <pointLight position={[0, -3, 3]} intensity={30} color="#2f7bff" />

      <group scale={scale}>
        <group>
          <GlowPlane />
          <Particles />
        </group>

        <group>
          <OrbitRing />
          <LogoCard />
          <FloatingSquares />
        </group>
      </group>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Public component                                                          */
/* -------------------------------------------------------------------------- */

interface HeroAnimationProps {
  className?: string;
  onReady?: () => void;
}

function ReadySignal({ onReady }: { onReady?: () => void }) {
  const frames = useRef(0);
  const done = useRef(false);

  useFrame(() => {
    if (done.current) return;
    frames.current += 1;
    if (frames.current >= 3) {
      done.current = true;
      onReady?.();
    }
  });

  return null;
}

export default function HeroAnimation({
  className = "h-[70vh] min-h-[420px] w-full",
  onReady,
}: HeroAnimationProps) {
  const wrapper = useRef<HTMLDivElement>(null!);
  const [visible, setVisible] = useState(true);
  const reduced = usePrefersReducedMotion();

  // Pause rendering when the hero is scrolled out of view
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "600px 0px", threshold: 0 }
        );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <SpeedContext.Provider value={reduced ? 0.15 : 1}>
        <Canvas
          flat
          dpr={[1, 1.5]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0, 9], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent", pointerEvents: "none" }}
        >
          <Scene />
          <Preload all /> 
          <ReadySignal onReady={onReady} />
        </Canvas>
      </SpeedContext.Provider>
    </div>
  );
}