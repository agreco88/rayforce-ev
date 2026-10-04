"use client";

import { AccentText, Chevron, Divider, Photo, Price } from "../../parts";
import type { VariantProps } from "../../types";

/**
 * Foto en caja al costado; titulo largo en minuscula con acento en gradiente,
 * divider y precio con chevron. Pensada para titulos que ya lo dicen todo.
 */
export function Horizontal1(props: VariantProps) {
  const { href, title, fullTitle, titleAccent, theme, gradient } =
    props;

  return (
    <>
      <Photo {...props} className="size-28 rounded-lg border" />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Titulo propio y no `Title`: esta variante va en minuscula y con
            el acento pegado. */}
        <h4 className="text-sm leading-snug font-medium tracking-normal text-balance text-neutral-200 normal-case">
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

        <Divider {...props} className="mt-3" />

        <div className="flex items-center justify-between gap-2 pt-3">
          <Price {...props} className="text-xl font-light tracking-tight" />
          {href && <Chevron theme={theme} />}
        </div>
      </div>
    </>
  );
}
