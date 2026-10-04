"use client";

import {
  Briefcase,
  RefreshCcw,
  Ruler,
  ShieldCheck,
  Thermometer,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GradientIcon } from "@/components/animated/GradientIcon";
import { formatPowerKw } from "@/lib/catalog/catalog.helpers";
import type { CableProduct, CatalogTheme } from "@/lib/catalog/catalog.types";
import {
  HeroStatList,
  powerIcon,
  Type2SocketIcon,
  type IconComponent,
} from "./HeroStatList";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Props = {
  theme: CatalogTheme;
  product: CableProduct;
  /** Suma potencia, largo y conector: seis stats en dos columnas de filas,
   *  como `ChargerModelHeroStats`. Lo usa el hero con galeria. */
  extended?: boolean;
};

/* ------------------------------------------------------------------ */
/* Icons per product slug                                             */
/* ------------------------------------------------------------------ */

const ICONS: Record<string, [IconComponent, IconComponent, IconComponent]> = {
  "cable-tipo-2-7kw": [Thermometer, ShieldCheck, Briefcase],
  "cable-tipo-2-22kw": [Thermometer, ShieldCheck, Briefcase],
  "cable-tipo-2-espiral-7kw": [Thermometer, ShieldCheck, RefreshCcw],
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function CableModelHeroStats({ theme, product, extended }: Props) {
  const t = useTranslations("CableModelHeroStats");
  const locale = useLocale();
  const { slug, specs } = product;

  const icons = ICONS[slug] ?? ICONS["cable-tipo-2-7kw"];

  const stats = [1, 2, 3].map((n, i) => ({
    icon: icons[i],
    title: t(`${slug}.stat${n}Title`),
    description: t(`${slug}.stat${n}Description`),
  }));

  if (extended) {
    const power = formatPowerKw(specs.maxPowerKw ?? 7, locale);

    return (
      <HeroStatList
        theme={theme}
        stats={[
          ...stats,
          {
            icon: powerIcon(power),
            title: t(`power.${specs.phaseType ?? "single"}.title`, { power }),
            description: t(`power.${specs.phaseType ?? "single"}.description`, {
              current: specs.maxCurrentA ?? 32,
            }),
          },
          {
            icon: Ruler,
            title: t("length.title", {
              length: specs.lengthM,
              style: specs.cableStyle,
            }),
            description: t("length.description"),
          },
          {
            icon: Type2SocketIcon,
            title: t("connector.title"),
            description: t("connector.description"),
          },
        ]}
      />
    );
  }

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
