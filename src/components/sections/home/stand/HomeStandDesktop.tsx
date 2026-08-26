"use client";

import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics";

export function HomeStandDesktop() {
  const t = useTranslations("HomePage.HomeStandSection");
  const track = useTrack();

  return (
    <section
      className="
        relative isolate overflow-hidden
        flex justify-center
      "
    >
      <div className="relative w-full max-w-[1440px]">
        <div
          className="
            relative
            h-[540px]
            lg:h-[600px]
            xl:h-[840px]
            2xl:h-[1280px]
            max-h-[840px]
            w-full
            overflow-hidden
          "
        >
          {/* IMAGE */}
          <div className="absolute inset-0 flex justify-center bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/stand/stand-9.png"
              alt={t("title")}
              loading="lazy"
              decoding="async"
              className="
                h-full
                w-full
                object-cover
                object-[63%_center]
              "
            />
          </div>

          {/* OVERLAY */}
          <div
            className="
              absolute inset-0

              bg-gradient-to-r
              from-neutral-950/75
              via-neutral-950/30
              to-transparent
            "
          />

          {/* SIDE VIGNETTE */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 h-full w-[15%] bg-gradient-to-r from-neutral-900 via-neutral-900 to-transparent" />

            <div className="absolute right-0 h-full w-[15%] bg-gradient-to-l from-neutral-900 via-neutral-900 to-transparent" />
          </div>

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center">
            <div
              className="
                w-full
                px-6
                lg:pl-36
              "
            >
              <div
                className="
                  flex max-w-xl
                  flex-col gap-6
                "
              >
                {/* EYEBROW */}
                <span className="text-xs tracking-[0.25em] uppercase text-green-400">
                  {t("eyebrow")}
                </span>

                {/* TITLE */}
                <h2
                  id="stand-desktop-heading"
                  className="text-5xl leading-[1.1] tracking-tight font-light m-0"
                >
                  {t("title")}
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="
                    text-lg
                    leading-relaxed
                    text-neutral-300
                    max-w-lg
                  "
                >
                  {t("description")}
                </p>

                {/* SPECS */}
                <span className="text-sm text-neutral-400">{t("specs")}</span>

                {/* PRICE */}
                <div className="mt-4 flex items-end gap-2.5">
                  <span
                    className="
                      text-5xl
                      lg:text-6xl

                      font-thin
                      tracking-tighter
                      text-green-500
                    "
                  >
                    {t("pricing.price")}
                  </span>

                  <span className="mb-1 text-sm text-neutral-400">
                    {t("pricing.taxLabel")}
                  </span>
                </div>

                {/* MERCADOPAGO */}
                <a
                  href="https://mpago.la/1VArJbv"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track.mercadopagoClick({ source: "stand", charger: "stand", location: "desktop" })}
                  className="inline-flex items-center gap-2.5 self-start px-5 py-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#009EE3]/40 shadow-sm font-semibold text-sm transition-all duration-200"
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
                {/* NOTE */}
                <span className="text-xs text-neutral-400">
                  {t("pricing.note")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
