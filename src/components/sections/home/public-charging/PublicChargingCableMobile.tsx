"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { useTrack } from "@/lib/analytics";
import { PublicChargingVideoModal } from "./PublicChargingVideoModal";

export function PublicChargingCableMobile() {
  const t = useTranslations("HomePage.PublicChargingCableSection");
  const track = useTrack();

  return (
    <div className="relative isolate overflow-hidden">
      <GridBackground
        cellSize={48}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* `gap-10` entre bloques (texto, video, precio+CTAs) en vez de `gap-6`:
          con 24px los tres se leían como un solo bloque corrido. */}
      <div className="relative z-10 flex flex-col gap-10 px-6 pt-16 pb-16">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400">
            {t("eyebrow")}
          </span>

          <h2 className="m-0 text-3xl leading-[1.1] tracking-tight font-light">
            {t("title")}
          </h2>

          <p className="max-w-sm text-sm leading-relaxed text-neutral-300">
            {t("description")}
          </p>
        </div>

        <PublicChargingVideoModal location="mobile" />

        {/* PRICE + CTAs */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-end gap-2.5">
            <span className="text-5xl font-thin tracking-tighter text-amber-400">
              {t("pricing.price")}
            </span>
            <span className="mb-1.5 text-sm text-neutral-400">
              {t("pricing.taxLabel")}
            </span>
          </div>

          {/* Los dos CTAs en una fila 50/50 (`grid-cols-2`) en vez de apilados.
              El secundario era un link subrayado suelto debajo del botón: como
              ahora comparten fila, pasa a botón con borde, el mismo par
              primario/secundario que usa el desktop. `text-center` y no
              `whitespace-nowrap` porque a 375px el copy puede necesitar dos
              líneas, y con `items-stretch` (por defecto en grid) las dos
              celdas quedan igual de altas si eso pasa. */}
          <div className="grid w-full grid-cols-2 gap-3">
            <Link
              href="/cables/bs-chc003"
              onClick={() =>
                track.publicChargingCableCta({
                  cta: "product",
                  location: "mobile",
                })
              }
              className="flex items-center justify-center rounded-xl bg-amber-400 px-4 py-3 text-center text-sm font-semibold text-neutral-950 transition-colors duration-200 hover:bg-amber-300"
            >
              {t("pricing.cta")}
            </Link>

            <Link
              href="/cables"
              onClick={() =>
                track.publicChargingCableCta({
                  cta: "all_cables",
                  location: "mobile",
                })
              }
              className="flex items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-neutral-300 transition-colors duration-200 hover:border-white/30 hover:text-white"
            >
              {t("pricing.secondaryCta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
