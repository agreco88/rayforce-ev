"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { useTrack } from "@/lib/analytics";
import { PublicChargingVideoModal } from "./PublicChargingVideoModal";

export function PublicChargingCableDesktop() {
  const t = useTranslations("HomePage.PublicChargingCableSection");
  const track = useTrack();

  return (
    <div className="relative isolate overflow-hidden flex justify-center">
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 30%, rgba(251,191,36,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] px-6 sm:px-8 lg:px-16 py-20 xl:py-28 2xl:px-0">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* ── LEFT: copy ─────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <span className="text-xs tracking-[0.25em] uppercase text-amber-400">
              {t("eyebrow")}
            </span>

            <h2 className="text-5xl leading-[1.1] tracking-tight font-light m-0">
              {t("title")}
            </h2>

            <p className="text-lg leading-relaxed text-neutral-300 max-w-lg">
              {t("description")}
            </p>

            {/* PRICE */}
            <div className="mt-4 flex items-end gap-2.5">
              <span className="text-5xl lg:text-6xl font-thin tracking-tighter text-amber-400">
                {t("pricing.price")}
              </span>
              <span className="mb-1 text-sm text-neutral-400">
                {t("pricing.taxLabel")}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <Link
                href="/cables/bs-chc003-s"
                onClick={() =>
                  track.publicChargingCableCta({
                    cta: "product",
                    location: "desktop",
                  })
                }
                className="inline-flex items-center rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors duration-200 hover:bg-amber-300"
              >
                {t("pricing.cta")}
              </Link>

              <Link
                href="/cables"
                onClick={() =>
                  track.publicChargingCableCta({
                    cta: "all_cables",
                    location: "desktop",
                  })
                }
                className="inline-flex items-center rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:border-white/30 hover:text-white"
              >
                {t("pricing.secondaryCta")}
              </Link>
            </div>
          </div>

          {/* ── RIGHT: video proof ─────────────────────────── */}
          <PublicChargingVideoModal location="desktop" />
        </div>
      </div>
    </div>
  );
}
