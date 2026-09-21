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

/**
 * Padding lateral de la seccion en mobile (`px-6` = 24px). El carousel sangra
 * hasta el borde del viewport para que la tarjeta siguiente se asome, pero la
 * primera tiene que arrancar exactamente donde arranca la foto del wallbox de
 * arriba — si no, la columna se rompe. Por eso el contenedor cancela el padding
 * (`-mx-6`, del lado de la seccion) y aca se repone solo al contenido.
 */
const SECTION_PADDING_PX = 24;

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
    /* Mismo inset lateral que las tarjetas: las barras tienen que caer dentro
       de la misma columna que la foto de arriba, no a lo ancho del viewport. */
    <div
      className="mt-6 flex w-full gap-1.5"
      style={{ paddingInline: SECTION_PADDING_PX }}
    >
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => gotoPage(index)}
          aria-label={`Ir a la tarjeta ${index + 1} de ${totalPages}`}
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
 * Tipografia y espaciado calcados de las tarjetas mobile de
 * `AppHighlightsStatic` (`text-xl` el titulo, `text-sm tracking-tighter` el
 * cuerpo, `p-4`, `gap-4` entre icono y texto, `mt-1` entre titulo y bajada).
 * La caja es la de la tarjeta de desktop (`border-neutral-900
 * bg-neutral-900/20`) para no meter una tercera familia visual en la pagina.
 *
 * El icono va suelto, sin tile de fondo: a `size-8` ya tiene presencia propia y
 * la caja de color solo le agregaba peso. Lo que lo separa del titulo es una
 * regla fina a lo ancho de la tarjeta — el mismo recurso que el borde de la
 * tarjeta, asi que no introduce vocabulario nuevo.
 *
 * `h-full` hace que las cuatro midan lo mismo (el alto lo fija la mas larga),
 * asi cambiar de pagina no salta.
 */
function MobileCard({ card }: { card: WallboxCarouselCard }) {
  const Icon = card.icon;

  return (
    <div className="flex h-full w-[17rem] flex-col rounded-2xl border border-neutral-900 bg-neutral-900/20 p-4">
      <Icon
        aria-hidden="true"
        className="size-8 shrink-0 text-green-400"
        strokeWidth={1.6}
      />

      {/* Separador: `mt-4` iguala el `gap-4` del original. */}
      <hr className="mt-4 border-0 border-t border-neutral-800" />

      <h3 className="mt-4 text-xl font-medium tracking-tight text-balance text-white">
        {card.headline}
      </h3>

      <p className="mt-1 text-sm leading-relaxed tracking-tighter text-pretty text-neutral-400">
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
           siguiente se asoma y se lee que hay mas para arrastrar. */
        overflow
        /* El padding va en el track y no en el contenedor: asi la primera
           tarjeta cae alineada con la foto de arriba y las demas siguen
           pudiendo salirse por el borde. */
        style={{ paddingInline: SECTION_PADDING_PX }}
      >
        <AutoplayProgress isActive={isInView} />
      </Carousel>
    </div>
  );
}
