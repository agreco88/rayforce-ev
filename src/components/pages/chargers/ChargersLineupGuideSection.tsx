"use client";

import { useTranslations } from "next-intl";
import { LineupGuideCards } from "@/components/sections/home/lineup/LineupGuideCards";

/**
 * La guia de 3 pasos del lineup, sin la grilla de productos: ya esta ahi
 * arriba. Mismas tarjetas que el lineup del home (`LineupGuideCards`), que
 * apilan solas en mobile.
 *
 * Sin ancho ni padding propios: los pone el contenedor de la pagina, que la
 * monta junto al hero y la grilla sobre el mismo fondo.
 */
export function ChargersLineupGuideSection() {
  const t = useTranslations("HomePage.Lineup.guide");

  return (
    <section className="w-full">
      {/* `normal-case`: el h2 global no lo toca, pero el titulo entra aca como
          encabezado de bloque y no como el de la pagina — ese lo da el hero. */}
      <h2 className="text-3xl font-light normal-case tracking-tight text-balance text-white sm:text-4xl">
        {t("title")}
      </h2>

      <div className="mt-10">
        <LineupGuideCards />
      </div>
    </section>
  );
}
