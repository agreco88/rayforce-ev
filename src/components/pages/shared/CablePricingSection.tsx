"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckIcon, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { AppSwitch } from "@/components/ui/wrappers/AppSwitch";
import { CableOtherModelsBlock } from "@/components/pages/shared/CableOtherModelsBlock";
import {
  CHARGER_PRODUCTS,
  CHARGER_INSTALLATION_PRICE_USD,
} from "@/lib/catalog/chargers.catalog";
import { useTrack } from "@/lib/analytics";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import type { CableProduct } from "@/lib/catalog/catalog.types";

/** The wallbox offered as an add-on from a cable's pricing card. */
const WALLBOX_SLUG = "bs20-ba-7kw";
const WALLBOX_PRODUCT = CHARGER_PRODUCTS.find((p) => p.slug === WALLBOX_SLUG)!;

type Props = {
  product: CableProduct;
  id?: string;
};

/**
 * Pricing card for cable model pages: two dependent toggles let the
 * customer build up from "just the cable" to "cable + wallbox" to
 * "cable + wallbox + certified installation". Installation only makes
 * sense on top of a wallbox, so switching the wallbox off forces
 * installation off and disables its switch — mirrors the request that
 * a bare cable can't be "installed".
 *
 * All feature lines stay mounted regardless of toggle state (only their
 * active/inactive styling changes) so the card's height never shifts
 * when switching plans.
 */
export function CablePricingSection({ product, id }: Props) {
  const t = useTranslations("CableModelPage.pricingSection");
  const track = useTrack();
  const { theme } = product;
  const [includeWallbox, setIncludeWallbox] = useState(false);
  const [includeInstallation, setIncludeInstallation] = useState(false);

  const cableFeatures = t.raw(`features.cable.${product.slug}`) as string[];
  const wallboxFeatures = t.raw("features.wallbox") as string[];
  const installationFeatures = t.raw("features.installation") as string[];

  const items = [
    ...cableFeatures.map((text) => ({
      text,
      active: true,
      href: undefined as string | undefined,
    })),
    ...wallboxFeatures.slice(0, -1).map((text) => ({
      text,
      active: includeWallbox,
      href: undefined as string | undefined,
    })),
    ...installationFeatures.map((text) => ({
      text,
      active: includeInstallation,
      href: undefined as string | undefined,
    })),
    // The wallbox's own name/link line always renders last, after every
    // other feature — it reads as "here's what you just added" rather
    // than competing with the cable's own specs at the top of the list.
    {
      text: wallboxFeatures[wallboxFeatures.length - 1],
      active: includeWallbox,
      href: `/cargadores/${WALLBOX_SLUG}` as string,
    },
  ];

  const wallboxPrice = includeWallbox ? WALLBOX_PRODUCT.price.amount : 0;
  const basePrice = product.price.amount + wallboxPrice;
  const bundlePrice = product.price.amount + CHARGER_INSTALLATION_PRICE_USD;

  const whatsappHref = buildWhatsAppHref(
    t("cta.whatsappMessage", { model: product.shortName }),
  );

  function handleWallboxToggle(next: boolean) {
    setIncludeWallbox(next);
    track.pricingWallboxToggled(product.slug, next);
    if (!next && includeInstallation) {
      setIncludeInstallation(false);
      track.pricingInstallationToggled(product.slug, false);
    }
  }

  function handleInstallationToggle(next: boolean) {
    setIncludeInstallation(next);
    track.pricingInstallationToggled(product.slug, next);
  }

  return (
    <section
      id={id}
      className="relative overflow-hidden border-y border-neutral-900 bg-neutral-950 pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(64,64,64,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(64,64,64,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, #000 20%, transparent 80%)",
        }}
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${theme.glow}, transparent 55%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p
            className={cn(
              "text-sm uppercase tracking-[0.35em]",
              theme.accentText,
            )}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Card                                                             */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-16 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
        >
          {/* -------------------------------------------------------------- */}
          {/* Left: description + included features                         */}
          {/* -------------------------------------------------------------- */}
          <div className="p-8 sm:p-8 lg:flex-auto lg:p-10">
            <h3 className="text-3xl font-medium tracking-tight text-white">
              {product.publicName}
            </h3>

            <div className="mt-10 flex items-center gap-x-4">
              <h4
                className={cn(
                  "flex-none text-sm font-semibold",
                  theme.accentText,
                )}
              >
                {t("includes.title")}
              </h4>
              <div className="h-px flex-auto bg-white/10" />
            </div>

            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2"
            >
              {items.map((item) => {
                const active = item.active;
                return (
                  <motion.li
                    key={item.text}
                    initial={false}
                    animate={{ opacity: active ? 1 : 0.55 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-x-3 text-left"
                  >
                    <CheckIcon
                      aria-hidden="true"
                      className={cn(
                        "h-6 w-5 flex-none transition-all duration-300",
                        active
                          ? cn(
                              theme.check,
                              "drop-shadow-[0_0_6px_currentColor]",
                            )
                          : "text-neutral-700",
                      )}
                    />
                    <span
                      className={cn(
                        "transition-colors duration-300",
                        active ? "text-neutral-200" : "text-neutral-600",
                      )}
                    >
                      <span className="block">{item.text}</span>
                      {item.href && (
                        <Link
                          href={item.href}
                          target="_blank"
                          aria-disabled={!active}
                          tabIndex={active ? undefined : -1}
                          onClick={(e) => {
                            if (!active) e.preventDefault();
                          }}
                          className={cn(
                            "mt-1 flex w-fit items-center gap-0.5 font-medium underline-offset-2 transition-colors duration-300 hover:no-underline",
                            active
                              ? cn(
                                  theme.accentText,
                                  "underline decoration-dotted",
                                )
                              : "pointer-events-none text-neutral-600 no-underline",
                          )}
                        >
                          {t("wallboxToggle.detailLink")}
                          <ArrowRight size={11} />
                        </Link>
                      )}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Right: toggles + price + CTA                                   */}
          {/* -------------------------------------------------------------- */}
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-lg lg:shrink-0">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 px-4 py-10 text-center lg:flex lg:h-full lg:flex-col lg:justify-center lg:px-8 lg:py-16">
              <div className="mx-auto grid w-full max-w-md grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-4">
                {/* Wallbox add-on toggle */}
                <span
                  className={cn(
                    "whitespace-nowrap text-right text-xs font-medium transition-colors duration-300 sm:text-sm",
                    !includeWallbox ? theme.accentText : "text-neutral-600",
                  )}
                >
                  {t("wallboxToggle.withoutWallboxLabel")}
                </span>
                <AppSwitch
                  checked={includeWallbox}
                  onChange={handleWallboxToggle}
                  activeClassName={theme.accentBg}
                  aria-label={t("wallboxToggle.label")}
                />
                <span
                  className={cn(
                    "whitespace-nowrap text-left text-xs font-medium transition-colors duration-300 sm:text-sm",
                    includeWallbox ? theme.accentText : "text-neutral-600",
                  )}
                >
                  {t("wallboxToggle.withCableAndWallboxLabel")}
                </span>

                {/*
                  Installation toggle: only meaningful on top of a wallbox,
                  so it's disabled (not unmounted) while the wallbox toggle
                  is off. Keeping it always mounted avoids the height jump
                  a mount/unmount transition caused here. Sharing the same
                  grid as the row above keeps both switches on one column.
                */}
                <span
                  className={cn(
                    "whitespace-nowrap text-right text-xs font-medium transition-colors duration-300 sm:text-sm",
                    !includeWallbox
                      ? "text-neutral-700"
                      : !includeInstallation
                        ? theme.accentText
                        : "text-neutral-600",
                  )}
                >
                  {t("installationToggle.withoutInstallationLabel")}
                </span>
                <AppSwitch
                  checked={includeInstallation}
                  onChange={handleInstallationToggle}
                  disabled={!includeWallbox}
                  activeClassName={theme.accentBg}
                  aria-label={t("installationToggle.label")}
                />
                <span
                  className={cn(
                    "whitespace-nowrap text-left text-xs font-medium transition-colors duration-300 sm:text-sm",
                    !includeWallbox
                      ? "text-neutral-700"
                      : includeInstallation
                        ? theme.accentText
                        : "text-neutral-600",
                  )}
                >
                  {t("installationToggle.withInstallationLabel")}
                </span>
              </div>

              <div className="mx-auto w-full max-w-sm">
                {/*
                  Price line: "Desde" and "USD" are passed as AnimateNumber's
                  prefix/suffix so they resize smoothly in step with the
                  digits instead of snapping when the amount's width changes.
                */}
                <div className="mt-8 flex items-baseline justify-center">
                  <AnimateNumber
                    locales="en-US"
                    format={{ maximumFractionDigits: 0 }}
                    prefix={
                      includeInstallation
                        ? t("installationToggle.fromPrefix")
                        : ""
                    }
                    suffix={` ${product.price.currency}`}
                    className={cn(
                      "text-6xl font-thin tabular-nums text-white sm:text-7xl",
                      "[&_.number-section-pre]:mr-2 [&_.number-section-pre]:self-end [&_.number-section-pre]:pb-4! [&_.number-section-pre]:text-xs [&_.number-section-pre]:font-medium [&_.number-section-pre]:text-neutral-500 sm:[&_.number-section-pre]:pb-4! sm:[&_.number-section-pre]:text-sm",
                      "[&_.number-section-post]:ml-1 [&_.number-section-post]:self-end [&_.number-section-post]:pb-4! [&_.number-section-post]:text-xs [&_.number-section-post]:font-semibold [&_.number-section-post]:tracking-wide [&_.number-section-post]:text-neutral-400 sm:[&_.number-section-post]:pb-4! sm:[&_.number-section-post]:text-sm",
                    )}
                    transition={{
                      visualDuration: 0.6,
                      type: "spring",
                      bounce: 0.25,
                      opacity: { duration: 0.3, ease: "linear" },
                    }}
                  >
                    {includeInstallation ? bundlePrice : basePrice}
                  </AnimateNumber>
                </div>
                <p className="mt-1 text-center text-xs text-neutral-500">
                  {t("taxLabel")}
                </p>

                {/* CTA */}
                <a
                  href={
                    includeInstallation
                      ? whatsappHref
                      : product.mercadopagoUrl || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    includeInstallation
                      ? track.whatsappClick({
                          source: "cable_pricing_section",
                          charger: product.slug,
                        })
                      : track.mercadopagoClick({
                          source: "cable_pricing_section",
                          charger: product.slug,
                          location: "desktop",
                        })
                  }
                  className={cn(
                    "mt-10 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-center text-sm font-semibold text-black transition-colors",
                    theme.accentBg,
                    theme.accentHover,
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={includeInstallation ? "with" : "without"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2"
                    >
                      {includeInstallation ? (
                        <>
                          {t("cta.quote")}
                          <FaWhatsapp size={16} />
                        </>
                      ) : (
                        <>
                          {t("cta.buy")}
                          <ExternalLink size={16} />
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </a>

                {/*
                  Footnote: fixed min-height reserved for the longer of
                  the two variants so a shorter one can't shrink the card.
                */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      includeInstallation
                        ? "with-installation"
                        : includeWallbox
                          ? "with-wallbox"
                          : "default"
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 self-center flex flex-col items-center justify-center text-center min-h-[80px] px-6 sm:px-0"
                  >
                    <p className="text-sm leading-relaxed text-neutral-400">
                      {includeInstallation
                        ? t("footnote.withInstallation")
                        : includeWallbox
                          ? t("footnote.withWallbox")
                          : t("footnote.default")}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        <CableOtherModelsBlock product={product} className="mt-20 sm:mt-28" />
      </div>
    </section>
  );
}
