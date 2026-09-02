"use client";

import { Zap, Plug, Award, DropletIcon, ShieldCheck, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import SocketTypeTwo from "../../../../public/images/icons/type-2-socket.svg";
import type { CatalogTheme, ChargerProduct } from "@/lib/catalog/catalog.types";

/* ------------------ Types ------------------ */
type StatItem = {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  isCustom?: boolean;
  value: string;
  label?: string;
  sub?: string;
};

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
    <div
      className={cn(
        "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-8 lg:gap-6",
        theme.divide,
      )}
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="flex flex-col text-center items-center gap-2 sm:gap-4"
          >
            {/* Icon */}
            <div
              className={cn(
                "h-12 w-12 sm:h-20 sm:w-20 shrink-0 rounded-xl flex items-center justify-center",
                "border border-white/10 bg-white/[0.03] p-2 sm:p-4",
              )}
            >
              {item.isCustom ? (
                <div
                  className={cn("w-7 h-7 sm:w-12 sm:h-12", theme.accentText)}
                  style={{
                    WebkitMaskImage: `url(${SocketTypeTwo.src})`,
                    maskImage: `url(${SocketTypeTwo.src})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    backgroundColor: "currentColor",
                  }}
                />
              ) : Icon ? (
                <Icon
                  className={cn("size-7 sm:size-12", theme.accentText)}
                  strokeWidth={1.75}
                />
              ) : null}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1 leading-tight">
              <span className="text-white font-medium text-xs sm:text-xl">
                {item.value}
              </span>

              {item.label && (
                <span className="text-[11px] sm:text-sm text-neutral-400">
                  {item.label}
                </span>
              )}

              {item.sub && (
                <span className="text-[11px] sm:text-sm text-neutral-400">
                  {item.sub}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
