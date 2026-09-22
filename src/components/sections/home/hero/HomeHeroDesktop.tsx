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
    <section id={id} className="relative isolate w-full overflow-hidden bg-neutral-950">
      <HomeHeroBackdrop />

      {/* 50/50: el contenido vive en la mitad izquierda y nunca invade la
          derecha, donde se ve la foto que corre por debajo de ambas */}
      <div
        className="
          relative z-10
          mx-auto grid w-full max-w-[1440px] grid-cols-2
          px-6 pt-40 pb-24
          sm:px-8 lg:px-16 lg:pt-56 lg:pb-32 2xl:px-0
        "
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={waterfallList}
          className="col-start-1 flex flex-col gap-12 pr-10"
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
              bg-clip-text text-4xl font-light leading-[1.15]
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
