"use client";

import { useTranslations } from "next-intl";

/**
 * La guia de decision, debajo de la grilla: las cuatro fichas dicen que hay,
 * esto responde cual conviene.
 *
 * Tres criterios y no una tabla comparativa: la eleccion real se define por la
 * instalacion que ya tenes (monofasica o trifasica), y recien despues por cable
 * y potencia. La tabla completa vive en la pagina de cada modelo.
 */
export function HomeLineupGuide() {
  const t = useTranslations("HomePage.Lineup.guide");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <div className="rounded-2xl border border-neutral-900 bg-neutral-900/20 px-10 py-9">
      {/* `normal-case`: el h3 global es un eyebrow (uppercase, verde, chico) y
          acá es el titulo del bloque. */}
      <h3 className="text-xl font-light normal-case tracking-tight text-white">
        {t("title")}
      </h3>

      <div className="mt-8 grid grid-cols-3 gap-x-10 gap-y-8">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col">
            <span className="flex items-start gap-2.5 text-sm font-medium text-neutral-200">
              <span
                className="mt-[0.4375rem] size-1 shrink-0 rounded-full bg-green-400"
                aria-hidden="true"
              />
              {item.title}
            </span>

            {/* El sangrado alinea la descripcion con el titulo, salteando la
                vineta: `size-1` mas el `gap-2.5`. */}
            <p className="mt-2 pl-[1.125rem] text-sm leading-relaxed text-neutral-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 border-t border-neutral-800 pt-6 text-sm leading-relaxed text-neutral-500">
        {t("footnote")}
      </p>
    </div>
  );
}
