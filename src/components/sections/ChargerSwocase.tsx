"use client";

import { ChargerEV } from "../ChargerEV/ChargerEv";
import { CHARGERS } from "@/lib/products-data";
import { BackgroundIllustration } from "./hero";

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function ChargerShowcase() {
  return (
    <div className="mx-auto grid grid-cols-1 relative gap-24 md:grid-cols-2">
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-0 rounded-2xl
          bg-radial
        from-lime-600/15
          from-0%
          animate-[pulse_4s_ease-in-out_infinite]
          to-transparent
          to-65%
        "
      />
      <BackgroundIllustration className="absolute inset-0 -z-0 opacity-40" />
      {CHARGERS.map((charger) => (
        <div
          key={charger.key}
          className={classNames("relative rounded-2xl px-8")}
        >
          {/* Titles */}
          <div className="flex flex-col mb-3">
            <h3 className="mx-auto text-3xl font-bold">{charger.roleLabel}</h3>
            <h4 className="mx-auto mb-4 text-xl text-gray-400">
              {charger.modelLabel}
            </h4>
          </div>
          {/* Charger visual */}
          <ChargerEV />

          {/* Description */}
          <p className="mx-auto my-8 max-w-sm text-center text-gray-400">
            {charger.description}
          </p>
        </div>
      ))}
    </div>
  );
}
