"use client";

import HeaderLogo from "@/components/layout/header/header-logo";
import { useTranslations } from "next-intl";

export function FooterBrand() {
  const t = useTranslations("Footer.brand");

  return (
    <div>
      <div className="flex items-center gap-2">
        <HeaderLogo />
        <p className="text-2xl tracking-tight">{t("name")}</p>
      </div>

      <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-400">
        {t("description")}
      </p>
    </div>
  );
}
