"use client";

import type { ReactNode } from "react";
import { BadgeCheck, Cable, Moon, Smartphone, Unplug, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatPowerKw } from "@/lib/catalog/catalog.helpers";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: ChargerProduct;
};

/** Los beneficios en lista vertical, con la caja de icono del stat strip y el
 * divisor en gradiente de `ChargerModelHeroStats`. */
export function HeroFeatureList({ product }: Props) {
  const t = useTranslations("ChargerModelPage.Hero.features");
  const locale = useLocale();
  const { theme, specs } = product;

  const accent = (chunks: ReactNode) => (
    <span className={theme.accentText}>{chunks}</span>
  );
  const power = formatPowerKw(specs.maxPowerKw, locale);

  const items = [
    {
      icon: BadgeCheck,
      title: t("ursea.title"),
      description: t("ursea.description", {
        authNumber: product.ursea.authNumber,
      }),
    },
    {
      icon: Zap,
      title: t.rich(`power.${specs.phaseType}.title`, { accent, power }),
      description: t(`power.${specs.phaseType}.description`),
    },
    specs.cableType === "socket"
      ? {
          icon: Unplug,
          title: t.rich("cable.socket.title", { accent }),
          description: t("cable.socket.description"),
        }
      : {
          icon: Cable,
          title: t.rich("cable.integrated.title", {
            accent,
            length: specs.cableLengthM ?? 0,
          }),
          description: t("cable.integrated.description"),
        },
    {
      icon: Moon,
      title: t.rich("schedule.title", { accent }),
      description: t("schedule.description"),
    },
    {
      icon: Smartphone,
      title: t.rich("app.title", { accent }),
      description: t("app.description"),
    },
  ];

  // Separador solo arriba y abajo de la lista: la enmarca entre la descripcion
  // y las variantes, y los items se separan con aire.
  const separator = (
    <div className={`h-px w-full bg-gradient-to-r ${theme.gradientLine}`} />
  );

  return (
    <div className="flex flex-col">
      {separator}

      {/* La caja del icono es la del stat strip (`StatsGrid`), a la escala de una fila. */}
      <ul className="flex flex-col gap-5 py-6">
        {items.map(({ icon: Icon, title, description }, index) => (
          <li key={index} className="flex items-center gap-4">
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
              aria-hidden="true"
            >
              <Icon
                className={`size-6 ${theme.accentText}`}
                strokeWidth={1.75}
              />
            </span>

            <div className="flex flex-col gap-0.5">
              <h3 className="text-base font-medium normal-case tracking-tight text-white">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-pretty text-neutral-400">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {separator}
    </div>
  );
}
