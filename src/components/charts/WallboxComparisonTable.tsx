"use client";

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";

type Row = {
  key: string;
  type: "value" | "boolean";
};

const ROWS: Row[] = [
  { key: "chargeTime", type: "value" },
  { key: "power", type: "value" },
  { key: "recommendedUse", type: "value" },
  { key: "communication", type: "boolean" },
  { key: "protection", type: "boolean" },
  { key: "dedicatedInstall", type: "boolean" },
];

/**
 * Tabla comparativa Cable Schuko vs Wallbox Rayforce: título + columnas
 * (alineadas a la derecha) + filas, cada una en texto (tiempo/potencia/uso)
 * o check/cruz (comunicación, protecciones, instalación dedicada). Mismas
 * filas que RayforceComparison.tsx (home), adaptadas al estilo de card
 * (rounded-2xl border) usado en esta sección en vez de la tabla full-width.
 */
export function WallboxComparisonTable() {
  const t = useTranslations("HomePage.WallboxIntro.whyBetter.table");

  return (
    <div className="w-full rounded-2xl border border-neutral-900 bg-neutral-900/20 p-6 sm:p-8">
      <span className="text-xs tracking-widest text-neutral-500 uppercase">
        {t("title")}
      </span>

      <div className="mt-6">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 pb-4">
          <span />
          <span className="w-24 text-right text-xs font-medium text-neutral-400">
            {t("columns.schuko")}
          </span>
          <span className="w-28 text-right text-xs font-medium text-green-400">
            {t("columns.wallbox")}
          </span>
        </div>

        {ROWS.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-t border-neutral-900 py-4"
          >
            <span className="pr-2 text-sm text-neutral-300">
              {t(`rows.${row.key}.label`)}
            </span>

            {row.type === "boolean" ? (
              <>
                <span className="flex w-24 justify-end">
                  <X className="size-5 text-neutral-600" strokeWidth={2.5} />
                </span>
                <span className="flex w-28 justify-end">
                  <Check className="size-5 text-green-400" strokeWidth={2.5} />
                </span>
              </>
            ) : (
              <>
                <span className="w-24 text-right text-sm tabular-nums text-neutral-400">
                  {t(`rows.${row.key}.schuko`)}
                </span>
                <span className="w-28 text-right text-sm font-medium tabular-nums text-green-400">
                  {t(`rows.${row.key}.wallbox`)}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
