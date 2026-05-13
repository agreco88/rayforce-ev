// src/lib/internal-nav-links.ts
export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS = [
  {
    id: "inicio",
    label: "hero",
  },
  {
    id: "cargadores",
    label: "chargers",
  },
  {
    id: "beneficios",
    label: "benefits",
  },
  {
    id: "columna",
    label: "stand",
  },
  {
    id: "faq",
    label: "faq",
  },
  {
    id: "compatibilidad",
    label: "compatibility",
  },
];

// <HomeHeroSection id="inicio" />
// <HomeChargersSection id="cargadores" />
// <HomeBenefitsSection id="beneficios" />
// <HomeStandSection id="columna" />
// <HomeFaqSection id="faq" />
// <CompatibilitySection id="compatibilidad" />
