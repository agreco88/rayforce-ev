"use client";

import { motion } from "framer-motion";
import { ChargerEVScreen } from "./ChargerEVScreen";
import HeaderLogo from "../../layout/header/header-logo";

type ChargerEVMobileProps = {
  powerKw: number;
};

export function ChargerEVMobile({ powerKw }: ChargerEVMobileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mx-auto flex w-full max-w-[260px] items-center justify-center"
    >
      {/* Device body */}
      <div
        className="
          relative
          w-full
          rounded-[1.75rem]
          border border-neutral-700
          bg-neutral-500
          p-1
          my-8
          shadow-[0_12px_32px_rgba(0,0,0,0.6)]
        "
      >
        {/* Inner panel */}
        <div
          className="
            relative
            flex flex-col items-center
            rounded-[1.5rem]
            bg-[radial-gradient(circle_at_50%_20%,#1a1a1a_0%,#000_80%)]
            px-4 pt-4 pb-5
          "
        >
          <span className="text-xs tracking-wide uppercase text-neutral-300 pt-3">
            EV Charger
          </span>

          {/* Screen */}
          <div className="mt-3 w-full flex justify-center">
            <div className="scale-[0.85] origin-top">
              <ChargerEVScreen powerKw={powerKw} />
            </div>
          </div>

          {/* Logo */}
          <div className="flex mb-3 items-center justify-center">
            <HeaderLogo />
          </div>

          {/* Status indicator */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="
              my-3
              h-44 w-0.5
              rounded-full
              bg-green-400/80
              shadow-[0_0_12px_rgba(34,255,102,0.6)]
            "
          />
        </div>
      </div>
    </motion.div>
  );
}
