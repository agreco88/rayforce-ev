"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

function Feature({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="
        flex flex-col
        rounded-2xl
        border border-white/10
        bg-black/30
        backdrop-blur-md

        px-3 py-3
      "
    >
      <span
        className="
          text-[11px]
          font-semibold
          tracking-wide
          text-green-400
        "
      >
        {title}
      </span>

      <span
        className="
          mt-1
          text-[11px]
          text-neutral-400
        "
      >
        {subtitle}
      </span>
    </div>
  );
}

export function HomeHeroMobile({ id }: { id?: string }) {
  const t = useTranslations("HomePage.Hero");

  return (
    <section
      id={id}
      className="
        relative isolate
        min-h-screen
        overflow-hidden
        bg-neutral-950

      "
    >
      {/* ---------------- IMAGE ---------------- */}
      <div className="absolute inset-0">
        <img
          src="/images/banners/rayforce-charging.png"
          alt="Rayforce EV Charger"
          className="
            h-full
            w-full
            object-cover
            object-[63%_center]
          "
        />

        {/* Main cinematic overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black
            via-black/55
            to-black/10
          "
        />

        {/* Bottom fade */}
        <div
          className="
            absolute inset-x-0 bottom-0
            h-56
            bg-gradient-to-t
            from-neutral-950
            via-neutral-950/90
            to-transparent
          "
        />

        {/* Left vignette */}
        <div
          className="
            absolute inset-y-0 left-0
            w-24
            bg-gradient-to-r
            from-black/60
            to-transparent
          "
        />
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div
        className="
          relative z-10

          min-h-screen

          flex flex-col
          justify-end

          px-6
          pb-10
        "
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={waterfallList}
          className="
            w-full
            flex flex-col
          "
        >
          {/* Eyebrow */}
          {/* <motion.span
            variants={waterfallItem}
            className="
              mb-4

              text-[11px]
              tracking-[0.32em]
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
              text-4xl
              md:text-6xl
              leading-[1.2]
              md:leading-[1.4]
              tracking-tight
              font-light
          
            "
          >
            {t("title")}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={waterfallItem}
            className="
              mt-6
              md:my-6
              h-[2lh]
              md:text-xl!
              leading-relaxed md:leading-snug
              text-neutral-300
            "
          >
            {t("description")}
          </motion.p>

          {/* Features */}
          {/* <motion.div
            variants={waterfallItem}
            className="
              mt-8
              grid grid-cols-2
              gap-1
            "
          >
            <Feature title="Ahorra" subtitle="Hasta 90% por km" />
            <Feature title="Garantia" subtitle="2 años" />{" "}
            <Feature title="Garantia" subtitle="2 años" />{" "}
            <Feature title="Garantia" subtitle="2 años" />
          </motion.div> */}

          {/* CTA */}
          <motion.div
            variants={waterfallItem}
            className="
              mt-8

              flex flex-col
              gap-3
            "
          >
            <Button
              asChild
              className="
                h-14
                rounded-2xl

                bg-green-500
                hover:bg-green-400

                text-black
                font-medium
              "
            >
              <Link href="/cargadores">{t("ctaPrimary")}</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="
                h-14
                rounded-2xl

                border-white/10
                bg-black/20
                backdrop-blur-md

                hover:bg-white/5
              "
            >
              <Link href="/#compatibilidad">{t("ctaTertiary")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
