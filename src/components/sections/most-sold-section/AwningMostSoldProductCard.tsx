"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type AwningMostSoldProductCardProps = {
  image: string;
  href?: string;
  className?: string;
  i18nKey: string;
};

export default function AwningMostSoldProductCard({
  image,
  href,
  className,
  i18nKey,
}: AwningMostSoldProductCardProps) {
  const t = useTranslations("MostSoldSection");
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={cn(
        "group relative block h-[400px] sm:h-[500px] ",
        "overflow-hidden rounded-xl",
        "ring-1 ring-white/5 hover:ring-white/10",
        "transition-all duration-700",
        className
      )}
    >
      {/* IMAGE + OVERLAY (inherits rounding from parent) */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={t(`products.${i18nKey}.name`)}
          className={cn(
            "h-full w-full object-cover",
            "grayscale-75 transition-all duration-500",
            "group-hover:grayscale-0"
          )}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/65 to-black/15 opacity-95" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        <h3 className="text-lg font-medium text-white">
          {t(`products.${i18nKey}.name`)}
        </h3>

        <p className="mt-2 text-sm text-white/80 max-w-[30ch] line-clamp-2">
          {t(`products.${i18nKey}.excerpt`)}
        </p>

        <span className="mt-4 inline-flex items-center text-sm font-medium text-white">
          {t("cta")}
          <span className="ml-1 transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Wrapper>
  );
}
