"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  /** 3 hex/rgb color stops the gradient cycles through. */
  colors: readonly [string, string, string];
  /** Seconds for one sweep across the gradient. */
  animationSpeed?: number;
  /** Ping-pong back and forth instead of looping forward. */
  yoyo?: boolean;
};

/**
 * Animated gradient-fill text: cycles `colors` across the text via a
 * scrolling `background-position`, clipped to the glyphs with
 * `bg-clip-text`. Nested child spans (e.g. differently-sized price digits)
 * pick up the same gradient as long as they don't set their own text color.
 */
export function GradientText({
  children,
  className = "",
  colors,
  animationSpeed = 6,
  yoyo = true,
}: Props) {
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animationDuration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;
      progress.set(
        cycleTime < animationDuration
          ? (cycleTime / animationDuration) * 100
          : 100 - ((cycleTime - animationDuration) / animationDuration) * 100,
      );
    } else {
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`);
  const gradientColors = [...colors, colors[0]].join(", ");

  return (
    <motion.span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors})`,
        backgroundSize: "300% 100%",
        backgroundPosition,
      }}
    >
      {children}
    </motion.span>
  );
}
