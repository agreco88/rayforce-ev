// utils/formatFeatureValue.ts

import { CheckIcon, XIcon } from "lucide-react";

export function renderFeatureValue(value: any) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className="w-4 h-4 text-green-400" />
    ) : (
      <XIcon className="w-4 h-4 text-neutral-700" />
    );
  }

  return <span className="text-sm text-neutral-200">{value}</span>;
}