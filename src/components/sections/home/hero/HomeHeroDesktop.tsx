"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { DotExpandBadge } from "@/components/ui/wrappers/DotExpandBadge";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { useTrack } from "@/lib/analytics";

import { HomeHeroActions } from "./HomeHeroActions";
import { HomeHeroBackdrop } from "./HomeHeroBackdrop";

export function HomeHeroDesktop({ id }: { id?: string }) {
  const t = useTranslations("HomePage.Hero");
  const track = useTrack();

  return (
    <section
      id={id}
      className="relative isolate w-full overflow-hidden bg-neutral-950"
    >
      <HomeHeroBackdrop />

      {/* El padding va afuera del `max-w` y no adentro: asi el contenido mide
          1440 limpios, igual que el header y que el hero de las paginas de
          producto. Con el padding adentro quedaba 64px mas angosto y el titulo
          nunca arrancaba en la misma linea que el logo. */}
      <div className="relative z-10 flex w-full px-6 pt-40 pb-24 sm:px-8 lg:pt-56 lg:pb-32">
        <div className="mx-auto flex w-full max-w-[1440px] items-center">
          {/* Ancho propio en vez de media pantalla: a 1440px la mitad sigue
              siendo demasiado para un parrafo. Queda pegado a la izquierda y la
              foto respira a la derecha */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={waterfallList}
            className="flex max-w-[54rem] flex-col gap-10"
          >
            <motion.div variants={waterfallItem}>
              <DotExpandBadge
                href="/empresas"
                tag={t("badge.tag")}
                onClick={() => track.homeHeroBadge("desktop")}
              >
                {t("badge.label")}
              </DotExpandBadge>
            </motion.div>

            {/* Sin animación a propósito: es el LCP y tiene que pintar de una */}
            <h1
              className="
                max-w-[20ch]
                bg-gradient-to-b from-gray-50 via-neutral-50 to-stone-50
                bg-clip-text text-3xl font-semibold leading-[1.25]
                text-transparent
                sm:text-4xl lg:text-5xl
              "
            >
              {t("title")}
            </h1>

            {/* neutral-200 y sombra propia: sobre foto un gris medio no gana */}
            <motion.p
              variants={waterfallItem}
              className="
                max-w-[52ch] text-md leading-relaxed text-neutral-200
                [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]
              "
            >
              {t("description")}
            </motion.p>

            <motion.div variants={waterfallItem}>
              <HomeHeroActions />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
