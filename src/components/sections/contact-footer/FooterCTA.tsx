"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export function FooterCTA() {
  const t = useTranslations("Footer.cta");

  return (
    <div className="mx-auto max-w-2xl py-8 my-24 2xl:my-40 text-center">
      <p className="text-xs tracking-[0.18em] uppercase text-neutral-400">
        {t("eyebrow")}
      </p>

      <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t("title")}
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-base text-neutral-400">
        {t("description")}
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          href="#contacto"
          className="
            inline-flex items-center justify-center
            rounded-full
            bg-gradient-to-b from-neutral-200 to-neutral-300
            px-4 sm:px-6 py-3
            font-medium text-neutral-900
            shadow-sm gap-2
            transition-all
            hover:from-neutral-100 hover:to-neutral-200
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-white/40
            text-sm sm:text-base
          "
        >
          <FaWhatsapp className="size-6 text-neutral-700" /> {t("button")}
        </Link>
      </div>
    </div>
  );
}
