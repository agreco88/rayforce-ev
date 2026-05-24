"use client";

import { Fuel, Home, Plug } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";

const CHART_HEIGHT = 480;

const BARS = [
  {
    id: "rayforce" as const,
    heightPct: 19,
    bg: "bg-green-600",
    Icon: Home,
    iconColor: "text-green-600",
    displayPrice: "$134",
    isWinner: true,
    delay: 0.4,
  },
  {
    id: "ute" as const,
    heightPct: 37,
    bg: "bg-neutral-600",
    Icon: Plug,
    iconColor: "text-neutral-600",
    displayPrice: "$523",
    isWinner: false,
    delay: 0.5,
  },
  {
    id: "nafta" as const,
    heightPct: 90,
    bg: "bg-red-900",
    Icon: Fuel,
    iconColor: "text-red-700",
    displayPrice: "$3.081",
    isWinner: false,
    delay: 0.6,
  },
];

export function HomeCostSection() {
  const t = useTranslations("HomePage.HomeCostSection");

  return (
    <section
      aria-labelledby="cost-heading"
      className="relative bg-neutral-950 border-b border-neutral-900 px-6 py-16 sm:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 80% 100%, rgba(34,197,94,0.07), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">

          {/* ── Left: copy ─────────────────────────────────── */}
          <motion.div
            variants={waterfallList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <motion.span
              variants={waterfallItem}
              aria-hidden="true"
              className="text-xs uppercase tracking-widest text-green-400"
            >
              {t("eyebrow")}
            </motion.span>

            <motion.h2
              id="cost-heading"
              variants={waterfallItem}
              className="mt-4 text-4xl sm:text-5xl font-light tracking-tight text-pretty"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              variants={waterfallItem}
              className="mt-6 text-lg leading-relaxed text-neutral-400 max-w-md"
            >
              {t("description")}
            </motion.p>

            <motion.div variants={waterfallItem} className="mt-8">
              <Link
                href="/cargadores"
                className="inline-flex items-center gap-2 h-14 rounded-2xl px-8 bg-green-700 hover:bg-green-600 text-white font-medium transition-colors duration-200"
              >
                {t("cta")}
              </Link>
            </motion.div>

            <motion.p
              variants={waterfallItem}
              className="mt-8 text-xs text-neutral-600 leading-relaxed max-w-sm"
            >
              {t("footnote")}
            </motion.p>
          </motion.div>

          {/* ── Right: bar chart ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Price labels row */}
            <div className="flex items-end justify-center gap-4 sm:gap-8 mb-6">
              {BARS.map(({ id, displayPrice, isWinner }) => (
                <div key={id} className="w-28 sm:w-36 text-center">
                  {isWinner && (
                    <span className="inline-block mb-2 rounded-full bg-green-500/15 border border-green-500/30 px-3 py-0.5 text-[10px] uppercase tracking-wider text-green-400">
                      {t("winnerLabel")}
                    </span>
                  )}
                  <div
                    className={`text-3xl sm:text-4xl font-thin tracking-tighter ${
                      isWinner ? "text-green-400" : "text-neutral-300"
                    }`}
                  >
                    {displayPrice}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-600 mt-1">
                    {t("unit")}
                  </div>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div
              className="relative flex items-end justify-center gap-4 sm:gap-8"
              style={{ height: CHART_HEIGHT }}
            >
              {/* Grid lines */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex flex-col justify-between"
              >
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-px w-full bg-neutral-800/60" />
                ))}
              </div>

              {BARS.map(({ id, heightPct, bg, Icon, iconColor, isWinner, delay }) => {
                const barH = (CHART_HEIGHT * heightPct) / 100;
                return (
                  <div
                    key={id}
                    className="relative w-28 sm:w-36 shrink-0"
                    style={{ height: `${heightPct}%`, clipPath: "inset(0 0 0 0)" }}
                  >
                    {isWinner && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-green-500 rounded-t-full blur-3xl opacity-20"
                      />
                    )}

                    <motion.div
                      initial={{ y: barH }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay, ease: "easeOut" }}
                      className={`absolute inset-0 ${bg}`}
                      style={{
                        borderTopLeftRadius: "9999px",
                        borderTopRightRadius: "9999px",
                      }}
                    >
                      {/* Icon circle */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: delay + 0.75 }}
                        className="absolute left-1/2 top-3 sm:top-4 -translate-x-1/2"
                      >
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-sm">
                          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} aria-hidden="true" />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Labels below bars */}
            <div className="flex justify-center gap-4 sm:gap-8 mt-5">
              {BARS.map(({ id, isWinner }) => (
                <div key={id} className="w-28 sm:w-36 text-center">
                  <p
                    className={`text-sm font-medium leading-tight ${
                      isWinner ? "text-green-400" : "text-neutral-400"
                    }`}
                  >
                    {t(`items.${id}.title`)}
                  </p>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {t(`items.${id}.subtitle`)}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-neutral-700">
              {t("source")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
