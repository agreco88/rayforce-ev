"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function HomeStandMobile() {
  const t = useTranslations("HomePage.HomeStandSection");

  return (
    <section
      className="
        relative isolate overflow-hidden
      "
    >
      <div
        className="
          relative
          h-[560px]
          w-full
          overflow-hidden
        "
      >
        {/* IMAGE */}
        <div className="absolute inset-0 bg-neutral-950">
          <img
            src="/images/stand-9.png"
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
            bg-gradient-to-t
            from-black/50
            via-black/70
            to-transparent
          "
        />

        {/* CONTENT */}
        <div
          className="
            absolute inset-0
            flex items-center pt-16
          "
        >
          <div
            className="
              w-full
              px-8
            "
          >
            <div
              className="
                flex flex-col gap-4
              "
            >
              {/* TITLE */}
              <h2
                className="
                  max-w-xs

                  text-3xl
                  leading-[0.95]
                  tracking-tight
                "
              >
                {t("title")}
              </h2>

              {/* DESCRIPTION */}
              <p
                className="
                  max-w-xs

                  text-sm
                  leading-relaxed
                  text-neutral-300
                "
              >
                {t("description")}
              </p>

              {/* SPECS */}
              <span className="text-sm text-neutral-500">{t("specs")}</span>

              {/* PRICE */}
              <div className="mt-2 flex items-end gap-2.5">
                <span
                  className="
                    text-4xl
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
    </section>
  );
}
