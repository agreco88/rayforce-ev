"use client";

import { track } from "@vercel/analytics";
import type { AnalyticsEventMap } from "./events";

/**
 * The ONLY place in the codebase that calls track() directly.
 * All other code must go through this function or through useTrack().
 */
export function trackEvent<K extends keyof AnalyticsEventMap>(
  name: K,
  props: AnalyticsEventMap[K],
): void {
  track(name, props as Record<string, string | number | boolean | null | undefined>);
}
