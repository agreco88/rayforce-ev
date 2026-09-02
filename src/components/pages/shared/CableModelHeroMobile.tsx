"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
          {/* -------------------------------------------------------------- */}
          {/* Product photo                                                 */}
          {/* -------------------------------------------------------------- */}
          <div
            className="
            relative
            flex justify-center items-center
            pt-4
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

            {/* Product photo */}
            <div className="relative w-[260px] h-[260px] scale-[0.85] sm:scale-[1] origin-top">
              <Image
                src={product.heroImage}
                alt={product.publicName}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Price */}
          <div
            className={`relative mt-4 py-12 w-screen mx-[calc(50%-50vw)] flex flex-col items-center gap-2 border-y ${theme.accentBorder}`}
          >
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)`,
              }}
            />
            <div className="flex items-end gap-2">
              <span className="text-7xl font-thin text-white">
                {product.price.amount}
              </span>
              <span className="text-5xl mb-1 font-thin text-neutral-100">
                {product.price.currency}
              </span>
            </div>
            <span className="text-base text-neutral-400">
              ({t("price.taxLabel")})
            </span>
          </div>
          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-10 w-full">
            <a
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
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#009EE3]/40 shadow-sm font-semibold text-sm transition-all duration-200 w-full sm:w-fit"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/mpago.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-auto"
              />
              <div className="w-0.5 self-stretch bg-[#0a0080]/20 rounded-full" />
              <span className="text-[#0a0080] uppercase tracking-tighter!">
                {t("cta.mercadopago")}
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
