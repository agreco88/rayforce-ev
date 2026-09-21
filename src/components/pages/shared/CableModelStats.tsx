"use client";

import { Plug, Ruler, DropletIcon, Thermometer } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import SocketTypeTwo from "../../../../public/images/icons/type-2-socket.svg";
import type { CatalogTheme, CableProduct } from "@/lib/catalog/catalog.types";

/* ------------------ Types ------------------ */
type StatItem = {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  isCustom?: boolean;
  value: string;
  label?: string;
  sub?: string;
};

type Props = {
  product: CableProduct;
  theme: CatalogTheme;
};

/* ------------------ Component ------------------ */

export function CableModelStats({ product, theme }: Props) {
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

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-0 sm:-mt-20 sm:-mb-20 relative z-30">
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

        <div
          className={cn(
            "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10",
            theme.divide,
          )}
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex flex-col text-center items-center gap-4"
              >
                {/* Icon */}
                <div className="border border-white/10 bg-white/[0.03] rounded-xl p-2.5 flex items-center justify-center">
                  {item.isCustom ? (
                    <div
                      className={cn("w-8 h-8", theme.accentText)}
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
                      className={cn("size-8", theme.accentText)}
                      strokeWidth={2}
                    />
                  ) : null}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-0.5 leading-tight">
                  <span className="text-white font-medium text-sm sm:text-lg">
                    {item.value}
                  </span>

                  {item.label && (
                    <span className="text-xs text-neutral-400">
                      {item.label}
                    </span>
                  )}

                  {item.sub && (
                    <span className="text-xs text-neutral-400">{item.sub}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
