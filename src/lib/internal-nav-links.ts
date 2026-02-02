// src/lib/internal-nav-links.ts
export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: "hero", label: "home" },
  { id: "safety", label: "safety" },
  { id: "products", label: "products" },
  { id: "regulatory", label: "regulation" },
  { id: "faq", label: "faq" },
  { id: "contact", label: "contact" },
] as const;
