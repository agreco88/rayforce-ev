"use client";

import { useState } from "react";
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
  const [chartInView, setChartInView] = useState(false);

  return (
    <section
      aria-labelledby="cost-heading"
      className="relative bg-neutral-900 border-b border-neutral-800 px-6 py-16 sm:py-28 overflow-hidden"
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
              className="mt-5 text-xl sm:text-2xl font-medium text-white"
            >
              {t("subheading")}
            </motion.p>

            <motion.p
              variants={waterfallItem}
              className="mt-4 text-lg leading-relaxed text-neutral-400 max-w-md"
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
            onViewportEnter={() => setChartInView(true)}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-xs uppercase tracking-widest text-neutral-500 text-center mb-6">
              {t("chartTitle")}
            </p>

            {/* Chart: Y-axis + bars side by side */}
            <div className="flex" style={{ height: CHART_HEIGHT }}>
              {/* Y axis */}
              <div
                className="relative w-10 sm:w-14 shrink-0"
                aria-hidden="true"
              >
                <div className="absolute right-0 top-0 bottom-0 w-px bg-neutral-800" />
                {BARS.map(({ id, displayPrice, heightPct, isWinner }) => (
                  <div
                    key={id}
                    className="absolute right-2 flex items-center"
                    style={{
                      bottom: `${heightPct}%`,
                      transform: "translateY(50%)",
                    }}
                  >
                    <span
                      className={`text-md tabular-nums tracking-tighter whitespace-nowrap ${
                        isWinner
                          ? "text-green-500 font-bold"
                          : "text-neutral-600"
                      }`}
                    >
                      {displayPrice}
                    </span>
                    <div
                      className={`h-px w-1.5 ml-1 ${
                        isWinner ? "bg-green-500/60" : "bg-neutral-700"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Bars area */}
              <div className="relative flex-1 flex items-end justify-around gap-2 sm:gap-4">
                {/* Background grid lines */}
                <div
                  className="pointer-events-none absolute inset-0 flex flex-col justify-between"
                  aria-hidden="true"
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-px w-full bg-neutral-800/60" />
                  ))}
                </div>

                {/* Dashed reference lines at bar heights */}
                {BARS.map(({ id, heightPct, isWinner }) => (
                  <div
                    key={`ref-${id}`}
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-0 right-0 h-0 border-t border-dashed ${
                      isWinner ? "border-green-500/35" : "border-neutral-700/50"
                    }`}
                    style={{ bottom: `${heightPct}%` }}
                  />
                ))}

                {/* Bars */}
                {BARS.map(
                  ({ id, heightPct, bg, Icon, iconColor, isWinner, delay }) => {
                    const barH = (CHART_HEIGHT * heightPct) / 100;
                    return (
                      <div
                        key={id}
                        className="relative flex-1 min-w-0"
                        style={{ height: `${heightPct}%` }}
                      >
                        {/* Glow sits outside the clipped wrapper so blur can spread */}
                        {isWinner && (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-t-full bg-green-400 blur-3xl opacity-30"
                          />
                        )}
                        {/* clipPath only on the bar itself, not the glow */}
                        <div
                          className="absolute inset-0"
                          style={{ clipPath: "inset(0 0 0 0)" }}
                        >
                          <motion.div
                            initial={{ y: barH }}
                            animate={{ y: chartInView ? 0 : barH }}
                            transition={{ duration: 1.1, delay, ease: "easeOut" }}
                            className={`absolute inset-0 ${bg}`}
                            style={{
                              borderTopLeftRadius: "9999px",
                              borderTopRightRadius: "9999px",
                            }}
                          >
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: chartInView ? 1 : 0 }}
                              transition={{ duration: 0.4, delay: delay + 0.75 }}
                              className="absolute left-1/2 top-3 sm:top-4 -translate-x-1/2"
                            >
                              <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-sm">
                                <Icon
                                  className={`h-4 w-4 sm:h-6 sm:w-6 ${iconColor}`}
                                  aria-hidden="true"
                                />
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            {/* Labels + price below bars — spacer matches Y-axis */}
            <div className="flex  mt-5">
              <div className="w-10 sm:w-14 shrink-0" aria-hidden="true" />
              {BARS.map(({ id, displayPrice, isWinner }) => (
                <div key={id} className="flex-1 min-w-0 text-center">
                  <p
                    className={`text-xs sm:text-sm font-medium leading-tight ${
                      isWinner ? "text-green-400" : "text-neutral-400"
                    }`}
                  >
                    {t(`items.${id}.title`)}
                  </p>
                  <p className="text-[9px] sm:text-xs text-neutral-600 mt-0.5">
                    {t(`items.${id}.subtitle`)}
                  </p>
                  <p
                    className={`mt-2 text-lg sm:text-2xl font-thin tracking-tighter ${
                      isWinner ? "text-green-400" : "text-neutral-400"
                    }`}
                  >
                    {displayPrice}
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
