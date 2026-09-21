"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { ChargeSpeedStatCard } from "@/components/charts/ChargeSpeedStatCard";
import { WallboxComparisonTable } from "@/components/charts/WallboxComparisonTable";

const THEME = {
  accentText: "text-green-400",
};

/**
 * "Por que un wallbox y no el cable que vino con el auto": el stat de velocidad
 * y la tabla comparativa a la izquierda, el argumento a la derecha.
 *
 * Es el bloque `whyBetter` que vivia dentro de WallboxIntroSection, extraido a
 * su propia seccion para poder montarlo solo en la home. Reusa las mismas dos
 * piezas (`ChargeSpeedStatCard` y `WallboxComparisonTable`) y las mismas claves
 * de i18n, asi que el copy no se duplica: sigue siendo `HomePage.WallboxIntro.whyBetter`.
 */
export function HomeComparisonSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.WallboxIntro");

  return (
    <section
      id={id}
      className="relative border-y border-neutral-800 bg-neutral-950"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Izquierda: el dato duro arriba, el detalle completo abajo.
              En mobile va segunda, para que el copy explique antes de mostrar
              la tabla. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="order-2 flex flex-col gap-6 lg:order-1"
          >
            <ChargeSpeedStatCard variant="compact" />
            <WallboxComparisonTable />
          </motion.div>

          {/* Derecha: la pregunta y la respuesta. */}
          <motion.div
            variants={waterfallList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="order-1 flex flex-col lg:order-2"
          >
            <motion.span
              variants={waterfallItem}
              className={cn("text-xs tracking-[0.35em]", THEME.accentText)}
            >
              {t("whyBetter.eyebrow")}
            </motion.span>

            <motion.h2
              variants={waterfallItem}
              className="mt-5 max-w-2xl text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
            >
              {t("whyBetter.title")}
            </motion.h2>

            <motion.p
              variants={waterfallItem}
              className="mt-6 max-w-2xl leading-relaxed text-neutral-400"
            >
              {t("whyBetter.description")}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
