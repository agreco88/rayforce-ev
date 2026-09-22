"use client";

import { motion } from "motion/react";

import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { cardContainer, cardItem } from "@/lib/animation-variants";

import { WhatIsWallboxCta } from "./WhatIsWallboxCta";
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

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 py-24 sm:px-8 lg:px-16 lg:py-32 2xl:px-0">
        <WhatIsWallboxHeader />

        {/* Las mismas cuatro tarjetas: grilla desde `sm`, carousel abajo de eso.
            El CTA entra como un item mas de la cascada, ultimo, asi la cierra en
            vez de aparecer por su cuenta. */}
        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-8"
        >
          <WhatIsWallboxGrid />
          <WhatIsWallboxMobileCards />

          <motion.div variants={cardItem} className="flex justify-center">
            <WhatIsWallboxCta />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
