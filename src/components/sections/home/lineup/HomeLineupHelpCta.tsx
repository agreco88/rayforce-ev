"use client";

import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { useTrack } from "@/lib/analytics";

const WHATSAPP_NUMBER = "59892041709";

/**
 * El desvio para quien no se decide con la grilla: va despues de las fichas,
 * antes de las reseñas — si ninguna tarjeta cerro, la salida es preguntar.
 */
export function HomeLineupHelpCta({ className }: { className?: string }) {
  const t = useTranslations("HomePage.Lineup.help");
  const track = useTrack();

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("whatsappMessage"),
  )}`;

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <p className="text-2xl font-light tracking-tight text-white sm:text-3xl">
        {t("title")}
      </p>

      <p className="mt-3 max-w-md text-base leading-relaxed text-balance text-neutral-400 sm:text-lg">
        {t("description")}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track.whatsappClick({ source: "home_lineup_help" })}
        className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-green-400 px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-300"
      >
        <FaWhatsapp size={18} />
        {t("cta")}
      </a>
    </div>
  );
}
