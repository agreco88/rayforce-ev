"use client";

import { useEffect, useRef } from "react";
import { Carousel, useCarousel } from "motion-plus/react";
import { animate, motion, useInView, useMotionValue } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Variante mobile de la grilla de `WhatIsWallboxSection`.
 *
 * En celular las cuatro tarjetas apiladas dan ~1600px de scroll para cuatro
 * argumentos de una linea, y `ChargeSpeedStatCard` ademas invierte su layout a
 * centrado (ver `ChargeSpeedStatCard.tsx:291`), que a 140+ caracteres se lee
 * peor que alineado a la izquierda. Acá van en carousel: la foto del wallbox
 * queda fija arriba y esto corre debajo.
 *
 * Usa el `Carousel` de Motion+ igual que `WallboxGalleryCarousel`, que ya
 * resuelve drag, rueda, teclado, ARIA y `prefers-reduced-motion`. El autoplay
 * es el patron oficial de la doc (motion://examples/react/carousel-autoplay).
 */

/** Cuanto dura cada tarjeta antes de pasar a la siguiente. */
const STEP_DURATION = 4;

export type WallboxCarouselCard = {
  key: string;
  icon: LucideIcon;
  headline: string;
  short: string;
};

/**
 * Barras de progreso segmentadas: una por tarjeta. La activa se llena atada al
 * `MotionValue` del timer; al completarse pasa de pagina.
 *
 * Pasar `currentPage` como dep es lo que hace que el timer se reinicie solo,
 * venga el cambio del drag o del propio timer — sin eso habria que rastrear el
 * arrastre a mano. `isActive` corta el ciclo cuando la seccion esta fuera de
 * pantalla: con el split por Tailwind este arbol tambien existe en desktop, asi
 * que sin el gate el timer correria ahi tambien.
 */
function AutoplayProgress({ isActive }: { isActive: boolean }) {
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
    <div className="mt-6 flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => gotoPage(index)}
          aria-label={`Ir a la tarjeta ${index + 1} de ${totalPages}`}
          className="group h-4 flex-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
        >
          <span className="relative block h-1 overflow-hidden rounded-full bg-neutral-800">
            {index < currentPage ? (
              /* Ya pasadas: llenas y quietas. */
              <span className="absolute inset-0 rounded-full bg-green-400" />
            ) : index === currentPage ? (
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-green-400"
                style={{ scaleX: progress, willChange: "transform" }}
              />
            ) : null}
          </span>
        </button>
      ))}
    </div>
  );
}

/**
 * Misma familia visual que la tarjeta de desktop (`ChargeSpeedStatCard`:
 * `rounded-2xl border border-neutral-900 bg-neutral-900/20`), pero en vertical
 * y con el icono chico: acá el icono es acento, no el elemento principal.
 *
 * `h-full` + el alto minimo del contenedor hacen que las cuatro midan lo mismo,
 * asi cambiar de pagina no salta de alto.
 */
function MobileCard({ card }: { card: WallboxCarouselCard }) {
  const Icon = card.icon;

  return (
    <div className="flex h-full w-[17rem] flex-col rounded-2xl border border-neutral-900 bg-neutral-900/20 p-6">
      <span
        aria-hidden="true"
        className="mb-5 grid size-11 shrink-0 place-items-center rounded-xl border border-green-400/20 bg-green-400/10"
      >
        <Icon className="size-5 text-green-400" />
      </span>

      <p className="text-base font-medium leading-snug tracking-tight text-balance text-white">
        {card.headline}
      </p>

      <p className="mt-2.5 text-sm leading-relaxed text-pretty text-neutral-400">
        {card.short}
      </p>
    </div>
  );
}

export function WhatIsWallboxCarousel({
  cards,
}: {
  cards: readonly WallboxCarouselCard[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // `amount: 0.3` y sin `once`: el ciclo arranca cuando la seccion entra y se
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
        align="start"
        /* `overflow`: las tarjetas sangran hasta el borde del viewport, asi la
           siguiente se asoma y se lee que hay mas para arrastrar. El padding
           lateral de la seccion sigue marcando donde arranca la primera. */
        overflow
      >
        <AutoplayProgress isActive={isInView} />
      </Carousel>
    </div>
  );
}
