"use client";

import { motion } from "motion/react";

import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { cardContainer } from "@/lib/animation-variants";

import { WhatIsWallboxGrid } from "./WhatIsWallboxGrid";
import { WhatIsWallboxHeader } from "./WhatIsWallboxHeader";
import { WhatIsWallboxMobileCards } from "./WhatIsWallboxMobileCards";

export function WhatIsWallboxSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950"
    >
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      {/* El header y las tarjetas son la misma grilla de dos columnas: el titulo
          y el video son dos items mas, solo que con la caja mas alta. Por eso el
          salto entre ellos es el mismo `gap-6 lg:gap-8` que separa las filas de
          tarjetas, y no un gap propio del contenedor.

          El padding va afuera del `max-w`: asi el contenido mide 1440
          limpios, el mismo carril que el header y el hero. */}
      <div className="relative z-10 px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:gap-8">
          <WhatIsWallboxHeader />

          {/* Las mismas cuatro tarjetas: grilla desde `sm`, carousel abajo de eso. */}
          <motion.div
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6 lg:gap-8"
          >
            <WhatIsWallboxGrid />
            <WhatIsWallboxMobileCards />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
