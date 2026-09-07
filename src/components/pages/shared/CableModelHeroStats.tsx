"use client";

import { Thermometer, ShieldCheck, Briefcase, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { GradientIcon } from "@/components/animated/GradientIcon";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type IconComponent = React.ComponentType<{ className?: string }>;

type Props = {
  theme: CatalogTheme;
  slug: string;
};

/* ------------------------------------------------------------------ */
/* Icons per product slug                                             */
/* ------------------------------------------------------------------ */

const ICONS: Record<string, [IconComponent, IconComponent, IconComponent]> = {
  "bs-chc003": [Thermometer, ShieldCheck, Briefcase],
  "bs-chc004": [Thermometer, ShieldCheck, Briefcase],
  "bs-chc003-s": [Thermometer, ShieldCheck, RefreshCcw],
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function CableModelHeroStats({ theme, slug }: Props) {
  const t = useTranslations("CableModelHeroStats");

  const icons = ICONS[slug] ?? ICONS["bs-chc003"];

  const stats = [1, 2, 3].map((n, i) => ({
    icon: icons[i],
    title: t(`${slug}.stat${n}Title`),
    description: t(`${slug}.stat${n}Description`),
  }));

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 my-16 sm:my-5 lg:my-0 gap-16 sm:gap-8 lg:gap-12 w-full sm:w-fit ${theme.divide}`}
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex flex-col items-center sm:items-start gap-1.5 sm:gap-2 flex-1 sm:py-0 w-full sm:w-fit"
          >
            {/* Icon + Title */}
            <div
              className={`${theme.accentText} flex flex-col gap-1 sm:gap-2 items-center sm:items-start`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <GradientIcon
                  icon={Icon}
                  colors={theme.gradientColors}
                  className="size-8 stroke-[1.5] shrink-0"
                />
                <h4 className="text-white font-medium text-center sm:text-left text-lg">
                  {item.title}
                </h4>
              </div>
              {/* Divider */}
              <div
                className={`w-full h-[1px] bg-gradient-to-r ${theme.gradientLine} my-1`}
              />
            </div>

            {/* Description */}
            <p className="text-base sm:text-sm w-full flex items-center text-neutral-400 leading-relaxed text-pretty text-center sm:text-start sm:items-start max-w-[30ch]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
