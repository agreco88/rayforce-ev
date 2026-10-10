"use client";

import { useTranslations } from "next-intl";

import { CardCarousel } from "@/components/shared/carousel/CardCarousel";
import { CarouselCard } from "@/components/shared/carousel/CarouselCard";
import { GUIDE_ICONS } from "./LineupGuideCards";

/**
 * Los 3 consejos de `LineupGuideCards` en carousel, para mobile en la home y
 * /cargadores. Sin margenes: quien lo monta lo pone a sangre con `-mx-*`.
 */
export function LineupGuideCarousel() {
  const t = useTranslations("HomePage.Lineup.guide");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <CardCarousel
      items={items.map((item, index) => (
        <CarouselCard
          key={item.title}
          card={{
            key: item.title,
            icon: GUIDE_ICONS[index],
            title: `${index + 1}. ${item.title}`,
            description: item.description,
          }}
        />
      ))}
    />
  );
}
