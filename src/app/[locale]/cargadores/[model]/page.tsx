import RayforceComparison from "@/components/sections/home/RayforceComparison";
import { AppHighlightsMobile } from "@/components/pages/shared/AppHighlightsMobile";
import { AppHighlightsInteractive } from "@/components/pages/shared/AppHighlightsStatic";
import { AppHighlightsWithDevice } from "@/components/pages/shared/AppShowcaseSection";
import { ChargerModelHero } from "@/components/pages/shared/ChargerModelHero";
import { ChargerModelHeroMobile } from "@/components/pages/shared/ChargerModelHeroMobile";
import { ChargerModelStats } from "@/components/pages/shared/ChargerModelStats";
import { CompatibilitySection } from "@/components/pages/shared/CompatibilitySection";
import { ChargingHomeBanner } from "@/components/shared/banners/ChargingHomeBanner";

import { getAllChargerVariants } from "@/lib/chargers/chargers.helpers";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/contact-footer/Footer";

/* ------------------------------------------------------------------ */
/* Variant Config (LOCAL for now, keep it simple)                      */
/* ------------------------------------------------------------------ */

const VARIANT_CONFIG = {
  "7kw": {
    charger: {
      powerKw: 7.4,
      variant: "residential",
      mode: "single",
    },
    theme: {
      accentText: "text-sky-500",
      accentBg: "bg-sky-500",
      accentHover: "hover:bg-sky-600",
      divide: "divide-sky-500/10",
      gradientLine: "from-transparent s via-sky-700 to-transparent",
      accentSoft: "bg-sky-500/10",
      accentBorder: "border-sky-500/30",
      accentGradient: "from-sky-400 via-sky-500 to-teal-400",
      glow: "rgba(56,189,248,0.25)",
      glowStrong: "rgba(20,184,166,0.35)",
      accentRing: "ring-sky-500",
    },
  },

  "11kw": {
    charger: {
      powerKw: 11,
      variant: "pro",
      mode: "multi",
      phases: 2,
    },
    theme: {
      accentText: "text-green-500",
      accentBg: "bg-green-500",
      accentHover: "hover:bg-green-600",
      divide: "divide-green-500/10",
      gradientLine: "from-transparent  via-green-700 to-transparent",
      accentSoft: "bg-green-500/10",
      accentBorder: "border-green-500/30",
      accentGradient: "from-green-400 via-green-500 to-emerald-400",
      glow: "rgba(34,197,94,0.25)",
      glowStrong: "rgba(22,163,74,0.35)",
      accentRing: "ring-green-500",
    },
  },

  "22kw": {
    charger: {
      powerKw: 22,
      variant: "pro",
      mode: "multi",
      phases: 3,
    },
    theme: {
      accentText: "text-amber-500",
      accentBg: "bg-amber-500",
      accentHover: "hover:bg-amber-600",
      divide: "divide-amber-500/10",
      gradientLine: "from-transparent via-amber-500 to-transparent",
      accentSoft: "bg-amber-500/10",
      accentBorder: "border-orange-400/50 border-2",
      accentGradient: "from-amber-400 via-amber-500 to-orange-400",
      glow: "rgba(245,158,11,0.25)",
      glowStrong: "rgba(251,191,36,0.35)",
      accentRing: "ring-amber-500",
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Props = {
  params: Promise<{
    model: string;
  }>;
};

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ChargerDetailPage({ params }: Props) {
  const { model } = await params;

  /* ---------------- Resolve Variant ---------------- */

  const variants = getAllChargerVariants();
  const variant = variants.find((v) => v.slug === model);

  if (!variant) return notFound();

  /* ---------------- Resolve Config ---------------- */

  const variantKey =
    variant.shortName.toLowerCase() as keyof typeof VARIANT_CONFIG;

  const config = VARIANT_CONFIG[variantKey];

  if (!config) return notFound();

  /* ---------------- Render ---------------- */

  return (
    <section className="relative w-full z-0 bg-neutral-950 overflow-hidden border-b border-neutral-900">
      {/* Hero */}
      <div className="hidden lg:block" id="inicio">
        <ChargerModelHero variant={variant} config={config} />
      </div>
      <div className="block lg:hidden">
        <ChargerModelHeroMobile variant={variant} config={config} />
      </div>
      {/* Stats */}
      <ChargerModelStats model={variant.slug} theme={config.theme} />
      <RayforceComparison
        theme={config.theme}
        powerKw={config.charger.powerKw}
      />{" "}
      {/* App Highlights Desktop */}
      <div className="">
        <AppHighlightsInteractive theme={config.theme} />
      </div>
      {/* Compatibility */}
      <div className="bg-black">
        <CompatibilitySection theme={config.theme} id="compatibilidad" />
      </div>
      {/* <ChargingHomeBanner /> */}
      <Footer />
    </section>
  );
}
