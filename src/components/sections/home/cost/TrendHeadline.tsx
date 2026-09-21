"use client";

import { useState } from "react";
import { AnimateNumber } from "motion-plus/react";
import { motion, MotionConfig } from "motion/react";
import { useTranslations } from "next-intl";

import {
  NAFTA_COLOR,
  NAFTA_PRICES,
  UTE_COLOR,
  UTE_PRICES,
  totalChange,
} from "./energy-price-data";

const BLOCKS = [
  { key: "nafta", data: NAFTA_PRICES, color: NAFTA_COLOR, delay: 0 },
  { key: "ute", data: UTE_PRICES, color: UTE_COLOR, delay: 0.12 },
] as const;

/**
 * Variante: el argumento en dos números grandes, sin gráfica.
 * El porcentaje sale del dataset, así no se desincroniza de las líneas.
 */
export function TrendHeadline() {
  const t = useTranslations("HomePage.EnergyTrend.headline");

  /* Los números arrancan en 0 y cuentan al entrar en pantalla: el
     conteo ES el dato acá, no un adorno. */
  const [started, setStarted] = useState(false);

  return (
    <MotionConfig
      transition={{ type: "spring", visualDuration: 1.2, bounce: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        onViewportEnter={() => setStarted(true)}
        transition={{ duration: 0.6 }}
        className="mt-14 sm:mt-16"
      >
        <p className="mb-10 text-center text-xl font-light tracking-tight text-balance text-white sm:text-3xl lg:text-4xl">
          {t("kicker")}
        </p>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
          {BLOCKS.map(({ key, data, color, delay }) => {
            const change = totalChange([...data]);

            return (
              /* El bloque se encoge al ancho del número (`w-fit`) y se
                 centra en su mitad, así el texto de abajo nunca lo
                 estira más allá del dígito más grande. */
              <div
                key={key}
                className="mx-auto flex w-fit max-w-full flex-col items-center text-center"
              >
                <span
                  className="text-sm font-medium tracking-tight sm:text-base"
                  style={{ color }}
                >
                  {t(`${key}.label`)}
                </span>

                <AnimateNumber
                  initial={{ color }}
                  animate={{ color }}
                  className="mt-2 text-7xl font-light tracking-tighter tabular-nums sm:text-8xl lg:text-9xl"
                  format={{ maximumFractionDigits: 0 }}
                  suffix="%"
                  transition={{
                    type: "spring",
                    visualDuration: 1.4,
                    bounce: 0,
                    delay,
                  }}
                >
                  {started ? change : 0}
                </AnimateNumber>

                <p className="mt-4 text-sm leading-relaxed text-pretty text-neutral-400">
                  {t(`${key}.note`)}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-pretty text-neutral-300">
          {t("closing")}
        </p>
      </motion.div>
    </MotionConfig>
  );
}
