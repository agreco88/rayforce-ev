"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { useTrack } from "@/lib/analytics";
import { PublicChargingCableStats } from "./PublicChargingCableStats";
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

      <div className="relative z-10 flex flex-col gap-6 px-6 pt-12 pb-10">
        <div className="flex flex-col gap-3">
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

        {/* COMPARISON */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <span className="flex items-center gap-2 text-sm font-medium text-neutral-400">
              <X className="size-4 shrink-0 text-neutral-500" />
              {t("comparison.theirs")}
            </span>
            <span className="text-sm leading-relaxed text-neutral-500">
              {t("comparison.theirsDetail")}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-4">
            <span className="flex items-center gap-2 text-sm font-medium text-white">
              <Check className="size-4 shrink-0 text-amber-400" />
              {t("comparison.ours")}
            </span>
            <span className="text-sm leading-relaxed text-neutral-300">
              {t("comparison.oursDetail")}
            </span>
          </div>
        </div>

        <PublicChargingCableStats />

        {/* PRICE + CTAs */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-end gap-2.5">
            <span className="text-5xl font-thin tracking-tighter text-amber-400">
              {t("pricing.price")}
            </span>
            <span className="mb-1.5 text-sm text-neutral-400">
              {t("pricing.taxLabel")}
            </span>
          </div>

          <Link
            href="/cables/bs-chc003-s"
            onClick={() =>
              track.publicChargingCableCta({
                cta: "product",
                location: "mobile",
              })
            }
            className="w-full rounded-xl bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition-colors duration-200 hover:bg-amber-300"
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
            className="text-sm text-neutral-400 underline underline-offset-4 transition-colors duration-200 hover:text-white"
          >
            {t("pricing.secondaryCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
