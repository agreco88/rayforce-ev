"use client";

import { useScrollDepth } from "@/lib/analytics/use-scroll-depth";

export function ScrollDepthTracker({ page }: { page: string }) {
  useScrollDepth(page);
  return null;
}
