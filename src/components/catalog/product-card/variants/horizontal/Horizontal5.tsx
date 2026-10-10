"use client";

import { useTranslations } from "next-intl";

import { Chevron, Divider, Photo, Price, Title } from "../../parts";
import type { VariantProps } from "../../types";

/**
 * La `horizontal-3` con mas datos, para desktop: misma foto al ras, pero en
 * vez de un solo bullet lleva la lista de caracteristicas. La de mobile es
 * flaca a proposito (ahorra scroll); aca sobra lugar para contar mas.
 */
export function Horizontal5(props: VariantProps) {
  const { href, title, features = [], theme } = props;
  const t = useTranslations("Common.ProductCard");

  return (
    <>
      {/* En % del ancho y no fijo: la card cambia bastante entre `xl` y 2xl.
          15px = el `rounded-2xl` de la card menos su borde. */}
      <Photo
        {...props}
        className="w-[34%] rounded-l-[15px] border-r"
        size={320}
        zoom="scale-125"
      />

      <div className="flex min-w-0 flex-1 flex-col p-6">
        <Title {...props} className="text-base tracking-tight" />

        {/* `flex-1`: el sobrante va abajo de la lista, asi en una fila de la
            grilla los precios caen a la misma altura. */}
        <ul
          className="mt-4 mb-5 flex flex-1 list-none flex-col gap-2 text-sm text-neutral-400"
          aria-label={t("highlightsLabel", { title })}
        >
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span
                className={`mt-[0.4375rem] size-1 shrink-0 rounded-full ${theme.accentBg}`}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <Divider {...props} neutral="bg-neutral-700" />

        <div className="flex items-center justify-between gap-3 pt-4">
          <Price {...props} className="text-2xl tracking-tight" tax="below" />
          {href && <Chevron theme={theme} />}
        </div>
      </div>
    </>
  );
}
