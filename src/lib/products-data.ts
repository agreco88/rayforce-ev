export type ProductKey = "cortinas" | "persianas" | "toldos" | "cerramientos";

export type ProductDefinition = {
  key: ProductKey;
  href: string;
  posterSrc: string;
  videoSrc?: string;
  mirror?: boolean;
};

export const PRODUCTS: ProductDefinition[] = [
  {
    key: "cortinas",
    href: "/windoors/cortinas",
    posterSrc: "/images/curtains-card-poster.webp",
    videoSrc: "/videos/curtains-card-video.mp4",
    mirror: true,
  },
  {
    key: "persianas",
    href: "/windoors/persianas",
    posterSrc: "/images/blinds-card-poster.webp",
    videoSrc: "/videos/blinds-card-video.mp4",
  },
  {
    key: "toldos",
    href: "/windoors/toldos",
    posterSrc: "/images/toldos-card-poster.webp",
    videoSrc: "/videos/toldos-card-video.mp4",
  },
  {
    key: "cerramientos",
    href: "/windoors/cerramientos",
    posterSrc: "/images/pvc-card-poster.webp",
    videoSrc: "/videos/pvc-card-video.mp4",
  },
];
