"use client";

import { motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { ArrowDownToLine, Zap } from "lucide-react";

import { ChargerEV } from "@/components/animated/charger-ev/ChargerEv";
import { GradientText } from "@/components/animated/GradientText";
import { ChargerModelHeroStats } from "./ChargerModelHeroStats";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { getChargerProducts } from "@/lib/catalog/catalog.helpers";
import { useTrack } from "@/lib/analytics";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: ChargerProduct;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ChargerModelHeroMobile({ product }: Props) {
  const t = useTranslations("ChargerModelPage");
  const tPricing = useTranslations("ChargerModelPage.pricingSection");
  const track = useTrack();
  const { theme } = product;

  return (
    <section
      className="
        relative overflow-x-hidden
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
          className="mt-16 mb-8 flex justify-center z-[999]"
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            {
              label: t("breadcrumb.chargers"),
              dropdown: [
                {
                  href: "/cargadores",
                  label: t("breadcrumb.chargers"),
                  current: true,
                },
                {
                  href: "/cables",
                  label: t("breadcrumb.cables"),
                },
              ],
            },
            {
              label: (
                <p
                  className={`text-xs uppercase tracking-widest ${theme.accentText}`}
                >
                  {product.slug.toUpperCase()}
                </p>
              ),
              dropdown: getChargerProducts().map((p) => ({
                href: `/cargadores/${p.slug}`,
                current: p.slug === product.slug,
                label: (
                  <span
                    className={`text-xs uppercase tracking-widest ${p.theme.accentText}`}
                  >
                    {p.slug.toUpperCase()}
                  </span>
                ),
              })),
            },
          ]}
        />

        {/* -------------------------------------------------------------- */}
        {/* Content Block                                                 */}
        {/* -------------------------------------------------------------- */}
        <div className="flex flex-col gap-4 items-center">
          {/* Eyebrow */}
          <p
            className={`max-w-[30ch] text-center text-xs uppercase leading-relaxed tracking-[0.2em] ${theme.accentText}`}
          >
            {t(`eyebrow.${product.slug}`)}
          </p>

          {/* Title */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 leading-none text-center">
              <span className="text-6xl font-semibold text-white">BS20</span>

              <GradientText
                colors={theme.gradientColors}
                className="text-6xl font-thin"
              >
                {product.shortName}
              </GradientText>
            </h1>

            <p className="text-neutral-400 pt-2 leading-snug text-base  text-center max-w-[35ch]">
              {t(`variants.${product.slug}.description`)}
            </p>

            <div className="mt-2 flex items-baseline">
              <AnimateNumber
                locales="en-US"
                format={{ maximumFractionDigits: 0 }}
                prefix={tPricing("toggle.fromPrefix")}
                suffix={` ${product.price.currency}`}
                className={`
                  text-3xl font-thin tabular-nums ${theme.accentText}
                  [&_.number-section-pre]:mr-2 [&_.number-section-pre]:self-end [&_.number-section-pre]:pb-1! [&_.number-section-pre]:text-xs [&_.number-section-pre]:font-medium [&_.number-section-pre]:text-neutral-500
                  [&_.number-section-post]:ml-1 [&_.number-section-post]:self-end [&_.number-section-post]:pb-1! [&_.number-section-post]:text-xs [&_.number-section-post]:font-semibold [&_.number-section-post]:tracking-wide [&_.number-section-post]:text-neutral-400
                `}
                transition={{
                  visualDuration: 0.6,
                  type: "spring",
                  bounce: 0.25,
                  opacity: { duration: 0.3, ease: "linear" },
                }}
              >
                {product.price.amount}
              </AnimateNumber>
            </div>
          </div>
          {/* -------------------------------------------------------------- */}
          {/* Charger                                                       */}
          {/* -------------------------------------------------------------- */}
          <div
            className={`
            relative
            flex justify-center items-center
            pt-4
            ${product.visual.cableType === "socket" ? "mb-[175px]" : "mb-0"}
          `}
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
              <ChargerEV {...product.visual} />
            </div>
          </div>
          {/* Stats */}
          <ChargerModelHeroStats theme={theme} product={product} />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-6 pt-10 w-full"
          >
            {product.datasheetUrl && (
              <motion.a
                href={product.datasheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track.chargerHeroDatasheet(product.slug, "mobile")
                }
                className={`
                  inline-flex items-center justify-center h-16 sm:h-14 gap-2 w-full sm:w-fit px-5 rounded-xl
                  border ${theme.accentBorder} ${theme.accentText}
                  text-sm font-semibold
                  hover:bg-white/5 transition-colors
                `}
              >
                <ArrowDownToLine size={16} />
                {t("cta.manual")}
              </motion.a>
            )}

            <motion.a
              href="#compatibilidad"
              className="inline-flex items-center justify-center h-16 sm:h-14 gap-2 w-full sm:w-fit px-5 rounded-xl border border-white/30 text-white/80 text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              <Zap size={16} />
              {t("cta.compatibility")}
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
