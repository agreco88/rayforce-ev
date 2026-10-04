import type { CSSProperties } from "react";

import type {
  CatalogTheme,
  PriceDefinition,
  ProductHighlight,
} from "@/lib/catalog/catalog.types";

/** Un bullet: texto suelto, o etiqueta + valor con el valor en gradiente. */
export type ProductCardSpec = string | { label: string; value: string };

/**
 * Los datos de un producto, sin decir como se ven. Un adaptador los llena
 * todos (ver `useChargerCardData`) y cada variante usa los que necesita: asi
 * cambiar de variante es cambiar un string, sin tocar los datos.
 */
export type ProductCardData = {
  /** Unico en la lista (el slug). */
  id: string;
  /** Sin `href` la card se pinta igual pero no navega, y sin chevron. */
  href?: string;
  /** Titulo corto: las variantes con bullets. */
  title: string;
  /** Titulo largo que dice todo en una frase: las variantes sin bullets. Si
   * falta, usan `title`. */
  fullTitle?: string;
  /** Pegado al titulo largo, en gradiente (los kW de un cargador). */
  titleAccent?: string;
  image: string;
  /** Para fotos que no son un recorte sobre transparente y van en `cover`. */
  imageClassName?: string;
  /** Correccion de escala del catalogo (`getProductImageScaleStyle`). */
  imageStyle?: CSSProperties;
  /** Bullets cortos, para las variantes compactas. */
  specs?: ProductCardSpec[];
  /** Un parrafo corto de venta. */
  description?: string;
  /** Lista larga de caracteristicas, para las variantes grandes. El primero
   * va resaltado. */
  features?: string[];
  price: PriceDefinition;
  theme: CatalogTheme;
  highlight?: ProductHighlight;
};

/** Lo que recibe cada variante: los datos + como pintarlos. */
export type VariantProps = ProductCardData & {
  /** `false`: el texto en color va solido (primer stop del tema). Ya viene
   * resuelto: el destacado llega siempre en `true`. */
  gradient: boolean;
};
