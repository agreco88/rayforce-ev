import type { LucideIcon } from "lucide-react";

/**
 * La tarjeta del carousel mobile: icono / titulo / divider / descripcion.
 *
 * El estilo es el que tenia `StandHighlightsCarousel`, aplicado ahora tambien
 * al carousel de wallbox, que antes usaba uno propio mas chico. Es un solo
 * estilo a proposito: si alguna seccion necesita otro, es una tarjeta distinta,
 * no props de estilo en esta.
 *
 * El ancho es un % del viewport (`CARD_WIDTH_VW`): asi controla directamente
 * cuanto asoma la siguiente card sin depender del contenedor. Bajar el numero
 * asoma mas, subirlo asoma menos.
 *
 * Dos pisos distintos, que resuelven dos cosas distintas:
 *
 * - `min-h` en el bloque del titulo iguala donde cae el divider. Los titulos van
 *   de una a dos lineas segun la tarjeta, y sin un piso comun el divider caeria
 *   a distinta altura en cada una.
 * - `min-h` en la tarjeta iguala el alto total, para que no cambie de una
 *   seccion a otra. Esta calculado para la descripcion mas larga del proyecto
 *   (~184 caracteres en ES, ~7 lineas a este ancho). Si se alarga una, este
 *   numero sube.
 */
const CARD_WIDTH_VW = 90;

export type CarouselCardData = {
  key: string;
  /** Icono de lucide, o `maskSrc` para el conector Tipo 2, que no existe ahi. */
  icon?: LucideIcon;
  maskSrc?: string;
  title: string;
  description: string;
};

export function CarouselCard({ card }: { card: CarouselCardData }) {
  const Icon = card.icon;

  return (
    <div
      className="flex h-full min-h-[20.5rem] max-w-full flex-col rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5"
      style={{ width: `calc(${CARD_WIDTH_VW}vw - 2.5rem)` }}
    >
      <div className="flex min-h-[7rem] flex-col items-start gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center">
          {card.maskSrc ? (
            /* El SVG del Tipo 2 es un circulo con los pines adentro: a igual
               tamanio que un icono de lucide se lee mas chico, porque su dibujo
               ocupa menos del alto del viewBox. Va un escalon mas grande para
               que todos pesen parejo — mismo criterio que en desktop. */
            <div
              role="img"
              aria-label={card.title}
              className="size-14 bg-green-400"
              style={{
                WebkitMaskImage: `url(${card.maskSrc})`,
                maskImage: `url(${card.maskSrc})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          ) : (
            Icon && (
              <Icon
                className="size-12 text-green-400"
                strokeWidth={1.2}
                aria-hidden="true"
              />
            )
          )}
        </div>

        {/* `normal-case`: el reset global pone los `h3` en uppercase
            (globals.css, capa base), y en mayusculas estos titulos de dos
            lineas se vuelven ilegibles. */}
        <h3 className="text-lg leading-snug font-light tracking-tight text-balance text-white normal-case">
          {card.title}
        </h3>
      </div>

      <div className="mt-4 h-px w-full bg-white/10" />

      <p className="mt-4 text-sm leading-relaxed text-pretty text-neutral-500">
        {card.description}
      </p>
    </div>
  );
}
