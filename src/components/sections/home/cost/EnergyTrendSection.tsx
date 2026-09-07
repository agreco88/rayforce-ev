"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Leaf, TrendingDown, Wallet } from "lucide-react";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { EnergyPriceTrendChart } from "./EnergyPriceTrendChart";
import LineGraph from "./LineGraph";

const POINTS = [
  { icon: Leaf, key: "renewable" },
  { icon: TrendingDown, key: "stable" },
  { icon: Wallet, key: "usage" },
] as const;

export function EnergyTrendSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.EnergyTrend");

  return (
    <div id={id} className="relative mx-auto w-full max-w-7xl">
      {/* ── Encabezado centrado ─────────────────────────── */}
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
          variants={waterfallItem}
          className="mt-5 max-w-4xl text-3xl font-light tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={waterfallItem}
          className="mt-6 max-w-2xl text-lg leading-snug font-medium text-pretty text-neutral-300 sm:text-xl"
        >
          {t("subheading")}
        </motion.p>

        <motion.p
          variants={waterfallItem}
          className="mt-4 max-w-2xl leading-relaxed text-pretty text-neutral-400"
        >
          {t("description")}
        </motion.p>
      </motion.div>

      {/* ── Gráfico full width ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-14 rounded-2xl border border-neutral-900 bg-neutral-900/20 p-5 sm:mt-16 sm:p-8 lg:p-10"
      >
        <p className="mb-1 text-center text-xs tracking-widest text-neutral-500 uppercase">
          {t("chartTitle")}
        </p>
        <p className="mb-8 text-center text-[11px] text-neutral-600">
          {t("chartSubtitle")}
        </p>

        <EnergyPriceTrendChart />
      </motion.div>

      {/* ── Ejemplo Motion (line graph) ─────────────────── */}
      <div className="mt-8 flex justify-center">
        <LineGraph />
      </div>

      {/* ── Puntos en fila ──────────────────────────────── */}
      <motion.ul
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-x-10 gap-y-8 sm:mt-16 sm:grid-cols-3"
      >
        {POINTS.map(({ icon: Icon, key }) => (
          <motion.li key={key} variants={waterfallItem} className="flex flex-col">
            <div className="mb-4 w-fit rounded-xl bg-green-400/10 p-2.5">
              <Icon className="size-5 text-green-400" strokeWidth={1.6} />
            </div>
            <h3 className="text-base font-medium tracking-tight text-white">
              {t(`points.${key}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              {t(`points.${key}.description`)}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-neutral-500"
      >
        {t("source")}
      </motion.p>
    </div>
  );
}
