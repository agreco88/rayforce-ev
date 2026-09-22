"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { AppButton } from "@/components/ui/wrappers/AppButton";
import { useTrack } from "@/lib/analytics";

/**
 * Par de CTA del hero desktop. Los dos comparten el mismo gradiente en su
 * estado activo: lo que marca la jerarquía es el color del texto (verde vs.
 * neutral), no la forma. Sólidos y no traslúcidos porque van sobre la foto,
 * donde el fondo cambia píxel a píxel.
 */
export function HomeHeroActions() {
  const t = useTranslations("HomePage.Hero");
  const track = useTrack();

  return (
    <div className="mt-2 flex flex-wrap items-center gap-4">
      <AppButton
        href="/cargadores"
        icon={<ArrowRight className="size-4" />}
        className="
          border-green-400/30
          bg-gradient-to-b from-neutral-800 to-neutral-900
          text-green-400
          shadow-lg shadow-black/30
          hover:border-green-400/50 hover:from-neutral-700
          hover:to-neutral-800 hover:text-green-300
        "
        track={() => track.homeHeroPrimary("desktop")}
      >
        {t("ctaPrimary")}
      </AppButton>

      {/* Ghost: sin caja en reposo, toma el gradiente del primario en hover */}
      <AppButton
        href="/empresas"
        variant="ghost"
        className="
          border-transparent
          text-neutral-200
          [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]
          hover:bg-gradient-to-b hover:from-neutral-800
          hover:to-neutral-900 hover:text-white
        "
        track={() => track.homeHeroEmpresas("desktop")}
      >
        {t("ctaSecondary")}
      </AppButton>
    </div>
  );
}
