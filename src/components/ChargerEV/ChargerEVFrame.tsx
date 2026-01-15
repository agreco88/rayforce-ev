"use client";

import { motion } from "framer-motion";
import { ChargerEVScreen } from "./ChargerEVScreen";
import HeaderLogo from "../layout/header/header-logo";

export function ChargerEVFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pointer-events-none relative flex items-center justify-center"
    >
      {/* Outer Metallic Frame */}
      <div
        className="
          relative
          min-h-[650px]
          w-[360px] 
          aspect-[3/2]
          flex flex-col items-center justify-between
          overflow-hidden
          rounded-[2.25rem]
          border-4 border-neutral-300
          p-1.5
          shadow-[inset_0_1px_3px_rgba(255,255,255,0.6),0_6px_24px_rgba(0,0,0,0.45)]
        "
      >
        {/* Inner Black Panel */}
        <div
          className="
            relative flex h-full w-full flex-col items-center
            overflow-hidden
            rounded-4xl
            bg-[radial-gradient(circle_at_50%_30%,#1a1a1a_0%,#000_100%)]
            shadow-[inset_0_0_20px_rgba(255,255,255,0.04)]
          "
        >
          {/* Top Label */}
          <p className="mt-10 text-[12px] tracking-[0.25em] uppercase text-neutral-50 select-none">
            EV Charging Station
          </p>

          {/* LCD Screen */}
          <div className="mt-4 flex justify-center">
            <ChargerEVScreen />
          </div>

          {/* Logo */}
          <div className="my-6 flex items-center justify-center">
            <div className="invert opacity-85 saturate-0">
              <HeaderLogo />
            </div>
          </div>

          {/* LED Strip */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="
              mb-6
              w-[3px] flex-1
              rounded-full
              bg-[linear-gradient(to_bottom,transparent_0%,#22ff66_40%,#22ff66_60%,transparent_100%)]
              shadow-[0_0_20px_rgba(34,255,102,0.4)]
              blur-[0.5px]
            "
          />
        </div>
      </div>
    </motion.div>
  );
}
