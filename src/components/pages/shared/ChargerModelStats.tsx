"use client";

import {
  Zap,
  Plug,
  Cable,
  ShieldCheck,
  Award,
  DropletIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SocketTypeTwo from "../../../../public/images/type-2-socket.svg";

/* ------------------ Types ------------------ */

type StatItem = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  isCustom?: boolean;
  value: string;
  label?: string;
  sub?: string;
};

type Theme = {
  accentText: string;
  accentBg: string;
  accentHover: string;
  divide: string;
  gradientLine: string;
  accentSoft: string;
  accentBorder: string;
  accentGradient: string;
  glow: string;
  glowStrong: string;
};

type Props = {
  model: string;
  theme: Theme;
};

/* ------------------ Data ------------------ */

function getStats(model: string): StatItem[] {
  switch (model) {
    case "bs20-bc-7kw":
      return [
        { icon: Plug, value: "Monofásico", sub: "230V · 32A" },
        {
          icon: SocketTypeTwo as any,
          isCustom: true,
          value: "Tipo 2",
          label: "Conector estándar",
        },
        { icon: Zap, value: "7.4kW", label: "Potencia máxima" },

        { icon: DropletIcon, value: "IP65", label: "Uso interior y exterior" },
        { icon: Award, value: "2 años", label: "Garantía oficial" },
      ];

    case "bs20-bc-11kw":
      return [
        { icon: Plug, value: "Trifásico", sub: "400V · 16A" },
        {
          icon: SocketTypeTwo as any,
          isCustom: true,
          value: "Tipo 2",
          label: "Conector estándar",
        },
        { icon: Zap, value: "11kW", label: "Potencia máxima" },

        { icon: ShieldCheck, value: "IP65", label: "Uso interior y exterior" },
        { icon: Award, value: "2 años", label: "Garantía oficial" },
      ];

    case "bs20-bc-22kw":
      return [
        { icon: Plug, value: "Trifásico", sub: "400V · 32A" },
        {
          icon: SocketTypeTwo as any,
          isCustom: true,
          value: "Tipo 2",
          label: "Conector estándar",
        },
        { icon: Zap, value: "22kW", label: "Potencia máxima" },

        { icon: DropletIcon, value: "IP65", label: "Uso interior y exterior" },
        { icon: Award, value: "2 años", label: "Garantía oficial" },
      ];

    default:
      return [];
  }
}

/* ------------------ Component ------------------ */

export function ChargerModelStats({ model, theme }: Props) {
  const stats = getStats(model);

  return (
    <div className="w-full max-w-7xl mx-auto sm:-mt-20 relative z-30">
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
                <div
                  className={cn(
                    "border-2 rounded-xl p-2.5 flex items-center justify-center",
                    theme.accentBorder,
                  )}
                  style={{
                    boxShadow: `0 0 20px ${theme.glow}`,
                  }}
                >
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
                  ) : (
                    <Icon
                      className={cn("size-8", theme.accentText)}
                      strokeWidth={2}
                    />
                  )}
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
