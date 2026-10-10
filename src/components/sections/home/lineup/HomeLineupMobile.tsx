"use client";

import { useTranslations } from "next-intl";

import { ProductCollection } from "@/components/catalog/product-card/ProductCollection";
import { useChargerCardData } from "@/components/catalog/product-card/adapters/useChargerCardData";
import { getChargerProducts } from "@/lib/catalog/catalog.helpers";
import { LineupGuideCarousel } from "./LineupGuideCarousel";

/**
 * Version mobile del lineup: header apilado, los modelos en filas
 * (`ProductCollection` en `horizontal-3`) y despues los tres consejos en
 * carousel — a un tercio de ancho no entran en fila como en desktop.
 */
export function HomeLineupMobile() {
  const t = useTranslations("HomePage.Lineup");
  const toCard = useChargerCardData();

  return (
    /* Mismo gutter que el resto de las secciones y `mt-14` entre bloques, como
       la columna en mobile. El `pb` es el aire hasta el bloque de UTE. */
    <div className="flex flex-col px-6 pt-14 pb-14 sm:px-8 sm:pt-20 sm:pb-16">
      <span className="text-[12px] sm:text-sm uppercase tracking-[0.3em] text-green-400">
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

      {/* NUESTROS MODELOS — una fila por modelo: se comparan mejor en columna
          que en una grilla de 2 a medio ancho. */}
      <ProductCollection
        items={getChargerProducts().map(toCard)}
        variant="horizontal-3"
        className="mt-14"
      />

      {/* CONSEJOS — carousel en vez de la fila de 3 de desktop. */}
      <div className="mt-14">
        <h3 className="text-2xl font-light normal-case tracking-tight text-white">
          {t("guide.title")}
        </h3>

        {/* El `-mx` cancela el gutter: a sangre asoma la tarjeta siguiente. */}
        <div className="-mx-6 mt-8 sm:-mx-8">
          <LineupGuideCarousel />
        </div>
      </div>
    </div>
  );
}
