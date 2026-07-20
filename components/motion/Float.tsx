"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utilities/cn";

type FloatOnScrollProps = {
  children: ReactNode;
  className?: string;
  depth?: number;
  delay?: number;
};

export function FloatOnScroll({ children, className, depth = 28, delay = 0 }: FloatOnScrollProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rawY = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  const y = useSpring(rawY, { stiffness: 32, damping: 32, mass: 0.8 });

  return (
    <motion.div
      className={cn("float-layer", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
      style={reduceMotion ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}

type TiltLiftProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function TiltLift({ children, className, intensity = 7 }: TiltLiftProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 90,
    damping: 28,
    mass: 0.7,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 90,
    damping: 28,
    mass: 0.7,
  });

  return (
    <motion.div
      className={cn("lift-surface", className)}
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        event.currentTarget.style.setProperty("--lift-x", `${x * 100}%`);
        event.currentTarget.style.setProperty("--lift-y", `${y * 100}%`);
        pointerX.set(x - 0.5);
        pointerY.set(y - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.006 }}
      transition={{ type: "spring", stiffness: 110, damping: 28 }}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
