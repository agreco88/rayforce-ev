"use client";

import { CheckIcon, XIcon } from "lucide-react";
import { CHARGERS, COMPARISON_SECTIONS } from "@/lib/products-data";

export function ComparisonTable() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-20 hidden lg:block">
      {COMPARISON_SECTIONS.map((section, sectionIndex) => (
        <div key={section.name} className="mt-24 first:mt-0">
          {/* Section header + column headers */}
          <div className="grid grid-cols-3 gap-x-8 mb-8">
            <h3 className="text-lg font-semibold text-white">{section.name}</h3>

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

          <table className="w-full border-separate border-spacing-y-2">
            <tbody>
              {section.features.map((feature) => (
                <tr key={feature.name}>
                  <th className="w-1/3 py-3 pr-6 text-left text-sm font-normal text-gray-400">
                    {feature.name}
                  </th>

                  {CHARGERS.map((charger) => {
                    const value = feature.tiers[charger.key];

                    return (
                      <td
                        key={charger.key}
                        className="w-1/3 py-3 text-center outline outline-neutral-800/80"
                      >
                        {typeof value === "string" ? (
                          <span className="text-sm text-white">{value}</span>
                        ) : value ? (
                          <CheckIcon className="mx-auto h-5 w-5 text-green-400" />
                        ) : (
                          <XIcon className="mx-auto h-5 w-5 text-neutral-600" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* ---------------- PRICE ROW ---------------- */}
      <table className="w-full border-separate border-spacing-y-2">
        <tbody>
          {/* Price values */}
          <tr>
            <th className="w-1/3 py-3 pr-6 text-left text-sm font-normal text-gray-400">
              Precio
            </th>

            {CHARGERS.map((charger) => (
              <td
                key={charger.key}
                className="w-1/3 py-3 text-center outline outline-neutral-800/80 "
              >
                <span className="text-sm font-medium text-white">
                  {charger.price}
                </span>
              </td>
            ))}
          </tr>

          {/* WhatsApp CTA row */}
          <tr>
            <th className="w-1/3 py-3 pr-6" />

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

import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

function WhatsAppCellCTA({ model }: { model: string }) {
  const message = encodeURIComponent(
    `Hola! Quiero información sobre el modelo ${model}.`
  );

  return (
    <a
      href={`https://wa.me/598XXXXXXXX?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
            border border-green-900 hover:shadow-inner
            inline-flex items-center justify-center
            rounded-full
            text-white
            px-4 sm:px-8 py-3
            gap-2
            text-sm sm:text-base

            mx-auto
            bg-gradient-to-b
            from-green-950 to-green-600
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
      Quiero este modelo
    </a>
  );
}
