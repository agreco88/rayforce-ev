"use client";

import { AppButton } from "@/components/ui/wrappers/AppButton";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { useTrack } from "@/lib/analytics";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export function FooterCTA() {
  const t = useTranslations("Footer.cta");
  const track = useTrack();

  return (
    <div
      id="contacto"
      className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-0 lg:py-36"
    >
      <h3>{t("eyebrow")}</h3>
      <h2 className="my-4!">{t("title")}</h2>
      <p className="mx-auto mt-6 max-w-xl text-base text-neutral-400">
        {t("description")}
      </p>
      <div className="mt-8 flex justify-center">
        {/* El verde sólido del CTA principal (mismo que `ChargerModelHeroCTA`).
            Los `!` pisan el outline verde que `AppButton` trae por defecto. */}
        <AppButton
          href={buildWhatsAppHref(t("whatsappMessage"))}
          external
          className="group border-transparent! bg-green-500! px-6 py-6 font-medium text-black! shadow-lg shadow-green-500/20 hover:bg-green-400! hover:text-black! hover:shadow-green-500/30"
          icon={<FaWhatsapp className="ml-1 size-4" />}
          track={() => track.whatsappClick({ source: "footer" })}
        >
          {t("button")}
        </AppButton>
      </div>
    </div>
  );
}
