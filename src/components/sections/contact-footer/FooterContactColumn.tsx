"use client";

import { useTranslations } from "next-intl";

export function FooterContactColumn() {
  const t = useTranslations("Footer.contact");

  return (
    <div>
      <h3 className="text-xs tracking-[0.18em] uppercase text-white sm:text-neutral-300 ">
        {t("title")}
      </h3>

      <ul className="mt-6 space-y-4 text-sm text-neutral-500">
        <li>{t("phone")}</li>
        <li>
          <a
            href={`mailto:${t("email")}`}
            className="hover:text-neutral-200 transition-colors"
          >
            {t("email")}
          </a>
        </li>
        <li className="uppercase">{t("location")}</li>
      </ul>
    </div>
  );
}
