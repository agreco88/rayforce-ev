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
        <a
          href={`https://wa.me/+59899168085`}
          target="_blank"
          rel="noopener noreferrer"
          className="
        inline-flex items-center justify-center gap-2
        rounded-lg  px-8
        py-3
        text-sm sm:text-base
        text-white
        border border-green-900
        bg-gradient-to-b from-green-950 to-green-600
        bg-[length:100%_200%]
        bg-[position:0%_0%]
        transition-[background-position] duration-1000
        hover:bg-[position:0%_100%]
        shadow-sm
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-white/40
      "
        >
          <FaWhatsapp className="size-6 text-white" /> {t("button")}
        </a>
      </div>
    </div>
  );
}
