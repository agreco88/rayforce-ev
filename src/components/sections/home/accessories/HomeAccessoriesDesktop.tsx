"use client";

import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/catalog/product-card/ProductCard";
import { useAccessoryCards } from "@/components/catalog/product-card/adapters/useAccessoryCards";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";

/** Foto vertical (2:3): alguien cargando en un tótem público de UTE. */
const PHOTO_SRC = "/assets/images/cables/man-charging-ute.jpg";

export function HomeAccessoriesDesktop() {
  const t = useTranslations("HomePage.Accessories");
  const accessories = useAccessoryCards();

  return (
    <div className="relative isolate flex justify-center overflow-hidden">
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 30%, rgba(251,191,36,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Padding afuera del `max-w`, como el header: 1440 limpios de contenido. */}
      <div className="relative z-10 flex w-full justify-center px-8 py-28 xl:py-32">
        {/* 1fr/2fr: la foto es un retrato y aguanta angosta; el ancho se lo
            llevan las cards. `items-stretch`: la foto toma el alto de la
            columna de la derecha en vez de imponer el suyo. */}
        <div className="grid w-full max-w-[1440px] grid-cols-[1fr_2fr] items-stretch gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTO_SRC}
            alt={t("imageAlt")}
            width={1004}
            height={1506}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-2xl border border-white/10 object-cover"
          />

          <div className="flex flex-col">
            <span className="text-xs tracking-[0.25em] uppercase text-amber-400">
              {t("eyebrow")}
            </span>

            <h2 className="m-0 mt-5 text-5xl leading-[1.1] font-light tracking-tight">
              {t("title")}
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
              {t("description")}
            </p>

            {/* Los cuatro accesorios en 2x2, con la card de desktop: la de
                mobile (`horizontal-3`) aca quedaba chica. `gap-6` y no menos:
                el badge del destacado sobresale del borde de arriba. En `lg`
                van de a una: a 2x2 la lista no entra. */}
            <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2">
              {accessories.map((card) => (
                <ProductCard key={card.id} {...card} variant="horizontal-5" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
