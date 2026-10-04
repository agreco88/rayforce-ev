import { getProductImageScaleStyle } from "@/lib/catalog/catalog.helpers";
import type { CableProduct, ChargerProduct } from "@/lib/catalog/catalog.types";
import type { GalleryMedia } from "./HeroGallery";

const CABLES = "/assets/images/cables";
const CHARGERS = "/assets/images/chargers";
const COLUMN = "/assets/images/column";
const COLUMN_VIDEOS = "/assets/videos/column";

// Por ahora las fotos del BC 7 kW van en todos los BC; el 22 kW suma su
// comparativo. Fondo blanco a sangre: `object-cover`, no el `contain` de los recortes.
const BC_PHOTOS: GalleryMedia[] = ["4", "5", "11"].map((name) => ({
  type: "image",
  src: `${CHARGERS}/${name}.webp`,
  className: "object-cover",
}));

const COLUMN_MEDIA: GalleryMedia[] = [
  {
    type: "image",
    src: `${COLUMN}/bs20-mounted-on-column.webp`,
    className: "object-cover object-[25%_50%]",
  },
  { type: "image", src: `${COLUMN}/wallbox-on-column.webp` },
  ...["bs20-column-clip-1", "bs20-column-clip-2", "bs20-with-column-video"].map(
    (name): GalleryMedia => ({
      type: "video",
      src: `${COLUMN_VIDEOS}/${name}.mp4`,
      poster: `${COLUMN}/${name}-poster.webp`,
    }),
  ),
];

export function galleryFor(product: ChargerProduct): GalleryMedia[] {
  const { unboxing } = product;
  const unboxingVideo: GalleryMedia = {
    type: "video",
    src: unboxing.videoSrc,
    poster: unboxing.videoPoster,
  };

  // El BA (sin cable) va a tener fotos propias; hasta entonces, el placeholder.
  // Su foto de unboxing tambien es la del BC, asi que de la caja va solo el video.
  if (product.specs.cableType === "socket") {
    return [
      ...Array.from({ length: 5 }, (): GalleryMedia => ({
        type: "image",
        src: product.cardImage,
      })),
      unboxingVideo,
    ];
  }
  // El 22 kW abre con su foto propia (marca 22 kW en pantalla) y no con las del
  // 7 kW; atras de las comunes, el comparativo y la pieza promocional.
  const is22 = product.specs.maxPowerKw === 22;
  const own22: GalleryMedia[] = is22
    ? [{ type: "image", src: `${CHARGERS}/bs20-bc-22kw-studio.webp`, className: "object-cover" }]
    : [];
  const comparison: GalleryMedia[] = is22
    ? ["14", "bs20-bc-22kw-promo"].map((name) => ({
        type: "image",
        src: `${CHARGERS}/${name}.webp`,
        className: "object-cover",
      }))
    : [];
  // La caja va despues de las fotos del equipo y antes de la columna, que es
  // un accesorio aparte.
  const box: GalleryMedia[] = [
    ...(unboxing.photoSrc
      ? [{ type: "image" as const, src: unboxing.photoSrc, className: "object-cover" }]
      : []),
    unboxingVideo,
  ];
  return [...own22, ...BC_PHOTOS, ...comparison, ...box, ...COLUMN_MEDIA];
}

/** El cable, sus fotos de producto, el bolso que trae y el ensayo de pisada.
 *  El ensayo es sobre el conector, comun a los tres, asi que el clip va en todos. */
export function cableGalleryFor(product: CableProduct): GalleryMedia[] {
  return [
    {
      type: "image",
      src: product.photoImage,
      // Padding en % y no `p-10`: el thumbnail hereda la clase, y 40px fijos
      // lo dejaban vacio. La escala del catalogo achica el espiral, que viene
      // recortado al ras y sin eso se ve mas grande que los rectos.
      className: "object-contain p-[7%] scale-[var(--product-image-scale)]",
      style: getProductImageScaleStyle(product),
    },
    // Fotos del proveedor a 570px, pendientes de que el cliente las apruebe.
    // Fondo gris a sangre: `object-cover`, como las fotos de los BC.
    ...[`cable-tipo-2-${product.specs.cableStyle === "coiled" ? "espiral" : "recto"}`, "cable-tipo-2-conectores"].map(
      (name): GalleryMedia => ({
        type: "image",
        src: `${CABLES}/${name}.webp`,
        className: "object-cover",
      }),
    ),
    ...(product.specs.bagIncluded
      ? [{ type: "image" as const, src: `${CABLES}/cable-bag.png` }]
      : []),
    {
      type: "video",
      src: "/assets/videos/cables/chc-cable-run-over-test.mp4",
      poster: `${CABLES}/chc-cable-run-over-test-poster.jpg`,
    },
  ];
}
