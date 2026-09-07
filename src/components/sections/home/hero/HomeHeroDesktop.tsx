"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import { AppButton } from "@/components/ui/wrappers/AppButton";
import { DotExpandBadge } from "@/components/ui/wrappers/DotExpandBadge";
import { HomeHeroFeatureStrip } from "./HomeHeroFeatureStrip";
import { useTrack } from "@/lib/analytics";

/**
 * Variante del badge del hero. Cambiar este valor para comparar cuál funciona
 * mejor: "bamibel" (respaldo de ingeniería), "ursea" (autorización nominal)
 * o "product" (anuncio de producto residencial).
 */
type HeroBadgeVariant = "bamibel" | "ursea" | "product";

const HERO_BADGE: HeroBadgeVariant = "bamibel";

const BADGE_HREF: Record<HeroBadgeVariant, string> = {
  bamibel: "/empresas",
  ursea: "/empresas",
  product: "/cargadores/bs20-bc-11kw",
};

export function HomeHeroDesktop({ id }: { id?: string }) {
  const t = useTranslations("HomePage.Hero");
  const track = useTrack();

  return (
    <section
      id={id}
      className="
        relative isolate
        w-full
        overflow-hidden
        bg-neutral-950
      "
    >
      {/* -------------------------------- IMAGE -------------------------------- */}
      <div className="absolute inset-0 flex justify-end">
        <div className="relative h-full w-full lg:w-[70%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/banners/rayforce-charging.avif"
            alt="Cargador EV Rayforce"
            fetchPriority="high"
            decoding="sync"
            className="
              h-full
              w-full
              object-cover
              object-center
              select-none
              pointer-events-none
            "
          />

          {/* Main cinematic fade */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-neutral-950
              via-neutral-950/80
              to-neutral-950/30
            "
          />

          {/* Extra left contrast */}
          <div
            className="
              absolute inset-y-0 left-0
              w-1/2
              bg-gradient-to-r
              from-neutral-950
              to-transparent
            "
          />

          {/* Bottom fade */}
          <div
            className="
              absolute inset-x-0 bottom-0
              h-40
              bg-gradient-to-t
              from-neutral-950
              to-transparent
            "
          />
        </div>
      </div>

      {/* -------------------------------- CONTENT -------------------------------- */}
      <div
        className="
          relative z-10
          w-full
          max-w-[1440px]
          mx-auto
          px-6 sm:px-8
          lg:px-16 2xl:px-0
          pt-40 pb-24
          lg:pt-56 lg:pb-32
        "
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={waterfallList}
          className="
            max-w-3xl
            flex flex-col
            gap-8
          "
        >
          {/* Eyebrow — announcement badge */}
          <motion.div variants={waterfallItem}>
            <DotExpandBadge
              href={BADGE_HREF[HERO_BADGE]}
              tag={t(`badge.${HERO_BADGE}.tag`)}
              onClick={() => track.homeHeroBadge("desktop")}
            >
              {t(`badge.${HERO_BADGE}.label`)}
            </DotExpandBadge>
          </motion.div>

          {/* Title — plain element, no animation: LCP target must paint immediately */}
          <h1
            className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              leading-[1.15]
              max-w-[20ch]
              font-light

              bg-gradient-to-b
              from-gray-50
              via-neutral-50
              to-stone-50

              bg-clip-text
              text-transparent
            "
          >
            {t("title")}
          </h1>

          {/* Description */}
          <motion.p
            variants={waterfallItem}
            className="
              text-md
              text-neutral-400
              leading-relaxed
              max-w-[60ch]
            "
          >
            {t("description")}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={waterfallItem}
            className="mt-2 flex flex-wrap gap-4"
          >
            <AppButton
              href="/cargadores"
              icon={<ArrowRight className="size-4" />}
              className="border-green-400/40 bg-green-400/5"
              track={() => track.homeHeroPrimary("desktop")}
            >
              {t("ctaPrimary")}
            </AppButton>

            <AppButton
              href="/empresas"
              className="border-white/15 text-neutral-200 hover:text-white"
              track={() => track.homeHeroEmpresas("desktop")}
            >
              {t("ctaSecondary")}
            </AppButton>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={waterfallItem} className="mt-6 w-full max-w-3xl">
            <HomeHeroFeatureStrip />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
