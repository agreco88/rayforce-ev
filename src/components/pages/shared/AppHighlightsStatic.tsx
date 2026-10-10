"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  motion,
  useAnimate,
  useInView,
  useMotionValue,
  type PanInfo,
} from "motion/react";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Activity, Bell, Clock, RefreshCw, Settings2 } from "lucide-react";

import Device from "./Device";
import { AppStoreButtons } from "./AppStoreButtons";

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
  gradientColors?: [string, string, string];
};

/**
 * El verde del sitio, para cuando la seccion no cuelga de un producto — en
 * /cargadores no hay un modelo que preste su acento.
 */
const DEFAULT_THEME: Theme = {
  accentText: "text-green-400",
  accentBg: "bg-green-400",
  accentSoft: "bg-green-400/10",
  accentBorder: "border-green-400/30",
  glowStrong: "rgba(34,197,94,0.35)",
  gradientColors: ["#4ade80", "#4ade80", "#a3e635"],
};

/* -------------------------------------------------------------------------- */
/* Features                                                                   */
/* -------------------------------------------------------------------------- */

/** El copy de cada item sale de `ChargersPage.App.items.<key>`. */
const FEATURES = [
  { key: "realtime", icon: Activity, image: "/images/app/screenshots/01.jpeg" },
  { key: "history", icon: Clock, image: "/images/app/screenshots/02.jpeg" },
  { key: "notifications", icon: Bell, image: "/images/app/screenshots/03.jpeg" },
  { key: "updates", icon: RefreshCw, image: "/images/app/screenshots/05.jpeg" },
  { key: "settings", icon: Settings2, image: "/images/app/screenshots/06.jpeg" },
] as const;

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
/* Icon lit state                                                             */
/* -------------------------------------------------------------------------- */

/** Fallbacks match the old Tailwind classes (white/10 tile, neutral-500 icon). */
const ICON_DIM_BG = "rgba(255,255,255,0.05)";
const ICON_DIM_COLOR = "#737373";
const ICON_FALLBACK_ACCENT = "#ffffff";

/** Slow enough to read as a fade-in rather than a flip. */
const ICON_LIT_TRANSITION = { duration: 0.45, ease: "easeOut" } as const;

/**
 * Motion interpolates colour values, not Tailwind classes, so the accent has
 * to arrive as a real colour. `gradientColors` carries the catalog's raw hex.
 */
function withAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export function AppHighlightsInteractive({
  theme = DEFAULT_THEME,
  id,
}: {
  theme?: Theme;
  id?: string;
}) {
  const t = useTranslations("ChargersPage.App");
  const accent = theme.gradientColors?.[0] ?? ICON_FALLBACK_ACCENT;
  const accentSoft = withAlpha(accent, 0.12);

  const [activeIndex, setActiveIndex] = useState(0);

  const [previousIndex, setPreviousIndex] = useState(0);

  const activeFeature = FEATURES[activeIndex];
  const deviceAlt = t("imageAlt", {
    title: t(`items.${activeFeature.key}.title`),
  });

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
      id={id}
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

      {/* Mismo carril que el header y el hero de /cargadores. El `gap` separa
          la certificacion del bloque de la app. */}
      <div className="header-rail relative z-10 flex flex-col gap-24 py-24 lg:gap-32 lg:py-32">
        {/* ---------------------------------------------------------------- */}
        {/* Wallbox intro + regulatory certification                        */}
        {/* ---------------------------------------------------------------- */}

        <ChargerCertificationSection
          namespace="ChargersPage.Certification"
          theme={theme}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Features + Device                                                */}
        {/* ---------------------------------------------------------------- */}

        {/* `gap-8` es la separacion entre la lista y el telefono, no entre
            bloques: el aire contra la certificacion lo da el `gap` del padre. */}
        <div
          className="
            relative

            flex flex-col sm:flex-row w-full items-center gap-8

            sm:justify-around
          "
        >
          {/* -------------------------------------------------------------- */}
          {/* Header + features (desktop hover list)                         */}
          {/* -------------------------------------------------------------- */}

          {/* Header sits above the highlights column, not above the section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            className="
              order-first
              w-full
              max-w-2xl

              text-center

              sm:hidden
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
              {t("eyebrow")}
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
              {t("title")}
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
              {t("description")}
            </p>
          </motion.div>

          <div className="hidden flex-col items-start justify-center sm:flex">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: "-80px",
              }}
              className="mb-10 max-w-xl text-left"
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
                {t("eyebrow")}
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
                {t("title")}
              </h2>

              <p
                className="
                  mt-5
                  max-w-xl

                  text-base
                  leading-relaxed
                  text-neutral-400
                "
              >
                {t("description")}
              </p>
            </motion.div>

            <motion.ul
              variants={waterfallList}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;

                const isActive = activeIndex === index;

                /* Stays true once autoplay has reached this item, so the icon
                 lights up and stays lit like the divider fill beside it. */
                const isLit = index <= activeIndex;

                return (
                  <motion.li key={feature.key} variants={waterfallItem}>
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
                        {/* Icon — lights up as autoplay reaches it and stays lit,
                          mirroring the divider's progress fill below */}
                        <motion.div
                          className="
                          shrink-0

                          rounded-xl

                          p-2
                        "
                          initial={false}
                          animate={{
                            backgroundColor: isLit ? accentSoft : ICON_DIM_BG,
                          }}
                          transition={ICON_LIT_TRANSITION}
                        >
                          <motion.span
                            className="block"
                            initial={false}
                            animate={{ color: isLit ? accent : ICON_DIM_COLOR }}
                            transition={ICON_LIT_TRANSITION}
                          >
                            <Icon className="h-5 w-5" strokeWidth={1.6} />
                          </motion.span>
                        </motion.div>

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
                            {t(`items.${feature.key}.title`)}
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
                            {t(`items.${feature.key}.description`)}
                          </p>
                        </div>
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

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
                    key={feature.key}
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
                          {t(`items.${feature.key}.title`)}
                        </h3>

                        <p className="mt-1 text-sm leading-relaxed tracking-tighter text-neutral-400">
                          {t(`items.${feature.key}.description`)}
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
                  key={feature.key}
                  type="button"
                  onClick={() => handleCardClick(index)}
                  aria-label={t("goTo", {
                    title: t(`items.${feature.key}.title`),
                  })}
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
              mt-20 
              flex flex-col items-center
              sm:hidden
            "
          >
            <div className="relative">
              {/* Glow */}
              <div
                className="
                  absolute left-1/2 top-1/2

                  h-[360px]
                  w-[260px]

                  -translate-x-1/2
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
                alt={deviceAlt}
                direction={direction}
                scale={1.2}
              />
            </div>

            {/* Store buttons sit directly under the device frame */}
            <div className="mt-12 flex w-[336px] flex-col gap-4">
              <AppStoreButtons theme={theme} />
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Device + store CTA (desktop - fades in on scroll)              */}
          {/* -------------------------------------------------------------- */}

          {/* Device and CTA travel together as one column, centred against
              the taller highlights column via the parent's items-center. */}
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
              hidden sm:flex
              flex-col items-start justify-center
            "
          >
            <div className="relative">
              {/* Glow */}
              <div
                className="
                  absolute left-1/2 top-1/2

                  h-[360px]
                  w-[260px]

                  -translate-x-1/2
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
                alt={deviceAlt}
                direction={direction}
                scale={1.2}
              />
            </div>

            {/* Store buttons sit under the frame, matching the device's width so
                the two stay centred on the same axis */}
            <div className="mt-16 flex w-[336px] flex-col gap-4">
              <AppStoreButtons theme={theme} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
