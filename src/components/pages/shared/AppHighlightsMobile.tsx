"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Activity, Bell, Clock, RefreshCw, Settings2 } from "lucide-react";

import Device from "@/components/pages/shared/Device";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Theme = {
  accentText: string;
  accentBorder: string;
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

/* ------------------------------------------------------------------ */
/* Features                                                           */
/* ------------------------------------------------------------------ */

const FEATURES: Feature[] = [
  {
    icon: Activity,
    title: "Monitoreo en tiempo real",
    description: "Visualizá potencia, corriente y estado de carga en vivo.",
    image: "/images/app/features/realtime.webp",
  },

  {
    icon: Clock,
    title: "Historial de carga",
    description: "Accedé a registros completos de cada sesión.",
    image: "/images/app/features/history.webp",
  },

  {
    icon: Bell,
    title: "Notificaciones inteligentes",
    description: "Recibí alertas automáticas y eventos importantes.",
    image: "/images/app/features/notifications.webp",
  },

  {
    icon: RefreshCw,
    title: "Actualizaciones remotas",
    description: "Mantené tu cargador actualizado desde la app.",
    image: "/images/app/features/firmware.webp",
  },

  {
    icon: Settings2,
    title: "Configuración avanzada",
    description: "Gestioná parámetros y preferencias fácilmente.",
    image: "/images/app/features/settings.webp",
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function AppHighlightsMobile({ theme }: { theme: Theme }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFeature = FEATURES[activeIndex];

  return (
    <section className="relative overflow-hidden border-y border-neutral-900 bg-black">
      {/* -------------------------------------------------------------- */}
      {/* Background                                                     */}
      {/* -------------------------------------------------------------- */}

      {/* Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(64,64,64,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(64,64,64,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "38px 38px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 40%, ${
            theme.glowStrong ?? "rgba(0,255,180,0.12)"
          }, transparent 55%)`,
        }}
      />

      {/* -------------------------------------------------------------- */}
      {/* Content                                                        */}
      {/* -------------------------------------------------------------- */}

      <div className="relative z-10 px-6 py-24">
        {/* ---------------------------------------------------------- */}
        {/* Header                                                     */}
        {/* ---------------------------------------------------------- */}

        <div className="max-w-[220px]">
          <p
            className={cn(
              "text-xs uppercase tracking-[0.35em]",
              theme.accentText,
            )}
          >
            App Rayforce
          </p>

          <h2 className="mt-4 text-4xl font-medium leading-tight text-white">
            Controlá tu carga desde tu celular
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-neutral-400">
            Gestioná sesiones, monitoreá consumos y mantené tu cargador siempre
            actualizado.
          </p>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Main Layout                                                */}
        {/* ---------------------------------------------------------- */}

        <div className="relative mt-16 min-h-[640px] [transform:perspective(1200px)_rotateY(-14deg)_rotateX(2deg)]">
          {/* ------------------------------------------------------ */}
          {/* Device                                                 */}
          {/* ------------------------------------------------------ */}

          <div
            className="
              absolute
              right-[-120px]
              top-1/2
              -translate-y-1/2
              z-10
              pointer-events-none
            "
          >
            {/* Glow */}
            <motion.div
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-[260px]
                w-[260px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                blur-3xl
              "
              style={{
                background: theme.glowStrong ?? "rgba(0,255,180,0.15)",
              }}
            />

            {/* Device */}
            <motion.div
              className=""
              animate={{
                rotateY: activeIndex % 2 === 0 ? -5 : 5,
                rotateX: activeIndex % 2 === 0 ? 2 : -2,
                y: activeIndex % 2 === 0 ? -3 : 3,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.image}
                  initial={{
                    opacity: 0,
                    scale: 1.02,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.985,
                    filter: "blur(8px)",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Device image={activeFeature.image} scale={0.88} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* Features                                               */}
          {/* ------------------------------------------------------ */}

          <div className="relative z-20 flex max-w-[220px] flex-col gap-4">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              const active = activeIndex === index;

              return (
                <motion.button
                  key={feature.title}
                  onClick={() => setActiveIndex(index)}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300",
                    active
                      ? cn(
                          theme.accentBorder,
                          theme.accentSoft ?? "bg-white/[0.05]",
                        )
                      : "border-white/10 bg-white/[0.02]",
                  )}
                >
                  {/* Glow */}
                  {active && (
                    <motion.div
                      layoutId="mobileFeatureGlow"
                      className="absolute inset-0"
                      style={{
                        boxShadow: `0 0 60px ${
                          theme.glowStrong ?? "rgba(0,255,180,0.15)"
                        }`,
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={cn(
                        "mb-4 flex h-11 w-11 items-center justify-center rounded-xl border",
                        active ? theme.accentBorder : "border-white/10",
                        active
                          ? (theme.accentSoft ?? "bg-white/10")
                          : "bg-white/[0.03]",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          active ? theme.accentText : "text-neutral-500",
                        )}
                        strokeWidth={1.7}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "text-sm font-semibold uppercase tracking-[0.14em] leading-tight",
                        active ? "text-white" : "text-neutral-300",
                      )}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        "mt-3 text-xs leading-relaxed",
                        active ? "text-neutral-300" : "text-neutral-500",
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Store Buttons                                              */}
        {/* ---------------------------------------------------------- */}

        <div className="mt-10 flex flex-col items-start gap-4">
          <h3 className="max-w-xs text-sm leading-relaxed text-neutral-300">
            Descargá la aplicación en App Store o Google Play
          </h3>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com/us/app/evsemaster/id1474532183"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/store/appstore.png"
                alt="App Store"
                loading="lazy"
                decoding="async"
                className="h-11 w-auto"
              />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.evsemaster.dev&hl=en&pli=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/store/playstore.webp"
                alt="Google Play"
                loading="lazy"
                decoding="async"
                className="h-11 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
