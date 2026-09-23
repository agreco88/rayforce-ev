"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Zap, Plug, Clock, type LucideIcon } from "lucide-react";

import { ChargersCardGrid } from "@/components/sections/home/chargers/ChargersCardGrid";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { HomeLineupHelpCta } from "./HomeLineupHelpCta";

const GUIDE_INTRO_ICONS: LucideIcon[] = [Zap, Plug, Clock];

export function HomeLineupDesktop() {
  const t = useTranslations("HomePage.Lineup");
  const guideIntroItems = t.raw("guide.items") as {
    title: string;
    description: string;
  }[];

  return (
    /* `max-w-[1600px]`, el mismo ancho que la grilla de /cargadores: cuatro
        fichas de producto no entran comodas en la caja de 1280 que usan las
        secciones de texto.

        El `pb` va mas bajo que el `pt`: abajo cierra un CTA centrado, que deja
        aire propio a los costados — con el padding parejo la seccion terminaba
        en un hueco muy largo antes del borde. */
    <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col px-6 pt-24 pb-16 sm:px-8 lg:pt-32 lg:pb-20">
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
            className="mt-4 text-4xl max-w-2xl font-light tracking-tight text-balance text-white sm:text-5xl"
          >
            {t("title")}
          </motion.h2>

          {/* `max-w-3xl` y no `2xl`: a dos lineas la bajada acompaña el ancho
              del h2; a tres se lee como una columna angosta al costado. */}
          <motion.p
            variants={waterfallItem}
            className="mt-5 max-w-3xl leading-relaxed text-neutral-400"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* GUIA RAPIDA — mismo lenguaje que los destacados de la columna
            (HomeStandDesktop): tarjeta con borde, icono verde suelto,
            titulo `font-light` con divider. Va antes de la grilla: la
            eleccion real es una secuencia (instalacion → cable → potencia),
            conviene saberla antes de ver las 4 fichas. */}
        <motion.div
          variants={waterfallList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.ul
            variants={waterfallItem}
            className="grid list-none grid-cols-3 items-stretch gap-6"
          >
            {guideIntroItems.map((item, index) => {
              const Icon = GUIDE_INTRO_ICONS[index];
              return (
                <li
                  key={item.title}
                  className="flex h-full flex-col rounded-2xl border border-neutral-900 bg-neutral-950/60 p-6 backdrop-blur-sm"
                >
                  <Icon
                    className="size-10 text-green-400"
                    strokeWidth={1}
                    aria-hidden="true"
                  />

                  <p className="mt-5 text-2xl font-light text-white">
                    {index + 1}. {item.title}
                  </p>

                  <div className="mt-4 h-px w-full bg-green-400/10" />

                  <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* NUESTROS MODELOS — la misma tarjeta que /cargadores: cada una
            linkea a su modelo. Solo cambia el contenedor — cuatro columnas
            fijas, porque la seccion entera ya esta detras de `xl`.

            Sin CTA al catalogo: /cargadores muestra esta misma grilla. */}
        <div className="flex flex-col">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-3xl font-light normal-case tracking-tight text-white"
          >
            {t("gridTitle")}
          </motion.h3>

          <ChargersCardGrid className="mt-8 grid grid-cols-4 gap-6" />
        </div>

        {/* `mt-4` sobre el `gap-12` del contenedor: el CTA cierra la seccion y
            no es un bloque mas de la lista, necesita despegarse de la grilla
            mas que lo que se separan los bloques entre si. */}
        <HomeLineupHelpCta className="mt-4" />
      </div>
    </div>
  );
}
