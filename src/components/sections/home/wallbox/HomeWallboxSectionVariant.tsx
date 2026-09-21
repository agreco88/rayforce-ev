"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

/** Cuanto dura cada highlight antes de pasar al siguiente. */
const STEP_DURATION = 4;

/** Alto del bento. Fijo a proposito: es lo que evita el CLS al cambiar de highlight. */
const BENTO_HEIGHT = "60vh";

/**
 * Eases del ejemplo "AnimatePresence modes" de Motion+
 * (https://examples.motion.dev/react/animate-presence-modes). Son asimetricos:
 * la salida arranca rapido y la entrada frena suave, que es lo que hace que el
 * cruce se lea como un relevo y no como un parpadeo.
 */
const ENTER_TRANSITION = {
  duration: 0.3,
  ease: [0.02, 0.35, 0.25, 0.99],
} as const;
const EXIT_TRANSITION = {
  duration: 0.3,
  ease: [0.46, 0.04, 0.97, 0.44],
} as const;

/**
 * Los tres highlights. `key` indexa las traducciones y `gradient` es el
 * placeholder del panel derecho hasta que lleguen las imagenes/charts reales.
 */
const HIGHLIGHTS = [
  { key: "uno", gradient: "from-green-500/25 via-green-500/5 to-transparent" },
  { key: "dos", gradient: "from-sky-500/25 via-sky-500/5 to-transparent" },
  { key: "tres", gradient: "from-amber-500/25 via-amber-500/5 to-transparent" },
  {
    key: "cuatro",
    gradient: "from-violet-500/25 via-violet-500/5 to-transparent",
  },
] as const;

/**
 * Anillo de progreso que hace de reloj del highlight activo: al completarse
 * avisa al padre para que pase al siguiente.
 */
function HighlightRing({
  isActive,
  onComplete,
  index,
}: {
  isActive: boolean;
  onComplete: () => void;
  index: number;
}) {
  const progress = useMotionValue(0);
  const pathLength = useTransform(progress, [0, 100], [0, 1]);
  // Sin esto, en 0 el linecap "round" deja un puntito visible aunque el
  // progreso sea cero.
  const opacity = useTransform(pathLength, (value) => (value === 0 ? 0 : 1));

  // `onComplete` cambia de identidad en cada render del padre; guardarlo en una
  // ref evita que el efecto se re-dispare y reinicie la animacion a mitad.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isActive) {
      // El highlight inactivo vuelve a cero para que al reactivarse arranque limpio.
      const reset = animate(progress, 0, { duration: 0.3 });
      return () => reset.stop();
    }

    const controls = animate(progress, 100, {
      duration: STEP_DURATION,
      ease: "linear",
      onComplete: () => onCompleteRef.current(),
    });
    return () => controls.stop();
  }, [isActive, progress]);

  return (
    <div className="relative size-11 shrink-0">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-neutral-800"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-green-400"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "text-sm font-semibold tabular-nums transition-colors duration-500",
            isActive ? "text-white" : "text-neutral-400",
          )}
        >
          {index + 1}
        </span>
      </div>
    </div>
  );
}

/**
 * Bento 50/50: tres cards que ciclan solas a la izquierda y un panel de alto
 * fijo a la derecha que muestra el highlight activo.
 *
 * Dos cosas sostienen el layout:
 * - la columna izquierda es `grid-rows-3`, asi cada card mide exactamente un
 *   tercio del alto sin calcular nada a mano;
 * - el panel derecho es `h-full` dentro de un contenedor de alto fijo, asi
 *   cambiar de highlight nunca mueve el layout (cero CLS).
 */
export function HomeWallboxSectionVariant({ id }: { id?: string }) {
  /* La clave de traduccion sigue siendo `HomeWallboxSection`: el componente se
     renombro para guardarlo como variante, pero las traducciones son las
     mismas y no habia razon para moverlas en los cuatro archivos. */
  const t = useTranslations("HomePage.HomeWallboxSection");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // El loop no corre fuera de pantalla: si no, el usuario llega a la seccion
  // con el ciclo empezado en un highlight arbitrario.
  const isInView = useInView(containerRef, { amount: 0.3 });

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % HIGHLIGHTS.length);
  }, []);

  const active = HIGHLIGHTS[activeIndex];

  return (
    <section
      id={id}
      className="relative border-y border-neutral-800 bg-neutral-950"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-16 lg:py-32">
        <div className="mb-12">
          <span
            aria-hidden="true"
            className="text-xs uppercase tracking-[0.35em] text-green-400"
          >
            {t("eyebrow")}
          </span>
          <h2 className="mt-5 max-w-2xl text-4xl font-light tracking-tight text-balance text-white">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-neutral-400">
            {t("description")}
          </p>
        </div>

        {/* Bento: solo desktop por ahora. */}
        <div
          ref={containerRef}
          className="hidden gap-8 lg:grid lg:grid-cols-2"
          style={{ height: BENTO_HEIGHT }}
        >
          {/* Columna izquierda: las cards se reparten el alto en partes
              iguales. Las filas salen de HIGHLIGHTS.length y no de una clase
              fija, asi agregar o sacar un highlight no descuadra la columna. */}
          <div
            className="grid h-full gap-4"
            style={{
              gridTemplateRows: `repeat(${HIGHLIGHTS.length}, minmax(0, 1fr))`,
            }}
          >
            {HIGHLIGHTS.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  whileTap={{ scale: 0.99 }}
                  aria-current={isActive ? "true" : undefined}
                  animate={{
                    // La card activa se prende; las otras bajan a un nivel que
                    // sigue siendo legible en vez de apagarse del todo.
                    opacity: isActive ? 1 : 0.55,
                    borderColor: isActive
                      ? "rgb(64, 64, 64)"
                      : "rgb(23, 23, 23)",
                    backgroundColor: isActive
                      ? "rgba(23, 23, 23, 0.6)"
                      : "rgba(23, 23, 23, 0.2)",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex h-full w-full cursor-pointer items-center gap-5 overflow-hidden rounded-2xl border p-6 text-left"
                >
                  <HighlightRing
                    isActive={isActive && isInView}
                    onComplete={goToNext}
                    index={index}
                  />

                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-lg font-medium tracking-tight transition-colors duration-500",
                        isActive ? "text-white" : "text-neutral-300",
                      )}
                    >
                      {t(`items.${item.key}.title`)}
                    </p>
                    {/* Siempre montado: nada colapsa al cambiar de highlight. */}
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                      {t(`items.${item.key}.description`)}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Columna derecha: alto fijo, el contenido cruza por dentro.
              Acepta imagen, chart o lo que venga sin tocar el layout. */}
          <div className="relative h-full overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-900/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1, transition: ENTER_TRANSITION }}
                exit={{ opacity: 0, scale: 0.98, transition: EXIT_TRANSITION }}
                className="absolute inset-0"
              >
                {/* Placeholder: reemplazar por la imagen o el chart real. */}
                <div
                  className={cn(
                    "flex h-full w-full items-end bg-gradient-to-br p-8",
                    active.gradient,
                  )}
                >
                  <p className="text-2xl font-light tracking-tight text-white">
                    {t(`items.${active.key}.title`)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* TODO: variante mobile — las 3 cards apiladas a alto natural y el
            panel abajo con aspect-ratio fijo. */}
      </div>
    </section>
  );
}
