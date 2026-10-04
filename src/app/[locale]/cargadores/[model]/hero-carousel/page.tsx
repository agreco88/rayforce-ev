import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroWithCarousel } from "@/components/pages/shared/hero-with-carousel/HeroWithCarousel";
import { getChargerProductBySlug } from "@/lib/catalog/catalog.helpers";

/**
 * Ruta de prueba del hero nuevo: la pagina de modelo sigue con el suyo hasta
 * que este se apruebe. Sin links que lleguen aca y fuera del indice.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ locale: string; model: string }>;
};

export default async function HeroCarouselPreviewPage({ params }: Props) {
  const { model } = await params;
  const product = getChargerProductBySlug(model);
  if (!product) return notFound();

  return <HeroWithCarousel product={product} linkSuffix="/hero-carousel" />;
}
