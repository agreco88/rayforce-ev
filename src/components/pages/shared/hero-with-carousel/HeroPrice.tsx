"use client";

import { AnimatePresence, motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import type { CatalogProduct, CatalogTheme } from "@/lib/catalog/catalog.types";
import { OptionInfo } from "./OptionInfo";

type Props = {
  /** Solo moneda y acento: la columna no es del catalogo y lo arma a mano. */
  product: Pick<CatalogProduct, "price"> & {
    theme: Pick<CatalogTheme, "accentText">;
  };
  price: number;
  /** Con instalacion el precio es un estimado: va con "Desde". */
  from?: boolean;
  /** El total de lo elegido, junto al boton, con "Total" arriba del numero. */
  total?: boolean;
};

/** El precio bajo el titulo, en una caja chica: acompaña, no compite. */
export function HeroPrice({ product, price, from, total }: Props) {
  const t = useTranslations("ChargerModelPage");
  const { theme } = product;
  const prefix = total
    ? t(from ? "price.totalFrom" : "price.total")
    : from && t("price.from");
  const label = `${prefix ? `${prefix} ` : ""}${product.price.currency} ${price} ${t("price.taxLabel")}`;

  const amount = (
    <>
      {/* La moneda va en el `format` y no en un span aparte: `AnimateNumber`
          arma su propia caja y el "USD" suelto quedaba mas arriba que el numero.
          Spring sin rebote: el digito se desliza y se asienta, sin sacudon. */}
      <AnimateNumber
        locales="en-US"
        format={{
          style: "currency",
          currency: product.price.currency,
          currencyDisplay: "code",
          maximumFractionDigits: 0,
        }}
        transition={{
          visualDuration: 0.5,
          type: "spring",
          bounce: 0,
          opacity: { duration: 0.25, ease: "easeOut" },
        }}
        className={`text-2xl font-medium tabular-nums sm:text-3xl ${theme.accentText}`}
        aria-hidden="true"
      >
        {price}
      </AnimateNumber>
      {/* Centrado se ve alto al lado del numero grande: lo bajamos a la misma
          base. A mano porque `items-baseline` no sirve con `AnimateNumber`
          (su mascara corre la base al borde de abajo). Medido: 6px a 30/14px;
          a 24px, a ojo. */}
      <span
        className="translate-y-1 text-sm text-neutral-400 sm:translate-y-[0.36rem]"
        aria-hidden="true"
      >
        {t("price.taxLabel")}
      </span>
    </>
  );

  if (total) {
    // "Total" arriba y no al costado: el "desde" lo alarga y asi no corre el numero.
    return (
      <div
        className="flex flex-col gap-2 sm:gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 sm:py-2"
        aria-label={label}
        role="group"
      >
        {/* El mismo fundido que la etiqueta del boton, que cambia a la vez. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={prefix || ""}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <span
              className="text-xs uppercase tracking-widest text-neutral-400"
              aria-hidden="true"
            >
              {prefix}
            </span>
            {/* Solo la aclaracion del estimado: el resto del tooltip de
                instalacion ya se leyo al elegirla. */}
            {from && (
              <OptionInfo
                label={t("price.estimateInfo")}
                description={t("Hero.installation.help")}
              />
            )}
          </motion.span>
        </AnimatePresence>
        <span className="flex items-center gap-3">{amount}</span>
      </div>
    );
  }

  return (
    <p className="flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2">
      {/* Lo visible va todo `aria-hidden`, y un `aria-label` en un <p> los
          lectores lo ignoran: el precio entero se lee de aca. */}
      <span className="sr-only">{label}</span>
      {/* Misma base que el IVA. */}
      {prefix && (
        <span
          className="translate-y-1 text-sm text-neutral-400 sm:translate-y-[0.36rem]"
          aria-hidden="true"
        >
          {prefix}
        </span>
      )}
      {amount}
    </p>
  );
}
