"use client";

import { useTranslations } from "next-intl";

import { Chevron, Divider, Photo, Price, SpecList, Title } from "../../parts";
import type { VariantProps } from "../../types";

/**
 * Foto y titulo con bullets arriba; abajo, a todo el ancho, precio grande y
 * "Ver más info". Mas aire que la 1 y la 3, pero ocupa mas alto.
 */
export function Horizontal2(props: VariantProps) {
  const { href, specs = [], theme, highlight } = props;
  const t = useTranslations("Common.ProductCard");

  return (
    <>
      <div className="flex gap-6">
        {/* Estira al alto del texto, asi termina justo arriba del divider. */}
        <Photo
          {...props}
          className="w-30 min-h-28 self-stretch rounded-lg border"
        />

        {/* El destacado arranca mas abajo: la mitad del badge cae adentro de
            la card, justo sobre el titulo. */}
        <div
          className={`flex min-w-0 flex-1 flex-col ${highlight ? "pt-2" : "py-1.5"}`}
        >
          <Title {...props} />
          <SpecList {...props} specs={specs} />
        </div>
      </div>

      <Divider {...props} className="mt-4" />

      {/* Todo sobre la linea base del precio: "IVA inc." y "Ver más info" son
          mas chicos y centrados quedaban flotando arriba. El CTA toma su base
          del texto (primer hijo), y el chevron se centra contra ese texto. */}
      <div className="flex items-baseline justify-between gap-4 pt-4">
        <Price {...props} className="text-2xl tracking-tight" />

        {href && (
          <span
            className={`inline-flex items-center gap-2 text-xs font-medium ${theme.accentText}`}
          >
            <span>{t("cta")}</span>
            <Chevron theme={theme} />
          </span>
        )}
      </div>
    </>
  );
}
