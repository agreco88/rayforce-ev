/**
 * Paleta de la sección de compatibilidad. Existe porque cada página de
 * cargador (`/cargadores/[model]`) tiñe la sección con el color de su
 * producto; la home y el resto usan el verde por defecto.
 */
export type Theme = {
  accentText: string;
  accentBg: string;
  accentHover: string;
  divide: string;
  gradientLine: string;
  accentSoft: string;
  accentBorder: string;
  accentBorderHover: string;
  accentGradient: string;
  glow: string;
  glowStrong: string;
  accentRing: string;
};

export const DEFAULT_THEME: Theme = {
  accentText: "text-green-500",
  accentBg: "bg-green-500",
  accentHover: "hover:bg-green-400",
  divide: "divide-green-500/10",
  gradientLine:
    "from-transparent sm:from-green-600 via-green-700 to-transparent",
  accentSoft: "bg-green-500/10",
  accentBorder: "border-green-500/30",
  accentBorderHover: "hover:border-green-500/30",
  accentGradient: "from-green-400 via-green-500 to-emerald-400",
  glow: "rgba(34,197,94,0.25)",
  glowStrong: "rgba(22,163,74,0.35)",
  accentRing: "ring-green-500",
};
