"use client";

import { motion } from "framer-motion";
import AsideMobileMenu from "./aside-mobile-menu/aside-mobile-menu";
import HeaderLogo from "./header-logo";
import HeaderNav from "./header-nav";

export default function Header() {
  return (
    <motion.header
      className="fixed inset-x-0 top-0  z-50 min-h-16 pt-4 px-6           bg-linear-to-b from-black via-black/70 to-transparent
"
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
      <div className="relative flex h-16 items-center justify-between px-0 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-4">
          <HeaderLogo />
          <HeaderNav />
        </div>
        <AsideMobileMenu />
      </div>
    </motion.header>
  );
}
