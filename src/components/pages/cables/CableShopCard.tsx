"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useTrack } from "@/lib/analytics/use-track";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CableProduct;
};

/** Ecommerce-style product card: white photo plate on top, spec body below. */
export function CableShopCard({ product }: Props) {
  const t = useTranslations("CablesPage.ShopCard");
  const tCard = useTranslations("CablesPage.ProductCard");
  const track = useTrack();

  const variants = tCard.raw("variants") as Record<
    string,
    { label: string; description: string }
  >;
  const copy = variants[product.slug];
  const href = `/cables/${product.slug}`;

  const highlights = [
    t("specs.length", { length: product.specs.lengthM }),
    product.specs.cableStyle === "coiled"
      ? t("specs.coiled")
      : t("specs.straight"),
    t("specs.current", { current: product.specs.maxCurrentA ?? 32 }),
    product.specs.temperatureSensor ? t("specs.temperatureSensor") : null,
    product.specs.bagIncluded ? t("specs.bag") : null,
  ].filter(Boolean) as string[];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", visualDuration: 0.35, bounce: 0.2 }}
      className="
        group flex h-full flex-col overflow-hidden
        rounded-2xl border border-white/10 bg-neutral-950
        transition-colors duration-300 hover:border-amber-400/30
      "
    >
      {/* ── Photo plate ─────────────────────────────────────── */}
      <Link
        href={href}
        onClick={() => track.chargerCardClicked(product.slug)}
        aria-label={copy?.label ?? product.publicName}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-white"
      >
        {/* Model code chip */}
        <span className="absolute left-4 top-4 z-10 rounded-full bg-neutral-900/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-neutral-300">
          {product.modelCode}
        </span>

        <Image
          src={product.heroImage}
          alt={product.publicName}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="
            object-contain p-6
            transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:scale-[1.04]
          "
        />
      </Link>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-white">
          {copy?.label ?? product.publicName}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
          {copy?.description ?? ""}
        </p>

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <ul className="mt-4 flex list-none flex-wrap gap-1.5">
            {product.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] text-amber-300"
              >
                {badge}
              </li>
            ))}
          </ul>
        )}

        {/* Highlights */}
        <ul className="mt-5 flex list-none flex-col gap-2 border-t border-neutral-800 pt-5 text-sm text-neutral-400">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check
                className="size-3.5 shrink-0 text-amber-400"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-neutral-800 pt-5">
          <div className="flex flex-col">
            <span className="text-3xl font-thin tracking-tighter text-amber-400">
              {product.price.currency} {product.price.amount}
            </span>
            {product.price.taxLabel && (
              <span className="text-[11px] text-neutral-500">
                {product.price.taxLabel}
              </span>
            )}
          </div>

          <Link
            href={href}
            onClick={() => track.chargerCardClicked(product.slug)}
            className="
              inline-flex items-center gap-2 rounded-full
              bg-amber-400 px-4 py-2
              text-sm font-medium text-neutral-950
              transition-colors duration-300 hover:bg-amber-300
            "
          >
            {t("cta")}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
