"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  image: string;
  className?: string;
  scale?: number;
  direction?: number;
};

/** Frame's intrinsic box: w-[280px] at aspect-[9/19]. */
const DEVICE_WIDTH = 280;
const DEVICE_HEIGHT = (DEVICE_WIDTH * 19) / 9;

export default function Device({
  image,
  className,
  scale = 1,
  direction = 1,
}: Props) {
  // scale() paints large but leaves the unscaled box in the layout, so a
  // scaled-up device overflows its slot and covers whatever follows it.
  // Sizing the outer div to the scaled dimensions and scaling from the top
  // left keeps layout and paint in sync, so siblings below sit clear of it.
  return (
    <div
      className={cn("relative", className)}
      style={{
        width: DEVICE_WIDTH * scale,
        height: DEVICE_HEIGHT * scale,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
      <div
        className="
          relative
          w-[280px]
          aspect-[9/19]
          rounded-[3rem]
          bg-black
          overflow-hidden
          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        "
      >
        {/* Screen */}
        <div className="absolute inset-[12px] bg-white rounded-[2.5rem] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={image}
              src={image}
              alt="App preview"
              custom={direction}
              initial={{
                opacity: 0,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                filter: "blur(6px)",
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="w-full h-full object-cover absolute inset-0"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Dynamic Island */}
        <div
          className="
            absolute top-[18px] left-1/2
            -translate-x-1/2
            w-[90px] h-[22px]
            bg-black rounded-full
          "
        />

        {/* Frame */}
        <div className="absolute inset-0 border-[3px] border-[#484848] rounded-[3rem]" />
        <div className="absolute inset-[4px] border-[10px] border-black rounded-[2.8rem]" />
        </div>
      </div>
    </div>
  );
}
