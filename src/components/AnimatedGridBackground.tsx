"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

/**
 * Seeded RNG so the background is stable (no flicker).
 * Mulberry32: tiny, decent for visuals.
 */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type BeamDef = {
  top: number;
  left: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
  repeatDelay: number;
};

const GRID_BOX_SIZE = 72; // 👈 Bigger blocks (try 64 / 80 too)

export function HeroEnergyBackground({ className }: { className?: string }) {
  const { width, height } = useWindowSize();

  const numColumns = width ? Math.max(1, Math.floor(width / GRID_BOX_SIZE)) : 0;
  const numRows = height ? Math.max(1, Math.floor(height / GRID_BOX_SIZE)) : 0;

  // Generate beams only when size is known, and keep stable until resize.
  const beams = React.useMemo<BeamDef[]>(() => {
    if (!width || !height) return [];

    const seed = Math.floor(width * 10 + height); // stable per viewport size
    const rand = mulberry32(seed);

    const count = Math.max(10, Math.floor(numColumns * 0.5)); // 👈 beam density

    return Array.from({ length: count }).map(() => {
      const col = Math.floor(rand() * numColumns);
      const row = Math.floor(rand() * Math.min(10, numRows)); // mostly upper region

      const beamHeight = GRID_BOX_SIZE * (4 + rand() * 6); // was 3..10
      const opacity = 0.18 + rand() * 0.45; // subtle
      const duration = 2.2 + rand() * 3.8; // 2.2..6
      const delay = rand() * 6; // 0..6
      const repeatDelay = 1.5 + rand() * 5; // 1.5..6.5

      return {
        top: row * GRID_BOX_SIZE,
        left: col * GRID_BOX_SIZE,
        height: beamHeight,
        opacity,
        duration,
        delay,
        repeatDelay,
      };
    });
  }, [width, height, numColumns, numRows]);

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Base (forces dark even if globals are light) */}
      {/* <div className="absolute inset-0 bg-neutral-950" /> */}

      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${GRID_BOX_SIZE} ${GRID_BOX_SIZE}' width='${GRID_BOX_SIZE}' height='${GRID_BOX_SIZE}' fill='none' stroke='rgb(34 197 94 / 0.18)' stroke-width='1'%3e%3cpath d='M0 .5H${
            GRID_BOX_SIZE - 0.5
          }V${GRID_BOX_SIZE}'/%3e%3c/svg%3e")`,
        }}
      />

      {/* Vignette / readability fades */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/10 to-neutral-950/80" />

      {/* Lime glow centered (subtle) */}
      {/* <div className="absolute inset-0  bg-radial from-lime-400/10 via-transparent to-transparent" /> */}

      {/* Beams */}
      {beams.map((b, i) => (
        <Beam
          key={i}
          top={b.top}
          left={b.left}
          height={b.height}
          opacity={b.opacity}
          duration={b.duration}
          delay={b.delay}
          repeatDelay={b.repeatDelay}
        />
      ))}
    </div>
  );
}

function Beam({
  top,
  left,
  height,
  opacity,
  duration,
  delay,
  repeatDelay,
}: {
  top: number;
  left: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
  repeatDelay: number;
}) {
  const transition: Transition = {
    ease: "easeInOut",
    duration,
    delay,
    repeat: Infinity,
    repeatDelay,
  };

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: height, opacity: [0, opacity, 0] }}
      transition={transition}
      style={{ top, left }}
      className="
        absolute z-10 w-[1px]
        min-h-24
        bg-gradient-to-b
        from-transparent
        via-green-400
        to-transparent
        blur-[0.5px]
      "
    />
  );
}
