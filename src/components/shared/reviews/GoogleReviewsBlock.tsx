"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { CardCarousel } from "@/components/shared/carousel/CardCarousel";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";
import { cn } from "@/lib/utils";
import { GoogleReviewCard } from "./GoogleReviewCard";
import { REVIEWS } from "./reviews.data";

type Props = {
  /** Eyebrow, flechas y barras del carousel. Verde si no se pasa. */
  theme?: Pick<CatalogTheme, "accentText" | "accentBg">;
  /** El h2 baja a la escala del resto de la seccion cuando se monta adentro de una. */
  compact?: boolean;
  className?: string;
};

/**
 * Las reseñas de Google, compartidas entre la home, la pagina de la columna y
 * las de modelo. El accent lo pone quien la monta: verde por defecto, el color
 * del producto en su ficha.
 */
export function GoogleReviewsBlock({ theme, compact = false, className }: Props) {
  const t = useTranslations("Common.Reviews");
  const spacing = compact ? "mt-10 sm:mt-12" : "mt-12 sm:mt-20";

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-3xl sm:text-center"
      >
        <span
          className={cn("section-eyebrow", theme?.accentText ?? "text-green-400")}
        >
          {t("eyebrow")}
        </span>

        {/* `compact` cuando va adentro de otra seccion: ahi es un bloque y
            no la cabecera, y baja un escalon. */}
        <h2 className={cn("mt-4", compact ? "block-title" : "section-title")}>
          {t("title")}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl section-subtitle">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* `-mx-6` cancela el `px-6` de quien la monta: el carousel va a sangre
          para que asome la reseña siguiente. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        className={cn("-mx-6 lg:hidden", spacing)}
      >
        <CardCarousel
          theme={theme}
          items={REVIEWS.map((review) => (
            <GoogleReviewCard
              key={review.id}
              review={review}
              className="h-full w-[calc(90vw-2.5rem)] max-w-sm"
            />
          ))}
        />
      </motion.div>

      <div className={cn("hidden gap-6 lg:grid lg:grid-cols-3", spacing)}>
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.06 }}
          >
            <GoogleReviewCard review={review} className="h-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
