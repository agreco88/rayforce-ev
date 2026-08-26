"use client";

import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics";

export function HomeStandMobile() {
  const t = useTranslations("HomePage.HomeStandSection");
  const track = useTrack();

  return (
    <section
      aria-labelledby="stand-mobile-heading"
      className="relative isolate overflow-hidden"
    >
      <div className="flex flex-col px-6 pt-12 pb-10 gap-6">
        {/* TEXT — eyebrow, title, description */}
        <div className="flex flex-col gap-3">
          <span
            aria-hidden="true"
            className="text-[10px] tracking-[0.3em] uppercase text-green-400"
          >
            {t("eyebrow")}
          </span>

          <h2
            id="stand-mobile-heading"
            className="text-3xl leading-[1.1] tracking-tight font-light m-0"
          >
            {t("title")}
          </h2>

          <p className="text-sm leading-relaxed text-neutral-300 max-w-sm">
            {t("description")}
          </p>
        </div>

        {/* IMAGE */}
        <figure className="w-full rounded-2xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/stand/charger-mobile.avif"
            alt={t("imageAlt")}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover"
          />
        </figure>

        {/* SPECS + PRICE */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs text-neutral-400 tracking-wide">
            {t("specs")}
          </span>

          <div className="flex items-end gap-2.5 mt-1">
            <span
              aria-label={t("pricing.price")}
              className="text-5xl font-thin tracking-tighter text-green-500"
            >
              {t("pricing.price")}
            </span>
            <span className="mb-1.5 text-sm text-neutral-400">
              {t("pricing.taxLabel")}
            </span>
          </div>

          {/* MERCADOPAGO */}
          <a
            href="https://mpago.la/1VArJbv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.mercadopagoClick({ source: "stand", charger: "stand", location: "mobile" })}
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#009EE3]/40 shadow-sm font-semibold text-sm transition-all duration-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/mpago.png"
              alt=""
              aria-hidden="true"
              className="h-8 w-auto"
            />
            <div className="w-0.5 bg-[#0a0080]/20 h-full rounded-full" />
            <span className="text-[#0a0080] uppercase tracking-tighter!">
              {t("pricing.cta")}
            </span>
          </a>
          <span className="text-xs text-neutral-400">{t("pricing.note")}</span>
        </div>
      </div>
    </section>
  );
}
