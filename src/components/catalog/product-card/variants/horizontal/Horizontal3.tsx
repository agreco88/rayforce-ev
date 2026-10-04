"use client";

import { Chevron, Divider, Photo, Price, SpecList, Title } from "../../parts";
import type { VariantProps } from "../../types";

/**
 * Foto al ras del borde izquierdo, a todo el alto; al lado titulo, bullets,
 * divider y precio con chevron.
 */
export function Horizontal3(props: VariantProps) {
  const { href, specs = [], theme } = props;

  return (
    <>
      {/* Al ras, como la plancha de la card de desktop. El `rounded-l` la
          recorta aca y no en la card, que con `overflow-hidden` cortaria el
          badge. 11px = el `rounded-xl` de la card menos su borde de 1px.
          Bajo 380px (iPhone SE, S10) todo se compacta un escalon — foto,
          padding, letra — para que "No incluye cable de carga" entre.
          `scale` y no mas ancho: agranda el producto sin mover el layout. */}
      <Photo
        {...props}
        className="w-28 rounded-l-[11px] border-r min-[380px]:w-32"
        zoom="scale-125"
      />

      <div className="flex min-w-0 flex-1 flex-col px-3 py-6 min-[380px]:px-4 min-[380px]:py-8">
        <Title
          {...props}
          className="text-[13px] tracking-tight min-[380px]:text-sm min-[380px]:tracking-normal"
        />
        <SpecList
          {...props}
          specs={specs}
          className="text-[11px] tracking-tight min-[380px]:text-xs min-[380px]:tracking-normal"
        />

        {/* `700` y no el `800` de siempre: sobre el fondo del lineup mobile el
            `800` no se veia. */}
        <Divider {...props} className="mt-4" neutral="bg-neutral-700" />

        {/* Impuesto abajo del monto para ganar ancho. Si aun asi no entran
            (320px, iPhone SE), `flex-wrap` baja el chevron a la derecha. */}
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-3 pt-4">
          <Price {...props} className="text-xl tracking-tight" tax="below" />
          {href && (
            <span className="ml-auto">
              <Chevron theme={theme} />
            </span>
          )}
        </div>
      </div>
    </>
  );
}
