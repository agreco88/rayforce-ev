"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { HomeStandMobile } from "./HomeStandMobile";
import { HomeStandDesktop } from "./HomeStandDesktop";

type Props = {
  id?: string;
};

export function HomeStandSection({ id }: Props) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return (
    <section
      id={id}
      className="
        border-y border-neutral-900
        bg-neutral-950
      "
    >
      {isMobile ? <HomeStandMobile /> : <HomeStandDesktop />}
    </section>
  );
}
