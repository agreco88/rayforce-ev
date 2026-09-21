"use client";

import HeaderLogo from "@/components/layout/header/header-logo";
import { useTranslations } from "next-intl";

export function FooterBrand() {
  const t = useTranslations("Footer.brand");

  return (
    <div>
      {/* El logo del header se achico; el del footer conserva el tamaño
          original, que ahi si tiene lugar. */}
      <HeaderLogo width={165} />
      <p className="mt-5 max-w-sm text-xs leading-relaxed text-neutral-400">
        {t("description")}
      </p>
    </div>
  );
}
