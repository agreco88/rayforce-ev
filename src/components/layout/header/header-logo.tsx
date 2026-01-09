"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeaderLogo() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="flex items-center gap-2 cursor-pointer"
    >
      <Image
        src="/images/rayforce-logo.webp"
        alt="Rayforce"
        height={150}
        width={150}
        priority
      />
    </motion.button>
  );
}

export function FooterLogo() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="flex items-center gap-2 cursor-pointer"
    >
      <Image
        src="/images/rayforce-isotype.webp"
        alt="Rayforce"
        height={30}
        width={30}
        priority
      />
    </motion.button>
  );
}
