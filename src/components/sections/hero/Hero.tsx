"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function Hero({ id }: { id?: string }) {
  const t = useTranslations("HomePage.HeroIntro");

  return (
    <section
      id={id}
      className="
        relative isolate
        h-screen w-full
        overflow-hidden
        hidden md:block
        bg-neutral-950
        px-16 2xl:px-0
      "
    >
      {/* -------------------------------- IMAGE -------------------------------- */}
      <div className="absolute inset-0 flex justify-center">
        <div className="relative h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/banners/rayforce-charging.avif"
            alt="Cargador EV Rayforce"
            className="
              h-full
              w-auto
              max-w-none
              object-contain
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
              via-neutral-950/55
              to-transparent
            "
          />

          {/* Extra left contrast */}
          <div
            className="
              absolute inset-y-0 left-0
              w-[38%]
              bg-gradient-to-r
              from-neutral-950
      
            "
          />

          {/* Right vignette */}
          <div
            className="
              absolute inset-y-0 right-0
              w-[12%]
              bg-gradient-to-l
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
          h-full
          max-w-[1440px]
          mx-auto
          px-8 sm:px-0
        "
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={waterfallList}
          className="
            h-full
            max-w-5xl
            flex flex-col
            justify-end
            pb-24
          "
        >
          {/* Eyebrow */}
          {/* <motion.span
            variants={waterfallItem}
            className="
              mb-6
              text-sm
              tracking-[0.35em]
              uppercase
              text-green-400
            "
          >
            Carga inteligente para Uruguay
          </motion.span> */}

          {/* Title */}
          <motion.h1
            variants={waterfallItem}
            className="
              text-5xl
              lg:text-6xl
              2xl:text-7xl
              leading-[1.2]
              max-w-[18ch]
              font-light

              bg-gradient-to-b
              from-gray-50
              via-neutral-50
              to-stone-50
             
              pb-2
              bg-clip-text
              text-transparent
            "
          >
            {t("title")}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={waterfallItem}
            className="
              mt-8
              text-xl
              text-neutral-300
              leading-relaxed
              max-w-[50ch]
              
            "
          >
            {t("description")}
          </motion.p>

          {/* Feature strip */}
          <motion.div
            variants={waterfallItem}
            className="
              mt-10
              w-full
            "
          >
            {/* Desktop */}
            <div
              className="
                hidden md:flex
                items-center
                gap-8 lg:gap-10
                text-sm
              "
            >
              <div className="max-w-[220px]">
                <div className="text-green-400 font-medium">Más seguro</div>

                <div className="mt-1 text-neutral-400 text- leading-relaxed">
                  Protecciones avanzadas para tu vehículo y tu hogar
                </div>
              </div>

              <div className="w-px h-10 bg-neutral-800 shrink-0" />

              <div className="max-w-[220px]">
                <div className="text-green-400 font-medium">Más ahorro</div>

                <div className="mt-1 text-neutral-400 text- leading-relaxed">
                  Cargá tu EV por mucho menos que un auto a combustible
                </div>
              </div>

              <div className="w-px h-10 bg-neutral-800 shrink-0" />

              <div className="max-w-[220px]">
                <div className="text-green-400 font-medium">Más práctico</div>

                <div className="mt-1 text-neutral-400 text- leading-relaxed">
                  Controlá y programá la carga desde tu celular
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div
              className="
                md:hidden
                flex flex-col
                gap-3
              "
            >
              <div
                className="
                  rounded-2xl
                  border border-neutral-800
                  bg-neutral-950/70
                  backdrop-blur-sm
                  px-4 py-4
                "
              >
                <div className="text-green-400 font-medium">Más seguro</div>

                <div className="mt-1 text-sm text-neutral-400 text- leading-relaxed">
                  Protecciones avanzadas para tu vehículo y tu hogar
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  border border-neutral-800
                  bg-neutral-950/70
                  backdrop-blur-sm
                  px-4 py-4
                "
              >
                <div className="text-green-400 font-medium">Más ahorro</div>

                <div className="mt-1 text-sm text-neutral-400 text- leading-relaxed">
                  Cargá tu EV por mucho menos que un auto a combustible
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  border border-neutral-800
                  bg-neutral-950/70
                  backdrop-blur-sm
                  px-4 py-4
                "
              >
                <div className="text-green-400 font-medium">Más práctico</div>

                <div className="mt-1 text-sm text-neutral-400 text- leading-relaxed">
                  Controlá y programá la carga desde tu celular
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={waterfallItem}
            className="
              flex gap-4
              mt-12
            "
          >
            <Button
              asChild
              className="
                px-8 py-6
                bg-green-500
                hover:bg-green-400
                text-black
              "
            >
              <Link href="/cargadores">{t("ctaPrimary")}</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="
                px-8 py-6
                border-neutral-700
                bg-black/20
                backdrop-blur-sm
                hover:bg-white/5
              "
            >
              <Link href="/beneficios">{t("ctaTertiary")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
