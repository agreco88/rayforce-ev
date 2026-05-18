"use client";

import { HouseWifi, EvCharger, ShieldCheck, Car, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Theme = {
  accentText: string;
  divide: string;
  gradientLine: string;
};

type Props = {
  theme: Theme;
  variant: "residential" | "pro";
};

/* ------------------------------------------------------------------ */
/* Icons per variant                                                   */
/* ------------------------------------------------------------------ */

const ICONS = {
  residential: [HouseWifi, EvCharger, ShieldCheck],
  pro: [Car, Zap, ShieldCheck],
} as const;

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ChargerModelHeroStats({ theme, variant }: Props) {
  const t = useTranslations("ChargerModelHeroStats");

  const icons = ICONS[variant];

  const stats = [
    {
      icon: icons[0],
      title: t(`${variant}.stat1Title`),
      description: t(`${variant}.stat1Description`),
    },
    {
      icon: icons[1],
      title: t(`${variant}.stat2Title`),
      description: t(`${variant}.stat2Description`),
    },
    {
      icon: icons[2],
      title: t(`${variant}.stat3Title`),
      description: t(`${variant}.stat3Description`),
    },
  ];

  return (
    <div
      className={`grid grid-cols-3 mt-5 lg:mt-0 sm:grid-cols-3 gap-6 sm:gap-16 w-full sm:w-fit ${theme.divide}`}
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex flex-col items-center gap-2 flex-1 sm:py-0 w-full sm:w-fit"
          >
            {/* Icon + Title */}
            <div
              className={`${theme.accentText} flex flex-col gap-2 items-center sm:items-center`}
            >
              <Icon className="size-8 stroke-[1.5]" />
              <h4 className="text-white font-medium text-center sm:text-center text-sm sm:text-lg">
                {item.title}
              </h4>
              {/* Divider */}
              <div
                className={`w-full h-[2px] bg-gradient-to-r ${theme.gradientLine} sm:my-1`}
              />
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm w-full flex items-center text-neutral-400 leading-relaxed text-pretty text-center sm:text-center max-w-[24ch]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
