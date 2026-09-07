"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { RotateCcw } from "lucide-react";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";

const PROOF_VIDEO_SRC = "/assets/videos/cables/chc-cable-run-over-test.mp4";
const POSTER_SRC =
  "/assets/images/cables/chc-cable-run-over-test-poster.jpg";

type Props = {
  theme: CatalogTheme;
};

export function CableProofVideoSection({ theme }: Props) {
  const t = useTranslations("CableModelPage.proofVideo");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setEnded(false);
  };

  return (
    <section className="relative w-full border-b border-neutral-900 bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 sm:px-6 lg:px-16 2xl:px-0">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <span
            className={`text-xs uppercase tracking-[0.25em] ${theme.accentText}`}
          >
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="text-base leading-relaxed text-neutral-400">
            {t("description")}
          </p>
        </div>

        <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10">
          <video
            ref={videoRef}
            src={PROOF_VIDEO_SRC}
            poster={POSTER_SRC}
            controls
            playsInline
            onEnded={() => setEnded(true)}
            className="h-full w-full object-cover"
          />

          {ended && (
            <button
              type="button"
              onClick={replay}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950/70"
            >
              <span
                className={`flex size-16 items-center justify-center rounded-full text-neutral-950 transition-transform duration-300 hover:scale-110 ${theme.accentBg}`}
              >
                <RotateCcw className="size-7" />
              </span>
              <span className="text-sm font-medium text-white">
                {t("replay")}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
