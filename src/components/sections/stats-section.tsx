"use client";

import { AnimateNumber } from "motion-plus/react";
import { fadeIn } from "@/lib/animation-variants";
import { stats } from "@/lib/stats-data";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("HomePage.stats");

  return (
    <motion.section
      variants={fadeIn(0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      aria-labelledby="stats-heading"
      className="bg-muted py-8 sm:py-24 shadow-inner/7 bg-gradient-to-tr from-neutral-200 to-neutral-50 border border-gray-200 rounded-xl via-neutral-100"
    >
      <h2 id="stats-heading" className="sr-only">
        {t("title")}
      </h2>

      <div className="mx-auto max-w-6xl px-2 sm:px-8">
        <ul
          className="grid grid-cols-2 lg:divide-x divide-neutral-300 sm:gap-x-12 gap-y-10 sm:grid-cols-4 text-center"
          role="list"
          aria-describedby="stats-heading"
        >
          {stats.map((stat, i) => (
            <motion.li
              key={stat.key}
              variants={fadeIn((i + 1.25) * 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              aria-label={`${t(stat.key)}: ${stat.value}${stat.suffix ?? ""}`}
              className="flex flex-col"
            >
              <div
                className="text-4xl sm:text-5xl font-semibold text-neutral-700 flex justify-center items-center sm:items-start pointer-events-none"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimateNumber
                  format={{ notation: "compact" }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                    mass: 0.4,
                  }}
                >
                  {stat.value}
                </AnimateNumber>
                {stat.suffix && (
                  <span className="ml-1 text-2xl sm:text-3xl text-muted-foreground">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                {t(stat.key)}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
