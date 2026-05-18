"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowDownToLine } from "lucide-react";
import { useTranslations } from "next-intl";
import { waterfallItem } from "@/lib/animation-variants";
import { useTrack } from "@/lib/analytics";

import { ChargerEV } from "@/components/animated/charger-ev/ChargerEv";
import { ChargerModelHeroStats } from "./ChargerModelHeroStats";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { getAllChargerVariants } from "@/lib/chargers/chargers.helpers";

const SLUG_ACCENT: Record<string, string> = {
  "bs20-bc-7kw": "text-sky-400",
  "bs20-bc-22kw": "text-green-400",
};

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
    price?: { currency: string; amount: number; taxLabel?: string };
  };
  config: ChargerConfig;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ChargerModelHeroMobile({ variant, config }: Props) {
  const t = useTranslations("ChargerModelPage");
  const track = useTrack();
  const whatsappNumber = "59892041709";
  const { theme, charger } = config;

  return (
    <section
      className="
        relative overflow-x-hidden
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
            { label: t("breadcrumb.home"), href: "/" },
            { label: t("breadcrumb.chargers"), href: "/cargadores" },
            {
              label: (
                <p
                  className={`text-xs uppercase tracking-widest ${theme.accentText}`}
                >
                  {variant.slug.toUpperCase()}
                </p>
              ),
              dropdown: getAllChargerVariants()
                .filter((v) => v.slug !== variant.slug)
                .map((v) => ({
                  href: `/cargadores/${v.slug}`,
                  label: (
                    <span
                      className={`text-xs uppercase tracking-widest ${SLUG_ACCENT[v.slug] ?? "text-neutral-400"}`}
                    >
                      {v.slug.toUpperCase()}
                    </span>
                  ),
                })),
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
            {t(`eyebrow.${charger.variant}`)}
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
              {t(`variants.${variant.slug}.description`)}
            </p>
          </div>
          {/* Stats */}
          <ChargerModelHeroStats theme={theme} variant={charger.variant} />
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
            <div className="scale-[0.85] sm:scale-[1] origin-top">
              <ChargerEV {...charger} />
            </div>
          </div>

          {/* Price */}
          {variant.price && (
            <div className="flex flex-col items-center gap-0.5 mt-2 mb-4">
              <span className={`text-5xl font-bold ${theme.accentText}`}>
                ${variant.price.amount}
              </span>
              <span className="text-sm text-neutral-400">
                {variant.price.currency} · {t("price.taxLabel")}
              </span>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 sm:mb-22">
            <motion.a
              variants={waterfallItem}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.35 }}
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                t("cta.whatsappMessage", { model: variant.publicName }),
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track.whatsappClick({ source: "charger_buy_cta", charger: variant.slug })}
              className={`
                flex items-center justify-center gap-2
                px-6 py-3.5 rounded-xl w-full sm:w-auto
                ${theme.accentBg} text-black font-semibold text-sm
                ${theme.accentHover}
                transition-all hover:-translate-y-0.5
              `}
            >
              <FaWhatsapp className="size-4" />
              {t("cta.whatsapp")}
            </motion.a>

            <motion.a
              variants={waterfallItem}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.5 }}
              href="/assets/docs/bs20-ficha-tecnica.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track.datasheetRequested(variant.slug)}
              className="
                flex items-center justify-center gap-2
                text-sm text-neutral-400 hover:text-white
                transition-colors py-2
              "
            >
              <ArrowDownToLine size={16} />
              {t("cta.manual")}
            </motion.a>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
