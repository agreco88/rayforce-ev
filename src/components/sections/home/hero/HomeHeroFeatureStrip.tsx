"use client";

import { useTranslations } from "next-intl";

const TRUST_KEYS = ["ownInstall", "ursea", "team", "warranty"] as const;

export function HomeHeroFeatureStrip() {
  const t = useTranslations("HomePage.Hero.trust");

  return (
    <ul
      className="
        grid
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        gap-x-6 gap-y-4
        text-sm
      "
    >
      {TRUST_KEYS.map((key) => (
        <li
          key={key}
          className="
            border-l
            border-green-400/30
            pl-3
          "
        >
          <div className="text-green-400 font-medium">{t(`${key}.title`)}</div>

          <div className="mt-1 text-neutral-400 leading-relaxed">
            {t(`${key}.description`)}
          </div>
        </li>
      ))}
    </ul>
  );
}
