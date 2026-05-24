"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { useTrack } from "@/lib/analytics";

export function HomeHeroMobile({ id }: { id?: string }) {
  const t = useTranslations("HomePage.Hero");
  const track = useTrack();

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
          src="/assets/images/banners/rayforce-charging.avif"
          alt="Rayforce EV Charger"
          fetchPriority="high"
          decoding="sync"
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

          {/* Title — plain element, no animation: LCP target must paint immediately */}
          <h1
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
          </h1>

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
            className="mt-8 flex flex-col gap-3"
          >
            <Button
              asChild
              className="h-14 rounded-2xl px-8 bg-green-700 hover:bg-green-600 text-white"
            >
              <Link href="/cargadores" onClick={() => track.homeHeroPrimary("mobile")}>
                {t("ctaPrimary")}
              </Link>
            </Button>

            <Button
              asChild
              className="h-14 rounded-2xl px-8 bg-neutral-950 hover:bg-neutral-900 text-white border border-white/10"
            >
              <Link href="/#compatibilidad" onClick={() => track.homeHeroSecondary("mobile")}>
                {t("ctaSecondary")}
              </Link>
            </Button>

            <Button
              asChild
              className="h-14 rounded-2xl px-8 bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              <Link href="/#contacto" onClick={() => track.homeHeroQuote("mobile")}>
                {t("ctaTertiary")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
