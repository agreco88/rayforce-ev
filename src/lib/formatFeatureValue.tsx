import { CheckIcon, XIcon } from "lucide-react";

type FeatureValue = boolean | string | number | null | undefined;

export function renderFeatureValue(value: FeatureValue, checkColor = "text-green-400") {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className={`w-4 h-4 ${checkColor}`} />
    ) : (
      <XIcon className="w-4 h-4 text-neutral-700" />
    );
  }

  if (value === null || value === undefined) {
    return <span className="text-sm text-neutral-500">—</span>;
  }

  return <span className="text-sm text-neutral-200">{value}</span>;
}
