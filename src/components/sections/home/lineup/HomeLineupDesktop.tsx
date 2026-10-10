"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { ChargersCardGrid } from "@/components/sections/home/chargers/ChargersCardGrid";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { LineupGuideCards } from "./LineupGuideCards";

export function HomeLineupDesktop() {
  const t = useTranslations("HomePage.Lineup");

  return (
    /* 1600 y no el 1440 del resto de la home: a cuatro columnas el titulo del
        BC-7KW ("Wallbox Residencial Monofasico con cable integrado") se parte
        en tres lineas y desbalancea la fila, porque los otros tres entran en
        dos. Medido en el navegador, la grilla necesita 1568 para que los cuatro
        entren en dos lineas; 1600 deja margen para el ingles.

        Por eso esta seccion sobresale del carril del header — es a proposito.

        El `pb` es el aire hasta el bloque de UTE, que se monta afuera, en
        `HomeLineupSection`. */
    <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col px-8 pt-32 pb-24">
      {/* `gap-12`: el header tiene que quedar mas lejos de la grilla que la
          descripcion de su titulo, si no el parrafo se lee como pie de las
          tarjetas en vez de bajada del h2. */}
      <div className="flex w-full flex-col gap-12">
        <motion.div
          variants={waterfallList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center"
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
            className="mt-4 mb-0 text-4xl max-w-2xl font-light tracking-tight text-balance text-white sm:text-5xl"
          >
            {t("title")}
          </motion.h2>

          {/* Centrado, con renglones de largos distintos el bloque se leia como
              un embudo: `text-balance` y el ancho del h2 los emparejan */}
          <motion.p
            variants={waterfallItem}
            className="mt-5 max-w-2xl leading-relaxed text-balance text-neutral-400"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* NUESTROS MODELOS — la misma tarjeta que /cargadores: cada una
            linkea a su modelo. Columnas de un tercio (el 3rem son los dos
            `gap-6`) centradas aunque haya dos modelos: a 50/50 las fichas se
            estiran. `auto-fit` colapsa las vacias y `justify-center` centra
            las que quedan.

            Sin CTA al catalogo: /cargadores muestra esta misma grilla. */}
        <ChargersCardGrid className="grid grid-cols-[repeat(auto-fit,calc((100%_-_3rem)_/_3))] justify-center gap-6" />

        {/* CONSEJOS — despues de los modelos: primero se ve que hay, y los
            consejos ayudan a elegir entre las fichas de arriba. Doble aire
            arriba (`mt-12` + el `gap-12`) que hacia sus cards: con menos, el
            titulo se leia como pie de las fichas. */}
        <div className="mt-12 flex flex-col">
          {/* `text-center` en el h3 y no `items-center` en el padre: eso
              encogeria las cards de abajo al ancho de su contenido. */}
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center text-3xl font-light normal-case tracking-tight text-white"
          >
            {t("guide.title")}
          </motion.h3>

          {/* Mismo `12` que separa el header de la seccion de las fichas */}
          <div className="mt-12">
            <LineupGuideCards />
          </div>
        </div>
      </div>
    </div>
  );
}
