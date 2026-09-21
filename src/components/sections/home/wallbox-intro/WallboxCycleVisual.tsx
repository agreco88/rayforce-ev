"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

/**
 * Columna derecha del `StatCycleStack` de la home: la imagen que acompanha al
 * stat que esta corriendo.
 *
 * El contenedor tiene alto fijo y la imagen se posiciona absoluta porque las dos
 * frames (la que sale y la que entra) coexisten durante el crossfade; sin eso el
 * layout salta en cada paso. `mode="wait"` sincroniza salida y entrada, igual
 * que en `Device`.
 */

export type CycleVisual = {
  src: string;
  alt: string;
};

export function WallboxCycleVisual({
  visuals,
  activeIndex,
}: {
  visuals: readonly CycleVisual[];
  activeIndex: number;
}) {
  const active = visuals[activeIndex] ?? visuals[0];

  if (!active) return null;

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/30 sm:h-[26rem]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.src}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-6"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
