// src/lib/internal-nav-links.ts
export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/features", label: "features" },
  { href: "/pricing", label: "pricing" },
  { href: "/about", label: "about" },
] as const;
