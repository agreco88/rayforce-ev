"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowDownToLine } from "lucide-react";

import { ChargerEV } from "@/components/animated/charger-ev/ChargerEv";
import { ChargerModelHeroStats } from "./ChargerModelHeroStats";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Theme = {
  accentText: string;
  accentBg: string;
  accentHover: string;
  divide: string;
  gradientLine: string;
  accentSoft: string;
  accentBorder: string;
  accentGradient: string;
  glow: string;
  glowStrong: string;
};

type ChargerConfig = {
  charger: {
    powerKw: number;
    variant: "residential" | "pro";
    mode: "single" | "multi";
    phases?: 1 | 2 | 3;
  };
  theme: Theme;
};

type Props = {
  variant: {
    publicName: string;
    description: string;
    shortName: string;
    slug: string;
  };
  config: ChargerConfig;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ChargerModelHeroMobile({ variant, config }: Props) {
  const whatsappNumber = "59892041709";
  const { theme, charger } = config;

  return (
    <section
      className="
        relative overflow-hidden
        border-b border-neutral-900
        min-h-screen
      "
    >
      {/* -------------------------------------------------------------- */}
      {/* Background                                                     */}
      {/* -------------------------------------------------------------- */}
      <div className="absolute inset-0">
        {/* Base */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#111827_60%,#0a0a0a_100%)]" />

        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 20%, ${theme.glow}, transparent 70%)`,
          }}
        />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/noise.png')]" />
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Content                                                        */}
      {/* -------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          relative z-20
          flex flex-col
          min-h-screen
          px-3
          pt-8
          pb-12
        "
      >
        {/* Breadcrumb */}
        <AppBreadcrumb
          className="mt-16 mb-8 flex justify-center"
          items={[
            { label: "Inicio", href: "/" },
            { label: "Cargadores", href: "/cargadores" },
            {
              label: (
                <p
                  className={`text-xs uppercase tracking-widest ${theme.accentText}`}
                >
                  {variant.slug.toUpperCase()}
                </p>
              ),
            },
          ]}
        />

        {/* -------------------------------------------------------------- */}
        {/* Content Block                                                 */}
        {/* -------------------------------------------------------------- */}
        <div className="flex flex-col gap-2.5 items-center">
          {/* Eyebrow */}
          <p
            className={`text-xs uppercase tracking-[0.3em] ${theme.accentText}`}
          >
            Cargador residencial
          </p>

          {/* Title */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="flex items-end gap-2 leading-none">
              <span className="text-6xl font-semibold text-white">BS20</span>

              <span className={`text-6xl font-thin ${theme.accentText}`}>
                {variant.shortName}
              </span>
            </h1>

            <p className="text-neutral-400 pt-2 leading-relaxed text-lg text-center max-w-[35ch]">
              {variant.description}
            </p>
          </div>
          {/* Stats */}
          <ChargerModelHeroStats theme={theme} />
          {/* -------------------------------------------------------------- */}
          {/* Charger                                                       */}
          {/* -------------------------------------------------------------- */}
          <div
            className="
            relative
            flex justify-center items-center
            flex-1
            py-10
          "
          >
            {/* Bottom Glow */}
            <div
              className="
              absolute bottom-12 left-1/2 -translate-x-1/2
              w-[220px] h-[80px]
              blur-3xl rounded-full
              animate-pulse
            "
              style={{
                backgroundColor: theme.glowStrong,
              }}
            />

            {/* Charger */}
            <div className="scale-[1]">
              <ChargerEV {...charger} />
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 mb-16 sm:mb-22">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hola! Quería consultar por el modelo ${variant.publicName}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center justify-center gap-2
                px-6 py-4 rounded-2xl
                ${theme.accentBg}
                text-black font-medium
                ${theme.accentHover}
                transition
              `}
            >
              <FaWhatsapp className="size-5" />
              Solicitar asesoramiento
            </a>

            <button
              className="
                flex items-center justify-center gap-2
                text-neutral-300
                py-2
              "
            >
              <ArrowDownToLine size={18} />
              Descargar ficha técnica
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
