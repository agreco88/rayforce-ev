"use client";

import { AppButton } from "@/components/ui/wrappers/AppButton";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export function FooterCTA() {
  const t = useTranslations("Footer.cta");

  return (
    <div className="mx-auto max-w-4xl mt-18 text-center">
      {" "}
      <h3>{t("eyebrow")}</h3>
      <h2 className="my-4!">{t("title")}</h2>
      <p className="mx-auto mt-6 max-w-xl text-base text-neutral-400">
        {t("description")}
      </p>
      <div className="mt-8 flex justify-center">
        {/* <a
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
        </a> */}
        <AppButton
          href="/contacto"
          className="group  text-green-500! hover:text-green-400! hover:shadow-green-300/50 py-6 px-6"
          icon={<FaWhatsapp className="size-4 ml-1" />}
        >
          Iniciar chat con un asesor
        </AppButton>
      </div>
    </div>
  );
}
