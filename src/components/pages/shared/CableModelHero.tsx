"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { CableModelHeroStats } from "./CableModelHeroStats";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { getCableProducts } from "@/lib/catalog/catalog.helpers";
import { useTrack } from "@/lib/analytics";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CableProduct;
};

/**
 * Per-model photo transform overrides. The coiled BS-CHC003-S photo is shot
 * flat and left-right symmetric, which looks static under the shared
 * diagonal perspective tilt — mirrored and rotated to echo the dynamic
 * framing of the straight-cable photos instead.
 */
const PHOTO_TRANSFORM: Record<string, string> = {
  "bs-chc003-s":
    "perspective(1200px) rotateY(14deg) rotateX(2deg) rotate(-6deg) scaleX(-1)",
};
const DEFAULT_PHOTO_TRANSFORM =
  "perspective(1200px) rotateY(-14deg) rotateX(2deg)";

/** Per-model photo box size override — BS-CHC003-S renders at a reduced scale. */
const PHOTO_SIZE: Record<string, string> = {
  "bs-chc003-s": "min(740px,62vw)",
};
const DEFAULT_PHOTO_SIZE = "min(1140px,95vw)";

/** Per-model horizontal offset of the photo box — shifts it toward the text column. */
const PHOTO_OFFSET_X: Record<string, string> = {
  "bs-chc003-s": "-8%",
};
const DEFAULT_PHOTO_OFFSET_X = "12%";

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function CableModelHero({ product }: Props) {
  const t = useTranslations("CableModelPage");
  const track = useTrack();
  const { theme } = product;
  const mpUrl = product.mercadopagoUrl || "#";

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
      {/* Product photo — absolute backdrop behind the hero content          */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 z-[15] pointer-events-none flex items-center justify-end overflow-hidden">
        <div
          className="relative [transform-style:preserve-3d]"
          style={{
            width: PHOTO_SIZE[product.slug] ?? DEFAULT_PHOTO_SIZE,
            height: PHOTO_SIZE[product.slug] ?? DEFAULT_PHOTO_SIZE,
            transform: `translateX(${PHOTO_OFFSET_X[product.slug] ?? DEFAULT_PHOTO_OFFSET_X})`,
          }}
        >
          {/* Glow */}
          <div
            className="
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[60%] h-[120px]
              blur-3xl rounded-full animate-pulse
            "
            style={{ backgroundColor: theme.glowStrong }}
          />
          <Image
            src={product.heroImage}
            alt={product.publicName}
            fill
            priority
            className="object-contain"
            style={{
              transform:
                PHOTO_TRANSFORM[product.slug] ?? DEFAULT_PHOTO_TRANSFORM,
            }}
          />
        </div>
      </div>


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
                  label: t("breadcrumb.cables"),
                  dropdown: [
                    {
                      href: "/cables",
                      label: t("breadcrumb.cables"),
                      current: true,
                    },
                    {
                      href: "/cargadores",
                      label: t("breadcrumb.chargers"),
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
                  dropdown: getCableProducts().map((p) => ({
                    href: `/cables/${p.slug}`,
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
                {t(`titlePrefix.${product.slug}`)}
                <span className={`font-thin ${theme.accentText}`}>
                  {product.shortName}
                </span>
              </h1>

              <span className="mt-3 block text-neutral-400 text-base leading-relaxed max-w-lg">
                {t(`variants.${product.slug}.description`)}
              </span>
            </div>

            {/* Stats */}
            <CableModelHeroStats theme={theme} slug={product.slug} />

            {/* Price */}
            <div
              className="flex items-baseline"
              aria-label={`${product.price.amount} ${product.price.currency}`}
            >
              <div aria-hidden="true">
                <AnimateNumber
                  locales="en-US"
                  format={{ maximumFractionDigits: 0 }}
                  suffix={` ${product.price.currency}`}
                  style={{
                    // @ts-expect-error -- CSS custom property consumed by the [&_.number-section-integer] rule below
                    "--price-gradient": `linear-gradient(to right, ${theme.gradientColors.join(", ")})`,
                  }}
                  className={`
                    text-5xl font-thin tabular-nums text-neutral-400
                    [&_.number-section-integer]:bg-[image:var(--price-gradient)] [&_.number-section-integer]:bg-clip-text [&_.number-section-integer]:text-transparent
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
                href={mpUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track.mercadopagoClick({
                    source: "cable_hero",
                    charger: product.slug,
                    location: "desktop",
                  })
                }
                className={`
                    inline-flex min-h-[48px] w-fit items-center justify-center gap-2 rounded-xl px-6 py-3
                    border ${theme.accentBorder} ${theme.accentText}
                    text-sm font-semibold transition-colors
                    hover:bg-white/5
                  `}
              >
                {t("cta.mercadopago")}
                <ExternalLink size={16} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
