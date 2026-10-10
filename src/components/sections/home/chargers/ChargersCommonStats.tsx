"use client";

import {
  Award,
  BadgeCheck,
  DropletIcon,
  Smartphone,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { StatsGrid } from "@/components/pages/shared/StatsGrid";
// La misma mascara que usa `StatsGrid`: `socket-type-2.svg` es solo trazo.
import SocketTypeTwo from "../../../../../public/images/icons/type-2-socket.svg";

/** Sin `icon`, el conector Tipo 2: va con su mascara, lucide no lo tiene.
 * Garantia y envio con el texto de la compra (`ChargerModelPage.Hero`). */
const STATS: { key: string; icon?: LucideIcon }[] = [
  { key: "ursea", icon: BadgeCheck },
  { key: "connector" },
  { key: "protection", icon: DropletIcon },
  { key: "app", icon: Smartphone },
  { key: "warranty", icon: Award },
  { key: "shipping", icon: Truck },
];

export function ChargersCommonStats() {
  const t = useTranslations("HomePage.HomeChargersSection.commonStats");

  /* Sin ancho ni padding propios: los pone el contenedor de la pagina. */
  return (
    <div className="w-full">
      {/* `normal-case`: el h2 global lo pasaria a mayusculas, y entra como
          encabezado de seccion — mismo estilo que el de los consejos. */}
      <h2 className="text-3xl font-light normal-case tracking-tight text-balance text-white sm:text-4xl">
        {t("title")}
      </h2>

      <div className="mt-10 hidden rounded-3xl border border-white/10 bg-white/[0.06] p-10 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:block">
        <StatsGrid
          stats={STATS.map(({ key, icon }) => ({
            icon,
            isCustom: !icon,
            value: t(`${key}.value`),
            label: t(`${key}.label`),
          }))}
          accentText="text-green-400"
          columnsClassName="grid-cols-3 lg:grid-cols-6"
        />
      </div>

      {/* En celular, cajitas de a dos: el panel de `StatsGrid` a ese ancho
          dejaba los iconos enormes y el texto en 11px. */}
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:hidden">
        {STATS.map(({ key, icon: Icon }) => (
          <li
            key={key}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            {Icon ? (
              <Icon className="size-5 text-green-400" strokeWidth={1.75} />
            ) : (
              <span
                aria-hidden="true"
                className="size-5 bg-green-400"
                style={{
                  WebkitMaskImage: `url(${SocketTypeTwo.src})`,
                  maskImage: `url(${SocketTypeTwo.src})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            )}
            {/* `span` y no `p`: el `p` global pisa tamaño y color. */}
            <span className="flex flex-col gap-1 leading-snug">
              <span className="text-sm font-medium text-white">
                {t(`${key}.value`)}
              </span>
              <span className="text-xs text-neutral-400">
                {t(`${key}.label`)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
