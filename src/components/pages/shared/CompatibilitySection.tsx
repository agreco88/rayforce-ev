"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";

import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { cn } from "@/lib/utils";
import { useTrack } from "@/lib/analytics";

import { BrandLogo } from "./compatibility/BrandLogo";
import { BrandSelect } from "./compatibility/BrandSelect";
import { ModelGrid } from "./compatibility/ModelGrid";
import { COMPATIBILITY_DATA } from "./compatibility/compatibility.data";
import { DEFAULT_THEME, type Theme } from "./compatibility/compatibility.theme";

type Props = {
  theme?: Theme;
  id?: string;
};

/**
 * Compatibilidad: el título, el selector de marca y los modelos de la marca
 * elegida, lado a lado en desktop. La montan las páginas de cargador —teñida con el color de su
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
    if (name) track.compatibilityBrandSelected(name);
  }

  return (
    <section
      id={id}
      className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-[#0f0f0f] pt-24 pb-24 sm:border-y-0 sm:bg-neutral-950 sm:px-8 sm:pt-32 sm:pb-32"
    >
      {/* En mobile la seccion ES la caja: #0f0f0f es el neutral-950 con el
          white/[0.02] de la caja encima, ya resuelto. */}
      {/* El mismo fondo que el resto de las secciones. `lineThickness` 2 y no
          el 1 por defecto: es el grosor que ya tenía esta sección. */}
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        lineThickness={2}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 80% at 50% 0%, #000 20%, transparent 80%)"
      />

      {/* Carril del header: el padding afuera del `max-w`, asi el contenido
          mide 1440 limpios. El `container` de Tailwind v4 no trae padding
          propio, asi que el gutter va explicito. */}
      <div className="relative z-10 sm:px-8">
        {/* Todo en una caja: separados, el dropdown y los modelos no se leian
            como parte de lo mismo. 50/50 en desktop, apilado en mobile, donde
            la caja se disuelve en la seccion y queda el gutter de la ficha. */}
        <div className="relative mx-auto grid w-full max-w-[1440px] gap-8 overflow-hidden px-4 sm:px-6 sm:rounded-2xl sm:border sm:border-white/10 sm:bg-white/[0.02] sm:p-8 lg:grid-cols-2 lg:gap-0 lg:p-12">
          {/* La marca elegida de marca de agua, cortada por la esquina de la
              caja. `popLayout`: la que sale no empuja a la que entra. Solo desktop:
              en mobile no queda lugar libre y se perdia atras del texto. */}
          <AnimatePresence mode="popLayout" initial={false}>
            {selectedBrand && (
              <motion.div
                key={selectedBrand}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.06, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="pointer-events-none absolute -top-10 -right-16 hidden text-white lg:block"
              >
                <BrandLogo name={selectedBrand} className="block h-56 w-96" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centrada en alto: los modelos cambian de largo segun la marca y
              el titulo acompaña en vez de quedar arriba solo. */}
          <div className="relative lg:self-center lg:pr-16">
            <p className={cn("section-eyebrow", ui.accentText)}>
              {t("header.eyebrow")}
            </p>

            <h2 className="section-title mt-4">{t("header.title")}</h2>

            <p className="mt-6 section-subtitle">{t("header.description")}</p>
          </div>

          {/* El dropdown encabeza los modelos que filtra: asi se ve que
              cambiarlo cambia la lista. El separador es horizontal en mobile y
              vertical en desktop. */}
          <div className="relative flex flex-col gap-8 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
            <div className="flex flex-col gap-3">
              <span
                id="compatibility-brand-label"
                className="text-sm font-medium text-white"
              >
                {t("selectLabel")}
              </span>
              {/* Ancho completo en mobile: es el unico control de la seccion y
                  va a dedo. */}
              <div className="w-full lg:max-w-[16rem]">
                <BrandSelect
                  value={selectedBrand}
                  onValueChange={handleBrandChange}
                  ui={ui}
                  labelId="compatibility-brand-label"
                />
              </div>
            </div>
            <ModelGrid brand={brand} ui={ui} />
          </div>
        </div>
      </div>
    </section>
  );
}
