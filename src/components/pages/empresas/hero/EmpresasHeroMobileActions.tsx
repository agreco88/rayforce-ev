"use client";

import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTrack } from "@/lib/analytics";
import { buildWhatsAppHref } from "@/lib/whatsapp";

/** El par de CTA del hero mobile, con los estilos de `HomeHeroMobileActions`. */
export function EmpresasHeroMobileActions() {
  const t = useTranslations("EmpresasPage.Hero");
  const tContact = useTranslations("EmpresasPage.Contact");
  const track = useTrack();

  return (
    <div className="flex flex-col gap-2">
      <Button
        asChild
        className="
          h-12 rounded-2xl px-8
          border border-green-400/30
          bg-gradient-to-b from-neutral-800 to-neutral-900
          text-green-400
          hover:from-neutral-700 hover:to-neutral-800 hover:text-green-300
          shadow-lg shadow-black/30
        "
      >
        <a
          href={buildWhatsAppHref(tContact("whatsappMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track.whatsappClick({ source: "empresas_hero" })}
        >
          {t("ctaPrimary")}
          <FaWhatsapp className="size-4" />
        </a>
      </Button>

      <Button
        asChild
        variant="ghost"
        className="
          h-12 rounded-2xl px-8
          border border-transparent
          text-neutral-200
          hover:bg-gradient-to-b hover:from-neutral-800 hover:to-neutral-900
          hover:text-white
        "
      >
        <Link href="/cargadores">{t("ctaSecondary")}</Link>
      </Button>
    </div>
  );
}
