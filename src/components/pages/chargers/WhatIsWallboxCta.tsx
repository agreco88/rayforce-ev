"use client";

import { ChevronRight, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * La salida de la seccion: las tarjetas explican por que conviene un wallbox y
 * despues no hay a donde ir.
 *
 * Mismo estilo que el CTA del panel de precios (`StandPricingPanelMobile`):
 * verde solido, texto negro. Misma jerarquia de "accion principal de compra" en
 * la misma pagina.
 */
export function WhatIsWallboxCta() {
  const t = useTranslations("HomePage.WallboxIntro");

  return (
    <Button
      asChild
      className="flex h-14 w-62 items-center justify-center gap-2 rounded-xl bg-green-400 px-8 text-sm font-semibold text-black hover:bg-green-300 sm:w-64 lg:w-72"
    >
      <Link href="/cargadores">
        {t("cta")}
        <ChevronRight />
      </Link>
    </Button>
  );
}
