import type { ChargerProduct } from "@/lib/catalog/catalog.types";
import { galleryFor } from "./gallery-media";
import { HeroWithCarouselDesktop } from "./HeroWithCarouselDesktop";
import { HeroWithCarouselMobile } from "./HeroWithCarouselMobile";

type Props = {
  product: ChargerProduct;
  /** La ruta de prueba lo pasa para que los links de potencia no salgan de ella. */
  linkSuffix?: string;
};

/** Hero de producto tipo tienda: galeria, ficha, variantes, compra y retiro. */
export function HeroWithCarousel({ product, linkSuffix }: Props) {
  const media = galleryFor(product);

  return (
    <>
      <div className="hidden lg:block">
        <HeroWithCarouselDesktop product={product} media={media} linkSuffix={linkSuffix} />
      </div>
      <div className="lg:hidden">
        <HeroWithCarouselMobile product={product} media={media} linkSuffix={linkSuffix} />
      </div>
    </>
  );
}
