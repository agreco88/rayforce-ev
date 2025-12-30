// src/lib/animation-variants.ts
import { Variants } from "framer-motion";

/* ------------------ Core Animations ------------------ */

export const waterfallList: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
      ease: "easeOut",
    },
  },
};

export const waterfallItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/* ------------------ Utilities ------------------ */

export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay, duration: 0.4 } },
});

export const fadeInUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } },
});

export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { delay, duration: 0.3 } },
});

/* ------------------ Combo Helper ------------------ */

export const getStaggerChildrenVariants = (stagger = 0.08): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, ease: "easeOut" },
  },
});

export const getStaggerElementVariants = (yOffset = 8): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
});

/* ------------------ Icon Animations ------------------ */

export const iconRotate: Variants = {
  hidden: (direction: "open" | "close") => ({
    opacity: 0,
    rotate: direction === "open" ? 90 : -90,
    scale: 0.9,
  }),
  show: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: (direction: "open" | "close") => ({
    opacity: 0,
    rotate: direction === "open" ? -90 : 90,
    scale: 0.9,
    transition: { duration: 0.25, ease: "easeOut" },
  }),
};
