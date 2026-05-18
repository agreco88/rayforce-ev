"use client";

import { AppButton } from "@/components/ui/wrappers/AppButton";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { useTrack } from "@/lib/analytics";

const WHATSAPP_NUMBER = "598092041709";

export function FooterCTA() {
  const t = useTranslations("Footer.cta");
  const track = useTrack();

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("whatsappMessage"),
  )}`;

  return (
    <div id="contacto" className="mx-auto max-w-4xl pt-18 text-center">
      <h3>{t("eyebrow")}</h3>
      <h2 className="my-4!">{t("title")}</h2>
      <p className="mx-auto mt-6 max-w-xl text-base text-neutral-400">
        {t("description")}
      </p>
      <div className="mt-8 flex justify-center">
        <AppButton
          href={whatsappHref}
          external
          className="group text-green-500! hover:text-green-400! hover:shadow-green-300/50 py-6 px-6"
          icon={<FaWhatsapp className="size-4 ml-1" />}
          track={() => track.whatsappClick({ source: "footer" })}
        >
          {t("button")}
        </AppButton>
      </div>
    </div>
  );
}
