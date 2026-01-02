"use client";

import { useTranslations } from "next-intl";

export default function ProductsSectionHeader() {
  const t = useTranslations("ProductsSection");

  return (
    <header className="mb-16 max-w-2xl">
      <p className="mb-3 text-xs tracking-widest uppercase text-neutral-400">
        {t("eyebrow")}
      </p>
      <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-balance text-white">
        {t("title")}
      </h2>
    </header>
  );
}
