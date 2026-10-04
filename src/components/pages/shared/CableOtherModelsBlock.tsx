"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { AccessoriesCardGrid } from "@/components/pages/cables/AccessoriesCardGrid";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CableProduct;
  className?: string;
};

/**
 * Los otros accesorios (cables y columna), con la misma card que /accesorios. Va al final de la pagina,
 * antes del FAQ: engancha con el momento de "¿este es el que me sirve?".
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
        <h2 className="mt-4 mb-0 text-4xl font-medium tracking-tighter text-white sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400">
          {t("description")}
        </p>
      </motion.div>

      {/* Tres columnas: sacado el modelo actual quedan dos cables y la columna. */}
      <AccessoriesCardGrid
        excludeSlug={product.slug}
        className="mt-12 sm:grid-cols-2 lg:grid-cols-3"
      />
    </div>
  );
}
