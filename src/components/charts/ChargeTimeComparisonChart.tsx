"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";

type Bar = {
  key: string;
  powerKw: number;
  emphasis?: boolean;
};

const BARS: Bar[] = [
  { key: "cable", powerKw: 2.3 },
  { key: "wallbox", powerKw: 22, emphasis: true },
];

const MAX_POWER_KW = 22;

/**
 * Progress de potencia de carga (cable vs wallbox) + tabla comparativa
 * de protección eléctrica y uso diario, todo en la misma card. Grafica
 * kW en vez de horas: así más lleno = más potencia = más rápido = mejor.
 * Con horas la barra del wallbox (más rápido) quedaba casi vacía y se
 * leía como "peor", justo al revés de lo que dice la copy. Patrón
 * "emphasis" (verde = wallbox, gris = schuko) en vez de categórico,
 * porque la historia es "el wallbox gana", no "opciones pares".
 */
export function ChargeTimeComparisonChart() {
  const t = useTranslations("HomePage.WallboxIntro.whatIsIt.chart");

  return (
    <div className="w-full rounded-2xl border border-neutral-900 bg-neutral-900/20 p-6 sm:p-8">
      <span className="text-xs tracking-widest text-neutral-500 uppercase">
        {t("title")}
      </span>

      <div className="mt-6 flex flex-col gap-6">
        {BARS.map((bar, i) => {
          const widthPct = (bar.powerKw / MAX_POWER_KW) * 100;
          return (
            <div key={bar.key} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={
                    bar.emphasis
                      ? "text-sm font-medium text-white"
                      : "text-sm text-neutral-400"
                  }
                >
                  {t(`items.${bar.key}.label`)}
                </span>
                <span
                  className={
                    bar.emphasis
                      ? "text-sm font-semibold tabular-nums text-green-400"
                      : "text-sm tabular-nums text-neutral-400"
                  }
                >
                  {t(`items.${bar.key}.value`)}
                </span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-800/60">
                <motion.div
                  className={
                    bar.emphasis
                      ? "h-full rounded-full bg-green-400"
                      : "h-full rounded-full bg-neutral-600"
                  }
                  initial={{ width: 0 }}
                  whileInView={{ width: `${widthPct}%` }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.15 * i, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabla comparativa: protección eléctrica + uso diario */}
      <div className="mt-8 border-t border-neutral-900 pt-6">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 pb-4">
          <span />
          <span className="w-20 text-center text-xs font-medium text-neutral-400">
            {t("columns.schuko")}
          </span>
          <span className="w-20 text-center text-xs font-medium text-green-400">
            {t("columns.wallbox")}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-t border-neutral-900 py-4">
          <span className="pr-2 text-sm text-neutral-300">
            {t("rows.protection.label")}
          </span>
          <span className="flex w-20 justify-center">
            <X className="size-5 text-neutral-600" strokeWidth={2.5} />
          </span>
          <span className="flex w-20 justify-center">
            <Check className="size-5 text-green-400" strokeWidth={2.5} />
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-t border-neutral-900 py-4">
          <span className="pr-2 text-sm text-neutral-300">
            {t("rows.dailyUse.label")}
          </span>
          <span className="flex w-20 justify-center">
            <X className="size-5 text-neutral-600" strokeWidth={2.5} />
          </span>
          <span className="flex w-20 justify-center">
            <Check className="size-5 text-green-400" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}
