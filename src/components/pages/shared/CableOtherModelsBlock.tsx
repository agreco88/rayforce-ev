"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { CablesShopGrid } from "@/components/pages/cables/CablesShopGrid";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CableProduct;
  className?: string;
};

/**
 * Los otros cables, con la misma ficha que /cables. Va dentro de la seccion de
 * precios, despues de la card: engancha con el momento de "¿este es el que me
 * sirve?".
 *
 * El modelo actual se excluye en vez de mostrarse deshabilitado: ya esta arriba
 * en la pagina, y una tarjeta muerta en un bloque titulado "otros modelos"
 * ocupa lugar sin llevar a ningun lado.
 */
export function CableOtherModelsBlock({ product, className }: Props) {
  const t = useTranslations("CableModelPage.OtherModels");

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <p
          className={`text-sm uppercase tracking-[0.35em] ${product.theme.accentText}`}
        >
          {t("eyebrow")}
        </p>
        {/* `h3` por jerarquia — la seccion de precios ya tiene el `h2` — pero
            con el estilo de los demas encabezados de seccion. El reset global
            de `h3` es el eyebrow verde en mayusculas (`globals.css`), asi que
            hay que pisarle tamaño, tracking, caja y color. */}
        <h3 className="mt-4 text-4xl font-medium tracking-tighter normal-case text-white sm:text-5xl">
          {t("title")}
        </h3>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400">
          {t("description")}
        </p>
      </motion.div>

      {/* Dos columnas y no tres: sacado el modelo actual quedan dos. */}
      <CablesShopGrid
        excludeSlug={product.slug}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
      />
    </div>
  );
}
