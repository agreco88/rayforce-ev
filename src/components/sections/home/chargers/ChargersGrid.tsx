"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { ChargersCardGrid } from "./ChargersCardGrid";

export function ChargersGrid({ id }: { id?: string }) {
  const t = useTranslations("HomePage.HomeChargersSection");

  return (
    <section
      id={id}
      aria-labelledby="chargers-grid-heading"
      className="border-t border-neutral-900 bg-neutral-950 py-20"
    >
      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center"
      >
        <motion.span
          variants={waterfallItem}
          className="text-xs uppercase tracking-widest text-green-400 sm:text-sm"
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h2
          id="chargers-grid-heading"
          variants={waterfallItem}
          className="mt-4 text-pretty"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={waterfallItem}
          className="mt-4 max-w-[48ch] text-sm leading-relaxed text-neutral-400 sm:text-base"
        >
          {t("description")}
        </motion.p>
      </motion.div>

      {/* Desde `sm`: la grilla de siempre, sin tocar.

          Debajo de `sm` el `grid-cols-4` no tenia breakpoint, asi que las
          cuatro tarjetas entraban lado a lado en ~52px cada una — con su
          plancha de foto, titulo, precio y lista de 5 items adentro.

          El carousel es scroll nativo con snap (`snap-x snap-mandatory`), el
          mismo patron que ya usaba `ChargersCarousel` en esta carpeta: sin JS,
          sin dependencias y con la inercia nativa de iOS. La tarjeta es la
          misma `ChargersCardGrid` — cambia el contenedor, no el contenido, asi
          que no hay una segunda implementacion de la tarjeta que mantener. */}
      <ChargersCardGrid className="mx-auto mt-12 hidden max-w-[1600px] gap-6 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4" />

      {/* `w-[85%]`: la tarjeta siguiente se asoma, que es lo que avisa que hay
          mas para arrastrar. `pb-2` deja aire para la sombra del hover.
          `scroll-px-4` alinea el snap con el `px-4` del track. */}
      <ChargersCardGrid
        className="
          mt-12 flex snap-x snap-mandatory gap-4
          overflow-x-auto scroll-px-4 px-4 pb-2
          sm:hidden
          [scrollbar-width:none]
          [&>*]:w-[85%] [&>*]:shrink-0 [&>*]:snap-start
          [&::-webkit-scrollbar]:hidden
        "
      />
    </section>
  );
}
