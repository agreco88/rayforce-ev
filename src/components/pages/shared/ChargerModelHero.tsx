"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChargerModelHeroStats } from "./ChargerModelHeroStats";
import { ArrowDownToLine } from "lucide-react";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { ChargerEV } from "@/components/animated/charger-ev/ChargerEv";
import { getAllChargerVariants } from "@/lib/chargers/chargers.helpers";
import { waterfallItem } from "@/lib/animation-variants";
import { useTrack } from "@/lib/analytics";

const MERCADOPAGO_URLS: Record<string, string> = {
  "bs20-bc-7kw": "http://mpago.la/1notnYD",
  "bs20-bc-22kw": "https://mpago.la/2C6CFZe",
};

const SLUG_ACCENT: Record<string, string> = {
  "bs20-bc-7kw": "text-sky-400",
  "bs20-bc-22kw": "text-green-400",
};

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Theme = {
  accentText: string;
  accentBg: string;
  accentHover: string;
  divide: string;
  gradientLine: string;
  accentSoft: string;
  accentBorder: string;
  accentGradient: string;
  glow: string;
  glowStrong: string;
};

type ChargerConfig = {
  charger: {
    powerKw: number;
    variant: "residential" | "pro";
    mode: "single" | "multi";
    phases?: 1 | 2 | 3;
  };
  theme: Theme;
};

type Props = {
  variant: {
    publicName: string;
    description: string;
    shortName: string;
    slug: string;
    price?: { currency: string; amount: number; taxLabel?: string };
  };
  config: ChargerConfig;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ChargerModelHero({ variant, config }: Props) {
  const t = useTranslations("ChargerModelPage");
  const track = useTrack();
  const { theme, charger } = config;
  const mpUrl = MERCADOPAGO_URLS[variant.slug] ?? "#";

  return (
    <section className="relative w-full flex items-center overflow-hidden border-b border-neutral-900">
      {/* ------------------------------------------------------------------ */}
      {/* Background                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Depth */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#0a0a0a_20%,#111827_60%,#0a0a0a_100%)]" />

        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 80% 50%, ${theme.glow}, transparent 70%)`,
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to left, rgba(64,64,64,0.25) 0px, black 1px),
            linear-gradient(to top, rgba(64,64,64,0.25) 0px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 20%, transparent 80%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Content                                                            */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-12 relative z-20 flex-1 max-w-7xl mx-auto h-[1000px] justify-center items-start"
      >
        <div className="flex w-full">
          {/* LEFT */}
          <div className="flex flex-col gap-6 flex-1 justify-center">
            {/* Breadcrumb */}
            <AppBreadcrumb
              items={[
                { label: t("breadcrumb.home"), href: "/" },
                { label: t("breadcrumb.chargers"), href: "/cargadores" },
                {
                  label: (
                    <p
                      className={`text-sm uppercase tracking-widest ${theme.accentText}`}
                    >
                      {variant.slug.toUpperCase()}
                    </p>
                  ),
                  dropdown: getAllChargerVariants()
                    .filter((v) => v.slug !== variant.slug)
                    .map((v) => ({
                      href: `/cargadores/${v.slug}`,
                      label: (
                        <span
                          className={`text-sm uppercase tracking-widest ${SLUG_ACCENT[v.slug] ?? "text-neutral-400"}`}
                        >
                          {v.slug.toUpperCase()}
                        </span>
                      ),
                    })),
                },
              ]}
            />

            {/* Title */}
            <div className="my-8">
              <p
                className={`text-sm uppercase tracking-widest ${theme.accentText}`}
              >
                {t(`eyebrow.${charger.variant}`)}
              </p>

              <h1 className="flex text-7xl gap-2">
                BS20
                <span className={`font-thin ${theme.accentText}`}>
                  {variant.shortName}
                </span>
              </h1>

              {variant.price && (
                <div className="my-3 flex items-baseline gap-2">
                  <span className={`text-4xl font-thin ${theme.accentText}`}>
                    {variant.price.amount}
                  </span>
                  <span className={`text-4xl font-thin ${theme.accentText}`}>
                    {variant.price.currency}
                  </span>
                  <span className="text-base text-neutral-400">
                    ({t("price.taxLabel")})
                  </span>
                </div>
              )}

              <span className="text-neutral-400 text-base leading-relaxed max-w-lg ">
                {t(`variants.${variant.slug}.description`)}
              </span>
            </div>

            {/* Stats */}
            <ChargerModelHeroStats theme={theme} variant={charger.variant} />

            {/* CTA */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href={mpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#009EE3]/40 shadow-sm font-semibold text-sm transition-all duration-200"
              >
                <img
                  src="/images/icons/mpago.png"
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-auto"
                />
                <div className="w-0.5 self-stretch bg-[#0a0080]/20 rounded-full" />
                <span className="text-[#0a0080] uppercase tracking-tighter!">
                  {t("cta.mercadopago")}
                </span>
              </a>

              <motion.a
                variants={waterfallItem}
                initial="hidden"
                animate="show"
                href="/assets/docs/bs20-ficha-tecnica.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track.chargerHeroDatasheet(variant.slug, "desktop")}
                className="
                  flex items-center gap-2
                  text-sm text-neutral-400
                  hover:text-white transition-colors
                "
              >
                <ArrowDownToLine size={16} />
                {t("cta.manual")}
              </motion.a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative z-[99]">
            {/* Bottom Glow */}
            <div
              className="
                absolute bottom-0 left-1/2 -translate-x-1/2
                w-[60%] h-[80px]
                blur-3xl rounded-full pointer-events-none animate-pulse
              "
              style={{ backgroundColor: theme.glowStrong }}
            />

            {/* Top Glow */}
            <div
              className="
                absolute top-0 left-1/2 -translate-x-1/2
                w-[60%] h-[80px]
                blur-3xl rounded-full pointer-events-none animate-pulse
              "
              style={{ backgroundColor: theme.glowStrong }}
            />

            {/* Charger */}
            <div className="[transform:perspective(1200px)_rotateY(-14deg)_rotateX(2deg)]">
              <ChargerEV {...charger} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
