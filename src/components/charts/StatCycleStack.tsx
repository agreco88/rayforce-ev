"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

/** Cuanto dura cada stat antes de pasar al siguiente. */
const STEP_DURATION = 4;

export type StatCycleItem = {
  id: string;
  title: string;
  description: string;
};

/**
 * Anillo de progreso, basado en el ejemplo "Base UI: Progress" de Motion+
 * (https://examples.motion.dev/react/base-progress).
 *
 * A diferencia del ejemplo, el anillo no se anima solo: lo maneja el stack de
 * afuera via `isActive`, y avisa con `onComplete` cuando termino para que el
 * padre pase al stat siguiente.
 */
function StatRing({
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
  // Igual que en el ejemplo de Motion+: sin esto, en 0 el linecap "round"
  // deja un puntito verde visible aunque el progreso sea cero.
  const opacity = useTransform(pathLength, (value) => (value === 0 ? 0 : 1));

  // `onComplete` cambia de identidad en cada render del padre; guardarlo en una
  // ref evita que el efecto se re-dispare y reinicie la animacion a mitad.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isActive) {
      // El stat inactivo vuelve a cero para que al reactivarse arranque limpio.
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
    <div className="relative size-12 shrink-0">
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
 * Stack vertical de stats que se auto-avanza: cada card carga su anillo y al
 * completarse pasa a la siguiente, volviendo a la primera despues de la ultima.
 *
 * El contenido de todas las cards esta siempre visible (nada colapsa, asi no
 * hay CLS). Lo unico que cambia al pasar de una a otra es la intensidad: la
 * activa se "prende" y las demas quedan atenuadas pero legibles, que es la
 * lectura de cargador que se busca.
 */
export function StatCycleStack({
  items,
  header,
  aside,
  className,
}: {
  items: readonly StatCycleItem[];
  /** Copy que va arriba del stack, dentro de la columna izquierda. */
  header?: React.ReactNode;
  /**
   * Contenido de la columna derecha. Como funcion recibe el indice activo, que
   * es lo que permite que la imagen acompanhe al stat que esta corriendo; como
   * nodo queda fijo, para los usos donde la derecha no cambia.
   */
  aside?: React.ReactNode | ((activeIndex: number) => React.ReactNode);
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // El loop no corre fuera de pantalla: si no, el usuario llega a la seccion
  // con el ciclo empezado en un stat arbitrario.
  const isInView = useInView(containerRef, { amount: 0.3 });

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % items.length);
  }, [items.length]);

  return (
    <MotionConfig
      transition={{ type: "spring", bounce: 0.2, visualDuration: 0.4 }}
    >
      <div
        ref={containerRef}
        className={cn(
          "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16",
          className,
        )}
      >
        {/* Columna 1 - copy + stack de stats */}
        <div className="flex flex-col">
          {header}

          <div className={cn("flex w-full flex-col gap-4", header && "mt-10")}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.id}
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
                  className="flex w-full cursor-pointer items-start gap-5 rounded-2xl border p-5 text-left sm:p-6"
                >
                  <StatRing
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
                      {item.title}
                    </p>
                    {/* Siempre montado y a altura fija: nada colapsa. */}
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Columna 2 */}
        {typeof aside === "function" ? aside(activeIndex) : aside}
      </div>
    </MotionConfig>
  );
}
