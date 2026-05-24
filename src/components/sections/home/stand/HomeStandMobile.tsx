"use client";

import { useTranslations } from "next-intl";

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
    
          w-full
          overflow-hidden
        "
      >
        {/* CONTENT */}
        <div
          className="
         
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
              {/* EYEBROW */}
              <span className="text-xs tracking-[0.25em] uppercase text-green-400">
                {t("eyebrow")}
              </span>

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
              {/* IMAGE */}
              <div className=" inset-0 bg-neutral-950">
                <img
                  src="/images/stand/charger-mobile.avif"
                  alt={t("title")}
                  className="
              h-full
              w-full

            "
                />
                {/* <img
            src="/images/stand/stand-9.png"
            alt={t("title")}
            className="
              h-full
              w-full
              object-cover
              object-[63%_center]
            "
          /> */}
              </div>
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

              {/* NOTE */}
              <span className="text-xs text-neutral-500">
                {t("pricing.note")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
