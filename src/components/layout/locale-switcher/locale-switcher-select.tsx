"use client";

import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { LocaleSwitcherTrigger } from "./locale-switcher-trigger";
import { LocaleSwitcherItem } from "./locale-switcher-item";
import { supportedLocales } from "@/lib/locale-config";
import { useLocale } from "next-intl";

export function LocaleSwitcherSelect() {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const handleChange = (newLocale: string) => {
		if (newLocale === locale) return;
		const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
		router.replace(newPath);
	};

	return (
		<DropdownMenu>
			<LocaleSwitcherTrigger />
			<DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)] overflow-hidden">
				{supportedLocales.map((loc) => (
					<LocaleSwitcherItem key={loc} loc={loc} currentLocale={locale} onSelect={handleChange} />
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
