"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTrack } from "@/lib/analytics";

/**
 * El trío de CTA del hero mobile. Mismo criterio que el desktop —lo que separa
 * primario de secundario es el color del texto, no la forma— pero full width,
 * apilados y con h-14: el target tactil no se toca para hacer entrar el fold.
 */
export function HomeHeroMobileActions() {
  const t = useTranslations("HomePage.Hero");
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
        <Link href="/cargadores" onClick={() => track.homeHeroPrimary("mobile")}>
          {t("ctaPrimary")}
        </Link>
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
        <Link href="/empresas" onClick={() => track.homeHeroEmpresas("mobile")}>
          {t("ctaSecondary")}
        </Link>
      </Button>

      {/* Baja al bloque de UTE que cierra el lineup, en esta misma página. */}
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
        <a href="#aumento-de-potencia">{t("ctaTertiary")}</a>
      </Button>
    </div>
  );
}
