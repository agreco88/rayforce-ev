// src/lib/locale-config.ts
export type LocaleInfo = {
	country: string; // ISO 3166 country code
	label: string; // UI label
	native?: string; // optional native label
	dir?: "ltr" | "rtl";
};

export const localeConfig: Record<string, LocaleInfo> = {
	en: { country: "US", label: "English" },
	es: { country: "UY", label: "Español" },
};

export const supportedLocales = Object.keys(localeConfig);
