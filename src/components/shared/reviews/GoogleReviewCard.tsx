"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ExternalLink, Star } from "lucide-react";

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
  href: string;
  /** Clase de acento para el overlay de hover. */
  accentText: string;
  /** Escalona la entrada de la grilla. */
  delay?: number;
  onClick?: () => void;
};

/**
 * Una reseña de Google. La tarjeta entera es el link a la reseña en Google,
 * con un overlay que aparece en hover — sin CTA propio, para no repetir seis
 * veces el mismo boton dentro de la grilla.
 */
export function GoogleReviewCard({
  review,
  href,
  accentText,
  delay = 0,
  onClick,
}: Props) {
  const t = useTranslations("Common.Reviews");

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-colors duration-300",
        "hover:border-white/20 hover:bg-white/[0.05]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black/70 opacity-0 backdrop-blur-sm transition-opacity duration-300",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
        )}
      >
        <span
          className={cn("flex items-center gap-2 text-sm font-medium", accentText)}
        >
          {t("viewReview")}
          <ExternalLink className="h-4 w-4" />
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star
            key={starIndex}
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
    </motion.a>
  );
}
