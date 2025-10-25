import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

/**
 * Returns a normalized path without locale prefix,
 * and a helper to rebuild localized paths.
 */
export function useLocalizedPath() {
	const locale = useLocale();
	const pathname = usePathname();

	// remove the current locale prefix if present
	const basePath = pathname.replace(new RegExp(`^/${locale}`), "") || "/";

	/**
	 * Given a target locale, returns a proper localized path
	 * (e.g. "/about" -> "/es/about")
	 */
	const getLocalizedPath = (targetLocale: string) => {
		return `/${targetLocale}${basePath}`;
	};

	return { locale, basePath, getLocalizedPath };
}
