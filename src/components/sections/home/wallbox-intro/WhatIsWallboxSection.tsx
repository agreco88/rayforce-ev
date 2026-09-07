"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  BadgeCheck,
  Gauge,
  RefreshCw,
  ShieldCheck,
  Timer,
  Zap,
} from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { HomeCostSection } from "@/components/sections/home/cost/HomeCostSection";
import { EnergyTrendSection } from "@/components/sections/home/cost/EnergyTrendSection";

const THEME = {
  accentText: "text-green-400",
};

export function WhatIsWallboxSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.WallboxIntro");

  const whatIsItems = [
    { icon: Zap, key: "fastCharging" },
    { icon: Timer, key: "vsCable" },
    { icon: BadgeCheck, key: "ursea" },
  ] as const;

  const whyBetterItems = [
    { icon: ShieldCheck, key: "protection" },
    { icon: RefreshCw, key: "app" },
    { icon: Gauge, key: "power" },
  ] as const;

  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950"
    >
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-24 px-6 py-24 sm:px-8 lg:gap-32 lg:px-16 lg:py-32 2xl:px-0">
        {/* ------------------------------------------------------------ */}
        {/* Block 1 — Qué es un wallbox (copy left, visual right)         */}
        {/* ------------------------------------------------------------ */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={waterfallList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="order-1 flex flex-col"
          >
            <motion.span
              variants={waterfallItem}
              className={cn("text-xs tracking-[0.35em]", THEME.accentText)}
            >
              {t("whatIsIt.eyebrow")}
            </motion.span>

            <motion.h2
              variants={waterfallItem}
              className="mt-5 max-w-2xl text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
            >
              {t("whatIsIt.title")}
            </motion.h2>

            <motion.p
              variants={waterfallItem}
              className="mt-6 max-w-2xl leading-relaxed text-neutral-400"
            >
              {t("whatIsIt.description")}
            </motion.p>

            <motion.ul variants={waterfallList} className="mt-10 flex max-w-md flex-col">
              {whatIsItems.map(({ icon: Icon, key }) => (
                <motion.li
                  key={key}
                  variants={waterfallItem}
                  className="flex gap-5 border-b border-neutral-900 py-6 first:pt-0 last:border-b-0"
                >
                  <div className="mt-0.5 shrink-0 rounded-xl bg-green-400/10 p-2.5">
                    <Icon className="size-5 text-green-400" strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-medium tracking-tight text-white">
                      {t(`whatIsIt.items.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                      {t(`whatIsIt.items.${key}.description`)}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="order-2 flex justify-center"
          >
            <div className="relative aspect-square w-full max-w-md">
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(34,197,94,0.2), transparent 70%)" }}
                aria-hidden="true"
              />
              <Image
                src="/assets/images/chargers/BS20-22KW.png"
                alt={t("whatIsIt.imageAlt")}
                fill
                className="relative object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Block 2 — Por qué mejor (visual left, copy right)             */}
        {/* ------------------------------------------------------------ */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="order-2 flex justify-center lg:order-1"
          >
            <div className="relative aspect-square w-full max-w-md">
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(34,197,94,0.2), transparent 70%)" }}
                aria-hidden="true"
              />
              <Image
                src="/assets/images/chargers/BS20-7KW.png"
                alt={t("whyBetter.imageAlt")}
                fill
                className="relative object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            variants={waterfallList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="order-1 flex flex-col lg:order-2"
          >
            <motion.span
              variants={waterfallItem}
              className={cn("text-xs tracking-[0.35em]", THEME.accentText)}
            >
              {t("whyBetter.eyebrow")}
            </motion.span>

            <motion.h2
              variants={waterfallItem}
              className="mt-5 max-w-2xl text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
            >
              {t("whyBetter.title")}
            </motion.h2>

            <motion.p
              variants={waterfallItem}
              className="mt-6 max-w-2xl leading-relaxed text-neutral-400"
            >
              {t("whyBetter.description")}
            </motion.p>

            <motion.ul variants={waterfallList} className="mt-10 flex max-w-md flex-col">
              {whyBetterItems.map(({ icon: Icon, key }) => (
                <motion.li
                  key={key}
                  variants={waterfallItem}
                  className="flex gap-5 border-b border-neutral-900 py-6 first:pt-0 last:border-b-0"
                >
                  <div className="mt-0.5 shrink-0 rounded-xl bg-green-400/10 p-2.5">
                    <Icon className="size-5 text-green-400" strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-medium tracking-tight text-white">
                      {t(`whyBetter.items.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                      {t(`whyBetter.items.${key}.description`)}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Block 3 — Ahorro vs. nafta (reused cost chart)                */}
        {/* ------------------------------------------------------------ */}
        <HomeCostSection theme={THEME} />

        {/* ------------------------------------------------------------ */}
        {/* Block 4 — Evolución de precios: nafta vs. electricidad        */}
        {/* ------------------------------------------------------------ */}
        <EnergyTrendSection id="tendencia-precios" />
      </div>
    </section>
  );
}
