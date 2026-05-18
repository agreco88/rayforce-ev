"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";

const logoMotion = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 2, ease: [0.16, 1, 0.3, 1] as const },
};

function useLogoClick() {
  const pathname = usePathname();
  const router = useRouter();

  return () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };
}

export default function HeaderLogo() {
  const handleClick = useLogoClick();

  return (
    <motion.button
      {...logoMotion}
      onClick={handleClick}
      aria-label="Ir al inicio"
      className="flex items-center gap-2 cursor-pointer"
    >
      <Image
        src="/images/brand/rayforce-logo.webp"
        className="invert opacity-85 saturate-0"
        alt="Rayforce"
        height={125}
        width={125}
        priority
      />
    </motion.button>
  );
}

export function FooterLogo() {
  const handleClick = useLogoClick();

  return (
    <motion.button
      {...logoMotion}
      onClick={handleClick}
      aria-label="Ir al inicio"
      className="flex items-center gap-2 cursor-pointer"
    >
      <Image
        src="/images/brand/rayforce-isotype.webp"
        alt="Rayforce"
        height={30}
        width={30}
        priority
      />
    </motion.button>
  );
}
