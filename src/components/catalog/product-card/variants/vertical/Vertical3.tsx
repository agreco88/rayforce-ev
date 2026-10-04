"use client";

import { AccentText, Divider, MoreInfo, Photo, Price } from "../../parts";
import type { VariantProps } from "../../types";

/**
 * Foto cuadrada arriba; titulo, potencia en grande, parrafo y precio con
 * "Más información". La `vertical-2` sin lista de caracteristicas, para
 * paneles (el flyout del header en pantallas anchas).
 */
export function Vertical3(props: VariantProps) {
  const {
    href,
    title,
    fullTitle,
    titleAccent,
    description,
    theme,
    gradient,
  } = props;

  return (
    <>
      <Photo
        {...props}
        className="aspect-square w-full rounded-lg"
        size={352}
        zoom="scale-[var(--product-image-scale)]"
        ribbon="right-2 top-2"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* `min-h` en lineas: los kW arrancan a la misma altura en todas. */}
        <h3 className="min-h-[3.25rem] text-sm leading-snug font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
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

        {description && (
          <p className="mt-2 mb-2 min-h-[3.75rem] max-w-xs text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}

        <Divider
          {...props}
          className="mt-auto"
          neutral="bg-neutral-200 dark:bg-neutral-800"
        />
        <div className="flex items-center justify-between gap-4 pt-3">
          <Price
            {...props}
            className="text-2xl font-thin tracking-tighter"
            tax="hidden"
          />
          {href && <MoreInfo theme={theme} />}
        </div>
      </div>
    </>
  );
}
