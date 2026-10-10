"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

import { EmpresasHeroActions } from "./EmpresasHeroActions";
import { EmpresasHeroBackdrop } from "./EmpresasHeroBackdrop";

export function EmpresasHeroDesktop() {
  const t = useTranslations("EmpresasPage.Hero");

  return (
    <section className="relative isolate w-full overflow-hidden bg-neutral-950">
      <EmpresasHeroBackdrop />

      {/* Mismo carril que `HomeHeroDesktop`: padding afuera del `max-w`, para
          que el titulo arranque en la misma linea que el logo */}
      <div className="relative z-10 flex w-full px-6 pt-40 pb-24 sm:px-8 lg:pt-56 lg:pb-32">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-5 items-center">
          {/* El 40% izquierdo: pisa el arranque del fade, que todavia es casi negro */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={waterfallList}
            className="col-span-2 flex flex-col gap-10"
          >
            <motion.span
              variants={waterfallItem}
              className="text-xs uppercase tracking-[0.35em] text-green-400"
            >
              {t("eyebrow")}
            </motion.span>

            {/* Sin animación a propósito: es el LCP. Peso normal y no el
                semibold de la home, a propósito */}
            <h1
              className="
                bg-gradient-to-b from-gray-50 via-neutral-50 to-stone-50
                bg-clip-text text-5xl font-normal leading-[1.15]
                text-balance text-transparent
                xl:text-6xl
              "
            >
              {t("title")}
            </h1>

            <motion.p
              variants={waterfallItem}
              className="max-w-[52ch] text-md leading-relaxed text-neutral-300"
            >
              {t("description")}
            </motion.p>

            <motion.div variants={waterfallItem}>
              <EmpresasHeroActions />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
