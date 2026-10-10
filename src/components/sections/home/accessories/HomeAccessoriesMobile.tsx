"use client";

import { useTranslations } from "next-intl";
import { ProductCollection } from "@/components/catalog/product-card/ProductCollection";
import { useAccessoryCards } from "@/components/catalog/product-card/adapters/useAccessoryCards";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";

/** Header apilado y los accesorios en filas, como los modelos del lineup mobile. */
export function HomeAccessoriesMobile() {
  const t = useTranslations("HomePage.Accessories");
  const accessories = useAccessoryCards();

  return (
    <div className="relative isolate overflow-hidden">
      <GridBackground
        cellSize={48}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col px-6 py-16">
        <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400">
          {t("eyebrow")}
        </span>

        <h2 className="m-0 mt-4 text-3xl leading-[1.1] font-light tracking-tight">
          {t("title")}
        </h2>

        <p className="mt-5 text-sm leading-relaxed text-neutral-300">
          {t("description")}
        </p>

        <ProductCollection
          items={accessories}
          variant="horizontal-3"
          className="mt-10"
        />
      </div>
    </div>
  );
}
