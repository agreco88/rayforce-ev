"use client";

import { ChevronRight } from "lucide-react";

import { AccentText, Divider, Photo, Price } from "../../parts";
import type { VariantProps } from "../../types";

/**
 * Foto arriba a todo el ancho, para grilla de 2 columnas en mobile (el menu
 * del header): titulo largo con acento y precio con
 * el impuesto abajo.
 */
export function Vertical1(props: VariantProps) {
  const { href, title, fullTitle, titleAccent, theme, gradient } =
    props;

  return (
    <>
      {/* Alto fijo y no `aspect-square`: a todo el ancho, cuadrada se comeria
          la pantalla en un menu. */}
      <Photo
        {...props}
        className="h-40 w-full rounded-lg"
        size={320}
        zoom="scale-[var(--product-image-scale)]"
        ribbon="right-2 top-2 px-1.5 py-0.5 text-[8px]"
      />

      {/* `flex-1` + el `mt-auto` del divider: en una fila de la grilla los
          precios quedan alineados aunque un titulo ocupe mas lineas. */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h4 className="pb-2.5 text-[13px] leading-relaxed font-medium tracking-tight text-balance text-neutral-800 normal-case dark:text-neutral-200">
          {fullTitle ?? title}
          {titleAccent && (
            <>
              {" "}
              <AccentText
                theme={theme}
                gradient={gradient}
                className="font-semibold whitespace-nowrap"
              >
                {titleAccent}
              </AccentText>
            </>
          )}
        </h4>

        <Divider
          {...props}
          className="mt-auto"
          neutral="bg-neutral-200 dark:bg-neutral-800"
        />

        {/* El impuesto abajo del monto y no al lado: a media pantalla no
            entran juntos. */}
        <div className="flex items-end justify-between gap-2 pt-3">
          <Price
            {...props}
            className="text-xl font-light tracking-tight"
            tax="below"
          />

          {href && (
            <span
              className={`inline-flex size-6 shrink-0 self-center items-center justify-center rounded-full border border-current/20 ${theme.accentText}`}
              aria-hidden="true"
            >
              <ChevronRight size={14} />
            </span>
          )}
        </div>
      </div>
    </>
  );
}
