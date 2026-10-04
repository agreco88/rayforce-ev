"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { ChargersCardGrid } from "@/components/sections/home/chargers/ChargersCardGrid";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: ChargerProduct;
  className?: string;
};

/**
 * Los otros modelos, con la misma ficha que la home y /cargadores. Va dentro
 * de la seccion de precios, despues de la card: engancha con el momento de
 * "¿este es el que me sirve?" y deja las reviews cerrando.
 *
 * El modelo actual se excluye en vez de mostrarse deshabilitado: ya esta
 * arriba en la pagina, y una tarjeta muerta en un bloque titulado "otros
 * modelos" ocupa lugar sin llevar a ningun lado.
 */
export function ChargerOtherModelsBlock({ product, className }: Props) {
  const t = useTranslations("ChargerModelPage.OtherModels");

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
          className={`section-eyebrow ${product.theme.accentText}`}
        >
          {t("eyebrow")}
        </p>
        {/* `h3`: la seccion de precios ya tiene el `h2`. */}
        <h3 className="block-title mt-4">
          {t("title")}
        </h3>
        <p className="mx-auto mt-6 max-w-2xl section-subtitle">
          {t("description")}
        </p>
      </motion.div>

      {/* Tres columnas y no cuatro: sacado el modelo actual quedan tres. */}
      <ChargersCardGrid
        excludeSlug={product.slug}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      />
    </div>
  );
}
