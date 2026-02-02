"use client";

import { CheckIcon, XIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useTranslations } from "next-intl";

import { CHARGERS, COMPARISON_SECTIONS } from "@/lib/products-data";

const SECTION_KEYS = ["mainSpecs", "connectivity", "protection"] as const;

const FEATURE_KEYS = {
  mainSpecs: [
    "maxPower",
    "phaseType",
    "nominalCurrent",
    "voltage",
    "display",
    "wallMount",
  ],
  connectivity: ["appControl", "wireless"],
  protection: ["electricalProtection", "ipRating", "temperature"],
} as const;

export function ComparisonTable() {
  const t = useTranslations("HomePage.RayforceProductSection.ComparisonTable");

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-20 hidden lg:block">
      {COMPARISON_SECTIONS.map((section, sectionIndex) => {
        const sectionKey = SECTION_KEYS[sectionIndex];

        return (
          <div key={sectionKey} className="mt-24 first:mt-0">
            <div
              className="grid gap-x-8 mb-8"
              style={{
                gridTemplateColumns: `1fr repeat(${CHARGERS.length}, 1fr)`,
              }}
            >
              <h3 className="text-lg font-semibold text-white">
                {t(`sections.${sectionKey}.title`)}
              </h3>

              {sectionIndex === 0 &&
                CHARGERS.map((charger) => (
                  <div key={charger.key} className="text-center">
                    <div className="text-xl font-semibold text-white">
                      {charger.roleLabel}
                    </div>
                    <div className="text-xs text-gray-400">
                      {charger.modelLabel}
                    </div>
                  </div>
                ))}
            </div>

            <table className="w-full table-fixed border-separate border-spacing-y-2">
              <tbody>
                {section.features.map((feature, featureIndex) => {
                  const featureKey = FEATURE_KEYS[sectionKey][featureIndex];

                  return (
                    <tr key={featureKey}>
                      <th className="py-3 pr-6 text-left text-sm font-normal text-gray-400">
                        {t(`sections.${sectionKey}.features.${featureKey}`)}
                      </th>

                      {CHARGERS.map((charger) => {
                        const value = feature.tiers[charger.key];

                        return (
                          <td
                            key={charger.key}
                            className="py-3 text-center outline outline-neutral-800/80"
                          >
                            {typeof value === "string" ? (
                              <span className="text-sm text-white">
                                {t(`values.${value}`)}
                              </span>
                            ) : value ? (
                              <CheckIcon className="mx-auto h-5 w-5 text-green-400" />
                            ) : (
                              <XIcon className="mx-auto h-5 w-5 text-neutral-600" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}

      <table className="w-full table-fixed border-separate border-spacing-y-2 mt-12">
        <tbody>
          <tr>
            <th className="py-3 pr-6 text-left text-xl font-bold uppercase tracking-wide text-gray-200">
              {t("priceLabel")}
            </th>

            {CHARGERS.map((charger) => (
              <td
                key={charger.key}
                className="py-3 text-center outline outline-neutral-800/80"
              >
                <span className="text-2xl font-bold bg-gradient-to-b from-green-300 via-green-400 to-green-600 bg-clip-text text-transparent">
                  {charger.price}
                </span>
              </td>
            ))}
          </tr>

          <tr>
            <th className="py-3 pr-6" />

            {CHARGERS.map((charger) => (
              <td key={charger.key}>
                <div className="flex justify-center mt-4">
                  <WhatsAppCellCTA
                    model={`${charger.roleLabel} – ${charger.modelLabel}`}
                  />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------
 * WhatsApp CTA
 * ---------------------------------------------------------------- */

function WhatsAppCellCTA({ model }: { model: string }) {
  const t = useTranslations("HomePage.RayforceProductSection.ComparisonTable");

  const message = encodeURIComponent(t("cta.message", { model }));

  return (
    <a
      href={`https://wa.me/+59899168085?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
      inline-flex items-center justify-center gap-2
        rounded w-full mr-1
        px-4 sm:px-8 py-3
        text-sm sm:text-base
        text-white
        border border-green-900
        bg-gradient-to-b from-green-950 to-green-600
        bg-[length:100%_200%]
        bg-[position:0%_0%]
        transition-[background-position] duration-1000
        hover:bg-[position:0%_100%]
        shadow-sm
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-white/40
      "
    >
      <FaWhatsapp className="size-6 text-white" />
      {t("cta.button")}
    </a>
  );
}
