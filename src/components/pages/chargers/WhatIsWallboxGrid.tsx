"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { ChargeSpeedStatCard } from "@/components/charts/ChargeSpeedStatCard";
import { cardItem } from "@/lib/animation-variants";

import { WALLBOX_CARDS } from "./whatIsWallboxCards";

const SOCKET_TYPE_2_SRC = "/images/icons/socket-type-2.svg";

/**
 * Grilla 2x2 de tarjetas, de `sm` para arriba (abajo de eso va el carousel).
 * El corte es el mismo `sm` (640px) en el que `ChargeSpeedStatCard` invierte su
 * layout interno, asi el cambio de estructura y el de la tarjeta ocurren en el
 * mismo punto y no hay una franja intermedia rara.
 *
 * El stagger lo dispara la seccion: las tarjetas y el CTA son items de la misma
 * cascada, por eso aca no hay `whileInView` propio.
 */
export function WhatIsWallboxGrid() {
  const tCards = useTranslations("HomePage.WallboxIntro.whyBetter.cards");

  return (
    <motion.div className="hidden grid-cols-1 items-stretch gap-6 sm:grid lg:grid-cols-2 lg:gap-8">
      {WALLBOX_CARDS.map((card) => (
        <motion.div
          key={card.key}
          variants={cardItem}
          /* `min-h` para que las cuatro respiren parejo aunque el copy sea mas
             corto en unas que en otras; la tarjeta reparte su contenido dentro
             de esa altura. */
          className="flex lg:min-h-[15rem]"
        >
          <ChargeSpeedStatCard
            variant="compact"
            headline={tCards(`${card.key}.headline`)}
            footnote={tCards(`${card.key}.footnote`)}
            visual={card.visual}
            icon={"icon" in card ? card.icon : undefined}
            maskSrc={card.visual === "mask" ? SOCKET_TYPE_2_SRC : undefined}
            maskAlt={card.visual === "mask" ? tCards("socketAlt") : undefined}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
