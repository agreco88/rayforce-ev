"use client";

import React from "react";
import { ChargerEVFrame } from "./ChargerEVFrame";
import type { CableType } from "@/lib/catalog/catalog.types";

type ChargerEVProps = {
  powerKw: number;
  variant?: "residential" | "pro";
  mode?: "single" | "multi";
  phases?: 1 | 2 | 3;
  cableType?: CableType;
};

export function ChargerEV({
  powerKw,
  variant = "pro",
  mode = "multi",
  phases = 3,
  cableType,
}: ChargerEVProps) {
  return (
    <div className="flex items-center justify-center ">
      <ChargerEVFrame
        powerKw={powerKw}
        variant={variant}
        mode={mode}
        phases={phases}
        cableType={cableType}
      />
    </div>
  );
}
