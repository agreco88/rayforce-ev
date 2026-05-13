"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { ChargerModelHeroStats } from "./ChargerModelHeroStats";
import { ArrowDownToLine } from "lucide-react";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { ChargerEV } from "@/components/animated/charger-ev/ChargerEv";

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

export function ChargerModelHero({ variant, config }: Props) {
  const whatsappNumber = "59892041709";
  const { theme, charger } = config;

  return (
    <section className="relative w-full flex items-center overflow-hidden border-b border-neutral-900">
      {/* ------------------------------------------------------------------ */}
      {/* Background                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Depth */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#0a0a0a_20%,#111827_60%,#0a0a0a_100%)]" />

        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 80% 50%, ${theme.glow}, transparent 70%)`,
          }}
        />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/noise.png')]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to left, rgba(64,64,64,0.25) 0px, black 1px),
            linear-gradient(to top, rgba(64,64,64,0.25) 0px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 20%, transparent 80%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Content                                                            */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-12 relative z-20 w-7xl mx-auto h-[1000px] justify-center items-start"
      >
        <div className="flex w-full">
          {/* LEFT */}
          <div className="flex flex-col gap-6 flex-1 justify-center">
            {/* Breadcrumb */}
            <AppBreadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Cargadores", href: "/cargadores" },
                {
                  label: (
                    <p
                      className={`text-sm uppercase tracking-widest ${theme.accentText}`}
                    >
                      {variant.slug.toUpperCase()}
                    </p>
                  ),
                },
              ]}
            />

            {/* Title */}
            <div className="my-8">
              <p
                className={`text-sm uppercase tracking-widest ${theme.accentText}`}
              >
                Cargador residencial
              </p>

              <h1 className="flex text-7xl gap-2">
                BS20
                <span className={`font-thin ${theme.accentText}`}>
                  {variant.shortName}
                </span>
              </h1>

              <span className="text-neutral-400 text-base leading-relaxed max-w-lg">
                {variant.description}
              </span>
            </div>

            {/* Stats */}
            <ChargerModelHeroStats theme={theme} />

            {/* CTA */}
            <div className="flex items-center gap-6 mt-8">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hola! Quería consultar por el modelo ${variant.publicName}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl
                  ${theme.accentBg} text-black font-medium
                  ${theme.accentHover}
                  transition hover:translate-y-[-1px]
                `}
              >
                <FaWhatsapp className="size-5" />
                Solicitar asesoramiento
              </a>

              <button
                className="
                  text-neutral-300 flex items-center cursor-pointer gap-2
                  hover:text-white transition hover:underline underline-offset-4
                "
              >
                <ArrowDownToLine />
                Descargar ficha técnica
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative z-[99]">
            {/* Bottom Glow */}
            <div
              className="
                absolute bottom-0 left-1/2 -translate-x-1/2
                w-[60%] h-[80px]
                blur-3xl rounded-full pointer-events-none animate-pulse
              "
              style={{ backgroundColor: theme.glowStrong }}
            />

            {/* Top Glow */}
            <div
              className="
                absolute top-0 left-1/2 -translate-x-1/2
                w-[60%] h-[80px]
                blur-3xl rounded-full pointer-events-none animate-pulse
              "
              style={{ backgroundColor: theme.glowStrong }}
            />

            {/* Charger */}
            <div className="[transform:perspective(1200px)_rotateY(-14deg)_rotateX(2deg)]">
              <ChargerEV {...charger} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
