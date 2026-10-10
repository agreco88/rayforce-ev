"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

import { EmpresasHeroMobileActions } from "./EmpresasHeroMobileActions";

/** Mismo armado que `HomeHeroMobile`: alto fijo, la foto arriba cede el alto
 * que sobra y el texto abajo mide exactamente lo suyo. */
export function EmpresasHeroMobile() {
  const t = useTranslations("EmpresasPage.Hero");

  return (
    <section className="relative isolate flex h-[100dvh] flex-col overflow-hidden bg-neutral-950">
      <div className="relative w-full flex-1 basis-0 min-h-[12rem] overflow-hidden">
        {/* El 80% horizontal es donde entran el cargador y todo su cable; el
            auto queda afuera, que en vertical no hay lugar para los dos */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/chargers/wallbox-shared-space-building-apartment-complex.webp"
          alt={t("imageAlt")}
          fetchPriority="high"
          decoding="sync"
          className="h-full w-full object-cover object-[80%_42%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      <div className="relative z-10 flex shrink-0 flex-col px-6 pt-5 pb-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={waterfallList}
          className="flex w-full flex-col"
        >
          {/* Sin animación a propósito: es el LCP */}
          <h1
            className="
              bg-gradient-to-b from-gray-50 via-neutral-50 to-stone-50
              bg-clip-text text-2xl font-normal leading-[1.2]
              text-balance text-transparent
              md:text-4xl
            "
          >
            {t("title")}
          </h1>

          <motion.p
            variants={waterfallItem}
            className="mt-3 line-clamp-4 text-xs leading-snug text-neutral-300"
          >
            {t("description")}
          </motion.p>

          <motion.div variants={waterfallItem} className="mt-5">
            <EmpresasHeroMobileActions />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
