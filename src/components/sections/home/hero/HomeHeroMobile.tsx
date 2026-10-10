"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

import { HomeHeroMobileActions } from "./HomeHeroMobileActions";
import { HomeHeroMobileImage } from "./HomeHeroMobileImage";

export function HomeHeroMobile({ id }: { id?: string }) {
  const t = useTranslations("HomePage.Hero");

  return (
    /* Alto natural, sin encajar todo en el primer viewport: la foto manda y el
       resto queda debajo, aunque el ultimo CTA caiga bajo el fold */
    <section
      id={id}
      className="relative isolate flex flex-col bg-neutral-950"
    >
      <HomeHeroMobileImage />

      {/* Apilado bajo la foto, sobre fondo solido, asi que no necesita
          overlays ni sombras de contraste como el desktop */}
      <div className="relative z-10 flex flex-col px-6 pt-5 pb-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={waterfallList}
          className="flex w-full flex-col"
        >
          {/* Sin animación a propósito: es el LCP y tiene que pintar de una.
              Mismo gradiente que el desktop para que se lea igual en los dos */}
          <h1
            className="
              bg-gradient-to-b from-gray-50 via-neutral-50 to-stone-50
              bg-clip-text text-2xl font-semibold leading-[1.35] tracking-tighter
              text-transparent text-start text-balance
              md:text-4xl md:leading-[1.25]
            "
          >
            {t("title")}
          </h1>

          <motion.p
            variants={waterfallItem}
            className="mt-4 text-xs  text-neutral-300"
          >
            {t("description")}
          </motion.p>

          <motion.div variants={waterfallItem} className="mt-5">
            <HomeHeroMobileActions />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
