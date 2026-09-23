"use client";

import { useTranslations } from "next-intl";
import { Zap, Plug, Clock, type LucideIcon } from "lucide-react";

import { CardCarousel } from "@/components/shared/carousel/CardCarousel";
import { CarouselCard } from "@/components/shared/carousel/CarouselCard";
import { ChargerCompactCard } from "@/components/catalog/ChargerCompactCard";
import { getChargerProducts } from "@/lib/catalog/catalog.helpers";
import { HomeLineupHelpCta } from "./HomeLineupHelpCta";

const GUIDE_ICONS: LucideIcon[] = [Zap, Plug, Clock];

/**
 * Version mobile del lineup: header apilado, la grilla de productos en
 * 2 columnas con la tarjeta chica del header (`ChargerCompactCard`), y los
 * tres tips de la guia en carousel — a un tercio de ancho no entran en fila
 * como en desktop.
 */
export function HomeLineupMobile() {
  const t = useTranslations("HomePage.Lineup");
  const guideItems = t.raw("guide.items") as {
    title: string;
    description: string;
  }[];
  const products = getChargerProducts();

  return (
    /* `pb` mas bajo que el `pt` por la misma razon que en desktop: abajo
        cierra el CTA centrado. */
    <div className="flex flex-col px-6 pt-20 pb-14">
      <span className="text-[10px] uppercase tracking-[0.3em] text-green-400">
        {t("eyebrow")}
      </span>

      <h2
        id="home-lineup-heading"
        className="mt-4 max-w-2xl text-3xl leading-[1.1] font-light tracking-tight text-balance text-white"
      >
        {t("title")}
      </h2>

      <p className="mt-5 text-sm leading-relaxed text-neutral-400">
        {t("description")}
      </p>

      {/* GUIA RAPIDA — carousel en vez de la fila de 3 de desktop. */}
      <div className="-mx-6 mt-10">
        <CardCarousel
          items={guideItems.map((item, index) => (
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
      </div>

      {/* NUESTROS MODELOS — 2 columnas con la card chica del header. */}
      <div className="mt-10">
        <h3 className="text-2xl font-light normal-case tracking-tight text-white">
          {t("gridTitle")}
        </h3>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ChargerCompactCard key={product.slug} product={product} />
          ))}
        </div>
      </div>

      {/* Un escalon mas que el `mt-10` entre bloques: el CTA cierra la seccion
          y tiene que despegarse de la grilla. */}
      <HomeLineupHelpCta className="mt-14" />
    </div>
  );
}
