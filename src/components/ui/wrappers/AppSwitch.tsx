"use client";

import { motion } from "motion/react";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Tailwind bg-* class applied to the track when checked. */
  activeClassName?: string;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

export function AppSwitch({
  checked,
  onChange,
  activeClassName = "bg-white",
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
}: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
      className={`relative h-8 w-14 shrink-0 rounded-full p-1 transition-colors duration-200 ${
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
      } ${checked ? activeClassName : "bg-white/15"} ${className}`}
    >
      <motion.span
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: "spring", visualDuration: 0.2, bounce: 0.25 }}
        className="block h-6 w-6 rounded-full bg-white shadow-md"
      />
    </button>
  );
}
