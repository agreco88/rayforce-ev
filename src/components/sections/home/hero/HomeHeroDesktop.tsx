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
      {/*
        La imagen sangra a ancho completo del viewport (inset-0 sin max-w), no
        al contenedor de 1440px: así no quedan barras de fondo a los costados en
        pantallas anchas. El contenido sí sigue dentro del contenedor, alineado
        al header.
      */}
      <div className="pointer-events-none absolute inset-0">
        <div className="relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/rayforce-hero-3.webp"
            alt="Cargador EV Rayforce"
            fetchPriority="high"
            decoding="sync"
            className="
              absolute inset-0
              h-full
              w-full
              object-cover
              object-center
              select-none
            "
          />

          {/*
            Fade 1 — contraste del contenido: black → transparent vía transparent.
            La parada intermedia transparente al 55% es la clave: mantiene el
            negro pegado a la izquierda y lo suelta rápido, en vez de velar el
            centro de la imagen como haría un gradiente parejo.
          */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-black from-0%
              via-transparent via-55%
              to-transparent
            "
          />

          {/* Fade 2 — viñeta: cierra el perímetro y concentra la atención */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(ellipse_80%_75%_at_50%_45%,transparent_30%,rgba(0,0,0,0.45)_75%,rgba(0,0,0,0.75)_100%)]
            "
          />
        </div>
      </div>

      {/* -------------------------------- CONTENT -------------------------------- */}
      {/*
        50/50: el contenido vive en la mitad izquierda y nunca invade la derecha,
        por más que crezca (está sobrepoblado adrede). La mitad derecha queda
        vacía — ahí se ve la imagen de fondo, que corre por debajo de ambas.
      */}
      <div
        className="
          relative z-10
          grid grid-cols-2
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
            col-start-1
            pr-10
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
              max-w-[52ch]
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

          {/* Trust signals — 2×2: en media columna los 4 en fila no entran */}
          <motion.div
            variants={waterfallItem}
            className="mt-6 w-full [&>ul]:lg:grid-cols-2 [&>ul]:2xl:grid-cols-4"
          >
            <HomeHeroFeatureStrip />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
