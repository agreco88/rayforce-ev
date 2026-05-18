"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { trackEvent } from "./track";

/**
 * Returns semantic tracking helpers that automatically inject
 * locale and page context. Components stay presentation-focused —
 * they call e.g. track.whatsappClick({ source: "footer" }) without
 * knowing how locale or pathname are resolved.
 */
export function useTrack() {
  const locale = useLocale();
  const pathname = usePathname();

  return {
    whatsappClick(params: {
      source: string;
      charger?: string;
      vehicle_brand?: string;
      vehicle_model?: string;
    }) {
      trackEvent("whatsapp_click", { ...params, locale, page: pathname });
    },

    heroCta(params: { cta: "primary" | "secondary" | "quote"; location: "desktop" | "mobile" }) {
      trackEvent("hero_cta_clicked", { ...params, locale });
    },

    compatibilitySearch(query: string, results_count: number) {
      trackEvent("compatibility_search", { query, results_count, locale });
    },

    compatibilityNoResults(query: string) {
      trackEvent("compatibility_no_results", { query, locale });
    },

    compatibilityListExpanded() {
      trackEvent("compatibility_list_expanded", { locale });
    },

    datasheetRequested(model: string) {
      trackEvent("datasheet_requested", { model, locale });
    },
  };
}
