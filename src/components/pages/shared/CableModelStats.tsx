"use client";

import { Plug, Ruler, DropletIcon, Thermometer } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { StatsGrid, type StatItem } from "@/components/pages/shared/StatsGrid";
import type { CatalogTheme, CableProduct } from "@/lib/catalog/catalog.types";

/* ------------------ Types ------------------ */

type Props = {
  product: CableProduct;
  theme: CatalogTheme;
  className?: string;
  /** Sin la card propia: la pone el consumidor. Lo usa el bento del "que
   *  incluye", donde el strip cierra la grilla y toma el chrome de las
   *  columnas de arriba en vez del borde de acento del hero. */
  bare?: boolean;
};

/* ------------------ Component ------------------ */

export function CableModelStats({ product, theme, className, bare }: Props) {
  const t = useTranslations("CableModelPage.stats");
  const tSpecs = useTranslations("Common.Specs");
  const { specs } = product;

  const phaseLabel =
    specs.phaseType === "three" ? tSpecs("phase.three") : tSpecs("phase.single");
  const phaseSub =
    specs.maxCurrentA && specs.maxPowerKw
      ? `${specs.maxCurrentA}A · ${specs.maxPowerKw}kW`
      : undefined;

  const connectorValue = t("connector.value");
  const connectorLabel = t("connector.label");

  const lengthLabel =
    specs.cableStyle === "coiled" ? t("length.stretched") : t("length.total");

  const stats: StatItem[] = [
    { icon: Plug, value: phaseLabel, sub: phaseSub },
    { isCustom: true, value: connectorValue, label: connectorLabel },
    { icon: Ruler, value: `${specs.lengthM}m`, label: lengthLabel },
    {
      icon: DropletIcon,
      value: specs.ingressProtection ?? "",
      label: t("protection.label"),
    },
    {
      icon: Thermometer,
      value: t("sensor.value"),
      label: t("sensor.label"),
      sub: t("sensor.sub"),
    },
  ];

  // El mismo strip que el de cargadores — icono, tipografia y spacing salen de
  // `StatsGrid`. Lo unico propio del cable es que son cinco columnas y no siete.
  const grid = (
    <StatsGrid
      stats={stats}
      accentText={theme.accentText}
      divide={theme.divide}
      columnsClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
    />
  );

  if (bare) return <div className={cn("w-full", className)}>{grid}</div>;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative rounded-2xl border",
          "bg-neutral-950/60 backdrop-blur-xl",
          "shadow-[0_0_40px_rgba(0,0,0,0.6)]",
          "px-6 py-6 sm:px-10 sm:py-8",
          theme.accentBorder,
        )}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${theme.glow}, transparent 60%)`,
          }}
        />

        <div className="relative z-10">{grid}</div>
      </div>
    </div>
  );
}
