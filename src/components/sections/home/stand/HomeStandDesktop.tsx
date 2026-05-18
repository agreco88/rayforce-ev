"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function HomeStandDesktop() {
  const t = useTranslations("HomePage.HomeStandSection");

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
          <div className="absolute inset-0 flex justify-center bg-neutral-950">
            <img
              src="/images/stand/stand-9.png"
              alt={t("title")}
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
            <div className="absolute left-0 h-full w-[15%] bg-gradient-to-r from-neutral-950 via-neutral-950 to-transparent" />

            <div className="absolute right-0 h-full w-[15%] bg-gradient-to-l from-neutral-950 via-neutral-950 to-transparent" />
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
                  flex max-w-lg
                  flex-col gap-4
                "
              >
                {/* TITLE */}
                <h2
                  className="
                    text-5xl
                    lg:text-6xl

                    leading-[0.95]
                    tracking-tight
                  "
                >
                  {t("title")}
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="
                    text-lg
                    leading-relaxed
                    text-neutral-300
                  "
                >
                  {t("description")}
                </p>

                {/* SPECS */}
                <span className="text-sm text-neutral-500">{t("specs")}</span>

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

                {/* CTA */}
                <Button
                  asChild
                  variant="ghost"
                  className="mb-8 w-fit p-0 hover:bg-transparent"
                >
                  <Link
                    href="/#compatibilidad"
                    className="
                      mt-2

                      flex items-center gap-1

                      text-sm
                      uppercase
                      tracking-wide

                      text-neutral-300
                      transition-all

                      hover:gap-3
                      hover:bg-transparent!
                      hover:text-green-500
                    "
                  >
                    {t("cta.label")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
