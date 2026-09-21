"use client";

import { AnimateNumber } from "motion-plus/react";
import { motion, MotionConfig } from "motion/react";
import { ArrowUp } from "lucide-react";

/**
 * Panel comparativo: los dos precios del año con hover, lado a lado,
 * con la variación acumulada de cada serie desde el primer año.
 */
export function PriceComparison({
  year,
  label,
  series,
  summary,
  prefix = "",
}: {
  year: number;
  /** Encabezado fijo, ej. "Variación desde 2016". */
  label?: string;
  series: {
    key: string;
    label: string;
    value: number;
    /** Variación acumulada contra el primer año, en %. */
    change: number;
    color: string;
    unit?: string;
  }[];
  /** Frase de cierre, ej. "mientras la nafta subió X, la luz subió Y". */
  summary?: string;
  prefix?: string;
}) {
  return (
    <MotionConfig
      transition={{ type: "spring", visualDuration: 0.6, bounce: 0.2 }}
    >
      <div className="rounded-2xl border border-neutral-900 bg-neutral-900/20 p-5 sm:p-6 lg:p-8">
        {/* El texto queda fijo, sólo tickea el año. */}
        <div className="mb-5 flex items-center gap-2 text-xs tracking-widest text-neutral-500 uppercase">
          {label ? <span>{label}</span> : null}
          <span className="text-neutral-700">·</span>
          <AnimateNumber
            className="tabular-nums text-neutral-300"
            format={{ useGrouping: false }}
          >
            {year}
          </AnimateNumber>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
          {series.map(({ key, label: seriesLabel, value, change, color, unit }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <span
                className="text-sm font-medium tracking-tight"
                style={{ color }}
              >
                {seriesLabel}
              </span>

              <div className="flex items-end gap-3">
                <AnimateNumber
                  initial={{ color }}
                  animate={{ color }}
                  className="text-4xl font-light tracking-tighter tabular-nums sm:text-5xl"
                  prefix={prefix}
                  format={{ maximumFractionDigits: 2 }}
                >
                  {value}
                </AnimateNumber>

                {/* Variación acumulada desde el primer año */}
                <div
                  className="flex items-center gap-0.5 pb-1.5"
                  style={{ color }}
                >
                  <motion.div
                    initial={{ rotate: change < 0 ? 180 : 0 }}
                    animate={{ rotate: change < 0 ? 180 : 0 }}
                    className="flex items-center"
                  >
                    <ArrowUp size={15} strokeWidth={2.5} />
                  </motion.div>
                  <AnimateNumber
                    className="text-sm font-semibold tabular-nums"
                    format={{ maximumFractionDigits: 0 }}
                    suffix="%"
                  >
                    {change}
                  </AnimateNumber>
                </div>
              </div>

              {unit ? (
                <span className="text-[11px] text-neutral-500">{unit}</span>
              ) : null}
            </div>
          ))}
        </div>

        {summary ? (
          <p className="mt-6 border-t border-neutral-900 pt-5 text-sm leading-relaxed text-pretty text-neutral-300">
            {summary}
          </p>
        ) : null}
      </div>
    </MotionConfig>
  );
}
