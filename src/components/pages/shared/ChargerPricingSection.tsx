"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { CheckIcon, ExternalLink, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { AppSwitch } from "@/components/ui/wrappers/AppSwitch";
import {
  CHARGER_INSTALLATION_PRICE_USD,
  CHARGER_COILED_CABLE_PRICE_USD,
  CHARGER_COLUMN_PRICE_USD,
} from "@/lib/catalog/chargers.catalog";
import { useTrack } from "@/lib/analytics";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

/** Only the socket-only model (no cable in the box) offers the cable add-on toggle. */
const CABLE_ADDON_SLUG = "bs20-ba-7kw";

const WHATSAPP_NUMBER = "59892041709";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Rayforce+Uruguay#lrd=reviews";

/**
 * TODO(reviews): placeholder names/quotes/avatars until the real Google
 * Business reviews (and their individual review permalinks) are supplied.
 * Do not ship to production as-is.
 */
const REVIEWS = [
  {
    id: "review-1",
    name: "Martín Ferreira",
    initials: "MF",
    rating: 5,
    quote:
      "Instalación rápida y la app funciona diez puntos. El soporte respondió todas mis dudas antes de comprar.",
    href: GOOGLE_REVIEWS_URL,
    color: "bg-sky-500/15 text-sky-300",
  },
  {
    id: "review-2",
    name: "Lucía Gómez",
    initials: "LG",
    rating: 5,
    quote:
      "Excelente atención de principio a fin. El cargador quedó impecable y la certificación URSEA me dio mucha tranquilidad.",
    href: GOOGLE_REVIEWS_URL,
    color: "bg-cyan-500/15 text-cyan-300",
  },
  {
    id: "review-3",
    name: "Diego Bentancor",
    initials: "DB",
    rating: 5,
    quote:
      "Comparé varias opciones y esta fue la mejor relación precio-calidad. Recomendado para quien recién arranca con un eléctrico.",
    href: GOOGLE_REVIEWS_URL,
    color: "bg-lime-500/15 text-lime-300",
  },
  {
    id: "review-4",
    name: "Valentina Rocha",
    initials: "VR",
    rating: 4,
    quote:
      "Muy conformes con la instalación trifásica. Coordinaron todo por WhatsApp y cumplieron los tiempos acordados.",
    href: GOOGLE_REVIEWS_URL,
    color: "bg-green-500/15 text-green-300",
  },
  {
    id: "review-5",
    name: "Nicolás Suárez",
    initials: "NS",
    rating: 5,
    quote:
      "El monitoreo desde el celular es un golazo. Se nota que es un equipo pensado para uso real, no solo de vidriera.",
    href: GOOGLE_REVIEWS_URL,
    color: "bg-sky-500/15 text-sky-300",
  },
  {
    id: "review-6",
    name: "Camila Etchart",
    initials: "CE",
    rating: 5,
    quote:
      "Desde la consulta inicial hasta el service post-venta, todo con respuestas claras y sin vueltas. Lo recomiendo sin dudar.",
    href: GOOGLE_REVIEWS_URL,
    color: "bg-cyan-500/15 text-cyan-300",
  },
] as const;

type Props = {
  product: ChargerProduct;
  id?: string;
};

/**
 * Reusable pricing/FAQ card for charger model pages: a toggle switches
 * between "solo cargador" (fixed price) and "cargador + instalación"
 * (a from-price, since the final install cost depends on the site),
 * with copy explaining why installation is quoted rather than fixed.
 *
 * All features (charger + installation) render at all times — the
 * toggle only relights which subset is active — so the card's height
 * and internal layout never shift when switching plans (zero CLS).
 * Every model also exposes a "Sin columna / Con columna" toggle above
 * the installation one, which adds the floor mounting post's price on
 * top of either plan. bs20-ba-7kw additionally exposes a "Sin cable /
 * Con cable enrulado" toggle above that, which swaps the cable feature
 * line and adds the coiled cable's price on top of either plan.
 */
export function ChargerPricingSection({ product, id }: Props) {
  const t = useTranslations("ChargerModelPage.pricingSection");
  const tReviews = useTranslations("ChargerModelPage.socialProofSection");
  const track = useTrack();
  const { theme } = product;
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [includeCoiledCable, setIncludeCoiledCable] = useState(false);
  const [includeColumn, setIncludeColumn] = useState(false);

  const hasCableAddon = product.slug === CABLE_ADDON_SLUG;

  const chargerFeatures = t.raw(`features.charger.${product.slug}`) as string[];
  const installationFeatures = t.raw("features.installation") as string[];

  /**
   * Each item's active state is independent of the others: charger
   * features are always on, installation features follow the
   * installation toggle, and the cable/column features follow their
   * own toggle only — they must not relight just because installation
   * was added, since they're separate add-ons.
   */
  const items = [
    ...chargerFeatures.map((text) => ({ text, active: true })),
    ...(hasCableAddon
      ? [{ text: t("features.cable"), active: includeCoiledCable }]
      : []),
    { text: t("features.column"), active: includeColumn },
    ...installationFeatures.map((text) => ({
      text,
      active: includeInstallation,
    })),
  ];

  const addonsPrice =
    (includeCoiledCable ? CHARGER_COILED_CABLE_PRICE_USD : 0) +
    (includeColumn ? CHARGER_COLUMN_PRICE_USD : 0);
  const basePrice = product.price.amount + addonsPrice;
  const bundlePrice = CHARGER_INSTALLATION_PRICE_USD + addonsPrice;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("cta.whatsappMessage", { model: product.shortName }),
  )}`;

  function handleToggle(next: boolean) {
    setIncludeInstallation(next);
    track.pricingInstallationToggled(product.slug, next);
  }

  function handleCableToggle(next: boolean) {
    setIncludeCoiledCable(next);
    track.pricingCableToggled(product.slug, next);
  }

  function handleColumnToggle(next: boolean) {
    setIncludeColumn(next);
    track.pricingColumnToggled(product.slug, next);
  }

  return (
    <section
      id={id}
      className="relative overflow-hidden border-y border-neutral-900 bg-neutral-950 py-24 sm:py-32"
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
            <p className="mt-6 text-base leading-relaxed text-neutral-400">
              {t(`descriptions.${product.slug}`)}
            </p>

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

            {/*
              All items stay mounted regardless of the installation toggle —
              only their active/inactive styling changes — so the grid's
              size never shifts between plans (zero CLS) and the transition
              reads as items "powering on" rather than a list being swapped.
              (The cable feature line's text itself swaps with the cable
              toggle, independent of the installation toggle.)
            */}
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2"
            >
              {items.map((item) => {
                const active = item.active;
                return (
                  <li
                    key={item.text}
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
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Right: toggle + price + CTA                                    */}
          {/* -------------------------------------------------------------- */}
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-lg lg:shrink-0">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 px-4 py-10 text-center lg:flex lg:h-full lg:flex-col lg:justify-center lg:px-8 lg:py-16">
              <div className="mx-auto w-full max-w-sm">
                {/*
                  Cable add-on toggle: only rendered for the socket-only
                  model (no cable in the box). Sits above the installation
                  toggle and follows the same left/right-pinned label
                  pattern so the switch stays centered.
                */}
                {hasCableAddon && (
                  <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-x-3">
                    <span
                      className={cn(
                        "whitespace-nowrap text-right text-xs font-medium transition-colors duration-300 sm:text-sm",
                        !includeCoiledCable
                          ? theme.accentText
                          : "text-neutral-600",
                      )}
                    >
                      {t("cableToggle.withoutCableLabel")}
                    </span>
                    <AppSwitch
                      checked={includeCoiledCable}
                      onChange={handleCableToggle}
                      activeClassName={theme.accentBg}
                      aria-label={t("cableToggle.label")}
                    />
                    <span
                      className={cn(
                        "whitespace-nowrap text-left text-xs font-medium transition-colors duration-300 sm:text-sm",
                        includeCoiledCable
                          ? theme.accentText
                          : "text-neutral-600",
                      )}
                    >
                      {t("cableToggle.withCableLabel")}
                    </span>
                  </div>
                )}

                {/*
                  Column add-on toggle: rendered for every charger model.
                  Sits above the installation toggle (and below the cable
                  toggle, when present) following the same left/right-pinned
                  label pattern so the switch stays centered.
                */}
                <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-x-3">
                  <span
                    className={cn(
                      "whitespace-nowrap text-right text-xs font-medium transition-colors duration-300 sm:text-sm",
                      !includeColumn ? theme.accentText : "text-neutral-600",
                    )}
                  >
                    {t("columnToggle.withoutColumnLabel")}
                  </span>
                  <AppSwitch
                    checked={includeColumn}
                    onChange={handleColumnToggle}
                    activeClassName={theme.accentBg}
                    aria-label={t("columnToggle.label")}
                  />
                  <span
                    className={cn(
                      "whitespace-nowrap text-left text-xs font-medium transition-colors duration-300 sm:text-sm",
                      includeColumn ? theme.accentText : "text-neutral-600",
                    )}
                  >
                    {t("columnToggle.withColumnLabel")}
                  </span>
                </div>

                {/*
                  Toggle: both plan names always shown, pinned left/right of
                  the switch via a 3-col grid so the switch stays centered
                  regardless of each label's length, and the active side
                  lights up.
                */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3">
                  <span
                    className={cn(
                      "whitespace-nowrap text-right text-xs font-medium transition-colors duration-300 sm:text-sm",
                      !includeInstallation
                        ? theme.accentText
                        : "text-neutral-600",
                    )}
                  >
                    {t("toggle.chargerOnlyLabel")}
                  </span>
                  <AppSwitch
                    checked={includeInstallation}
                    onChange={handleToggle}
                    activeClassName={theme.accentBg}
                    aria-label={t("toggle.label")}
                  />
                  <span
                    className={cn(
                      "whitespace-nowrap text-left text-xs font-medium transition-colors duration-300 sm:text-sm",
                      includeInstallation
                        ? theme.accentText
                        : "text-neutral-600",
                    )}
                  >
                    {t("toggle.withInstallationLabel")}
                  </span>
                </div>

                {/*
                  Price line: "Desde" and "USD" are passed as AnimateNumber's
                  prefix/suffix (rather than sibling elements) so they sit
                  inside its layout-animation group and resize smoothly in
                  step with the digits instead of snapping when the amount's
                  width changes.
                */}
                <div className="mt-8 flex items-baseline justify-center">
                  <AnimateNumber
                    locales="en-US"
                    format={{ maximumFractionDigits: 0 }}
                    prefix={includeInstallation ? t("toggle.fromPrefix") : ""}
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
                          source: "charger_pricing_section",
                          charger: product.slug,
                        })
                      : track.mercadopagoClick({
                          source: "charger_pricing_section",
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
                  <motion.p
                    key={includeInstallation ? "with" : "without"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 self-center flex items-center min-h-[100px] text-sm leading-relaxed text-neutral-400 px-6 sm:px-0"
                  >
                    {includeInstallation
                      ? t("footnote.withInstallation")
                      : t("footnote.chargerOnly")}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Social proof — what our customers say                           */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-20 max-w-3xl text-center sm:mt-28"
        >
          <p
            className={cn(
              "text-sm uppercase tracking-[0.35em]",
              theme.accentText,
            )}
          >
            {tReviews("eyebrow")}
          </p>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl">
            {tReviews("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400">
            {tReviews("subtitle")}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <motion.a
              key={review.id}
              href={review.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track.socialProofReviewClicked(product.slug, review.id)
              }
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -4 }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-colors duration-300",
                "hover:border-white/20 hover:bg-white/[0.05]",
              )}
            >
              {/* Hover overlay: "View review on Google" */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black/70 opacity-0 backdrop-blur-sm transition-opacity duration-300",
                  "group-hover:opacity-100 group-focus-visible:opacity-100",
                )}
              >
                <span
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    theme.accentText,
                  )}
                >
                  {tReviews("viewReview")}
                  <ExternalLink className="h-4 w-4" />
                </span>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={cn(
                      "h-4 w-4",
                      starIndex < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-neutral-800 text-neutral-800",
                    )}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-300">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 flex-none items-center justify-center rounded-full text-sm font-semibold",
                    review.color,
                  )}
                  aria-hidden="true"
                >
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {review.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {tReviews("source")}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.socialProofViewAllClicked(product.slug)}
            className={cn(
              "text-sm font-medium underline-offset-4 hover:underline",
              theme.accentText,
            )}
          >
            {tReviews("viewAll")}
          </a>
        </div>
      </div>
    </section>
  );
}
