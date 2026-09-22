"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { cn } from "@/lib/utils";
import { useTrack } from "@/lib/analytics";

import { BrandSelect } from "./compatibility/BrandSelect";
import { ModelGrid } from "./compatibility/ModelGrid";
import { COMPATIBILITY_DATA } from "./compatibility/compatibility.data";
import { DEFAULT_THEME, type Theme } from "./compatibility/compatibility.theme";

type Props = {
  theme?: Theme;
  id?: string;
};

/**
 * Compatibilidad centrada: el título, el selector de marca y los modelos de la
 * marca elegida. La montan las páginas de cargador —teñida con el color de su
 * producto (`theme`)— y el footer de la home, arriba de su CTA.
 */
export function CompatibilitySection({ theme, id }: Props) {
  const ui = theme ?? DEFAULT_THEME;
  const t = useTranslations("HomePage.CompatibilitySection");
  const track = useTrack();

  const [selectedBrand, setSelectedBrand] = useState<string | null>("BYD");
  const brand = COMPATIBILITY_DATA.find((b) => b.name === selectedBrand);

  function handleBrandChange(name: string | null) {
    setSelectedBrand(name);
    if (name) track.compatibilityBrandExpanded(name);
  }

  return (
    <section
      id={id}
      className="relative scroll-mt-24 overflow-hidden bg-neutral-950 px-6 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32"
    >
      {/* El mismo fondo que el resto de las secciones. `lineThickness` 2 y no
          el 1 por defecto: es el grosor que ya tenía esta sección. */}
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        lineThickness={2}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 80% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div className="relative z-10 container mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className={cn("text-sm tracking-[0.25em] uppercase", ui.accentText)}>
            {t("header.eyebrow")}
          </p>

          <h2 className="mt-4 text-4xl tracking-tight sm:text-6xl">
            {t("header.title")}
          </h2>

          <p className="mt-6 text-lg text-neutral-400">
            {t("header.description")}
          </p>

          <div className="mx-auto mt-10 max-w-[13rem]">
            <BrandSelect
              value={selectedBrand}
              onValueChange={handleBrandChange}
              ui={ui}
            />
          </div>
        </div>

        <div
          className={cn(
            "mx-auto mt-14 mb-10 h-[2px] max-w-3xl bg-gradient-to-r opacity-50",
            ui.gradientLine,
          )}
        />

        {/* `text-center` acá y no en la grilla: es el layout centrado el que
            quiere el label y las pills al medio, no la grilla en sí. */}
        <div className="mx-auto max-w-3xl text-center">
          <ModelGrid brand={brand} ui={ui} />
        </div>
      </div>
    </section>
  );
}
