import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["en", "es"],

	// Used when no locale matches
	defaultLocale: "es",

	// Default locale (es) is served unprefixed (e.g. /cargadores),
	// only non-default locales get a prefix (e.g. /en/cargadores).
	// Must match the URL scheme assumed by sitemap.ts and generate-locale-metadata.ts.
	localePrefix: "as-needed",
});
