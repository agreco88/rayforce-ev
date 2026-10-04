"use client";

import { Carousel, useCarousel } from "motion-plus/react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import type { CatalogTheme } from "@/lib/catalog/catalog.types";
import { cn } from "@/lib/utils";

/**
 * El carousel de tarjetas de las secciones, casi siempre en mobile.
 *
 * Es el ejemplo oficial de Motion+ (examples.motion.dev/react/carousel) con los
 * estilos del proyecto: mismos props, mismo `Navigation` con flechas, misma
 * estructura de contenedor. Las tarjetas las arma cada seccion y las pasa en
 * `items`.
 */

type Autoplay = { duration: number; paused: boolean };
type Accent = Pick<CatalogTheme, "accentText" | "accentBg">;

const GREEN: Accent = { accentText: "text-green-400", accentBg: "bg-green-400" };

/** Barras de posicion, adaptadas del `PositionDots` (variant "bar") de Motion+
 * UI (motion.dev/ui/components/carousel-controls). Cada barra es `flex-1` para
 * repartirse el ancho disponible en partes iguales sin importar cuantas haya.
 * Con `autoplay`, la activa se llena con el tiempo y las ya vistas quedan llenas. */
function ProgressBars({ autoplay, accent }: { autoplay?: Autoplay; accent: Accent }) {
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
        if (autoplay) {
          return (
            <span
              key={index}
              className="relative h-[1.5px] flex-1 overflow-hidden rounded-full bg-neutral-700"
            >
              {active ? (
                <AutoplayFill {...autoplay} className={accent.accentBg} />
              ) : (
                index < currentPage && (
                  <span className={cn("absolute inset-0", accent.accentBg)} />
                )
              )}
            </span>
          );
        }
        return (
          <span
            key={index}
            className={cn(
              "h-[1.5px] flex-1 rounded-full transition-colors duration-300",
              active ? accent.accentBg : "bg-neutral-700",
            )}
          />
        );
      })}
    </div>
  );
}

/** El `AutoplayProgress` del ejemplo carousel-autoplay de Motion+: la barra se
 *  llena y al terminar pasa de pagina. Sin `loop`, en la ultima vuelve a la primera. */
function AutoplayFill({
  duration,
  paused,
  className,
}: Autoplay & { className: string }) {
  const { currentPage, nextPage, gotoPage, isNextActive } = useCarousel();
  const progress = useMotionValue(0);

  // Pausada no se corta: retoma desde donde quedo la barra.
  useEffect(() => {
    if (paused) return;
    const animation = animate(progress, 1, {
      duration: duration * (1 - progress.get()),
      ease: "linear",
      onComplete: () => (isNextActive ? nextPage() : gotoPage(0)),
    });
    return () => animation.stop();
  }, [duration, paused, progress, currentPage, isNextActive, nextPage, gotoPage]);

  return (
    <motion.span
      className={cn("absolute inset-0 origin-left", className)}
      style={{ scaleX: progress, willChange: "transform" }}
    />
  );
}

function Navigation({ autoplay, accent }: { autoplay?: Autoplay; accent: Accent }) {
  const { nextPage, prevPage, isNextActive, isPrevActive } = useCarousel();
  const t = useTranslations("Common.Carousel");
  const button = cn(
    "flex size-10 flex-none items-center justify-center rounded-full border border-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
    accent.accentText,
  );

  return (
    <nav className="mt-6 flex w-full items-center gap-4 px-2">
      <motion.button
        type="button"
        aria-label={t("prev")}
        onClick={prevPage}
        animate={{ opacity: isPrevActive ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        className={button}
      >
        <ChevronLeftIcon />
      </motion.button>

      <ProgressBars autoplay={autoplay} accent={accent} />

      <motion.button
        type="button"
        aria-label={t("next")}
        onClick={nextPage}
        animate={{ opacity: isNextActive ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
        className={button}
      >
        <ChevronRightIcon />
      </motion.button>
    </nav>
  );
}

type Props = {
  items: React.ReactNode[];
  /** Segundos por pagina. Sin el, no avanza solo. */
  autoplay?: number;
  /** Color de flechas y barras: el del producto en su pagina, verde si no. */
  theme?: Accent;
};

export function CardCarousel({ items, autoplay, theme = GREEN }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  // Solo el mouse pausa: en touch el `pointerenter` del tap la dejaria
  // pausada hasta tocar afuera.
  const [hovered, setHovered] = useState(false);

  return (
    /* El `.carousel-container` del ejemplo: `relative` + padding. El ancho de
       cada card (definido en `CarouselCard` como `%` del viewport) es lo que
       controla cuanto asoma la siguiente: a menor ancho, mas se ve del borde
       de la proxima. */
    <div
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="relative box-border px-5"
    >
      <Carousel
        className="relative"
        items={items}
        overflow
        gap={20}
        snap="page"
        loop={false}
      >
        <Navigation
          accent={theme}
          autoplay={
            autoplay && !reducedMotion
              ? { duration: autoplay, paused: hovered || !inView }
              : undefined
          }
        />
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
