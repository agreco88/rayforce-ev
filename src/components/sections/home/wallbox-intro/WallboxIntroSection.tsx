"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { ChargeSpeedStatCard } from "@/components/charts/ChargeSpeedStatCard";
import { WallboxComparisonTable } from "@/components/charts/WallboxComparisonTable";
import { HomeBenefitCard } from "@/components/sections/home/benefits/HomeBenefitCard";
import { WallboxGalleryCarousel } from "@/components/sections/home/wallbox-intro/WallboxGalleryCarousel";
import { StatCycleStack } from "@/components/charts/StatCycleStack";
import {
  WallboxCycleVisual,
  type CycleVisual,
} from "@/components/sections/home/wallbox-intro/WallboxCycleVisual";
import { BENEFITS } from "@/components/sections/BenefitsSection/benefits.data";

const THEME = {
  accentText: "text-green-400",
};

/**
 * Las tarjetas de "que es un wallbox". El anillo animado 0->100 se reserva para
 * el item de velocidad, que es el unico donde el contador significa algo; el
 * resto usa un icono o el logo del organismo que respalda la afirmacion.
 */
const WHAT_IS_ITEMS = [
  { key: "fastCharging", visual: "ring" },
  {
    key: "vsCable",
    visual: "icon",
    icon: ShieldCheck,
    iconLabel: "IP66",
  },
  {
    key: "ursea",
    visual: "logo",
    logoSrc: "/images/partners/logo-ursea.webp",
  },
  { key: "cheaperThanPublic", visual: "icon", icon: Wallet },
  { key: "safest", visual: "icon", icon: ShieldCheck },
] as const;

/**
 * La imagen que acompanha a cada stat del ciclo, en el mismo orden que
 * WHAT_IS_ITEMS. Placeholder con las fotos que ya viven en /public hasta que
 * lleguen las definitivas.
 */
const CYCLE_VISUALS: readonly CycleVisual[] = [
  {
    src: "/assets/images/chargers/BS20-22KW.png",
    alt: "Cargador Rayforce BS20 de 22 kW",
  },
  {
    src: "/assets/images/chargers/7w-with-cable.png",
    alt: "Cargador Rayforce de 7 kW con cable Tipo 2",
  },
  {
    src: "/images/partners/logo-ursea.webp",
    alt: "Logo de URSEA",
  },
  {
    src: "/assets/images/banners/home-charging.png",
    alt: "Auto electrico cargando en un garage con un wallbox Rayforce",
  },
  {
    src: "/assets/images/chargers/BS20-7KW.png",
    alt: "Cargador Rayforce BS20 de 7 kW",
  },
];

/**
 * Explicacion de wallbox + beneficios, fusionadas en una sola seccion.
 *
 * Antes eran tres cosas separadas: una teaser en la home que en vez de explicar
 * linkeaba a /cargadores, el explainer real viviendo solo en /cargadores, y los
 * beneficios sueltos al final de la home. Aca se unen en la secuencia que
 * corresponde: que es -> por que es mejor -> que gano yo.
 *
 * Los dos primeros bloques son los mismos de `WhatIsWallboxSection`, que sigue
 * montada en /cargadores; el tercero es la composicion propia de la home.
 */
export function WallboxIntroSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.WallboxIntro");
  const tBenefits = useTranslations("HomePage.HomeBenefitsSection");

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
        {/* Bloque 1 - Que es un wallbox (copy izquierda, stats derecha)  */}
        {/* ------------------------------------------------------------ */}

        {/* ------------------------------------------------------------ */}
        {/* Bloque 1b - Los mismos stats, ciclando solos                  */}
        {/* Reusa las claves de `whatIsIt.items`: el anillo de cada card  */}
        {/* es el cronometro, y al completarse pasa a la siguiente        */}
        {/* mientras la imagen de la derecha acompanha.                   */}
        {/* ------------------------------------------------------------ */}
        <StatCycleStack
          items={WHAT_IS_ITEMS.map((item) => ({
            id: item.key,
            title: t(`whatIsIt.items.${item.key}.title`),
            description: t(`whatIsIt.items.${item.key}.description`),
          }))}
          aside={(activeIndex) => (
            <WallboxCycleVisual
              visuals={CYCLE_VISUALS}
              activeIndex={activeIndex}
            />
          )}
        />

        {/* ------------------------------------------------------------ */}
        {/* Bloque 2 - Por que mejor (visual izquierda, copy derecha)     */}
        {/* ------------------------------------------------------------ */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="order-2 flex flex-col gap-6 lg:order-1"
          >
            <WallboxComparisonTable />
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
          </motion.div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Bloque 3 - Beneficios (cierre)                                */}
        {/* El id vive aca: el nav del footer sigue apuntando a           */}
        {/* #beneficios, que antes era una seccion propia al final.       */}
        {/* ------------------------------------------------------------ */}
        <div id="beneficios" className="scroll-mt-24">
          <motion.div
            variants={waterfallList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center text-center"
          >
            <motion.span
              variants={waterfallItem}
              className={cn("text-xs tracking-[0.35em]", THEME.accentText)}
            >
              {tBenefits("eyebrow")}
            </motion.span>

            <motion.h2
              variants={waterfallItem}
              className="mt-5 max-w-3xl text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
            >
              {tBenefits("title")}
            </motion.h2>

            <motion.p
              variants={waterfallItem}
              className="mt-6 max-w-2xl leading-relaxed text-neutral-400"
            >
              {tBenefits("description")}
            </motion.p>
          </motion.div>

          <motion.div
            variants={waterfallList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {BENEFITS.map(({ key, icon }) => (
              <motion.div key={key} variants={waterfallItem}>
                <HomeBenefitCard
                  icon={icon}
                  title={tBenefits(`items.${key}.title`)}
                  description={tBenefits(`items.${key}.description`)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Con la grilla de cargadores fuera de la home, estos CTAs son de
              las pocas entradas al catalogo desde el cuerpo de la pagina. */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/cargadores"
              className="inline-flex items-center gap-2 rounded-xl bg-green-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors duration-200 hover:bg-green-300"
            >
              {tBenefits("cta.primary")}
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>

            <Link
              href="/#compatibilidad"
              className="inline-flex items-center rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:border-white/30 hover:text-white"
            >
              {tBenefits("cta.secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
