"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  motion,
  useAnimate,
  useInView,
  useMotionValue,
  type PanInfo,
} from "motion/react";

import { cn } from "@/lib/utils";

import { Activity, Bell, Clock, RefreshCw, Settings2 } from "lucide-react";

import { SiApple, SiGoogleplay } from "react-icons/si";

import Device from "./Device";

import { ChargerCertificationSection } from "./ChargerCertificationSection";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Theme = {
  accentText: string;
  accentSoft?: string;
  accentBg?: string;
  accentBorder?: string;
  glowStrong?: string;
};

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
};

/* -------------------------------------------------------------------------- */
/* Features                                                                   */
/* -------------------------------------------------------------------------- */

const FEATURES: Feature[] = [
  {
    icon: Activity,
    title: "Monitoreo en tiempo real",
    description:
      "Visualizá potencia, corriente y estado de carga en vivo desde tu celular.",
    image: "/images/app/screenshots/01.jpeg",
  },

  {
    icon: Clock,
    title: "Historial de carga",
    description:
      "Accedé al consumo, duración y registros completos de cada sesión.",
    image: "/images/app/screenshots/02.jpeg",
  },

  {
    icon: Bell,
    title: "Notificaciones inteligentes",
    description:
      "Recibí alertas automáticas sobre inicio, finalización o fallas de carga.",
    image: "/images/app/screenshots/03.jpeg",
  },

  {
    icon: RefreshCw,
    title: "Actualizaciones remotas",
    description:
      "Mantené tu cargador actualizado con nuevas funciones y mejoras.",
    image: "/images/app/screenshots/05.jpeg",
  },

  {
    icon: Settings2,
    title: "Configuración avanzada",
    description:
      "Gestioná parámetros, modos y preferencias directamente desde la app.",
    image: "/images/app/screenshots/06.jpeg",
  },
];

/* -------------------------------------------------------------------------- */
/* Mobile carousel geometry                                                   */
/* -------------------------------------------------------------------------- */

const CARD_WIDTH = 286;
const CARD_GAP = 16;
const ITEM_DISTANCE = CARD_WIDTH + CARD_GAP;
const AUTOPLAY_INTERVAL_MS = 4000;
const CAROUSEL_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 38,
  mass: 0.6,
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export function AppHighlightsInteractive({ theme }: { theme: Theme }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [previousIndex, setPreviousIndex] = useState(0);

  const activeFeature = FEATURES[activeIndex];

  const direction = useMemo(() => {
    if (activeIndex === previousIndex) return 1;

    return activeIndex > previousIndex ? 1 : -1;
  }, [activeIndex, previousIndex]);

  function previewFeature(index: number) {
    if (index === activeIndex) return;

    setPreviousIndex(activeIndex);
    setActiveIndex(index);
  }

  /* ---------------------------------------------------------------------- */
  /* Mobile carousel (drag + autoplay)                                      */
  /* ---------------------------------------------------------------------- */

  const [scope, animate] = useAnimate();
  const carouselX = useMotionValue(0);
  const dragStartIndexRef = useRef(0);
  const suppressClickRef = useRef(false);
  const manualPauseExtraRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const minX = -(ITEM_DISTANCE * (FEATURES.length - 1));

  const goToCarousel = (index: number) => {
    const next = clamp(index, 0, FEATURES.length - 1);
    previewFeature(next);
    animate(scope.current, { x: -next * ITEM_DISTANCE }, CAROUSEL_SPRING);
  };

  const wrapCarouselToStart = async () => {
    previewFeature(0);
    await animate(
      scope.current,
      { opacity: 0, filter: "blur(10px)" },
      { duration: 0.28, ease: "easeIn" },
    );
    animate(scope.current, { x: 0 }, { duration: 0 });
    await animate(
      scope.current,
      { opacity: 1, filter: "blur(0px)" },
      { duration: 0.42, ease: "easeOut" },
    );
  };

  const handleCardClick = (index: number) => {
    if (suppressClickRef.current) return;
    manualPauseExtraRef.current = 3000;
    goToCarousel(index);
  };

  const handleCarouselDragStart = () => {
    dragStartIndexRef.current = activeIndex;
    suppressClickRef.current = false;
    setIsDragging(true);
  };

  const handleCarouselDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > 4) {
      suppressClickRef.current = true;
    }

    const rawX = -dragStartIndexRef.current * ITEM_DISTANCE + info.offset.x;
    const proposed = clamp(
      Math.round(-rawX / ITEM_DISTANCE),
      0,
      FEATURES.length - 1,
    );
    previewFeature(proposed);
  };

  const handleCarouselDragEnd = () => {
    const nearest = clamp(
      Math.round(-carouselX.get() / ITEM_DISTANCE),
      0,
      FEATURES.length - 1,
    );
    goToCarousel(nearest);
    setIsDragging(false);
    requestAnimationFrame(() => {
      suppressClickRef.current = false;
    });
  };

  useEffect(() => {
    if (isDragging || !isInView) return;

    const extraDelay = manualPauseExtraRef.current;
    manualPauseExtraRef.current = 0;

    const timeout = setTimeout(() => {
      const next = (activeIndex + 1) % FEATURES.length;
      if (next === 0) {
        wrapCarouselToStart();
      } else {
        goToCarousel(next);
      }
    }, AUTOPLAY_INTERVAL_MS + extraDelay);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isDragging, isInView]);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden

        border-t border-neutral-900

        bg-neutral-950
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Grid                                                               */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          pointer-events-none
          absolute inset-0
          z-0
          opacity-30
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(64,64,64,0.3) 2px, transparent 1px),
            linear-gradient(to bottom, rgba(64,64,64,0.3) 2px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 20%, transparent 80%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Glow                                                               */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${
            theme.glowStrong ?? "rgba(20,184,166,0.2)"
          }, transparent 55%)`,
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Content                                                            */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          relative z-10

          mx-auto
          flex max-w-7xl flex-col

          px-6 pt-24 pb-24

          sm:px-0

          lg:pt-64
        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* Wallbox intro + regulatory certification                        */}
        {/* ---------------------------------------------------------------- */}

        <ChargerCertificationSection theme={theme} />

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <p
            className={cn(
              `
                text-sm
                uppercase
                tracking-[0.35em]
              `,
              theme.accentText,
            )}
          >
            App Rayforce
          </p>

          <h2
            className="
              mt-4

              text-4xl
              font-medium
              text-white

              sm:text-5xl
            "
          >
            Controlá tu carga desde tu celular
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl

              text-base
              leading-relaxed
              text-neutral-400
            "
          >
            Monitoreá sesiones, revisá consumos, recibí alertas y mantené el
            cargador actualizado desde una app simple y práctica.
          </p>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Features + Device                                                */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            relative
            mt-8

            flex flex-col sm:flex-row w-full items-center gap-8

            sm:my-32
            sm:justify-around
          "
        >
          {/* -------------------------------------------------------------- */}
          {/* Features (desktop hover list)                                  */}
          {/* -------------------------------------------------------------- */}

          <motion.ul
            variants={waterfallList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="hidden flex-col gap-4 sm:flex"
          >
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              const isActive = activeIndex === index;

              return (
                <motion.li key={feature.title} variants={waterfallItem}>
                  <button
                    type="button"
                    onMouseEnter={() => previewFeature(index)}
                    onFocus={() => previewFeature(index)}
                    className={cn(
                      `
                        group
                        relative
                        w-full

                        overflow-hidden
                        rounded-2xl

                        bg-white/[0.03]

                        p-4

                        text-left

                        transition-all duration-300

                        hover:bg-white/[0.05]

                        focus:outline-none
                      `,
                      isActive && (theme.accentSoft ?? "bg-white/[0.06]"),
                    )}
                  >
                    <div
                      className="
                        relative z-10

                        flex flex-col
                        items-start
                        gap-4

                        sm:flex-row
                        sm:items-center
                        sm:gap-6
                        sm:p-2
                      "
                    >
                      {/* Icon */}
                      <div
                        className={cn(
                          `
                            shrink-0

                            rounded-xl

                            p-2

                            transition-all duration-300
                          `,
                          isActive
                            ? (theme.accentSoft ?? "bg-white/10")
                            : "bg-white/5",
                        )}
                      >
                        <Icon
                          className={cn(
                            `
                              h-5 w-5

                              transition-colors duration-300
                            `,
                            isActive ? theme.accentText : "text-neutral-500",
                          )}
                          strokeWidth={1.6}
                        />
                      </div>

                      {/* Divider (doubles as autoplay progress) */}
                      <div
                        className="
                          relative hidden md:block

                          h-[30px]
                          w-[2px]

                          overflow-hidden rounded-full

                          bg-neutral-500/20
                        "
                      >
                        {index < activeIndex && (
                          <div
                            className={cn(
                              "absolute inset-0 rounded-full",
                              theme.accentBg ?? "bg-white",
                            )}
                          />
                        )}

                        {isActive && (
                          <motion.div
                            key={activeIndex}
                            className={cn(
                              "absolute inset-x-0 top-0 h-full w-full origin-top rounded-full",
                              theme.accentBg ?? "bg-white",
                            )}
                            initial={{ scaleY: 0 }}
                            animate={{
                              scaleY: isDragging || !isInView ? 0 : 1,
                            }}
                            transition={
                              isDragging || !isInView
                                ? { duration: 0 }
                                : {
                                    duration: AUTOPLAY_INTERVAL_MS / 1000,
                                    ease: "linear",
                                  }
                            }
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <h3
                          className="
                            text-sm
                            font-medium
                            text-white
                            tracking-tight
                            normal-case
                            sm:text-xl
                          "
                        >
                          {feature.title}
                        </h3>

                        <p
                          className="
                            mt-1

                            text-xs
                            leading-relaxed
                            tracking-tight

                            text-neutral-400

                            sm:text-sm
                          "
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* -------------------------------------------------------------- */}
          {/* Features (mobile drag carousel)                                */}
          {/* -------------------------------------------------------------- */}

          <div className="w-full sm:hidden">
            <motion.div
              ref={scope}
              className="flex cursor-grab gap-4 active:cursor-grabbing"
              style={{ x: carouselX }}
              drag="x"
              dragConstraints={{ left: minX, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragStart={handleCarouselDragStart}
              onDrag={handleCarouselDrag}
              onDragEnd={handleCarouselDragEnd}
            >
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeIndex === index;

                return (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => handleCardClick(index)}
                    style={{ width: CARD_WIDTH }}
                    className={cn(
                      "relative shrink-0 select-none overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors duration-300",
                      isActive && (theme.accentSoft ?? "bg-white/[0.06]"),
                    )}
                  >
                    <div className="relative z-10 flex flex-col items-start gap-4">
                      {/* Icon */}
                      <div
                        className={cn(
                          "shrink-0 rounded-xl p-2.5 transition-all duration-300",
                          isActive
                            ? (theme.accentSoft ?? "bg-white/10")
                            : "bg-white/5",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-6 transition-colors duration-300",
                            isActive ? theme.accentText : "text-neutral-500",
                          )}
                          strokeWidth={1.6}
                        />
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <h3 className="text-xl font-medium normal-case tracking-tight text-white">
                          {feature.title}
                        </h3>

                        <p className="mt-1 text-sm leading-relaxed tracking-tighter text-neutral-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* Autoplay progress */}
            <div className="mt-6 flex w-full gap-1.5">
              {FEATURES.map((feature, index) => (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => handleCardClick(index)}
                  aria-label={`Ir a ${feature.title}`}
                  className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                >
                  {index < activeIndex && (
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full",
                        theme.accentBg ?? "bg-white",
                      )}
                    />
                  )}

                  {index === activeIndex && (
                    <motion.div
                      key={activeIndex}
                      className={cn(
                        "absolute inset-y-0 left-0 w-full origin-left rounded-full",
                        theme.accentBg ?? "bg-white",
                      )}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isDragging || !isInView ? 0 : 1 }}
                      transition={
                        isDragging || !isInView
                          ? { duration: 0 }
                          : {
                              duration: AUTOPLAY_INTERVAL_MS / 1000,
                              ease: "linear",
                            }
                      }
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Device (mobile - always visible, no entrance animation)        */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              relative
              flex justify-center
              mt-20
              sm:hidden
            "
          >
            {/* Glow */}
            <div
              className="
                absolute top-1/2

                h-[360px]
                w-[260px]

                -translate-y-1/2

                rounded-full
                blur-3xl
              "
              style={{
                backgroundColor: theme.glowStrong ?? "rgba(20,184,166,0.25)",
              }}
            />
            <Device
              image={activeFeature.image}
              direction={direction}
              scale={1.2}
            />
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Device (desktop - fades in on scroll)                          */}
          {/* -------------------------------------------------------------- */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              relative
              hidden sm:flex
              justify-center
            "
          >
            {/* Glow */}
            <div
              className="
                absolute top-1/2

                h-[360px]
                w-[260px]

                -translate-y-1/2

                rounded-full
                blur-3xl
              "
              style={{
                backgroundColor: theme.glowStrong ?? "rgba(20,184,166,0.25)",
              }}
            />
            <Device
              image={activeFeature.image}
              direction={direction}
              scale={1.2}
            />
          </motion.div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Store Buttons                                                    */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            mt-32 sm:mt-8

            flex flex-col
            items-center
            gap-4

            text-center
          "
        >
          <h3
            className="
              mb-4

              text-xl
              text-white

              normal-case
              tracking-normal

              sm:text-3xl
            "
          >
            Descargá la aplicación en App Store o Google Play
          </h3>

          <div className="flex w-[336px] flex-col gap-4 md:w-auto md:flex-row">
            <a
              href="https://apps.apple.com/us/app/evsemaster/id1474532183"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5 md:w-auto"
            >
              <SiApple size={18} />
              Descargar en App Store
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.evsemaster.dev&hl=en&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition-colors hover:bg-white/5 md:w-auto",
                theme.accentBorder ?? "border-white/30",
                theme.accentText ?? "text-white/80",
              )}
            >
              <SiGoogleplay size={18} />
              Disponible en Google Play
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
