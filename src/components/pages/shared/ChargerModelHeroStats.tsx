"use client";

import {
  BadgeCheck,
  Building2,
  EvCharger,
  Factory,
  HardHat,
  Home,
  Scale,
  Smartphone,
  Zap,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GradientIcon } from "@/components/animated/GradientIcon";
import { formatPowerKw } from "@/lib/catalog/catalog.helpers";
import type {
  CatalogTheme,
  ChargerProduct,
  ChargerTier,
} from "@/lib/catalog/catalog.types";
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
  product: ChargerProduct;
  /** Suma potencia, instalacion y app: seis stats en dos columnas de
   *  filas. Lo usa el hero con galeria. */
  extended?: boolean;
};

/* ------------------------------------------------------------------ */
/* Icon per tier (default stat2/stat3 icons)                          */
/* ------------------------------------------------------------------ */

const TIER_ICONS: Record<ChargerTier, IconComponent> = {
  residential: Home,
  commercial: Building2,
  industrial: Factory,
};

/**
 * Per-model icon overrides — only needed when a product has custom
 * stat2/stat3 copy (see ChargerModelHeroStats.overrides in messages/*.json).
 */
const STAT_ICON_OVERRIDES: Record<
  string,
  { stat2?: IconComponent; stat3?: IconComponent }
> = {
  "bs20-bc-11kw": { stat2: Zap, stat3: Scale },
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ChargerModelHeroStats({ theme, product, extended }: Props) {
  const t = useTranslations("ChargerModelHeroStats");
  const locale = useLocale();
  const { slug, tier, specs } = product;
  const iconOverrides = STAT_ICON_OVERRIDES[slug];
  const overrideBase = `overrides.${slug}`;
  // Con los seis stats cada posicion es el mismo stat en todos los modelos, asi
  // que los overrides (que reemplazan uso y cable en el 11kW) no aplican.
  const hasStat2Override = !extended && t.has(`${overrideBase}.stat2.title`);
  const hasStat3Override = !extended && t.has(`${overrideBase}.stat3.title`);
  const cableKey = specs.cableType === "socket" ? "socket" : "integrated";
  const CableIcon = specs.cableType === "socket" ? Type2SocketIcon : EvCharger;

  const stats = [
    {
      icon: BadgeCheck,
      title: t("ursea.title"),
      description: t("ursea.description"),
    },
    hasStat2Override
      ? {
          icon: iconOverrides?.stat2 ?? TIER_ICONS[tier],
          title: t(`${overrideBase}.stat2.title`),
          description: t(`${overrideBase}.stat2.description`),
        }
      : {
          icon: TIER_ICONS[tier],
          title: t(`tier.${tier}.title`),
          description: t(`tier.${tier}.description`),
        },
    hasStat3Override
      ? {
          icon: iconOverrides?.stat3 ?? CableIcon,
          title: t(`${overrideBase}.stat3.title`),
          description: t(`${overrideBase}.stat3.description`),
        }
      : {
          icon: CableIcon,
          title: t(`cable.${cableKey}.title`),
          description: t(`cable.${cableKey}.description`),
        },
    ...(extended
      ? [
          {
            icon: powerIcon(formatPowerKw(specs.maxPowerKw, locale)),
            title: t(`power.${specs.phaseType}.title`, {
              power: formatPowerKw(specs.maxPowerKw, locale),
            }),
            description: t(`power.${specs.phaseType}.description`),
          },
          {
            icon: HardHat,
            title: t("installation.title"),
            description: t("installation.description"),
          },
          {
            icon: Smartphone,
            title: t("app.title"),
            description: t("app.description"),
          },
        ]
      : []),
  ];

  // Seis stats no entran en la tira de tres columnas: van en filas.
  if (extended) return <HeroStatList stats={stats} theme={theme} />;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 my-16 sm:my-5 lg:my-0 gap-16 sm:gap-8 lg:gap-10 w-full sm:w-fit ${theme.divide}`}
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

            {/* Tres lineas reservadas: las descripciones van de una a tres
                segun el modelo (el override del 11kW es el mas largo), y sin
                altura fija cambiar de cargador desplaza el bloque entero. */}
            <p className="text-base sm:text-sm w-full flex items-center  text-neutral-400 leading-relaxed text-pretty text-center  sm:text-start sm:items-start max-w-[30ch] sm:min-h-[3.75rem]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
