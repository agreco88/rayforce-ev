"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

type ProductCardProps = {
  label: string;
  description: string;
  cta: string;
  href: string;

  posterSrc: string;
  videoSrc?: string;
  isMirrored?: boolean;

  className?: string;
};

function useCanHover() {
  const [canHover, setCanHover] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canHover;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function ProductCard({
  label,
  description,
  cta,
  href,
  posterSrc,
  videoSrc,
  isMirrored,
  className,
}: ProductCardProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const canHover = useCanHover();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isHovered, setIsHovered] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (!videoSrc) return;

    const v = videoRef.current;
    if (!v) return;

    const onLoadedData = () => {
      try {
        v.pause();
        if (v.currentTime !== 0) v.currentTime = 0;
      } catch {}
      setIsReady(true);
    };

    v.addEventListener("loadeddata", onLoadedData);
    v.load();

    return () => {
      v.removeEventListener("loadeddata", onLoadedData);
    };
  }, [videoSrc]);

  const handleEnter = async () => {
    if (!canHover || prefersReducedMotion || !videoSrc) return;

    setIsHovered(true);
    try {
      await videoRef.current?.play();
    } catch {}
  };

  const handleLeave = () => {
    if (!canHover || !videoSrc) return;

    setIsHovered(false);
    try {
      videoRef.current?.pause();
    } catch {}
  };

  return (
    <Link
      href={href}
      aria-label={`${label} — ${cta}`}
      className={clsx(
        "group relative block overflow-hidden rounded-2xl bg-neutral-950",
        "ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 h-70",
        className
      )}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Media */}
      <div className="absolute inset-0">
        {/* Media content (can be mirrored) */}
        <div className={clsx("absolute inset-0", isMirrored && "scale-x-[-1]")}>
          {/* Poster */}
          <img
            src={posterSrc}
            alt=""
            draggable={false}
            className={clsx(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              videoSrc && isReady ? "opacity-0" : "opacity-100"
            )}
          />

          {/* Video */}
          {videoSrc && (
            <video
              ref={videoRef}
              muted
              playsInline
              preload="metadata"
              loop
              className={clsx(
                "absolute inset-0 h-full w-full object-cover",
                "transition-[opacity,filter] duration-500 ease-out",
                isReady ? "opacity-100" : "opacity-0",
                isHovered ? "grayscale-0" : "grayscale-25 lg:grayscale"
              )}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Overlays (NEVER mirrored) */}
        <div className="pointer-events-none absolute inset-0">
          {/* Strong radial contrast overlay (top-left → bottom-right) */}
          <div
            className={clsx(
              "absolute inset-0",
              "bg-[radial-gradient(150%_150%_at_0%_0%,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.7)_30%,rgba(0,0,0,0.4)_55%,rgba(0,0,0,0.15)_75%,rgba(0,0,0,0)_100%)]",
              "opacity-90 group-hover:opacity-100 transition-opacity duration-500 ease-out"
            )}
          />

          {/* Linear depth overlay */}
          <div className="absolute opacity-25 sm:opacity-100 inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25" />

          {/* Border ring */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-neutral-300">
            {label}
          </p>

          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-neutral-200/90">
            {description}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-neutral-200">
          <span className="border-b border-transparent transition-colors duration-300 group-hover:border-neutral-300/70">
            {cta}
          </span>
          <ChevronRight className="h-4 w-4 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
}
