"use client";

import { useTranslations } from "next-intl";

import { CardCarousel } from "@/components/shared/carousel/CardCarousel";
import { CarouselCard } from "@/components/shared/carousel/CarouselCard";

import { WALLBOX_CARDS } from "./whatIsWallboxCards";

/** Las mismas cuatro tarjetas en carousel, abajo de `sm`. */
export function WhatIsWallboxMobileCards() {
  const tCards = useTranslations("HomePage.WallboxIntro.whyBetter.cards");

  return (
    /* El `-mx-6` cancela el padding lateral de la seccion: con `overflow` el
       carousel necesita el ancho completo del viewport para que la tarjeta
       siguiente se asome. */
    <div className="-mx-6 sm:hidden">
      <CardCarousel
        items={WALLBOX_CARDS.map((card) => (
          <CarouselCard
            key={card.key}
            card={{
              key: card.key,
              icon: card.mobileIcon,
              title: tCards(`${card.key}.headline`),
              description: tCards(`${card.key}.short`),
            }}
          />
        ))}
      />
    </div>
  );
}
