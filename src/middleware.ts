import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
	...routing,
	localeDetection: false, // disables browser-based redirects (always uses default)
});

export const config = {
	// match all routes except Next internals and API routes
	matcher: ["/((?!_next|.*\\..*|api).*)"],
};
