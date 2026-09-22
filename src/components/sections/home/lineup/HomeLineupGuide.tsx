"use client";

import { useTranslations } from "next-intl";

/**
 * La guia de decision, debajo de la grilla: las cuatro fichas dicen que hay,
 * esto responde cual conviene.
 *
 * Numerada y no una tabla comparativa: la eleccion real es una secuencia — te
 * la define la instalacion que ya tenes (monofasica o trifasica), recien
 * despues elegis cable o toma, y al final potencia. La tabla completa vive en
 * la pagina de cada modelo.
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

      {/* `items-start`: sin esto las tres columnas se estiran a la mas alta y
          el numero de cada una queda alineado pero el texto no. */}
      <ol className="mt-8 grid list-none grid-cols-3 items-start gap-x-10 gap-y-8">
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

      {/* El filete va en el contenedor y no en el `p`: centrado y con
          `max-w-2xl`, el borde se cortaria al ancho del texto en vez de cerrar
          el bloque entero. */}
      <div className="mt-8 border-t border-neutral-800 pt-6">
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-neutral-500">
          {t("footnote")}
        </p>
      </div>
    </div>
  );
}
