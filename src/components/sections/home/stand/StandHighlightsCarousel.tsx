"use client";

import { useEffect, useRef } from "react";
import { Carousel, useCarousel } from "motion-plus/react";
import { animate, motion, useInView, useMotionValue } from "motion/react";
import type { LucideIcon } from "lucide-react";

/**
 * Variante mobile del bento de destacados de la columna.
 *
 * Apiladas, las tres tarjetas dan una tirada larga de scroll para tres
 * argumentos cortos, justo antes del panel de precio — que es lo que importa
 * que se vea. En carousel ocupan el alto de una sola.
 *
 * Misma mecánica que `WhatIsWallboxCarousel`: el `Carousel` de Motion+ resuelve
 * drag, rueda, teclado, ARIA y `prefers-reduced-motion`, y el autoplay sigue el
 * patrón oficial (motion://examples/react/carousel-autoplay), con las barras
 * segmentadas y el gate por viewport que ya usa el resto del proyecto.
 */

/** Cuánto dura cada tarjeta antes de pasar a la siguiente. */
const STEP_DURATION = 4;

/**
 * Padding lateral de la sección en mobile (`px-6` = 24px). El carousel sangra
 * hasta el borde del viewport para que la tarjeta siguiente se asome, pero la
 * primera tiene que arrancar donde arranca el resto del contenido. Por eso el
 * contenedor cancela el padding (`-mx-6`) y acá se repone solo al track.
 */
const SECTION_PADDING_PX = 24;

/**
 * Inset extra de las barras de progreso respecto del borde de la tarjeta.
 *
 * Alineadas exactamente con la tarjeta las barras se ven más anchas que ella,
 * aunque midan lo mismo: la tarjeta es `rounded-2xl`, así que en las esquinas
 * su borde se mete hacia adentro y el ojo toma ese punto como el ancho real.
 * Las barras, rectas de punta a punta, sobresalen contra esa referencia.
 *
 * 8px rompe la ilusión sin que se lean como un bloque aparte.
 */
const PROGRESS_INSET_PX = 8;

export type StandHighlightCard = {
  key: string;
  /** Icono de lucide, o `maskSrc` para el conector Tipo 2, que no existe ahí. */
  icon?: LucideIcon;
  maskSrc?: string;
  title: string;
  description: string;
};

/**
 * Barras de progreso segmentadas: una por tarjeta. La activa se llena atada al
 * `MotionValue` del timer; al completarse pasa de página.
 *
 * `currentPage` como dep es lo que reinicia el timer solo, venga el cambio del
 * drag o del propio timer. `isActive` corta el ciclo fuera de pantalla: con el
 * split por Tailwind este árbol también existe en desktop, así que sin el gate
 * el timer correría ahí también.
 */
function AutoplayProgress({
  isActive,
  label,
}: {
  isActive: boolean;
  label: (index: number, total: number) => string;
}) {
  const { currentPage, totalPages, nextPage, gotoPage } = useCarousel();
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!isActive) {
      progress.set(0);
      return;
    }

    const animation = animate(progress, [0, 1], {
      duration: STEP_DURATION,
      ease: "linear",
      onComplete: nextPage,
    });

    return () => animation.stop();
  }, [isActive, nextPage, progress, currentPage]);

  return (
    /* Mismo inset lateral que las tarjetas más `PROGRESS_INSET_PX`, para que
       las barras caigan dentro de la columna de contenido y no se lean más
       anchas que la tarjeta por el contraste con sus esquinas redondeadas. */
    <div
      className="mt-6 flex w-full gap-1.5"
      style={{ paddingInline: SECTION_PADDING_PX + PROGRESS_INSET_PX }}
    >
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => gotoPage(index)}
          aria-label={label(index + 1, totalPages)}
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
        >
          {index < currentPage ? (
            /* Ya pasadas: llenas y quietas. */
            <span className="absolute inset-0 rounded-full bg-green-400" />
          ) : index === currentPage ? (
            <motion.span
              className="absolute inset-0 origin-left rounded-full bg-green-400"
              style={{ scaleX: progress, willChange: "transform" }}
            />
          ) : null}
        </button>
      ))}
    </div>
  );
}

/**
 * Misma anatomía que la tarjeta de desktop (icono / título / divider /
 * descripción), a escala de celular.
 *
 * El ancho sale del viewport en vez de ser fijo: toma el ancho de la columna
 * de contenido (viewport menos los 24px de padding por lado) y deja 2rem para
 * que la tarjeta siguiente se asome por el borde.
 *
 * Dos pisos distintos, que resuelven dos cosas distintas:
 *
 * - `min-h` en el bloque del título iguala dónde cae el divider. Los títulos
 *   van de una a dos líneas según la tarjeta, y sin un piso común el divider
 *   caería a distinta altura en cada una.
 * - `min-h` en la tarjeta iguala el alto total. Acá `h-full` no alcanza, aunque
 *   el `Carousel` vaya en `align="stretch"`: el `<ul>` del Ticker se renderiza
 *   con `height:100%` y su padre no tiene alto fijo, así que ese 100% resuelve
 *   a auto y no hay contra qué estirar. El piso está calculado para la tarjeta
 *   más larga (la de instalación: 184 caracteres en ES, ~7 líneas de
 *   descripción a este ancho); las otras dos la alcanzan y las tres quedan
 *   parejas. Si se alarga una descripción, este número sube.
 *
 * Los dos pisos van atados al tamaño del icono: si cambia, ambos se mueven el
 * mismo delta, porque el icono empuja el título hacia abajo y el título empuja
 * el alto total.
 */
function MobileCard({ card }: { card: StandHighlightCard }) {
  const Icon = card.icon;

  return (
    <div className="flex h-full min-h-[20.5rem] w-[calc(100vw-4rem)] flex-col rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5">
      <div className="flex min-h-[7rem] flex-col items-start gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center">
          {card.maskSrc ? (
            /* El SVG del Tipo 2 es un círculo con los pines adentro: a igual
               tamaño que un icono de lucide se lee más chico, porque su dibujo
               ocupa menos del alto del viewBox. Va un escalón más grande para
               que los tres pesen parejo — mismo criterio que en desktop. */
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
            (globals.css, capa base), y en mayúsculas estos títulos de dos
            líneas se vuelven ilegibles. Mismo tratamiento que el resto de los
            títulos de la sección. */}
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

export function StandHighlightsCarousel({
  cards,
  progressLabel,
}: {
  cards: readonly StandHighlightCard[];
  progressLabel: (index: number, total: number) => string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // `amount: 0.3` y sin `once`: el ciclo arranca cuando la sección entra y se
  // frena al salir, para no consumir el carousel fuera de pantalla.
  const isInView = useInView(containerRef, { amount: 0.3 });

  return (
    <div ref={containerRef}>
      <Carousel
        items={cards.map((card) => (
          <MobileCard key={card.key} card={card} />
        ))}
        gap={16}
        snap="page"
        loop
        /* `stretch` pone los `<li>` del Ticker en `height:100%` en vez de
           `fit-content`. No alcanza por sí solo para igualar las tarjetas
           —ese 100% resuelve a auto, ver `MobileCard`—, pero deja la cadena
           de altos coherente y es la razón de que el `h-full` no estorbe.
           No afecta la alineación horizontal: `align` alimenta `alignItems`,
           que acá es el eje vertical; el horizontal lo fija
           `justifyContent: flex-start` por separado. */
        align="stretch"
        /* `overflow`: las tarjetas sangran hasta el borde del viewport, así la
           siguiente se asoma y se lee que hay más para arrastrar. */
        overflow
        /* El padding va en el track y no en el contenedor: así la primera
           tarjeta cae alineada con el resto del contenido y las demás siguen
           pudiendo salirse por el borde. */
        style={{ paddingInline: SECTION_PADDING_PX }}
      >
        <AutoplayProgress isActive={isInView} label={progressLabel} />
      </Carousel>
    </div>
  );
}
