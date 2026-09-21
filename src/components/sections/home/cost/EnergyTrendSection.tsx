"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Leaf, TrendingDown, Wallet } from "lucide-react";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import LineGraph from "@/components/charts/LineGraph";
import CombinedTrendGraph from "@/components/charts/CombinedTrendGraph";
import { PriceComparison } from "@/components/charts/PriceComparison";
import { TrendHeadline } from "./TrendHeadline";
import {
  NAFTA_COLOR,
  NAFTA_PRICES,
  UTE_COLOR,
  UTE_PRICES,
  YEARS,
  Y_MAX,
  changeUpTo,
  totalChange,
} from "./energy-price-data";

const POINTS = [
  { icon: Leaf, key: "renewable" },
  { icon: TrendingDown, key: "stable" },
  { icon: Wallet, key: "usage" },
] as const;

const SERIES = [
  { key: "nafta", data: NAFTA_PRICES, color: NAFTA_COLOR, delay: 0 },
  { key: "ute", data: UTE_PRICES, color: UTE_COLOR, delay: 0.15 },
] as const;

export function EnergyTrendSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.EnergyTrend");

  /* Año con hover, compartido por el par de abajo: pasar el mouse por
     cualquiera de las dos actualiza los dos paneles a la vez. */
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const readoutIndex = hoveredYear ?? YEARS.length - 1;

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

      {/* ── VARIANTE en prueba: el argumento en dos números
             grandes, sin gráfica ───────────────────────────── */}
      <TrendHeadline />

      {/* ── VARIANTE en prueba: una sola gráfica con las dos
             series y un tooltip combinado ─────────────────── */}
      <div className="mt-10 rounded-2xl border border-neutral-900 bg-neutral-900/20 p-5 sm:p-6 lg:p-8">
        <CombinedTrendGraph
          labels={[...YEARS]}
          series={[
            {
              key: "nafta",
              data: [...NAFTA_PRICES],
              color: NAFTA_COLOR,
              prefix: "$",
              tooltipLabel: t("series.nafta.combinedLabel"),
            },
            {
              key: "ute",
              data: [...UTE_PRICES],
              color: UTE_COLOR,
              prefix: "$",
              tooltipLabel: t("series.ute.combinedLabel"),
            },
          ]}
        />
      </div>

      {/* ── Ocultas: las dos variantes 50/50 (individual y
             sincronizada). Se dejan comentadas, no borradas, por si se
             retoman más adelante — sólo queda visible la comparativa
             de arriba (CombinedTrendGraph). ──────────────────────── */}
      {false && (
        <>
          {/* ── Dos gráficas 50/50: nafta y luz, cada una en sus
                 propias unidades y con su propio tooltip ──────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 grid gap-4 lg:grid-cols-2 lg:gap-6"
          >
            {(
              [
                {
                  key: "nafta",
                  data: NAFTA_PRICES,
                  color: NAFTA_COLOR,
                  delay: 0,
                },
                {
                  key: "ute",
                  data: UTE_PRICES,
                  color: UTE_COLOR,
                  delay: 0.15,
                },
              ] as const
            ).map(({ key, data, color, delay }) => (
              <div
                key={key}
                className="rounded-2xl border border-neutral-900 bg-neutral-900/20 p-5 sm:p-6 lg:p-8"
              >
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-sm font-medium tracking-tight sm:text-base"
                      style={{ color }}
                    >
                      {t(`series.${key}.label`)}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {t(`series.${key}.unit`)}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className="text-2xl font-light tracking-tighter tabular-nums sm:text-3xl"
                      style={{ color }}
                    >
                      {t(`series.${key}.delta`)}
                    </span>
                    <span className="text-[10px] tracking-wide text-neutral-500 uppercase">
                      {t(`series.${key}.deltaNote`)}
                    </span>
                  </div>
                </div>

                <LineGraph
                  data={[...data]}
                  labels={[...YEARS]}
                  color={color}
                  prefix="$"
                  tooltipTitle={t(`series.${key}.tooltipTitle`)}
                  label={t(`series.${key}.short`)}
                  delay={delay}
                />
              </div>
            ))}
          </motion.div>

          <p className="mt-5 text-center text-xs text-neutral-600">
            {t("chartSubtitle")}
          </p>

          {/* ── Variante sincronizada ────────────────────────
                 Las mismas dos gráficas, pero sin tooltip: el año con hover
                 en cualquiera de las dos actualiza los dos paneles de abajo,
                 así los precios se comparan de una sola mirada. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 grid gap-4 lg:grid-cols-2 lg:gap-6"
            onPointerLeave={() => setHoveredYear(null)}
          >
            {SERIES.map(({ key, data, color, delay }) => (
              <div
                key={key}
                className="rounded-2xl border border-neutral-900 bg-neutral-900/20 p-5 sm:p-6 lg:p-8"
              >
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <span
                    className="text-sm font-medium tracking-tight sm:text-base"
                    style={{ color }}
                  >
                    {t(`series.${key}.label`)}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {t(`series.${key}.unit`)}
                  </span>
                </div>

                {/* Las dos comparten el techo del eje: a escala propia, $8
                    y $88 dibujan la misma curva. */}
                <LineGraph
                  data={[...data]}
                  labels={[...YEARS]}
                  color={color}
                  prefix="$"
                  label={`sync-${key}`}
                  delay={delay}
                  hovered={hoveredYear}
                  onHoverChange={setHoveredYear}
                  hideTooltip
                  yMax={Y_MAX}
                />
              </div>
            ))}
          </motion.div>
        </>
      )}

      {/* ── Oculto: panel de variación del año con hover, parte de
             la variante 50/50 sincronizada (ya oculta arriba). ──── */}
      {false && (
        <div
          className="mt-4 lg:mt-6"
          onPointerLeave={() => setHoveredYear(null)}
        >
          <PriceComparison
            year={YEARS[readoutIndex]}
            label={t("comparisonLabel")}
            prefix="$"
            series={SERIES.map(({ key, data, color }) => ({
              key,
              label: t(`series.${key}.label`),
              value: data[readoutIndex],
              change: changeUpTo([...data], readoutIndex),
              color,
              unit: t(`series.${key}.unit`),
            }))}
            summary={t("comparisonSummary", {
              nafta: `+${Math.round(totalChange([...NAFTA_PRICES]))}%`,
              ute: `+${Math.round(totalChange([...UTE_PRICES]))}%`,
            })}
          />
        </div>
      )}

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
