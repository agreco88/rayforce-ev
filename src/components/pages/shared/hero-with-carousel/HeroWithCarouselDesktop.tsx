"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useChargerCrumbLabel } from "../useChargerCrumbLabel";

import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { getChargerProducts } from "@/lib/catalog/catalog.helpers";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";
import { HeroCta, HeroPickup } from "./HeroCheckout";
import { HeroFeatureList } from "./HeroFeatureList";
import { HeroGallery, type GalleryMedia } from "./HeroGallery";
import { HeroIntro } from "./HeroIntro";
import { HeroOptions } from "./HeroOptions";
import { useHeroPurchase } from "./use-hero-purchase";

type Props = {
  product: ChargerProduct;
  media: GalleryMedia[];
  linkSuffix?: string;
};

/** Galeria a la izquierda (sticky) y todo lo que lleva a la compra a la derecha. */
export function HeroWithCarouselDesktop({ product, media, linkSuffix }: Props) {
  const t = useTranslations("ChargerModelPage");
  const crumbLabel = useChargerCrumbLabel();
  const purchase = useHeroPurchase(product);
  const { theme } = product;

  return (
    <section className="relative w-full">
      {/* El glow va detras de la galeria, que esta a la izquierda. */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 25% 40%, ${theme.glow}, transparent 60%), #0a0a0a`,
        }}
      />

      {/* Fade solo, como el hero actual: sin `y`, el contenido no se mueve. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        className="relative z-10 w-full px-8 pt-32 pb-32"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
          <AppBreadcrumb
            items={[
              { label: t("breadcrumb.home"), href: "/" },
              { label: t("breadcrumb.chargers"), href: "/cargadores" },
              {
                label: (
                  <p className={`text-sm ${theme.accentText}`}>
                    {crumbLabel(product)}
                  </p>
                ),
                dropdown: getChargerProducts().map((p) => ({
                  href: `/cargadores/${p.slug}${linkSuffix ?? ""}`,
                  current: p.slug === product.slug,
                  label: (
                    <span className={`text-sm ${p.theme.accentText}`}>
                      {crumbLabel(p)}
                    </span>
                  ),
                })),
              },
            ]}
          />

          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-12 xl:gap-16">
            {/* `sticky`: la columna de compra es mas alta que la foto, y asi
                la galeria acompaña mientras se lee. */}
            <div className="sticky top-28">
              <HeroGallery
                media={media}
                name={t(`variants.${product.slug}.fullName`)}
                theme={theme}
              />
            </div>

            <div className="flex flex-col gap-8">
              <HeroIntro
          product={product}
          price={purchase.price}
          from={purchase.withInstallation}
        />
              <HeroFeatureList product={product} />
              <HeroOptions product={product} purchase={purchase} linkSuffix={linkSuffix} />
              <HeroCta purchase={purchase} theme={theme} />
              <HeroPickup theme={theme} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
