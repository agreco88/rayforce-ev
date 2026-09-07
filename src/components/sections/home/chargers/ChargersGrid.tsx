"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { ChargersCardGrid } from "./ChargersCardGrid";

export function ChargersGrid({ id }: { id?: string }) {
  const t = useTranslations("HomePage.HomeChargersSection");

  return (
    <section
      id={id}
      aria-labelledby="chargers-grid-heading"
      className="border-t border-neutral-900 bg-neutral-950 py-20"
    >
      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center"
      >
        <motion.span
          variants={waterfallItem}
          className="text-xs uppercase tracking-widest text-green-400 sm:text-sm"
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h2
          id="chargers-grid-heading"
          variants={waterfallItem}
          className="mt-4 text-pretty"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={waterfallItem}
          className="mt-4 max-w-[48ch] text-sm leading-relaxed text-neutral-400 sm:text-base"
        >
          {t("description")}
        </motion.p>
      </motion.div>

      <ChargersCardGrid className="mx-auto mt-12 grid max-w-[1600px] grid-cols-4 gap-6 px-4" />
    </section>
  );
}
