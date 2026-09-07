"use client";

import { useState } from "react";
import { AnimateNumber } from "motion-plus/react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useTranslations } from "next-intl";

/**
 * Índice de precios base 100 (2016) para nafta súper (ANCAP) y
 * tarifa residencial simple UTE (escalón 101-600 kWh).
 *
 * Fuentes:
 * - ANCAP, histórico de precios de combustibles (nafta súper 95).
 * - UTE, pliego tarifario residencial simple.
 *
 * Los valores absolutos por año viven en RAW_* y el índice se calcula
 * al vuelo, así se puede actualizar un año sin recalcular a mano.
 */
const YEARS = [
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
] as const;

/** Nafta súper 95, pesos por litro (ANCAP). */
const RAW_NAFTA = [
  43.9, 45.9, 50.4, 54.95, 56.6, 65.81, 74.3, 76.5, 77.54, 78.54, 88.67,
];

/** Tarifa residencial simple UTE, escalón 101-600 kWh, pesos por kWh. */
const RAW_UTE = [
  5.517, 5.79, 6.06, 6.3, 6.51, 6.71, 7.24, 7.958, 8.16, 8.28, 8.45,
];

const toIndex = (series: number[]) =>
  series.map((value) => (value / series[0]) * 100);

const NAFTA_INDEX = toIndex(RAW_NAFTA);
const UTE_INDEX = toIndex(RAW_UTE);

/* ── Geometría del SVG ──────────────────────────────────── */
const VIEW_W = 1000;
const VIEW_H = 380;
const PAD_L = 52;
const PAD_R = 24;
const PAD_T = 28;
const PAD_B = 44;

const PLOT_W = VIEW_W - PAD_L - PAD_R;
const PLOT_H = VIEW_H - PAD_T - PAD_B;

/** Techo del eje Y en puntos de índice, con aire sobre el máximo. */
const Y_MAX = 220;

const xFor = (i: number) => PAD_L + (i / (YEARS.length - 1)) * PLOT_W;
const yFor = (value: number) =>
  PAD_T + PLOT_H - ((value - 100) / (Y_MAX - 100)) * PLOT_H;

const buildPath = (series: number[]) =>
  series
    .map((value, i) => `${i === 0 ? "M" : "L"} ${xFor(i)},${yFor(value)}`)
    .join(" ");

const NAFTA_PATH = buildPath(NAFTA_INDEX);
const UTE_PATH = buildPath(UTE_INDEX);

const closeArea = (path: string) =>
  `${path} L ${xFor(YEARS.length - 1)},${PAD_T + PLOT_H} L ${PAD_L},${PAD_T + PLOT_H} Z`;

const NAFTA_AREA = closeArea(NAFTA_PATH);
const UTE_AREA = closeArea(UTE_PATH);

const NAFTA_COLOR = "#f87171"; // red-400
const UTE_COLOR = "#4ade80"; // green-400

const GRID_VALUES = [100, 130, 160, 190, 220];

const DRAW_DURATION = 1.8;

/* ── Bubbles de hover ───────────────────────────────────── */
const BUBBLE_W = 116;
const BUBBLE_H = 30;
/** Distancia entre el punto y el borde del bubble. */
const BUBBLE_GAP = 14;

type Series = "nafta" | "ute";

export function EnergyPriceTrendChart() {
  const t = useTranslations("HomePage.EnergyTrend");
  const [hovered, setHovered] = useState<number | null>(null);
  const [inView, setInView] = useState(false);

  const endHover = () => setHovered(null);

  return (
    <div className="flex flex-col" onPointerLeave={endHover}>
      {/* ── Leyenda ───────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap items-start justify-center gap-x-14 gap-y-6">
        {(
          [
            { key: "nafta", color: NAFTA_COLOR },
            { key: "ute", color: UTE_COLOR },
          ] as { key: Series; color: string }[]
        ).map(({ key, color }) => (
          <div key={key} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-1 w-7 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span
                className="text-sm font-medium tracking-tight sm:text-base"
                style={{ color }}
              >
                {t(`series.${key}.label`)}
              </span>
            </div>
            <span
              className="text-3xl font-light tracking-tighter tabular-nums sm:text-4xl"
              style={{ color }}
            >
              {t(`series.${key}.delta`)}
            </span>
            <span className="text-[11px] tracking-wide text-neutral-500 uppercase">
              {t(`series.${key}.deltaNote`)}
            </span>
          </div>
        ))}
      </div>

      <motion.svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={t("chartAriaLabel")}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onViewportEnter={() => setInView(true)}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
      >
        <defs>
          <linearGradient id="naftaArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={NAFTA_COLOR} stopOpacity="0.22" />
            <stop offset="100%" stopColor={NAFTA_COLOR} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="uteArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={UTE_COLOR} stopOpacity="0.28" />
            <stop offset="100%" stopColor={UTE_COLOR} stopOpacity="0" />
          </linearGradient>
          {/* Halo suave para destacar la línea de UTE por delante */}
          <filter id="uteGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grilla + eje Y */}
        {GRID_VALUES.map((value) => (
          <g key={value}>
            <line
              x1={PAD_L}
              y1={yFor(value)}
              x2={VIEW_W - PAD_R}
              y2={yFor(value)}
              stroke="#262626"
              strokeWidth="1"
              strokeDasharray="4,6"
            />
            <text
              x={PAD_L - 10}
              y={yFor(value)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-neutral-600 text-[10px] tabular-nums"
            >
              {value}
            </text>
          </g>
        ))}

        {/* Eje X: todos los años, el activo se resalta */}
        {YEARS.map((year, i) => (
          <text
            key={year}
            x={xFor(i)}
            y={VIEW_H - PAD_B + 26}
            textAnchor="middle"
            className={`text-[12px] tabular-nums transition-colors ${
              hovered === i ? "fill-neutral-200" : "fill-neutral-500"
            }`}
          >
            {year}
          </text>
        ))}

        {/* ── Nafta: al fondo ─────────────────────────────── */}
        <motion.path
          d={NAFTA_AREA}
          fill="url(#naftaArea)"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: DRAW_DURATION * 0.7 }}
        />

        <motion.path
          d={NAFTA_PATH}
          fill="none"
          stroke={NAFTA_COLOR}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: DRAW_DURATION, ease: "easeInOut" }}
        />

        {/* ── UTE: por delante, con glow ──────────────────── */}
        <motion.path
          d={UTE_AREA}
          fill="url(#uteArea)"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: DRAW_DURATION * 0.7 }}
        />

        <motion.path
          d={UTE_PATH}
          fill="none"
          stroke={UTE_COLOR}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#uteGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: DRAW_DURATION, ease: "easeInOut" }}
        />

        {/* Puntos + zonas de hover por año */}
        <motion.g
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                delayChildren: 0.2,
                staggerChildren: DRAW_DURATION / YEARS.length,
              },
            },
          }}
        >
          {YEARS.map((year, i) => {
            const isActive = hovered === i;
            const halfSlot = PLOT_W / (YEARS.length - 1) / 2;
            return (
              <g key={year}>
                <rect
                  x={xFor(i) - halfSlot}
                  y={0}
                  width={halfSlot * 2}
                  height={VIEW_H}
                  fill="transparent"
                  className="cursor-pointer"
                  onPointerEnter={() => setHovered(i)}
                />

                {isActive && (
                  <line
                    x1={xFor(i)}
                    y1={PAD_T}
                    x2={xFor(i)}
                    y2={PAD_T + PLOT_H}
                    stroke="#525252"
                    strokeWidth="1"
                  />
                )}

                <motion.circle
                  cx={xFor(i)}
                  cy={yFor(NAFTA_INDEX[i])}
                  r="4"
                  fill="#0a0a0a"
                  stroke={NAFTA_COLOR}
                  strokeWidth="1.5"
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                  animate={{ scale: isActive ? 1.6 : 1 }}
                />

                <motion.circle
                  cx={xFor(i)}
                  cy={yFor(UTE_INDEX[i])}
                  r="4"
                  fill="#0a0a0a"
                  stroke={UTE_COLOR}
                  strokeWidth="1.5"
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                  animate={{ scale: isActive ? 1.6 : 1 }}
                />
              </g>
            );
          })}
        </motion.g>

        {/* ── Bubbles: uno por serie, anclados a su punto ──── */}
        <AnimatePresence>
          {hovered !== null &&
            (
              [
                {
                  key: "nafta",
                  index: NAFTA_INDEX,
                  raw: RAW_NAFTA,
                  color: NAFTA_COLOR,
                },
                { key: "ute", index: UTE_INDEX, raw: RAW_UTE, color: UTE_COLOR },
              ] as const
            ).map(({ key, index, raw, color }) => {
              // Variación año contra año.
              const yoy =
                hovered > 0
                  ? ((raw[hovered] - raw[hovered - 1]) / raw[hovered - 1]) * 100
                  : 0;

              const cx = xFor(hovered);
              const cy = yFor(index[hovered]);

              // La nafta va arriba de su punto y UTE abajo, así los dos
              // bubbles nunca se pisan aunque las líneas se crucen.
              const above = key === "nafta";
              const bubbleY = above
                ? cy - BUBBLE_GAP - BUBBLE_H
                : cy + BUBBLE_GAP;

              // Cerca de los bordes el bubble se corre hacia adentro.
              const half = BUBBLE_W / 2;
              const bubbleX =
                Math.min(Math.max(cx, PAD_L + half), VIEW_W - PAD_R - half) -
                half;

              return (
                <motion.foreignObject
                  key={key}
                  x={bubbleX}
                  y={bubbleY}
                  width={BUBBLE_W}
                  height={BUBBLE_H}
                  className="overflow-visible"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: "spring",
                    visualDuration: 0.35,
                    bounce: 0.3,
                  }}
                >
                  <MotionConfig
                    transition={{
                      type: "spring",
                      visualDuration: 0.6,
                      bounce: 0.2,
                    }}
                  >
                    <div
                      className="flex h-full items-center justify-center gap-1.5 rounded-full border bg-neutral-950/95 px-3 will-change-transform"
                      style={{ borderColor: `${color}59` }}
                    >
                      <span className="text-[11px] font-medium text-neutral-400">
                        {t(`series.${key}.short`)}
                      </span>

                      <motion.span
                        initial={{ rotate: yoy < 0 ? 180 : 0 }}
                        animate={{ rotate: yoy < 0 ? 180 : 0 }}
                        className="text-sm leading-none font-bold"
                        style={{ color }}
                      >
                        ↑
                      </motion.span>

                      <AnimateNumber
                        className="text-sm font-semibold tabular-nums"
                        style={{ color }}
                        suffix="%"
                        format={{ maximumFractionDigits: 1 }}
                      >
                        {yoy}
                      </AnimateNumber>
                    </div>
                  </MotionConfig>
                </motion.foreignObject>
              );
            })}
        </AnimatePresence>
      </motion.svg>

      <p className="mt-5 text-center text-xs leading-relaxed text-neutral-500">
        {t("axisNote")}
      </p>
    </div>
  );
}
