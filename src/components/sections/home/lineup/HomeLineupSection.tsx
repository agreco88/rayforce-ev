"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { ChargersCardGrid } from "@/components/sections/home/chargers/ChargersCardGrid";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";

import { HomeLineupGuide } from "./HomeLineupGuide";

/**
 * El lineup de wallboxes, entre "que es un wallbox" y la columna: la seccion
 * anterior explica por que conviene uno, esta muestra cuales hay.
 *
 * Solo desktop (`hidden xl:block`): en mobile la seccion no se monta, para no
 * meter una grilla de cuatro fichas de producto en medio de la home. El acceso
 * al catalogo en mobile sigue siendo el flyout del header y /cargadores.
 *
 * El corte es `xl` y no `lg` porque las cuatro columnas son fijas: abajo de
 * 1280 la tarjeta queda en ~220px y el copy se desarma en cinco lineas.
 */
export function HomeLineupSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.Lineup");

  return (
    <section
      id={id}
      aria-labelledby="home-lineup-heading"
      className="relative hidden overflow-hidden border-t border-neutral-900 bg-neutral-950 xl:block"
    >
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      {/* `max-w-[1600px]`, el mismo ancho que la grilla de /cargadores: cuatro
          fichas de producto no entran comodas en la caja de 1280 que usan las
          secciones de texto. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col px-6 py-24 sm:px-8 lg:py-32">
        {/* `gap-12`: el header tiene que quedar mas lejos de la grilla que la
            descripcion de su titulo, si no el parrafo se lee como pie de las
            tarjetas en vez de bajada del h2. */}
        <div className="flex w-full flex-col gap-12">
          <motion.div
            variants={waterfallList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col"
          >
            <motion.span
              variants={waterfallItem}
              className="text-xs uppercase tracking-[0.35em] text-green-400"
            >
              {t("eyebrow")}
            </motion.span>

            <motion.h2
              id="home-lineup-heading"
              variants={waterfallItem}
              className="mt-5 text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              variants={waterfallItem}
              className="mt-4 max-w-2xl leading-relaxed text-neutral-400"
            >
              {t("description")}
            </motion.p>
          </motion.div>

          {/* La misma tarjeta que /cargadores: cada una linkea a su modelo.
              Solo cambia el contenedor — cuatro columnas fijas, porque la
              seccion entera ya esta detras de `xl`.

              Sin CTA al catalogo: /cargadores muestra esta misma grilla. */}
          <ChargersCardGrid className="grid grid-cols-4 gap-6" />

          {/* La guia cierra la seccion: las fichas dicen que hay, esto
              responde cual conviene. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
          >
            <HomeLineupGuide />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
