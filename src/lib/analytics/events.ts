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

  /** User clicked a hero section CTA */
  hero_cta_clicked: {
    cta: "primary" | "secondary" | "quote"
    location: "desktop" | "mobile"
    locale: string
  }

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

  /** User requested a charger technical datasheet */
  datasheet_requested: {
    model: string
    locale: string
  }
}
