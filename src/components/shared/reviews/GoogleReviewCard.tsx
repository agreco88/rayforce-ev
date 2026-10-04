"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export type Review = {
  id: string;
  name: string;
  initials: string;
  rating: number;
  quote: string;
  /** Clases del avatar, que rota de color entre tarjetas. */
  color: string;
};

type Props = {
  review: Review;
  /** Escalona la entrada de la grilla. */
  delay?: number;
};

/** Una reseña de Google. */
export function GoogleReviewCard({ review, delay = 0 }: Props) {
  const t = useTranslations("Common.Reviews");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left"
    >
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`${review.rating}/5`}
      >
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star
            key={starIndex}
            aria-hidden="true"
            className={cn(
              "h-4 w-4",
              starIndex < review.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-neutral-800 text-neutral-800",
            )}
          />
        ))}
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-300">
        &ldquo;{review.quote}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 flex-none items-center justify-center rounded-full text-sm font-semibold",
            review.color,
          )}
          aria-hidden="true"
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {review.name}
          </p>
          <p className="text-xs text-neutral-500">{t("source")}</p>
        </div>
      </div>
    </motion.article>
  );
}
