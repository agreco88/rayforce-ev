"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const logoMotion = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
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

/** Relacion de aspecto del wordmark: 165 x 26. Los tamaños salen de acá para
 *  que no se deforme al cambiar el ancho. */
const LOGO_RATIO = 26 / 165;

/* 165 es el ancho nativo del wordmark — el mismo que usa el footer, para que
   la marca se lea igual arriba y abajo. */
export default function HeaderLogo({ width = 165 }: { width?: number }) {
  const handleClick = useLogoClick();
  const t = useTranslations("Layout.Header");

  return (
    <motion.button
      {...logoMotion}
      onClick={handleClick}
      aria-label={t("logo")}
      className="flex items-center gap-2 cursor-pointer"
    >
      {/* Opacidad plena: al 85% quedaba por detras de los chips del nav. */}
      <Image
        src="/images/brand/rayforce-logo.webp"
        className="invert saturate-0"
        alt="Rayforce"
        width={width}
        height={Math.round(width * LOGO_RATIO)}
        priority
      />
    </motion.button>
  );
}
