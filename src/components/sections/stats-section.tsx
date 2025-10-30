"use client";

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
      className="bg-muted py-10 sm:py-22 bg-gradient-to-bl from-neutral-800 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl "
    >
      <h2 id="stats-heading" className="sr-only">
        {t("title")}
      </h2>

      <div className="mx-auto px-2 sm:px-8">
        <ul
          className="grid grid-cols-2 lg:divide-x divide-zinc-600 sm:gap-x-12 gap-y-10 sm:grid-cols-4 text-center"
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
              <div className="text-4xl sm:text-5xl font-semibold text-neutral-50 flex justify-center items-center sm:items-start pointer-events-none">
                {stat.value}
                {stat.suffix && (
                  <span className="ml-0.5 text-2xl sm:text-3xl text-muted-foreground">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-xs mt-0.5 sm:text-sm font-medium text-muted-foreground">
                {t(stat.key)}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
