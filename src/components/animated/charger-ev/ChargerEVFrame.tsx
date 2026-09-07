"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChargerEVScreen } from "./ChargerEVScreen";
import HeaderLogo from "../../layout/header/header-logo";
import type { CableType } from "@/lib/catalog/catalog.types";
import SocketTypeTwo from "../../../../public/images/icons/type-2-socket.svg";

type Props = {
  powerKw: number;
  variant: "residential" | "pro";
  mode: "single" | "multi";
  phases: 1 | 2 | 3;
  cableType?: CableType;
};

export function ChargerEVFrame({
  powerKw,
  variant,
  mode,
  phases,
  cableType,
}: Props) {
  const isResidential = variant === "residential";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`
        pointer-events-none relative flex items-center justify-center scale-100
      `}
    >
      {/* Cable Assembly — absolute so it never affects the charger's layout height,
          anchored to overlap behind the frame's bottom edge */}
      <div className="absolute left-1/2 top-[calc(100%-3rem)] z-0 flex items-start gap-12 -translate-x-1/2">
        <div
          className="
            h-40 w-7
            rounded-none
            bg-[linear-gradient(to_bottom,#404040_0%,#262626_10%,rgba(38,38,38,0.55)_32%,rgba(38,38,38,0.28)_52%,rgba(38,38,38,0.12)_72%,rgba(38,38,38,0.04)_88%,transparent_100%)]
            shadow-[inset_2px_0_2px_rgba(255,255,255,0.15),inset_-2px_0_3px_rgba(0,0,0,0.7)]
          "
        />
        <div
          className="
            h-40 w-7
            rounded-none
            bg-[linear-gradient(to_bottom,#404040_0%,#262626_10%,rgba(38,38,38,0.55)_32%,rgba(38,38,38,0.28)_52%,rgba(38,38,38,0.12)_72%,rgba(38,38,38,0.04)_88%,transparent_100%)]
            shadow-[inset_2px_0_2px_rgba(255,255,255,0.15),inset_-2px_0_3px_rgba(0,0,0,0.7)]
          "
        />

        {/* Type 2 socket holster ("con toma" units) — anchored at the end of the second cable */}
        {cableType === "socket" && (
          <div
            className="
              absolute left-[90px] top-full -translate-x-1/2 -translate-y-1
              flex h-[163px] w-[163px] items-center justify-center
              rounded-2xl border border-neutral-600 bg-neutral-800
              shadow-[0_8px_20px_rgba(0,0,0,0.5)]
            "
          >
            <div className="flex h-[109px] w-[109px] items-center justify-center rounded-full border border-neutral-700 bg-neutral-950">
              <div
                className="h-[68px] w-[68px] bg-neutral-300"
                style={{
                  WebkitMaskImage: `url(${SocketTypeTwo.src})`,
                  maskImage: `url(${SocketTypeTwo.src})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Outer Metallic Frame */}
      <div
        className="
          relative
          z-10
          min-h-[670px]
          w-[380px]
          flex flex-col items-center justify-between
          overflow-hidden
          rounded-[4rem]
          border-4 border-neutral-300

          shadow-[inset_0_1px_3px_rgba(255,255,255,0.6),0_6px_24px_rgba(0,0,0,0.45)]
        "
      >
        {/* Inner Black Panel */}
        <div
          className="
            relative flex flex-1 w-full flex-col items-center
            overflow-visible
            rounded-[4rem]
            bg-[radial-gradient(circle_at_50%_30%,#1a1a1a_0%,#000_100%)]
            shadow-[inset_0_0_20px_rgba(255,255,255,0.04)]
          "
        >
          {/* Logo */}
          <div className="mt-10  flex items-center justify-center">
            <HeaderLogo />
          </div>

          {/* LCD Screen */}
          <div className="mt-4 flex justify-center">
            <ChargerEVScreen
              powerKw={powerKw}
              variant={variant}
              mode={mode}
              phases={phases}
            />
          </div>

          {/* LED Strip */}
          <motion.div
            animate={isInView ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
            transition={{
              duration: isResidential ? 2.5 : 2,
              repeat: isInView ? Infinity : 0,
              ease: "easeInOut",
            }}
            className={`
              my-6
              w-[2px] flex-1
              rounded-full
              bg-[linear-gradient(to_bottom,transparent_0%,#22ff66_40%,#22ff66_60%,transparent_100%)]
              ${isResidential ? "opacity-70" : ""}
              shadow-[0_0_20px_rgba(34,255,102,0.4)]
              blur-[0.5px]
            `}
          />
        </div>
      </div>
    </motion.div>
  );
}
