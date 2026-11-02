import { useMotionMode } from "@/hooks/useMotionMode";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
// Adjust this path to wherever you put the hook file

interface RevealProps {
  children: ReactNode;
}

const LITE_OFFSET = 20; // px, replaces the 60-100px slides on mobile

interface BaseProps extends RevealProps {
  // Desktop (original) animation values
  fullInitial: Record<string, number>;
  fullAnimate: Record<string, number>;
  fullAmount: number;
}

function Reveal({ children, fullInitial, fullAnimate, fullAmount }: BaseProps) {
  const mode = useMotionMode();

  if (mode === "none") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  if (mode === "lite") {
    return (
      <motion.div
        initial={{ opacity: 0, y: LITE_OFFSET }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...fullInitial }}
      whileInView={{ opacity: 1, ...fullAnimate }}
      viewport={{ once: true, amount: fullAmount }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealLeft({ children }: RevealProps) {
  return (
    <Reveal fullInitial={{ x: -100 }} fullAnimate={{ x: 0 }} fullAmount={0.2}>
      {children}
    </Reveal>
  );
}

export function RevealRight({ children }: RevealProps) {
  return (
    <Reveal fullInitial={{ x: 100 }} fullAnimate={{ x: 0 }} fullAmount={0.6}>
      {children}
    </Reveal>
  );
}

export function RevealUp({ children }: RevealProps) {
  return (
    <Reveal fullInitial={{ y: 60 }} fullAnimate={{ y: 0 }} fullAmount={0.2}>
      {children}
    </Reveal>
  );
}

export function RevealScale({ children }: RevealProps) {
  return (
    <Reveal fullInitial={{ scale: 0.9 }} fullAnimate={{ scale: 1 }} fullAmount={0.2}>
      {children}
    </Reveal>
  );
}