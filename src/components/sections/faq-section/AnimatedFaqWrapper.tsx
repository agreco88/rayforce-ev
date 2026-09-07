"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type AnimatedFaqWrapperProps = {
  children: ReactNode;
};

export function AnimatedFaqWrapper({ children }: AnimatedFaqWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const el = contentRef.current;

    const measure = () => {
      const next = el.scrollHeight;
      setHeight((prev) => (prev === next ? prev : next));
    };

    // 🔹 measure immediately (same frame as accordion animation)
    measure();

    // 🔹 keep tracking size changes
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [children]);

  return (
    <motion.div
      animate={{ height }}
      transition={{
        height: {
          duration: 0.4, // 👈 matches Radix feel
          ease: [0.4, 0.0, 0.2, 1], // 👈 same curve
        },
      }}
    >
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
