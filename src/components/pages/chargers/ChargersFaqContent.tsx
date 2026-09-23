"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import {
  FaqAccordion,
  type FaqItem,
} from "@/components/sections/home/faq/FaqAccordion";

/**
 * FAQ propio de /cargadores: preguntas sobre potencia, instalacion y garantia
 * de los wallbox. Namespace separado de `HomePage.Faq`, que es sobre la
 * empresa — acá no se repiten esas preguntas.
 */
export function ChargersFaqContent() {
  const t = useTranslations("ChargersPage.Faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <motion.div
      variants={waterfallList}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto w-full max-w-3xl px-6 pt-24 pb-24 lg:pt-36 lg:pb-36"
    >
      <motion.div variants={waterfallItem}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-green-400 sm:text-xs sm:tracking-[0.25em]">
          {t("eyebrow")}
        </span>

        <h2 className="mt-4 text-3xl leading-[1.1] font-light tracking-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-400 sm:mt-6">
          {t("description")}
        </p>
      </motion.div>

      <motion.div variants={waterfallItem} className="mt-10 lg:mt-14">
        <FaqAccordion items={items} />
      </motion.div>
    </motion.div>
  );
}
