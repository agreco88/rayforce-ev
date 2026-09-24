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

      {/* Mismo max-w y padding que el header, para que el texto arranque en la
          misma linea vertical que el logo y que el contenido de abajo */}
      <div
        className="
          relative z-10
          mx-auto flex w-full max-w-[1440px] items-center
          px-6 pt-40 pb-24
          sm:px-8 lg:pt-56 lg:pb-32
        "
      >
        {/* Ancho propio en vez de media pantalla: a 1440px la mitad sigue siendo
            demasiado para un parrafo. Queda pegado a la izquierda y la foto
            respira a la derecha */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={waterfallList}
          className="flex max-w-[46rem] flex-col gap-12"
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
              bg-clip-text text-4xl font-medium leading-[1.15]
              text-transparent
              sm:text-5xl lg:text-6xl
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
    </section>
  );
}
