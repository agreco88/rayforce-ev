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

    homeHeroPrimary(location: "desktop" | "mobile") {
      trackEvent("home_hero_primary_cta", { location, locale });
    },

    homeHeroSecondary(location: "desktop" | "mobile") {
      trackEvent("home_hero_secondary_cta", { location, locale });
    },

    homeHeroQuote(location: "desktop" | "mobile") {
      trackEvent("home_hero_quote_cta", { location, locale });
    },

    chargerHeroPrimary(charger: string, location: "desktop" | "mobile") {
      trackEvent("charger_hero_primary_cta", { charger, location, locale });
    },

    chargerHeroDatasheet(charger: string, location: "desktop" | "mobile") {
      trackEvent("charger_hero_datasheet_cta", { charger, location, locale });
    },

    compatibilityModelSelected(brand: string, model: string) {
      trackEvent("compatibility_model_selected", { brand, model, locale });
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

    compatibilityListCollapsed() {
      trackEvent("compatibility_list_collapsed", { locale });
    },

    datasheetRequested(model: string) {
      trackEvent("datasheet_requested", { model, locale });
    },

    navLinkClicked(label: string, destination: string) {
      trackEvent("nav_link_clicked", { label, destination, locale });
    },

    mobileMenuOpened() {
      trackEvent("mobile_menu_opened", { locale });
    },

    mobileMenuClosed() {
      trackEvent("mobile_menu_closed", { locale });
    },

    mobileNavLinkClicked(label: string, destination: string) {
      trackEvent("mobile_nav_link_clicked", { label, destination, locale });
    },

    productsFlyoutOpened() {
      trackEvent("products_flyout_opened", { locale });
    },

    productsFlyoutLinkClicked(charger: string, destination: string) {
      trackEvent("products_flyout_link_clicked", { charger, destination, locale });
    },

    localeSwitched(from: string, to: string) {
      trackEvent("locale_switched", { from, to });
    },

    chargerCardClicked(charger: string) {
      trackEvent("charger_card_clicked", { charger, locale });
    },

    faqCategorySelected(category: string) {
      trackEvent("faq_category_selected", { category, locale });
    },

    faqItemExpanded(category: string, question: string, question_index: number) {
      trackEvent("faq_item_expanded", { category, question, question_index, locale });
    },

    compatibilityBrandExpanded(brand: string) {
      trackEvent("compatibility_brand_expanded", { brand, locale });
    },

    footerNavClicked(label: string, destination: string) {
      trackEvent("footer_nav_clicked", { label, destination, locale });
    },

    emailLinkClicked() {
      trackEvent("email_link_clicked", { locale });
    },

    scrollDepthMilestone(page: string, depth: 25 | 50 | 75 | 100) {
      trackEvent("scroll_depth_milestone", { page, depth, locale });
    },

    mercadopagoClick(params: {
      source: "comparison_table" | "charger_hero" | "charger_comparison" | "stand";
      charger: string;
      location: "desktop" | "mobile";
    }) {
      trackEvent("mercadopago_click", { ...params, locale });
    },
  };
}
