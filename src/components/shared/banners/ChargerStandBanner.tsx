"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Props = {
  id?: string;
};

export function ChargerStandSection({ id }: Props) {
  return (
    <section
      id={id}
      className="
        relative isolate overflow-hidden
        flex justify-center 
        
      "
    >
      {/* Container */}
      <div className="relative w-full max-w-[1440px]">
        {/* Canvas */}
        <div
          className="
            relative
            w-full
            h-[520px]
            sm:h-[620px]
            md:h-[540px]
            lg:h-[600px]
            xl:h-[640px]
            2xl:h-[880px]
            max-h-[880px]
            overflow-hidden
          "
        >
          {/* IMAGE */}
          <div className="absolute inset-0 flex justify-center bg-neutral-950">
            <img
              src="/images/stand-9.png"
              alt="Columna de instalación para cargador EV"
              className="
                h-full
                w-full
                object-cover
                object-[63%_center]
              "
            />
          </div>

          {/* MOBILE OVERLAY */}
          <div
            className="
              absolute inset-0

              bg-gradient-to-t
              from-black/50
              via-black/70
              to-transparent

              md:bg-gradient-to-r
              md:from-neutral-950/75
              md:via-neutral-950/30
              md:to-transparent
            "
          />

          {/* SIDE VIGNETTE */}
          <div className="hidden sm:flex pointer-events-none absolute inset-0">
            <div className="absolute left-0 h-full w-[15%] bg-gradient-to-r from-neutral-950 via-neutral-950 to-transparent" />
            <div className="absolute right-0 h-full w-[15%] bg-gradient-to-l from-neutral-950 via-neutral-950 to-transparent" />
          </div>

          {/* CONTENT */}
          <div
            className="
              absolute inset-0
              flex items-end
              md:items-center
            "
          >
            <div
              className="
                w-full
                px-4
                pb-8
                sm:px-6
                md:pb-0
                lg:pl-36
              "
            >
              <div
                className="
                  flex flex-col gap-4

                  
                  sm:max-w-md
                  lg:max-w-lg

       
                  md:backdrop-blur-none
                "
              >
                {/* TITLE */}
                <h2
                  className="
                    w-xs sm:w-3xl
                    text-3xl
                    sm:text-5xl
                    lg:text-6xl
                    leading-[0.95]
                    tracking-tight
                    flex 
                    
                  "
                >
                  Instalá tu cargador Rayforce donde quieras
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="
                    text-sm
                    sm:text-lg
                    w-xs sm:w-2xl
                    leading-relaxed
                    text-neutral-300
                  "
                >
                  Sumá una columna de instalación robusta y elegante para tu
                  cargador. Ideal para espacios exteriores o donde no tenés una
                  pared disponible.
                </p>

                {/* SPECS */}
                <span className="text-sm text-neutral-500">
                  Altura: 150 cm · Base: 26 × 14.5 cm
                </span>

                {/* PRICE */}
                <div className="flex items-end gap-2.5 mt-2 sm:mt-4">
                  <span
                    className="
                      text-4xl
                      sm:text-5xl
                      lg:text-6xl

                      font-thin
                      tracking-tighter
                      text-green-500
                    "
                  >
                    USD 158
                  </span>

                  <span className="text-sm mb-1 text-neutral-400">
                    IVA inc.
                  </span>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  variant="ghost"
                  className="w-fit p-0 mb-8 hover:bg-transparent"
                >
                  <Link
                    href="#contact"
                    className="
                      flex items-center gap-1

                      text-sm
                      uppercase
                      tracking-wide

                      text-neutral-300
                      hover:text-green-500
                      hover:bg-transparent!
                      transition-all
                      hover:gap-3

                      mt-2
                    "
                  >
                    Contactanos y conseguí la tuya
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
