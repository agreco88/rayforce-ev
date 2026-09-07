"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Play, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTrack } from "@/lib/analytics";

const PROOF_VIDEO_SRC = "/assets/videos/cables/chc-cable-run-over-test.mp4";
const POSTER_SRC =
  "/assets/images/cables/chc-cable-run-over-test-poster.jpg";

type Props = {
  location: "desktop" | "mobile";
};

export function PublicChargingVideoModal({ location }: Props) {
  const t = useTranslations("HomePage.PublicChargingCableSection");
  const track = useTrack();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setEnded(false);
  };

  const trigger = (
    <button
      type="button"
      onClick={() => track.publicChargingVideoOpened({ location })}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={POSTER_SRC}
        alt={t("imageAlt")}
        loading="lazy"
        decoding="async"
        className="aspect-video w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-neutral-950/10" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="flex size-16 items-center justify-center rounded-full bg-amber-400 text-neutral-950 transition-transform duration-300 group-hover:scale-110">
          <Play className="size-7 translate-x-0.5 fill-current" />
        </span>
        <span className="text-sm font-medium text-white">
          {t("video.cta")}
        </span>
      </div>

      <span className="absolute left-4 top-4 rounded-full border border-amber-400/30 bg-neutral-950/70 px-3 py-1 text-[11px] uppercase tracking-wider text-amber-400">
        {t("video.badge")}
      </span>
    </button>
  );

  return (
    <Dialog onOpenChange={(open) => open && setEnded(false)}>
      <DialogHeader className="sr-only">
        <DialogTitle>{t("video.title")}</DialogTitle>
      </DialogHeader>

      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-[95vw] !max-w-[1100px] overflow-hidden rounded-2xl p-0">
        <div className="relative aspect-video w-full">
          <video
            ref={videoRef}
            src={PROOF_VIDEO_SRC}
            poster={POSTER_SRC}
            controls
            autoPlay
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
              <span className="flex size-16 items-center justify-center rounded-full bg-amber-400 text-neutral-950 transition-transform duration-300 hover:scale-110">
                <RotateCcw className="size-7" />
              </span>
              <span className="text-sm font-medium text-white">
                {t("video.replay")}
              </span>
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
