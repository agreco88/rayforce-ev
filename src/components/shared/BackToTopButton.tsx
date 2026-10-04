"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Boton flotante abajo a la derecha que aparece con fade a medida que se
 * llega al final de la pagina y vuelve arriba con scroll suave.
 */
export function BackToTopButton() {
  const t = useTranslations("Common.BackToTop");
  const { scrollYProgress } = useScroll();
  // El ultimo 15% del scroll: aparece mientras se acerca el footer, no antes.
  const opacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const [active, setActive] = useState(false);
  useMotionValueEvent(opacity, "change", (value) => setActive(value > 0.1));

  return (
    // Casi invisible no tiene que recibir clicks ni foco.
    <motion.button
      type="button"
      style={{ opacity }}
      inert={!active}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[90] inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-950/70 px-4 py-2.5 text-sm font-medium text-neutral-200 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white sm:bottom-8 sm:right-8"
    >
      <ArrowUp size={16} />
      {t("cta")}
    </motion.button>
  );
}
