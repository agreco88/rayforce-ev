"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  /** El mismo de la `GridBackground` de abajo: los trazos caen sobre sus lineas. */
  cellSize?: number;
  /** Hex del trazo: el `gradientColors` del theme, o el verde de marca. */
  color?: string;
  /** Cuantas filas desde arriba pueden arrancar los trazos. */
  rows?: number;
  className?: string;
  maskImage?: string;
};

type Beam = {
  top: number;
  left: number;
  travel: number;
  opacity: number;
  duration: number;
  delay: number;
  repeatDelay: number;
};

// Mulberry32: azar con semilla, para que los trazos no cambien en cada render.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Las lineas de la grilla que se iluminan cada tanto: un trazo que baja por
 *  una vertical y se apaga. Es el fondo del hero viejo (`HeroEnergyBackground`),
 *  medido contra su contenedor y no contra la ventana. */
export function GridBeams({
  cellSize = 64,
  color = "#4ade80",
  rows = 10,
  className,
  maskImage,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: Math.round(entry.contentRect.width),
        height: Math.round(entry.contentRect.height),
      }),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const beams = useMemo<Beam[]>(() => {
    if (!size.width || !size.height) return [];
    const columns = Math.floor(size.width / cellSize);
    const startRows = Math.min(rows, Math.floor(size.height / cellSize));
    const rand = mulberry32(size.width * 10 + size.height);

    return Array.from({ length: Math.max(6, Math.floor(columns * 0.5)) }, () => ({
      top: Math.floor(rand() * startRows) * cellSize,
      left: Math.floor(rand() * columns) * cellSize,
      travel: cellSize * (4 + rand() * 6),
      opacity: 0.12 + rand() * 0.28,
      duration: 2.2 + rand() * 3.8,
      delay: rand() * 6,
      repeatDelay: 1.5 + rand() * 5,
    }));
  }, [size.width, size.height, cellSize, rows]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ maskImage }}
    >
      {!reduceMotion &&
        beams.map((beam, index) => (
          <motion.div
            key={index}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: beam.travel, opacity: [0, beam.opacity, 0] }}
            transition={{
              ease: "easeInOut",
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              repeatDelay: beam.repeatDelay,
            }}
            style={{
              top: beam.top,
              left: beam.left,
              background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            }}
            className="absolute h-24 w-px"
          />
        ))}
    </div>
  );
}
