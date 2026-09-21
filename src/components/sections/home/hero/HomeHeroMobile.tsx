"use client";

import { motion } from "motion/react";
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/rayforce-hero-2.webp"
          alt="Rayforce EV Charger"
          fetchPriority="high"
          decoding="sync"
          className="
            h-full
            w-full
            object-cover
            object-[37%_center]
            scale-x-[-1]
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
          {/* Mismo gradiente que el desktop para que el título se lea igual en los dos */}
          <h1
            className="
              text-4xl
              md:text-6xl
              leading-[1.2]
              md:leading-[1.4]
              tracking-tight
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
          {/*
            neutral-200 + text-shadow, igual que el desktop: sobre foto el gris
            medio no se lee, y la sombra le da un borde propio para que no
            dependa de qué píxel quedó debajo.
          */}
          <motion.p
            variants={waterfallItem}
            className="
              mt-6
              text-sm
              leading-relaxed
              text-neutral-200
              [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]
            "
          >
            {t("description")}
          </motion.p>

          {/*
            Las señales de confianza NO van acá: viven en HomeHeroTrustBand,
            apenas debajo del hero. Dentro del fold ocupaban ~328px apiladas
            (4 filas de 3 líneas) y empujaban los CTA fuera de pantalla en un
            SE; en 2×2 entraban pero dejaban los títulos en dos líneas y muy
            apretados. Abajo tienen el ancho completo y no compiten con el CTA.
          */}

          {/*
            CTA — mismo tratamiento que el desktop: el primario es un gradiente
            neutral oscuro con el texto verde (sólido, no traslúcido: sobre foto
            el fondo cambia píxel a píxel y el botón pierde jerarquía), y el
            secundario es ghost. Lo que separa uno de otro es el color del
            texto, no la forma.

            Se mantiene el formato mobile —full width, apilados, h-14— porque
            acá el target táctil manda.
          */}
          <motion.div
            variants={waterfallItem}
            className="mt-8 flex flex-col gap-3"
          >
            <Button
              asChild
              className="
                h-14 rounded-2xl px-8
                border border-green-400/30
                bg-gradient-to-b from-neutral-800 to-neutral-900
                text-green-400
                hover:from-neutral-700 hover:to-neutral-800
                hover:text-green-300
                shadow-lg shadow-black/30
              "
            >
              <Link
                href="/cargadores"
                onClick={() => track.homeHeroPrimary("mobile")}
              >
                {t("ctaPrimary")}
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="
                h-14 rounded-2xl px-8
                border border-transparent
                text-neutral-200
                hover:bg-gradient-to-b hover:from-neutral-800 hover:to-neutral-900
                hover:text-white
                [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]
              "
            >
              <Link
                href="/empresas"
                onClick={() => track.homeHeroEmpresas("mobile")}
              >
                {t("ctaSecondary")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
