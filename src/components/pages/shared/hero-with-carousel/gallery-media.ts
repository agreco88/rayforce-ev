import { getProductImageScaleStyle } from "@/lib/catalog/catalog.helpers";
import type { CableProduct, ChargerProduct } from "@/lib/catalog/catalog.types";
import type { GalleryMedia } from "./HeroGallery";

const CABLES = "/assets/images/cables";
const CHARGERS = "/assets/images/chargers";
const COLUMN = "/assets/images/column";

const BC_7KW_PHOTOS = ["4", "5", "11"].map((name) => `${CHARGERS}/${name}.webp`);
const BC_22KW_STUDIO = `${CHARGERS}/bs20-bc-22kw-studio.webp`;

// Por ahora las fotos del BC 7 kW van en todos los BC. Fondo blanco a sangre:
// `object-cover`, no el `contain` de los recortes.
const BC_PHOTOS: GalleryMedia[] = BC_7KW_PHOTOS.map((src) => ({
  type: "image",
  src,
  className: "object-cover",
}));

const COLUMN_MEDIA: GalleryMedia[] = [
  {
    type: "image",
    src: `${COLUMN}/bs20-mounted-on-column.webp`,
    className: "object-cover object-[25%_50%]",
  },
  { type: "image", src: `${COLUMN}/wallbox-on-column.webp` },
];

export function galleryFor(product: ChargerProduct): GalleryMedia[] {
  const { unboxing } = product;

  // El BA (sin cable) va a tener fotos propias; hasta entonces, el placeholder.
  // Su foto de unboxing tambien es la del BC, asi que de la caja va solo el video.
  if (product.specs.cableType === "socket") {
    return [
      ...Array.from({ length: 5 }, (): GalleryMedia => ({
        type: "image",
        src: product.cardImage,
      })),
      ...(unboxing.video
        ? [{ type: "video" as const, src: unboxing.video.src, poster: unboxing.video.poster }]
        : []),
    ];
  }
  // El 22 kW abre con su foto propia (marca 22 kW en pantalla) y no con las del
  // 7 kW, y va sin la foto de la caja.
  const is22 = product.specs.maxPowerKw === 22;
  const own22: GalleryMedia[] = is22
    ? [{ type: "image", src: BC_22KW_STUDIO, className: "object-cover" }]
    : [];
  // La caja va despues de las fotos del equipo y antes de la columna, que es
  // un accesorio aparte.
  const box: GalleryMedia[] =
    unboxing.photoSrc && !is22
      ? [{ type: "image", src: unboxing.photoSrc, className: "object-cover" }]
      : [];
  return [...own22, ...BC_PHOTOS, ...box, ...COLUMN_MEDIA];
}

/** Las fotos del JSON-LD: solo las de este modelo exacto. Quedan afuera las del
 *  7 kW que toma prestadas el 22, la columna (otro producto) y el AVIF del
 *  hero, que Merchant Center no lee. El recorte va ultimo: es el de menos detalle. */
export function schemaImagesFor(product: ChargerProduct): string[] {
  const { cableType, maxPowerKw } = product.specs;
  if (cableType === "socket") return [product.cardImage];
  if (maxPowerKw === 22) return [BC_22KW_STUDIO, product.cardImage];
  if (maxPowerKw === 7.2) {
    const { photoSrc } = product.unboxing;
    return [...BC_7KW_PHOTOS, ...(photoSrc ? [photoSrc] : []), product.cardImage];
  }
  return [product.cardImage];
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
      ? [{ type: "image" as const, src: `${CABLES}/cable-bag.webp` }]
      : []),
    {
      type: "video",
      src: "/assets/videos/cables/chc-cable-run-over-test.mp4",
      poster: `${CABLES}/chc-cable-run-over-test-poster.jpg`,
    },
  ];
}
