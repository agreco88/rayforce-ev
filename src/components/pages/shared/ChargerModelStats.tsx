"use client";

import { Zap, Plug, Award, DropletIcon, ShieldCheck, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatsGrid, type StatItem } from "@/components/pages/shared/StatsGrid";
import type { CatalogTheme, ChargerProduct } from "@/lib/catalog/catalog.types";

/* ------------------ Types ------------------ */

type Props = {
  product: ChargerProduct;
  theme: CatalogTheme;
};

/* ------------------ Component ------------------ */

export function ChargerModelStats({ product, theme }: Props) {
  const t = useTranslations(`ChargerModelPage.stats.${product.slug}`);
  const tSpecs = useTranslations("Common.Specs");
  const { specs } = product;

  const phaseLabel =
    specs.phaseType === "single"
      ? tSpecs("phase.single")
      : tSpecs("phase.three");
  const phaseSub =
    specs.voltage && specs.nominalCurrentA
      ? `${specs.voltage} · ${specs.nominalCurrentA}A`
      : undefined;

  const hasConnectorOverride = t.has("connector.title");
  const connectorValue = hasConnectorOverride
    ? t("connector.title")
    : tSpecs("connector.type2");
  const connectorLabel = hasConnectorOverride
    ? t("connector.description")
    : specs.cableType === "integrated"
      ? tSpecs("connector.integratedLabel", { length: specs.cableLengthM ?? 6 })
      : tSpecs("connector.socketLabel");

  const stats: StatItem[] = [
    {
      icon: BadgeCheck,
      value: tSpecs("ursea.value"),
      label: tSpecs("ursea.label"),
    },
    { isCustom: true, value: connectorValue, label: connectorLabel },
    { icon: Zap, value: `${specs.maxPowerKw}kW`, label: t("power.label") },
    { icon: Plug, value: phaseLabel, sub: phaseSub },
    {
      icon: DropletIcon,
      value: specs.ingressProtection ?? "",
      label: tSpecs("protection.water"),
    },
    {
      icon: ShieldCheck,
      value: specs.impactProtection ?? "",
      label: tSpecs("protection.impact"),
    },
    { icon: Award, value: t("warranty.value"), label: t("warranty.label") },
  ];

  return (
    <StatsGrid
      stats={stats}
      accentText={theme.accentText}
      divide={theme.divide}
    />
  );
}
