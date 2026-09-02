"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function RegulatoryBadges() {
  const t = useTranslations("Common.RegulatoryBadges");

  return (
    <div className="flex flex-wrap items-center gap-6 border-t border-white/10 py-8">
      <span className="text-xs uppercase tracking-widest text-neutral-500">
        {t("label")}
      </span>
      <div className="flex items-center gap-4">
        <div className="relative h-10 w-20 rounded-lg bg-white p-1.5">
          <Image
            src="/images/partners/logo-ursea.webp"
            alt={t("urseaAlt")}
            fill
            className="object-contain"
          />
        </div>
        <div className="relative h-10 w-20 rounded-lg bg-white p-1.5">
          <Image
            src="/images/partners/logo-ute.webp"
            alt={t("uteAlt")}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
