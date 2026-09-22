"use client";

import { Carousel, useCarousel } from "motion-plus/react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

/**
 * El carousel de tarjetas que usan las secciones en mobile.
 *
 * Es el ejemplo oficial de Motion+ (examples.motion.dev/react/carousel) con los
 * estilos del proyecto: mismos props, mismo `Navigation` con flechas, misma
 * estructura de contenedor. Las tarjetas las arma cada seccion y las pasa en
 * `items`.
 */

/** Barras de posicion, adaptadas del `PositionDots` (variant "bar") de Motion+
 * UI (motion.dev/ui/components/carousel-controls): solo estado, sin seleccion
 * ni timer. Cada barra es `flex-1` para repartirse el ancho disponible en
 * partes iguales sin importar cuantas haya; la activa se estira dentro de su
 * propio espacio y las demas quedan atenuadas. */
function ProgressBars() {
  const { currentPage, totalPages } = useCarousel();
  const t = useTranslations("Common.Carousel");

  return (
    <div
      aria-label={t("progress", {
        current: currentPage + 1,
        total: totalPages,
      })}
      className="flex flex-1 items-center justify-center gap-4"
    >
      {Array.from({ length: totalPages }, (_, index) => {
        const active = index === currentPage;
        return (
          <motion.span
            key={index}
            animate={{
              backgroundColor: active
                ? "var(--color-green-400)"
                : "var(--color-neutral-700)",
            }}
            transition={{ duration: 0.3 }}
            className="h-[1.5px] flex-1 origin-center rounded-full"
          />
        );
      })}
    </div>
  );
}

function Navigation() {
  const { nextPage, prevPage, isNextActive, isPrevActive } = useCarousel();
  const t = useTranslations("Common.Carousel");

  return (
    <nav className="mt-6 flex w-full items-center gap-4 px-2">
      <motion.button
        type="button"
        aria-label={t("prev")}
        onClick={prevPage}
        animate={{ opacity: isPrevActive ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        className="flex size-10 flex-none items-center justify-center rounded-full border border-neutral-800 text-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
      >
        <ChevronLeftIcon />
      </motion.button>

      <ProgressBars />

      <motion.button
        type="button"
        aria-label={t("next")}
        onClick={nextPage}
        animate={{ opacity: isNextActive ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        className="flex size-10 flex-none items-center justify-center rounded-full border border-neutral-800 text-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
      >
        <ChevronRightIcon />
      </motion.button>
    </nav>
  );
}

export function CardCarousel({ items }: { items: React.ReactNode[] }) {
  return (
    /* El `.carousel-container` del ejemplo: `relative` + padding. El ancho de
       cada card (definido en `CarouselCard` como `%` del viewport) es lo que
       controla cuanto asoma la siguiente: a menor ancho, mas se ve del borde
       de la proxima. */
    <div className="relative box-border px-5">
      <Carousel
        className="relative"
        items={items}
        overflow
        gap={20}
        snap="page"
        loop={false}
      >
        <Navigation />
      </Carousel>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
