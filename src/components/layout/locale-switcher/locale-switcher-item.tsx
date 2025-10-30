"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import ReactCountryFlag from "react-country-flag";
import { useTranslations } from "next-intl";
import { localeConfig } from "@/lib/locale-config";

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
      disabled={isActive}
      onClick={() => onSelect(loc)}
      className="group flex items-center gap-4 flex-1 cursor-pointer data-[disabled=true]:opacity-40"
    >
      <ReactCountryFlag
        style={{ width: "1.25em", height: "1.25em", borderRadius: "4px" }}
        countryCode={country}
        aria-hidden="true"
        svg
      />
      <span className="flex-1">{tLang(loc)}</span>
    </DropdownMenuItem>
  );
}
