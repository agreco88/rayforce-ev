"use client";

import { useTranslations } from "next-intl";

import {
  OptionGroup,
  OptionPrice,
  chipClass,
} from "@/components/pages/shared/hero-with-carousel/HeroOptions";
import { STAND_PRICE, type StandPricing } from "./useStandPricing";

/** Las opciones del panel con los chips del hero de los cargadores: cargador e
 *  instalación, cada uno con su "Sin" y su "+". Recibe el estado en vez de
 *  llamar al hook: es el del panel que lo monta. */
export function StandOptions({ pricing }: { pricing: StandPricing }) {
  const t = useTranslations("HomePage.HomeStandSection.pricingPanel");
  const { theme } = STAND_PRICE;

  return (
    <div className="flex flex-col gap-6 text-left">
      <OptionGroup label={t("charger.label")} stacked>
        {[false, true].map((withCharger) => (
          <button
            key={String(withCharger)}
            type="button"
            aria-pressed={pricing.includeCharger === withCharger}
            onClick={() => pricing.selectCharger(withCharger)}
            className={chipClass(
              pricing.includeCharger === withCharger,
              theme,
              true,
            )}
          >
            {withCharger ? (
              <>
                {t("charger.add", { power: pricing.chargerPower })}
                <OptionPrice amount={pricing.chargerPrice} />
              </>
            ) : (
              t("charger.base")
            )}
          </button>
        ))}
      </OptionGroup>

      <OptionGroup label={t("installation.label")} stacked>
        {[false, true].map((withInstallation) => (
          <button
            key={String(withInstallation)}
            type="button"
            aria-pressed={pricing.includeInstallation === withInstallation}
            onClick={() => pricing.selectInstallation(withInstallation)}
            className={chipClass(
              pricing.includeInstallation === withInstallation,
              theme,
              true,
            )}
          >
            {withInstallation ? (
              <>
                {t("installation.add")}
                <OptionPrice
                  amount={pricing.installationPrice}
                  prefix={t("installation.from")}
                />
              </>
            ) : (
              t("installation.base")
            )}
          </button>
        ))}
      </OptionGroup>
    </div>
  );
}
