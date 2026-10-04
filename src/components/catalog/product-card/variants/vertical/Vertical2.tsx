"use client";

import { AccentText, Divider, MoreInfo, Photo, Price } from "../../parts";
import type { VariantProps } from "../../types";

/**
 * La card grande de desktop: plancha de foto alta, titulo, potencia en
 * grande, parrafo, lista de caracteristicas y precio con "Más información".
 * Pensada para grillas de 4 columnas.
 */
export function Vertical2(props: VariantProps) {
  const {
    href,
    title,
    fullTitle,
    titleAccent,
    description,
    features = [],
    theme,
    gradient,
  } = props;

  return (
    <>
      {/* 480px es la plancha de desktop; en una tarjeta de ~300px de ancho esa
          altura deja el producto flotando, asi que en mobile baja a 320. */}
      <Photo
        {...props}
        className="h-[320px] w-full sm:h-[480px]"
        size={500}
        // Multiplica la escala del catalogo, como en las otras variantes: un
        // `scale-110` fijo la pisaba. Sin zoom en hover, a pedido del cliente.
        zoom="scale-[calc(var(--product-image-scale,1)*1.1)]"
        ribbon="right-4 top-4"
      >
        {/* Halo detras del producto: `backdrop-blur` no hace nada sobre el
            gradiente plano, asi que la luz se pinta. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_65%)] blur-2xl"
        />
      </Photo>

      <div className="flex w-full flex-1 flex-col border-t border-t-white/10 p-5">
        {/* `min-h`: los titulos ocupan 2 o 3 lineas segun el modelo, y sin
            esto los kW arrancan a distinta altura en cada card. */}
        <h3 className="text-sm font-medium leading-snug tracking-tight text-neutral-100 lg:min-h-[3.25rem]">
          {fullTitle ?? title}
        </h3>

        {titleAccent && (
          <AccentText
            theme={theme}
            gradient={gradient}
            className="text-4xl font-thin tracking-tight"
          >
            {titleAccent}
          </AccentText>
        )}

        {/* `min-h`, misma razon: la lista arranca a la misma altura. */}
        {description && (
          <p className="mt-2 mb-2 text-xs leading-relaxed text-neutral-400 lg:min-h-[3.75rem]">
            {description}
          </p>
        )}

        {features.length > 0 && (
          <>
            <Divider {...props} />
            <ul
              className="flex list-none flex-col gap-2 py-6 text-left text-sm text-neutral-400"
              aria-label={`${fullTitle ?? title} highlights`}
            >
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 first:text-neutral-200!"
                >
                  <span
                    className={`mt-[0.4375rem] size-1 shrink-0 rounded-full ${theme.accentBg}`}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </>
        )}

        <Divider {...props} className="mt-auto" />
        <div className="flex items-center justify-between gap-4 pt-3">
          <Price
            {...props}
            className="text-2xl font-thin tracking-tighter"
            tax="hidden"
          />
          {href && <MoreInfo theme={theme} className="whitespace-nowrap" />}
        </div>
      </div>
    </>
  );
}
