"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

import { HomeHeroMobileActions } from "./HomeHeroMobileActions";
import { HomeHeroMobileImage } from "./HomeHeroMobileImage";

export function HomeHeroMobile({ id }: { id?: string }) {
  const t = useTranslations("HomePage.Hero");

  return (
    /* `h-[100dvh]` y no `min-h-screen`: con alto fijo hay un total contra el
       cual repartir, y en pantallas altas no queda hueco negro abajo.
       `overflow-hidden` para que si el texto crece ceda la foto, no el fold */
    <section
      id={id}
      className="relative isolate flex h-[100dvh] flex-col overflow-hidden bg-neutral-950"
    >
      {/* La foto es la parte elastica: se queda con el alto que sobra despues
          del texto, y por eso el layout aguanta pantallas distintas */}
      <HomeHeroMobileImage />

      {/* El contenido es la parte rigida: `shrink-0` y sin flex-1, mide
          exactamente lo suyo. Apilado bajo la foto, sobre fondo solido, asi
          que no necesita overlays ni sombras de contraste como el desktop */}
      <div className="relative z-10 flex shrink-0 flex-col px-6 pt-6 pb-10">
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
              bg-clip-text text-[2rem] font-medium leading-[1.15]
              text-transparent
              md:text-6xl md:leading-[1.4]
            "
          >
            {t("title")}
          </h1>

          {/* `leading-snug` y no `relaxed`: en text-sm el interlineado de 1.625
              sobre 3 lineas es lo que comia el alto */}
          <motion.p
            variants={waterfallItem}
            className="mt-4 text-sm leading-snug text-neutral-300"
          >
            {t("description")}
          </motion.p>

          <motion.div variants={waterfallItem} className="mt-6">
            <HomeHeroMobileActions />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
