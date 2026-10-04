"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatPowerKw } from "@/lib/catalog/catalog.helpers";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";
import { HeroPrice } from "./HeroPrice";

type Props = {
  product: ChargerProduct;
  /** El total de lo elegido, no el precio de lista. */
  price: number;
  from?: boolean;
};

/** Titulo, precio y descripcion: el orden estandar de una ficha. */
export function HeroIntro({ product, price, from }: Props) {
  const t = useTranslations("ChargerModelPage");
  const locale = useLocale();
  const { theme } = product;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl leading-tight font-semibold tracking-tight text-balance text-white lg:text-4xl">
        {t.rich("Hero.title", {
          tier: product.tier,
          phase: product.specs.phaseType,
          cable: product.specs.cableType,
          power: formatPowerKw(product.specs.maxPowerKw, locale),
          accent: (chunks) => (
            <span className={theme.accentText}>{chunks}</span>
          ),
          l: (chunks) => <span className="block">{chunks}</span>,
        })}
      </h1>

      <HeroPrice product={product} price={price} from={from} />

      {/* Copy propio y del mismo largo en los cuatro modelos, mas las lineas
          reservadas: cambiar de potencia no mueve nada. */}
      <p className="max-w-xl min-h-[6.5rem] text-base leading-relaxed text-neutral-400 lg:min-h-[3.25rem]">
        {t(`Hero.descriptions.${product.slug}`)}
      </p>
    </div>
  );
}
