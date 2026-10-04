"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { GoogleReviewCard } from "./GoogleReviewCard";
import { REVIEWS } from "./reviews.data";

type Props = {
  /** Clase de acento para el eyebrow. */
  accentText?: string;
  /** El h2 baja a la escala del resto de la seccion cuando se monta adentro de una. */
  compact?: boolean;
  className?: string;
};

/**
 * Las reseñas de Google, compartidas entre la seccion de la columna y las
 * paginas de modelo. El accent lo pone quien la monta: verde en el home, el
 * color del producto en su ficha.
 */
export function GoogleReviewsBlock({
  accentText = "text-green-400",
  compact = false,
  className,
}: Props) {
  const t = useTranslations("Common.Reviews");

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-3xl sm:text-center"
      >
        <span className={cn("section-eyebrow", accentText)}>
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

      <div
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          compact ? "mt-10 sm:mt-12" : "mt-12 sm:mt-20",
        )}
      >
        {REVIEWS.map((review, index) => (
          <GoogleReviewCard
            key={review.id}
            review={review}
            delay={index * 0.06}
          />
        ))}
      </div>
    </div>
  );
}
