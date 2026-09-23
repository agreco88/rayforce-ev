"use client";

import { useTranslations } from "next-intl";

/**
 * La guia de decision con los 3 pasos para elegir modelo, reusada en el
 * lineup del home y en /cargadores. La eleccion real es una secuencia — te la
 * define la instalacion que ya tenes (monofasica o trifasica), recien despues
 * elegis cable o toma, y al final potencia.
 *
 * `columns`: 3 en fila para desktop, 1 apilada para mobile — mismo contenido,
 * sin duplicar el componente por un cambio de grid.
 */
export function HomeLineupGuide({
  columns = 3,
}: {
  columns?: 1 | 3;
}) {
  const t = useTranslations("HomePage.Lineup.guide");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <div className="rounded-2xl border border-neutral-900 bg-neutral-900/20 px-6 py-7 sm:px-10 sm:py-9">
      {/* `normal-case`: el h3 global es un eyebrow (uppercase, verde, chico) y
          acá es el titulo del bloque. */}
      <h3 className="text-xl font-light normal-case tracking-tight text-white">
        {t("title")}
      </h3>

      {/* `items-start`: sin esto las columnas se estiran a la mas alta y el
          numero de cada una queda alineado pero el texto no. */}
      <ol
        className={`mt-8 grid list-none items-start gap-x-10 gap-y-8 ${
          columns === 3 ? "grid-cols-3" : "grid-cols-1"
        }`}
      >
        {items.map((item, index) => (
          <li key={item.title} className="flex flex-col">
            <span className="flex items-start gap-3 text-sm font-medium text-neutral-200">
              {/* El numero lleva el orden de lectura: la guia se lee de a pasos
                  (instalacion → cable → potencia), no como una lista suelta. */}
              <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full border border-green-400/30 bg-green-400/10 text-[0.6875rem] font-semibold tabular-nums text-green-400"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              {item.title}
            </span>

            {/* El sangrado alinea la descripcion con el titulo, salteando el
                numero: `size-5` mas el `gap-3`. */}
            <p className="mt-2 pl-8 text-sm leading-relaxed text-neutral-400">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
