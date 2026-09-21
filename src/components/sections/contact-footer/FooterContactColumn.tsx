"use client";

import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics/use-track";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function FooterContactColumn() {
  const t = useTranslations("Footer.contact");
  const track = useTrack();

  return (
    <div>
      <h3 className="text-xs tracking-[0.18em] uppercase text-neutral-300">
        {t("title")}
      </h3>

      <ul className="mt-6 space-y-4 text-sm text-neutral-400">
        <li>
          {/* El telefono era texto plano: en mobile no se podia tocar para
              llamar. El href sale del numero canonico, no del mensaje. */}
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="transition-colors hover:text-neutral-200"
          >
            {t("phone")}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${t("email")}`}
            onClick={() => track.emailLinkClicked()}
            className="transition-colors hover:text-neutral-200"
          >
            {t("email")}
          </a>
        </li>
        <li className="uppercase">{t("location")}</li>
      </ul>
    </div>
  );
}
