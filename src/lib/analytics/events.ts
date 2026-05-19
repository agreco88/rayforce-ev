/**
 * Central registry of all trackable business events.
 *
 * Naming rules:
 * - snake_case, verb-noun format describing business intent
 * - Good: whatsapp_click, compatibility_search, datasheet_requested
 * - Bad:  button_click, click_event, green_button_pressed
 *
 * Add a new entry here before instrumenting any new touchpoint.
 */
export type AnalyticsEventMap = {
  /** User initiated a WhatsApp conversation from any surface */
  whatsapp_click: {
    source: string
    charger?: string
    locale: string
    page: string
    vehicle_brand?: string
    vehicle_model?: string
  }

  /** Home hero — primary CTA (Ver cargadores) */
  home_hero_primary_cta: { location: "desktop" | "mobile"; locale: string }

  /** Home hero — secondary CTA (Compatibilidad) */
  home_hero_secondary_cta: { location: "desktop" | "mobile"; locale: string }

  /** Home hero — quote CTA (Contacto) */
  home_hero_quote_cta: { location: "desktop" | "mobile"; locale: string }

  /** Charger page hero — primary CTA (WhatsApp buy button) */
  charger_hero_primary_cta: { charger: string; location: "desktop" | "mobile"; locale: string }

  /** Charger page hero — datasheet download CTA */
  charger_hero_datasheet_cta: { charger: string; location: "desktop" | "mobile"; locale: string }

  /** User clicked a specific compatible model card */
  compatibility_model_selected: { brand: string; model: string; locale: string }

  /** User performed a compatibility search that returned results (debounced) */
  compatibility_search: {
    query: string
    results_count: number
    locale: string
  }

  /** User searched for a vehicle but no compatible model was found (debounced) */
  compatibility_no_results: {
    query: string
    locale: string
  }

  /** User expanded the full brand/model compatibility list */
  compatibility_list_expanded: {
    locale: string
  }

  /** User collapsed the full brand/model compatibility list */
  compatibility_list_collapsed: {
    locale: string
  }

  /** User requested a charger technical datasheet */
  datasheet_requested: {
    model: string
    locale: string
  }
}
