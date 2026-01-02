"use client";

import { useTranslations } from "next-intl";
import GradientBlinds from "@/components/GradientBlinds";
import { cn } from "@/lib/utils";

type BlackoutProductCardProps = {
  href?: string;
  className?: string;
  i18nKey: string;
};

export default function BlackoutProductCard({
  href,
  className,
  i18nKey,
}: BlackoutProductCardProps) {
  const t = useTranslations("MostSoldSection");
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={cn(
        // ⬇️ SAME SHELL AS OTHER CARDS
        "group relative block h-[400px] sm:h-[500px]",
        "overflow-hidden rounded-xl",
        "ring-1 ring-white/5 hover:ring-white/10",
        "transition-all duration-700",
        className
      )}
    >
      {/* ================= MOBILE FALLBACK (NO WEBGL) ================= */}
      <div className="absolute inset-0 block md:hidden">
        <img
          src="/images/blackout-card-mobile-bg-2.webp"
          alt={t(`products.${i18nKey}.name`)}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* ================= DESKTOP SHADER (MD+) ================= */}
      <div className="absolute inset-0 hidden md:block">
        <GradientBlinds
          className="absolute inset-0"
          gradientColors={["#000", "#000"]}
          angle={90}
          noise={0}
          blindCount={18}
          blindMinWidth={10}
          spotlightRadius={1.5}
          spotlightSoftness={0.6}
          spotlightOpacity={0.85}
          mouseDampening={0.1}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="normal"
        />
      </div>

      {/* ================= CONTENT ================= */}
      {/* pointer-events-none so shader gets mouse input */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 pointer-events-none">
        <h3 className="text-lg font-medium text-white">
          {t(`products.${i18nKey}.name`)}
        </h3>

        <p className="mt-2 text-sm text-white/80">
          {t(`products.${i18nKey}.excerpt`)}
        </p>

        {/* enable interaction only where needed */}
        <span className="mt-4 inline-flex items-center text-sm font-medium text-white pointer-events-auto">
          {t("cta")}
          <span className="ml-1 transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Wrapper>
  );
}
