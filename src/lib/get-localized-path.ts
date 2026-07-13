import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Returns a normalized path without locale prefix,
 * and a helper to rebuild localized paths.
 */
export function useLocalizedPath() {
	const locale = useLocale();
	const basePath = usePathname();

	/**
	 * Given a target locale, returns a proper localized path
	 * (e.g. "/about" -> "/es/about", or "/about" for the default locale)
	 */
	const getLocalizedPath = (targetLocale: string) => {
		return targetLocale === routing.defaultLocale
			? basePath
			: `/${targetLocale}${basePath}`;
	};

	return { locale, basePath, getLocalizedPath };
}
