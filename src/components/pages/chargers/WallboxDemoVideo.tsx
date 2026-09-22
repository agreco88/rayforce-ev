"use client";

import { ClickToPlayVideo } from "@/components/shared/video/ClickToPlayVideo";

const VIDEO_SRC = "/assets/videos/chargers/bs20-bc-app-garage-demo.mp4";

type Props = {
  /** El thumb. Es tambien el `poster` del video, asi no hay salto al cambiar. */
  posterSrc: string;
  posterAlt: string;
  labels: { cta: string; loading: string; replay: string };
};

/**
 * La demo del wallbox en el garage. El patron (thumb -> click -> el video se
 * monta y reproduce en el lugar) vive en `ClickToPlayVideo`, que comparte con
 * la seccion de cables de la home; aca solo queda fijo el archivo y el acento
 * verde de esta seccion.
 */
export function WallboxDemoVideo({ posterSrc, posterAlt, labels }: Props) {
  return (
    <ClickToPlayVideo
      videoSrc={VIDEO_SRC}
      posterSrc={posterSrc}
      posterAlt={posterAlt}
      labels={labels}
      accent="green"
    />
  );
}
