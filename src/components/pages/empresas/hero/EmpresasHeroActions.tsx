"use client";

import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";

import { AppButton } from "@/components/ui/wrappers/AppButton";
import { useTrack } from "@/lib/analytics";
import { buildWhatsAppHref } from "@/lib/whatsapp";

/** El par de CTA del hero desktop, con los estilos de `HomeHeroActions`. */
export function EmpresasHeroActions() {
  const t = useTranslations("EmpresasPage.Hero");
  const tContact = useTranslations("EmpresasPage.Contact");
  const track = useTrack();

  return (
    <div className="mt-2 flex flex-wrap items-center gap-4">
      <AppButton
        href={buildWhatsAppHref(tContact("whatsappMessage"))}
        external
        icon={<FaWhatsapp className="size-4" />}
        className="
          border-green-400/30
          bg-gradient-to-b from-neutral-800 to-neutral-900
          text-green-400
          shadow-lg shadow-black/30
          hover:border-green-400/50 hover:from-neutral-700
          hover:to-neutral-800 hover:text-green-300
        "
        track={() => track.whatsappClick({ source: "empresas_hero" })}
      >
        {t("ctaPrimary")}
      </AppButton>

      <AppButton
        href="/cargadores"
        variant="ghost"
        className="
          border-transparent
          text-neutral-200
          hover:bg-gradient-to-b hover:from-neutral-800
          hover:to-neutral-900 hover:text-white
        "
      >
        {t("ctaSecondary")}
      </AppButton>
    </div>
  );
}
