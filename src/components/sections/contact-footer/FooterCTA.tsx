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
          href={`https://wa.me/+598092041709`}
          target="_blank"
          rel="noopener noreferrer"
          className="
                  flex items-center justify-center gap-3
                  w-fit h-12
                  rounded-full
                  px-8
                  bg-gradient-to-t from-green-800 via-green-700 to-green-600
                  text-gray-200 font-semibold text-base 
                  transition-all duration-300
                  shadow-lg shadow-black/40
                "
        >
          <FaWhatsapp className="size-6 text-white" /> {t("button")}
        </a>
      </div>
    </div>
  );
}
