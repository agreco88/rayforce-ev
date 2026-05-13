"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

import { HomeHeroDesktop } from "./HomeHeroDesktop";
import { HomeHeroMobile } from "./HomeHeroMobile";

type Props = {
  id?: string;
};

export function HomeHeroSection({ id }: Props) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return isMobile ? <HomeHeroMobile id={id} /> : <HomeHeroDesktop id={id} />;
}
