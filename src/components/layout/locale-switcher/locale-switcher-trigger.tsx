"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { localeConfig } from "@/lib/locale-config";

export function LocaleSwitcherTrigger() {
	const locale = useLocale();
	const tLang = useTranslations("Languages");
	const tAria = useTranslations("AriaLabels");
	const { country } = localeConfig[locale];

	return (
		<DropdownMenuTrigger asChild>
			<Button
				variant="ghost"
				className="group cursor-pointer flex items-center justify-around gap-4 "
				aria-label={tAria("languageSwitcher")}
			>
				<ReactCountryFlag
					countryCode={country}
					svg
					aria-hidden="true"
					style={{ width: "1.25em", height: "1.25em", borderRadius: "6px" }}
				/>
				<span className="hidden sm:inline text-sm font-medium">{tLang(locale)}</span>
				<ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
			</Button>
		</DropdownMenuTrigger>
	);
}
