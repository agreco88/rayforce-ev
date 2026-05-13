"use client";

import { motion } from "framer-motion";
import AsideMobileMenu from "./aside-mobile-menu/aside-mobile-menu";
import HeaderLogo from "./header-logo";
import HeaderNav from "./header-nav";

export default function Header() {
  return (
    <motion.header
      className="fixed inset-x-0  z-[99] py-2  mx-auto px-4 sm:px-0  bg-linear-to-b from-black via-black/50 to-transparent"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {/* Animated gradient backdrop */}
      <motion.div
        variants={{
          rest: {
            opacity: 0.85,
            scaleY: 0.9,
          },
          hover: {
            opacity: 1,
            scaleY: 1.05,
          },
        }}
        transition={{
          opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          scaleY: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{ transformOrigin: "top" }}
        className="
          pointer-events-none
          absolute inset-0
        "
      />
      {/* Content */}
      <div className="relative max-w-7xl flex items-center  mx-auto">
        <div className="flex flex-1 my-2 mx-1.5 sm:mx-2 items-center gap-4">
          <HeaderLogo />
          <HeaderNav />
        </div>
        <AsideMobileMenu />
      </div>
    </motion.header>
  );
}
