"use client";

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
  className?: string;
};

/** Una reseña de Google. La entrada la anima `GoogleReviewsBlock`. */
export function GoogleReviewCard({ review, className }: Props) {
  const t = useTranslations("Common.Reviews");

  return (
    <article
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left",
        className,
      )}
    >
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={t("ratingLabel", { rating: review.rating })}
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

      <p className="my-6 text-sm leading-relaxed text-neutral-300">
        &ldquo;{review.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
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
    </article>
  );
}
