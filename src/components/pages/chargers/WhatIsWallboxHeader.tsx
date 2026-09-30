"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

import { WallboxDemoVideo } from "./WallboxDemoVideo";

/**
 * Foto del wallbox instalado. Hace de thumb y de `poster` del video de demo,
 * asi el click no produce ningun salto.
 */
const WALLBOX_IMAGE_SRC =
  "/assets/images/chargers/wallbox-shared-space-building-apartment-complex.webp";

/**
 * Header 50/50: el copy a la izquierda, el wallbox instalado a la derecha.
 * En mobile la imagen baja debajo del texto.
 *
 * Los gaps son los mismos que los de la grilla de tarjetas (`gap-6 lg:gap-8`),
 * en los dos ejes: las columnas caen sobre las de abajo, y el salto hasta la
 * primera fila de tarjetas es el mismo que separa las filas entre si.
 */
export function WhatIsWallboxHeader() {
  const t = useTranslations("HomePage.WallboxIntro");

  return (
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
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
          {t("whatIsIt.eyebrow")}
        </motion.span>

        <motion.h2
          variants={waterfallItem}
          className="mt-5 text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
        >
          {t("whatIsIt.title")}
        </motion.h2>

        {/* El `max-w` lo lleva la descripcion y no la columna: asi la caja del
            texto termina donde termina la tarjeta de abajo, y el que frena el
            largo de linea es el parrafo, que es el unico que lo necesita. */}
        <motion.p
          variants={waterfallItem}
          className="mt-6 max-w-lg leading-relaxed text-neutral-400"
        >
          {t("whatIsIt.description")}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        /* `4/3` y no el `16/9` nativo de la foto (1672x941) y del video
           (1280x720): a media fila el 16/9 dejaba el header casi tan bajo como
           una tarjeta y no se leia como la cabecera de la grilla. Los dos
           comparten proporcion, asi que `object-cover` recorta a ambos por los
           costados por igual y no hay salto al pasar de poster a video. */
        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-neutral-800"
      >
        <WallboxDemoVideo
          posterSrc={WALLBOX_IMAGE_SRC}
          posterAlt={t("whatIsIt.imageAlt")}
          labels={{
            cta: t("whatIsIt.video.cta"),
            loading: t("whatIsIt.video.loading"),
            replay: t("whatIsIt.video.replay"),
          }}
        />
      </motion.div>
    </div>
  );
}
