"use client";

import React from "react";
import { ChargerEVFrame } from "./ChargerEVFrame";

type ChargerEVProps = {
  powerKw: number;
};

export function ChargerEV({ powerKw }: ChargerEVProps) {
  return (
    <div className="flex items-center justify-center">
      <ChargerEVFrame powerKw={powerKw} />
    </div>
  );
}
