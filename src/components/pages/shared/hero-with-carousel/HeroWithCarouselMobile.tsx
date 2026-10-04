"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useChargerCrumbLabel } from "../useChargerCrumbLabel";

import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
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

/** Apilado, en el mismo orden que la columna de compra de desktop, con la
 * galeria arriba. */
export function HeroWithCarouselMobile({ product, media, linkSuffix }: Props) {
  const t = useTranslations("ChargerModelPage");
  const crumbLabel = useChargerCrumbLabel();
  const purchase = useHeroPurchase(product);
  const { theme } = product;

  return (
    <section className="relative w-full overflow-x-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${theme.glow}, transparent 70%), #0a0a0a`,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        className="relative z-10 flex flex-col gap-8 px-4 pt-24 pb-16"
      >
        <AppBreadcrumb
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            // Sin dropdown, como el mobile actual: el selector de potencia ya
            // lleva a los otros cargadores.
            { label: t("breadcrumb.chargers"), href: "/cargadores" },
            {
              label: (
                <p className={`text-sm ${theme.accentText}`}>
                  {crumbLabel(product)}
                </p>
              ),
            },
          ]}
        />

        <HeroGallery
          media={media}
          name={t(`variants.${product.slug}.fullName`)}
          theme={theme}
        />
        <HeroIntro
          product={product}
          price={purchase.price}
          from={purchase.withInstallation}
        />
        <HeroFeatureList product={product} />
        <HeroOptions product={product} purchase={purchase} linkSuffix={linkSuffix} />
        <HeroCta purchase={purchase} theme={theme} />
        <HeroPickup theme={theme} />
      </motion.div>
    </section>
  );
}
