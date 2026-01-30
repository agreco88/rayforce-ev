"use client";

import {
  AlertTriangle,
  PlugZap,
  BatteryCharging,
  Smartphone,
  SlidersHorizontal,
  Clock,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/container";

/* ------------------------------------------------------------------
 * Charging Safety Section — Desktop
 * ---------------------------------------------------------------- */

export function ChargingSafetyDesktop() {
  const t = useTranslations("HomePage.ChargingSafetySection");

  return (
    <section className="relative border-y border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-24">
      <Container className="relative mx-auto max-w-[88rem] flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
            {t("header.title")}
          </h2>

          <p className="mt-6 max-w-3xl text-neutral-400">
            {t("header.description")}
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 max-w-6xl">
          {/* Risks */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-lg font-medium text-neutral-50">
              {t("risks.title")}
            </h3>

            <div className="h-[0.07rem] opacity-40 rounded-full bg-gradient-to-r from-red-500 via-red-500 to-red-950 mt-4" />

            <ul className="mt-8 space-y-6">
              <RiskItem
                icon={PlugZap}
                title={t("risks.items.overload.title")}
                description={t("risks.items.overload.description")}
              />
              <RiskItem
                icon={AlertTriangle}
                title={t("risks.items.protections.title")}
                description={t("risks.items.protections.description")}
              />
              <RiskItem
                icon={PlugZap}
                title={t("risks.items.outlets.title")}
                description={t("risks.items.outlets.description")}
              />
              <RiskItem
                icon={BatteryCharging}
                title={t("risks.items.batteryWear.title")}
                description={t("risks.items.batteryWear.description")}
              />
            </ul>
          </div>

          {/* Solutions */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-lg font-medium text-neutral-50">
              {t("solutions.title")}
            </h3>

            <div className="h-[0.07rem] opacity-30 rounded-full bg-gradient-to-r from-green-500 via-green-500 to-green-950 mt-4" />

            <ul className="mt-8 space-y-6">
              <SolutionItem
                icon={Smartphone}
                title={t("solutions.items.mobileControl.title")}
                description={t("solutions.items.mobileControl.description")}
              />
              <SolutionItem
                icon={Clock}
                title={t("solutions.items.smartScheduling.title")}
                description={t("solutions.items.smartScheduling.description")}
              />
              <SolutionItem
                icon={SlidersHorizontal}
                title={t("solutions.items.powerRegulation.title")}
                description={t("solutions.items.powerRegulation.description")}
              />
              <SolutionItem
                icon={BatteryCharging}
                title={t("solutions.items.batteryCare.title")}
                description={t("solutions.items.batteryCare.description")}
              />
            </ul>
          </div>
        </div>

        {/* Closing statement */}
        <p className="mt-16 max-w-2xl text-center text-lg font-light text-balance sm:text-xl text-neutral-200 whitespace-pre-line">
          {t("closing")}
        </p>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------- */

function RiskItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <li className="flex flex-col sm:flex-row gap-4 min-h-[72px] lg:min-h-[80px]">
      <Icon className="size-4 mt-0.5 text-red-500 shrink-0" />
      <div>
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>
      </div>
    </li>
  );
}

function SolutionItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <li className="flex flex-col sm:flex-row gap-4 min-h-[72px] lg:min-h-[80px]">
      <Icon className="size-4 mt-0.5 text-green-500 shrink-0" />
      <div>
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>
      </div>
    </li>
  );
}
