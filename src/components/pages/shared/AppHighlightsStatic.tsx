"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Activity, Bell, Clock, RefreshCw, Settings2 } from "lucide-react";

import Device from "./Device";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Theme = {
  accentText: string;
  accentSoft?: string;
  accentBg?: string;
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

  return (
    <section
      className="
        relative overflow-hidden

        border-y border-neutral-900

        bg-black
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
          opacity-50
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

          px-6 py-24

          sm:px-0
        "
      >
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
          {/* Features                                                       */}
          {/* -------------------------------------------------------------- */}

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

                      {/* Divider */}
                      <div
                        className={cn(
                          `
                            hidden md:block

                            h-[30px]
                            w-[2px]

                            bg-gradient-to-t
                            from-transparent
                            to-transparent

                            transition-opacity duration-300
                          `,
                          isActive
                            ? `${theme.accentBg} opacity-100`
                            : "via-neutral-500 opacity-20",
                        )}
                      />

                      {/* Text */}
                      <div className="min-w-0">
                        <h4
                          className="
                            text-sm
                            font-medium
                            text-white

                            sm:text-lg
                          "
                        >
                          {feature.title}
                        </h4>

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
          {/* Device                                                         */}
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
              flex justify-center
              mt-20 sm:mt-0
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

          <div
            className="
              flex flex-wrap
              justify-center
              gap-4
            "
          >
            <a
              href="https://apps.apple.com/us/app/evsemaster/id1474532183"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="/images/store/appstore.png"
                alt="Descargar en App Store"
                className="h-12 w-auto sm:h-14"
              />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.evsemaster.dev&hl=en&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="/images/store/playstore.webp"
                alt="Disponible en Google Play"
                className="h-12 w-auto sm:h-14"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
