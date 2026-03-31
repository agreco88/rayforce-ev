"use client";

import { ArrowDown, CheckIcon, XIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useTranslations } from "next-intl";

import { CHARGERS, COMPARISON_SECTIONS } from "@/lib/products-data";
import { Button } from "./ui/button";
import { scrollToSection } from "@/lib/scroll-to-section";
import clsx from "clsx";

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

type PriceCellProps = {
  amount: number;
  currency: string;
  vatLabel?: string;
};

export function PriceCell({ amount, currency, vatLabel }: PriceCellProps) {
  const formatted = new Intl.NumberFormat("es-UY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  const [integer, decimals] = formatted.split(",");

  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-3">
      <div className="inline-flex items-start font-thin text-3xl text-white">
        <span className="ml-2 inline-flex  items-start font-thin widest text-3xl">
          {currency}
        </span>
        <span className="tracking-wide pl-2">{integer}</span>
      </div>

      {vatLabel && (
        <span className="text-base text-neutral-400 mt-1">{vatLabel}</span>
      )}
    </div>
  );
}

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
            {sectionIndex === 0 && (
              <table className="w-full table-fixed border-separate border-spacing-y-2 mt-12 mb-16">
                <tbody>
                  <tr>
                    <th className="py-3 pr-6 text-left text-xl font-bold uppercase tracking-wide text-gray-200">
                      {t("priceLabel")}
                    </th>

                    {CHARGERS.map((charger) => (
                      <td
                        key={charger.key}
                        className="py-3  outline outline-neutral-800/80"
                      >
                        <PriceCell
                          amount={charger.price.amount}
                          currency={charger.price.currency}
                          vatLabel={charger.price.vatLabel}
                        />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th className=" pr-6" />
                    {CHARGERS.map((charger) => (
                      <td key={charger.key}>
                        <div className="flex justify-center  gap-8!">
                          <WhatsAppCellCTA
                            model={`${charger.roleLabel} – ${charger.modelLabel}`}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
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
      <div className="flex flex-col w-full gap-8 sm:mt-8 xl:mt-16 items-center justify-center">
        <div className="flex flex-col gap-2 text-center">
          <strong>OPCIONAL</strong>{" "}
          <p> Columna de instalación para cargador por:</p>
        </div>

        <div className="border px-10 py-1 rounded-lg shadow shadow-neutral-700">
          <div className="flex flex-col items-center justify-center pt-4 pb-3">
            <span className="ml-2 inline-flex  items-start font-thin widest text-3xl">
              U$$ 165
            </span>
            <span className="tracking-wide pl-2 text-neutral-500">IVA Inc</span>
          </div>
        </div>
        {/* <Button
          variant="link"
          onClick={() => {
            scrollToSection("stand");
          }}
          className={clsx(
            "text-neutral-50!",
            "cursor-pointer",
            "hover:text-green-400!",
            "transition-all duration-300",
            "flex flex-col items-center gap-4 mt-4 group ",
          )}
        >
          VER MAS{" "}
          <ArrowDown className="transition-all  size-5 duration-300 group-hover:text-green-400 opacity-50 group-hover:opacity-100 animate-bounce" />
        </Button> */}
      </div>
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
      href={`https://wa.me/+598092041709?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center justify-center gap-2
        rounded w-full
        py-3 mx-1
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
