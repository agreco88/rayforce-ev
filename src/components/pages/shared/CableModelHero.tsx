"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CableModelHeroStats } from "./CableModelHeroStats";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { getCableProducts } from "@/lib/catalog/catalog.helpers";
import { useTrack } from "@/lib/analytics";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CableProduct;
};

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
      {/* Content                                                            */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-12 relative min-h-screen z-20 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 2xl:px-0 h-[1000px] justify-center items-start"
      >
        <div className="flex w-full items-center gap-12 lg:gap-20">
          {/* LEFT */}
          <div className="flex flex-col gap-6 flex-1 justify-center shrink-0">
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

              <div className="my-3 flex items-baseline gap-2">
                <span className={`text-4xl font-thin ${theme.accentText}`}>
                  {product.price.amount}
                </span>
                <span className={`text-4xl font-thin ${theme.accentText}`}>
                  {product.price.currency}
                </span>
                <span className="text-base text-neutral-400">
                  ({t("price.taxLabel")})
                </span>
              </div>

              <span className="text-neutral-400 text-base leading-relaxed max-w-lg ">
                {t(`variants.${product.slug}.description`)}
              </span>
            </div>

            {/* Stats */}
            <CableModelHeroStats theme={theme} slug={product.slug} />

            {/* CTA */}
            <div className="flex items-center gap-4 mt-8">
              <a
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
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#009EE3]/40 shadow-sm font-semibold text-sm transition-all duration-200"
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

            {/* Product photo */}
            <div className="relative w-[380px] h-[380px] [transform:perspective(1200px)_rotateY(-14deg)_rotateX(2deg)]">
              <Image
                src={product.heroImage}
                alt={product.publicName}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
