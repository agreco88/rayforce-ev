"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { GoogleReviewCard } from "./GoogleReviewCard";
import { GOOGLE_REVIEWS_URL, REVIEWS } from "./reviews.data";

type Props = {
  /** Clase de acento para el eyebrow y el overlay de hover de cada tarjeta. */
  accentText?: string;
  /** El h2 baja a la escala del resto de la seccion cuando se monta adentro de una. */
  compact?: boolean;
  /** Fires por tarjeta clickeada. */
  onReviewClick?: (reviewId: string) => void;
  className?: string;
};

/**
 * Las reseñas de Google, compartidas entre la seccion de la columna y las
 * paginas de modelo. El accent lo pone quien la monta: verde en el home, el
 * color del producto en su ficha.
 *
 * Cada tarjeta ya linkea a Google, asi que no lleva un CTA aparte abajo.
 */
export function GoogleReviewsBlock({
  accentText = "text-green-400",
  compact = false,
  onReviewClick,
  className,
}: Props) {
  const t = useTranslations("Common.Reviews");

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-3xl text-center"
      >
        <span
          className={cn(
            "block uppercase",
            compact
              ? "text-[10px] tracking-[0.3em] sm:text-xs sm:tracking-[0.25em]"
              : "text-xs tracking-[0.25em]",
            accentText,
          )}
        >
          {t("eyebrow")}
        </span>

        {/* Mismo h2 que el resto de la home: `font-light tracking-tight`, no
            el `font-medium` que tenia heredado de la ficha de producto. */}
        <h2
          className={cn(
            "mt-4 font-light tracking-tight text-balance text-white sm:mt-5",
            compact
              ? "text-2xl sm:text-3xl"
              : "text-3xl leading-[1.1] sm:text-4xl lg:text-5xl",
          )}
        >
          {t("title")}
        </h2>

        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl leading-relaxed text-neutral-400 sm:mt-5",
            compact ? "text-sm" : "text-base",
          )}
        >
          {t("subtitle")}
        </p>
      </motion.div>

      <div
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          compact ? "mt-10 sm:mt-12" : "mt-16 sm:mt-20",
        )}
      >
        {REVIEWS.map((review, index) => (
          <GoogleReviewCard
            key={review.id}
            review={review}
            href={GOOGLE_REVIEWS_URL}
            accentText={accentText}
            delay={index * 0.06}
            onClick={() => onReviewClick?.(review.id)}
          />
        ))}
      </div>
    </div>
  );
}
