"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { GradientText } from "@/components/animated/GradientText";
import { Link } from "@/i18n/navigation";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import {
  getChargerProducts,
  getPowerLabel,
} from "@/lib/catalog/catalog.helpers";
import {
  ProductHighlightRibbon,
  getHighlightBorderStyle,
} from "@/components/catalog/ProductHighlightRibbon";

type Props = {
  className?: string;
  /** Slug a dejar afuera — la pagina de modelo no se lista a si misma. */
  excludeSlug?: string;
};

/** Product card grid shared by the home section and the /cargadores route. */
export function ChargersCardGrid({ className, excludeSlug }: Props) {
  const t = useTranslations("HomePage.HomeChargersSection");
  const tSpecs = useTranslations("Common.Specs");
  const locale = useLocale();
  const products = getChargerProducts().filter(
    (product) => product.slug !== excludeSlug,
  );

  return (
    <motion.div
      variants={waterfallList}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={
        className ?? "mx-auto grid max-w-[1600px] grid-cols-4 gap-6 px-4"
      }
    >
      {products.map((product) => {
        const highlights = [
          product.specs.cableType === "socket"
            ? tSpecs("cable.socket")
            : tSpecs("cable.integrated"),
          product.specs.phaseType === "single"
            ? tSpecs("phase.single")
            : tSpecs("phase.three"),
          tSpecs("connector.type2"),
          product.specs.voltage,
          tSpecs(`tier.${product.tier}`),
        ];

        // h-full on the wrapper so it stretches to the row, letting the card's
        // own h-full resolve — otherwise it shrinks to its content and the
        // highlighted card's ring/glow sits lower than its neighbours.
        return (
          <motion.div
            key={product.slug}
            variants={waterfallItem}
            className="h-full"
          >
            <Link
              href={`/cargadores/${product.slug}`}
              aria-label={`${t(`chargers.${product.slug}.title`)} ${getPowerLabel(product, locale)} — ${t("cta.moreInfo")}`}
              className={`
                group flex h-full flex-col items-start
                overflow-hidden rounded-2xl border border-white/10
                bg-neutral-950
                transition-colors duration-300
                ${product.theme.accentBorderHover}
              `}
              style={getHighlightBorderStyle(product)}
            >
              {/* ── Photo plate ─────────────────────────────────── */}
              {/* 480px es la plancha de desktop; en una tarjeta de ~300px de
                  ancho esa altura deja el producto flotando en un mar blanco,
                  asi que en mobile baja a 320. */}
              {/* El destacado va sobre blanco puro y el resto sobre
                  `neutral-100`: la plancha mas clara lo adelanta sin agregarle
                  otro adorno encima del riel y el borde de color. */}
              <div
                className={`relative flex h-[320px] w-full items-center justify-center overflow-hidden sm:h-[480px] ${
                  product.highlight ? "bg-white" : "bg-neutral-100"
                }`}
              >
                <ProductHighlightRibbon
                  product={product}
                  className="right-4 top-4"
                />

                <Image
                  src={product.cardImage}
                  alt=""
                  width={500}
                  height={500}
                  className="
                    relative h-full w-full scale-110 object-contain
                    transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    group-hover:scale-[1.15]
                  "
                />
              </div>

              {/* ── Body ────────────────────────────────────────── */}
              <div className="flex w-full flex-1 flex-col border-t border-t-neutral-800 px-6 pb-7 pt-6">
                <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                  {product.modelCode}
                </span>

                {/* `min-h` de tres lineas, misma razon que el blurb: los
                    titulos ocupan 2 o 3 lineas segun el modelo. */}
                <h3 className="mt-1.5 text-base font-semibold tracking-tight text-white">
                  {t(`chargers.${product.slug}.title`)}
                </h3>

                <GradientText
                  colors={product.theme.gradientColors}
                  className="mt-3 text-4xl font-thin tracking-tight"
                >
                  {getPowerLabel(product, locale)}
                </GradientText>

                {/* `min-h`: a cuatro columnas cada blurb ocupa distinta
                    cantidad de lineas y sin esto la lista de bullets arranca a
                    distinta altura en cada tarjeta. En la franja angosta el mas
                    largo necesita 4 lineas; de `2xl` para arriba, 3. */}
                <p className="mt-3 text-sm leading-relaxed text-neutral-400 xl:min-h-[5.7rem] 2xl:min-h-[4.275rem]">
                  {t(`chargers.${product.slug}.blurb`)}
                </p>

                <ul
                  className="flex list-none flex-col gap-2 border-t border-neutral-800 py-6 text-left text-sm text-neutral-400"
                  aria-label={`${t(`chargers.${product.slug}.title`)} highlights`}
                >
                  {highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 first:text-neutral-200!"
                    >
                      <span
                        className={`mt-[0.4375rem] size-1 shrink-0 rounded-full ${product.theme.accentBg}`}
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                {/* Precio y CTA apilados: a cuatro columnas los dos en una
                    fila no entran en la tarjeta — el precio se partia en
                    "USD" / "597" y la flecha quedaba cortada contra el borde. */}
                <div className="mt-auto flex flex-col items-start gap-3 border-t border-neutral-800 pt-6">
                  <span
                    className={`text-3xl font-thin tracking-tighter whitespace-nowrap ${product.theme.accentText}`}
                  >
                    USD {product.price.amount}
                  </span>

                  <span
                    className={`
                      inline-flex items-center gap-2 whitespace-nowrap
                      text-sm font-medium
                      transition-all duration-300
                      ${product.theme.accentText}
                    `}
                    aria-hidden="true"
                  >
                    {t("cta.moreInfo")}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
