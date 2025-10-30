"use client";

import * as Progress from "@radix-ui/react-progress";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface CircularProgressProps {
  label: string;
  color: string;
}

export default function CircularProgress({
  label,
  color,
}: CircularProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (v: number) => Math.round(v));
  const pathLength = useTransform(progress, [0, 100], [0, 1]);
  const filter = useTransform(progress, [0, 100], ["blur(5px)", "blur(0px)"]);
  const scale = useTransform(progress, [0, 100], [0.5, 1]);
  const opacity = useTransform(progress, [0, 100], [0.4, 1]);

  useEffect(() => {
    if (isInView) {
      // restart animation each time it's visible
      progress.set(0);
      animate(progress, 100, {
        duration: 2.5,
        ease: [0.31, 0.05, 0.28, 0.85],
      });
    }
  }, [isInView, progress]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative w-40 h-40">
        <Progress.Root className="absolute inset-0">
          <Progress.Indicator asChild>
            <div className="relative w-full h-full">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* background circle */}
                <motion.path
                  d="M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                />
                {/* animated path */}
                <motion.path
                  d="M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10"
                  fill="none"
                  stroke={color}
                  strokeWidth="8"
                  style={{ pathLength, filter }}
                  strokeLinecap="round"
                />
              </svg>

              {/* number in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-4xl font-medium"
                  style={{
                    color,
                    scale,
                    opacity,
                    filter,
                    willChange: "transform, filter, opacity",
                  }}
                >
                  {rounded}
                </motion.div>
              </div>
            </div>
          </Progress.Indicator>
        </Progress.Root>
      </div>

      <p className="text-sm font-medium text-muted-foreground tracking-wide">
        {label}
      </p>
    </div>
  );
}
