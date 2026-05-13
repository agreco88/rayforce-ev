"use client";

import { ChargerVariant } from "@/lib/chargers/chargers.type";
import { BackgroundIllustration } from "./animated/BackgroundIllustration";
import { ChargerEV } from "./animated/charger-ev/ChargerEv";

type Props = {
  variants: ChargerVariant[];
};

export function getSegmentLabel(variant: ChargerVariant): string {
  if (variant.specs.maxPowerKw <= 7) return "Residencial";
  if (variant.specs.maxPowerKw <= 11) return "Comercial";
  return "Industrial";
}

export function ChargerShowcase({ variants }: Props) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background stays generic */}
      <BackgroundIllustration />

      <ul className="grid grid-cols-3">
        {variants.map((variant) => {
          return (
            <li
              key={variant.key}
              className="flex flex-wrap justify-center items-center flex-col relative gap-6 text-center"
            >
              {/* Meta */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-5xl tracking-tight uppercase">
                  {getSegmentLabel(variant)}
                </h3>
                <h4 className="text-neutral-500">{variant.modelCode}</h4>
              </div>
              <div className="flex w-full justify-around">
                <div className=" flex flex-col  justify-center gap-0  flex-1 rounded-2xl p-4">
                  <span className="uppercase tracking-widest text-neutral-300">
                    Fase
                  </span>
                  <div className="flex items-center self-center text-xl">
                    {variant.specs.phaseType}
                  </div>
                </div>
                <div className=" flex flex-col  justify-center gap-0  flex-1 rounded-2xl p-4">
                  <span className="uppercase tracking-widest text-neutral-300">
                    Potencia
                  </span>
                  <div className="flex items-end self-center">
                    <span className="text-6xl font-semibold">
                      {variant.specs.maxPowerKw}
                    </span>
                    <span className="ml-0.5 text-2xl text-neutral-300">kW</span>
                  </div>
                </div>
                <div className=" flex flex-col  justify-center gap-0  flex-1 rounded-2xl p-4">
                  <span className="uppercase tracking-widest text-neutral-300">
                    Fase
                  </span>
                  <div className="flex items-center self-center text-xl">
                    {variant.specs.connectorType}
                  </div>
                </div>
              </div>
              <p className="text-balance text-lg text-neutral-300 max-w-sm mb-4">
                {variant.description}
              </p>{" "}
              <ChargerEV powerKw={variant.specs.maxPowerKw} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
