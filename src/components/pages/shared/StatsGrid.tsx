"use client";

import { cn } from "@/lib/utils";
// `type-2-socket` y no `socket-type-2`: el otro archivo es stroke-only
// (`fill:none` en sus 17 paths y sin viewBox), y bajo una mascara CSS —que solo
// lee el alpha del relleno— no dibujaba casi nada.
import SocketTypeTwo from "../../../../public/images/icons/type-2-socket.svg";

export type StatItem = {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  isCustom?: boolean;
  value: string;
  label?: string;
  sub?: string;
};

type Props = {
  stats: StatItem[];
  accentText: string;
  divide?: string;
  columnsClassName?: string;
};

export function StatsGrid({
  stats,
  accentText,
  divide,
  columnsClassName = "grid-cols-3 sm:grid-cols-4 lg:grid-cols-7",
}: Props) {
  return (
    <div className={cn("grid gap-4 sm:gap-8 lg:gap-6", columnsClassName, divide)}>
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
                  className={cn("w-7 h-7 sm:w-12 sm:h-12", accentText)}
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
                  className={cn("size-7 sm:size-12", accentText)}
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
