"use client";

import { useEffect, useRef } from "react";
import { useTrack } from "./use-track";

const MILESTONES = [25, 50, 75, 100] as const;

export function useScrollDepth(page: string) {
  const track = useTrack();
  const fired = useRef(new Set<number>());

  useEffect(() => {
    const check = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = (scrolled / total) * 100;

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          track.scrollDepthMilestone(page, milestone);
        }
      }
    };

    const onScroll = () => requestAnimationFrame(check);
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
}
