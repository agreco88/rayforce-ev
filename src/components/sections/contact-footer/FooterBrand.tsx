"use client";

import HeaderLogo from "@/components/layout/header/header-logo";
import { useTranslations } from "next-intl";

export function FooterBrand() {
  const t = useTranslations("Footer.brand");

  return (
    <div>
      <div className="invert opacity-85 saturate-0">
        <HeaderLogo />
      </div>

      <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-400">
        {t("description")}
      </p>
    </div>
  );
}
