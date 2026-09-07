"use client";

import { Award, BadgeCheck, DropletIcon, ShieldCheck, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

import { StatsGrid, type StatItem } from "@/components/pages/shared/StatsGrid";

export function ChargersCommonStats() {
  const t = useTranslations("HomePage.HomeChargersSection.commonStats");

  const stats: StatItem[] = [
    {
      icon: BadgeCheck,
      value: t("ursea.value"),
      label: t("ursea.label"),
    },
    {
      isCustom: true,
      value: t("connector.value"),
      label: t("connector.label"),
    },
    {
      icon: DropletIcon,
      value: t("protection.value"),
      label: t("protection.label"),
    },
    {
      icon: ShieldCheck,
      value: t("impact.value"),
      label: t("impact.label"),
    },
    { icon: Smartphone, value: t("app.value"), label: t("app.label") },
    {
      icon: Award,
      value: t("warranty.value"),
      label: t("warranty.label"),
    },
  ];

  return (
    <div className="mx-auto mt-16 max-w-[1600px] px-4">
      <p className="mb-6 text-center text-sm font-medium text-neutral-300 sm:mb-8">
        {t("title")}
      </p>

      <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-8 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:px-10 sm:py-10">
        <StatsGrid
          stats={stats}
          accentText="text-green-400"
          columnsClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        />
      </div>
    </div>
  );
}
