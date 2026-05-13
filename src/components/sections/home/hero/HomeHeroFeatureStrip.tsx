"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";

const FEATURE_KEYS = ["security", "savings", "control"] as const;

export function HomeHeroFeatureStrip() {
  const t = useTranslations("HomePage.Hero.features");

  return (
    <div
      className="
        hidden md:flex
        items-center
        gap-8 lg:gap-10
        text-sm
      "
    >
      {FEATURE_KEYS.map((key, index) => (
        <Fragment key={key}>
          <div className="max-w-[220px]">
            <div className="text-green-400 font-medium">
              {t(`${key}.title`)}
            </div>

            <div className="mt-1 text-neutral-400 leading-relaxed">
              {t(`${key}.description`)}
            </div>
          </div>

          {index < FEATURE_KEYS.length - 1 && (
            <div className="w-px h-10 bg-neutral-800 shrink-0" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
