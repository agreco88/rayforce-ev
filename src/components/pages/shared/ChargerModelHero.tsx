"use client";

import { motion } from "framer-motion";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { ArrowDownToLine } from "lucide-react";
import { ChargerModelHeroStats } from "./ChargerModelHeroStats";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { ChargerEV } from "@/components/animated/charger-ev/ChargerEv";
import { GradientText } from "@/components/animated/GradientText";
import { getChargerProducts } from "@/lib/catalog/catalog.helpers";
import { useTrack } from "@/lib/analytics";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: ChargerProduct;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ChargerModelHero({ product }: Props) {
  const t = useTranslations("ChargerModelPage");
  const tPricing = useTranslations("ChargerModelPage.pricingSection");
  const track = useTrack();
  const { theme } = product;

  return (
    <section className="relative w-full flex items-center">
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
        className="flex flex-col gap-12 relative min-h-screen z-20 flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-0 h-[1000px] justify-center items-start"
      >
        <div className="flex w-full items-center gap-12 lg:gap-20">
          {/* LEFT */}
          <div className="flex flex-col gap-6 sm:gap-10 justify-center flex-1 shrink-0">
            {/* Breadcrumb */}
            <AppBreadcrumb
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
                      className={`text-sm uppercase tracking-widest ${theme.accentText}`}
                    >
                      {product.slug.toUpperCase()}
                    </p>
                  ),
                  dropdown: getChargerProducts().map((p) => ({
                    href: `/cargadores/${p.slug}`,
                    current: p.slug === product.slug,
                    label: (
                      <span
                        className={`text-sm uppercase tracking-widest ${p.theme.accentText}`}
                      >
                        {p.slug.toUpperCase()}
                      </span>
                    ),
                  })),
                },
              ]}
            />

            {/* Title */}
            <div className="my-8">
              <p
                className={`text-sm uppercase tracking-widest ${theme.accentText}`}
              >
                {t(`eyebrow.${product.slug}`)}
              </p>

              <h1 className="flex text-7xl gap-2">
                BS20
                <GradientText
                  colors={theme.gradientColors}
                  className="font-thin"
                >
                  {product.shortName}
                </GradientText>
              </h1>

              <span className="mt-3 block text-neutral-400 text-base leading-relaxed max-w-lg">
                {t(`variants.${product.slug}.description`)}
              </span>
            </div>

            {/* Stats */}
            <ChargerModelHeroStats theme={theme} product={product} />

            {/* Price */}
            <div
              className="flex items-baseline"
              aria-label={`${tPricing("toggle.fromPrefix")} ${product.price.amount} ${product.price.currency}`}
            >
              <div aria-hidden="true">
                <AnimateNumber
                  locales="en-US"
                  format={{ maximumFractionDigits: 0 }}
                  prefix={tPricing("toggle.fromPrefix")}
                  suffix={` ${product.price.currency}`}
                  style={{
                    // @ts-expect-error -- CSS custom property consumed by the [&_.number-section-integer] rule below
                    "--price-gradient": `linear-gradient(to right, ${theme.gradientColors.join(", ")})`,
                  }}
                  className={`
                    text-5xl font-thin tabular-nums text-neutral-400
                    [&_.number-section-integer]:bg-[image:var(--price-gradient)] [&_.number-section-integer]:bg-clip-text [&_.number-section-integer]:text-transparent
                    [&_.number-section-pre]:mr-2 [&_.number-section-pre]:self-end [&_.number-section-pre]:pb-1.5! [&_.number-section-pre]:text-sm [&_.number-section-pre]:font-medium
                    [&_.number-section-post]:ml-1 [&_.number-section-post]:self-end [&_.number-section-post]:pb-1.5! [&_.number-section-post]:text-sm [&_.number-section-post]:font-semibold [&_.number-section-post]:tracking-wide
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

            {/* CTAs */}
            <div className="flex items-center gap-6">
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                href="#compatibilidad"
                className={`
                    inline-flex items-center justify-center h-14 gap-2 w-fit px-5 rounded-xl
                    border ${theme.accentBorder} ${theme.accentText}
                    text-sm font-semibold
                    hover:bg-white/5 transition-colors
                  `}
              >
                {t("cta.compatibility")}
              </motion.a>{" "}
              {product.datasheetUrl && (
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  href={product.datasheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track.chargerHeroDatasheet(product.slug, "desktop")
                  }
                  className="inline-flex items-center justify-center h-14 gap-2 w-fit px-5 rounded-xl border border-white/30 text-white/80 text-sm font-semibold hover:bg-white/5 transition-colors"
                >
                  <ArrowDownToLine size={16} />
                  {t("cta.manual")}
                </motion.a>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative z-[99] shrink-0">
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
            <div className="[-transform:perspective(1200px)_rotateY(-14deg)_rotateX(2deg)]">
              <ChargerEV {...product.visual} />
            </div>

            {/* Spacer accounting for the cable/toma overhang below the frame,
                so the whole charger graphic centers on the section's min-h-screen */}
            <div
              aria-hidden="true"
              className={
                product.visual.cableType === "socket" ? "h-[271px]" : "h-28"
              }
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
