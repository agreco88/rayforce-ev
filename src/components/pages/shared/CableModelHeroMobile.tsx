"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { useTrack } from "@/lib/analytics";

import { CableModelHeroStats } from "./CableModelHeroStats";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { getCableProducts } from "@/lib/catalog/catalog.helpers";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CableProduct;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function CableModelHeroMobile({ product }: Props) {
  const t = useTranslations("CableModelPage");
  const track = useTrack();
  const { theme } = product;
  const mpUrl = product.mercadopagoUrl || "#";

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
      {/* Product photo — absolute backdrop behind the hero content       */}
      {/* -------------------------------------------------------------- */}
      <div className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="relative w-[min(780px,150vw)] h-[min(780px,150vw)]">
          {/* Glow */}
          <div
            className="
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[60%] h-[100px]
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
          />
        </div>
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
                  className={`text-xs uppercase tracking-widest ${theme.accentText}`}
                >
                  {product.slug.toUpperCase()}
                </p>
              ),
              dropdown: getCableProducts().map((p) => ({
                href: `/cables/${p.slug}`,
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
        <div className="flex flex-col gap-2.5 items-center">
          {/* Eyebrow */}
          <p
            className={`text-xs uppercase tracking-[0.3em] ${theme.accentText}`}
          >
            {t(`eyebrow.${product.slug}`)}
          </p>

          {/* Title */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="flex items-end gap-2 leading-none">
              <span className="text-6xl font-semibold text-white">
                {t(`titlePrefix.${product.slug}`)}
              </span>

              <span className={`text-6xl font-thin ${theme.accentText}`}>
                {product.shortName}
              </span>
            </h1>

            <p className="text-neutral-400 pt-2 leading-snug text-base  text-center max-w-[35ch]">
              {t(`variants.${product.slug}.description`)}
            </p>
          </div>
          {/* Stats */}
          <CableModelHeroStats theme={theme} slug={product.slug} />

          {/* Price */}
          <div className="mt-2 flex items-baseline">
            <AnimateNumber
              locales="en-US"
              format={{ maximumFractionDigits: 0 }}
              suffix={` ${product.price.currency}`}
              className={`
                text-3xl font-thin tabular-nums ${theme.accentText}
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

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-6 pt-10 w-full"
          >
            <motion.a
              href={mpUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track.mercadopagoClick({
                  source: "cable_hero",
                  charger: product.slug,
                  location: "mobile",
                })
              }
              className={`
                inline-flex min-h-[48px] w-full sm:w-fit items-center justify-center gap-2 rounded-xl px-6 py-3
                border ${theme.accentBorder} ${theme.accentText}
                text-sm font-semibold transition-colors
                hover:bg-white/5
              `}
            >
              {t("cta.mercadopago")}
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
