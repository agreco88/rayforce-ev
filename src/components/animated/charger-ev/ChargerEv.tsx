"use client";

import React from "react";
import { ChargerEVFrame } from "./ChargerEVFrame";

type ChargerEVProps = {
  powerKw: number;
  variant?: "residential" | "pro";
  mode?: "single" | "multi";
  phases?: 1 | 2 | 3;
};

export function ChargerEV({
  powerKw,
  variant = "pro",
  mode = "multi",
  phases = 3,
}: ChargerEVProps) {
  return (
    <div className="flex items-center justify-center ">
      <ChargerEVFrame
        powerKw={powerKw}
        variant={variant}
        mode={mode}
        phases={phases}
      />
    </div>
  );
}
