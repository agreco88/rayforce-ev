"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, Droplets, RefreshCcw } from "lucide-react";
import { StatsGrid, type StatItem } from "@/components/pages/shared/StatsGrid";

export function PublicChargingCableStats() {
  const t = useTranslations("HomePage.PublicChargingCableSection.stats");

  const stats: StatItem[] = [
    {
      icon: ShieldCheck,
      value: t("durability.value"),
      label: t("durability.label"),
    },
    { icon: Zap, value: t("speed.value"), label: t("speed.label") },
    {
      icon: Droplets,
      value: t("protection.value"),
      label: t("protection.label"),
    },
    { icon: RefreshCcw, value: t("comfort.value"), label: t("comfort.label") },
  ];

  return (
    <StatsGrid
      stats={stats}
      accentText="text-amber-400"
      columnsClassName="grid-cols-2 lg:grid-cols-4"
    />
  );
}
