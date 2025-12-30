"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import ReactCountryFlag from "react-country-flag";
import { useTranslations } from "next-intl";
import { localeConfig } from "@/lib/locale-config";
import clsx from "clsx";

type LocaleSwitcherItemProps = {
  loc: string;
  currentLocale: string;
  onSelect: (loc: string) => void;
};

export function LocaleSwitcherItem({
  loc,
  currentLocale,
  onSelect,
}: LocaleSwitcherItemProps) {
  const tLang = useTranslations("Languages");
  const { country } = localeConfig[loc];
  const isActive = loc === currentLocale;

  return (
    <DropdownMenuItem
      onClick={() => onSelect(loc)}
      disabled={isActive}
      className={clsx(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "focus:outline-none",
        // 👇 override Radix highlight state
        "data-[highlighted]:bg-white/5 data-[highlighted]:text-white",
        // normal states
        isActive
          ? "cursor-default bg-white/10 text-white"
          : "cursor-pointer text-neutral-300 hover:bg-white/5 hover:text-white",
        // 👇 override disabled opacity behavior
        "data-[disabled=true]:opacity-100"
      )}
    >
      <ReactCountryFlag
        countryCode={country}
        svg
        aria-hidden
        style={{
          width: "1.1em",
          height: "1.1em",
          borderRadius: "4px",
        }}
      />

      <span className="flex-1 font-medium tracking-wide">{tLang(loc)}</span>
    </DropdownMenuItem>
  );
}
