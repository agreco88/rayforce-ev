"use client";

import { Thermometer, ShieldCheck, Briefcase, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
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
      className={`grid grid-cols-1 mt-5 lg:mt-0 sm:grid-cols-3 gap-8 sm:gap-16 w-full sm:w-fit ${theme.divide}`}
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex flex-col items-center gap-3 sm:gap-2 flex-1 sm:py-0 w-full sm:w-fit"
          >
            {/* Icon + Title */}
            <div
              className={`${theme.accentText} flex flex-col gap-3 sm:gap-2 items-center sm:items-center`}
            >
              <Icon className="size-8 stroke-[1.5]" />
              <h4 className="">{item.title}</h4>
              {/* Divider */}
              <div
                className={`w-full h-[2px] bg-gradient-to-r ${theme.gradientLine} my-1`}
              />
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm w-full flex items-center text-neutral-400 leading-relaxed text-pretty text-center sm:text-center max-w-[30ch] sm:max-w-[24ch]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
