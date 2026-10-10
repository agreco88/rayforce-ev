"use client";

import { getCableProducts } from "@/lib/catalog/catalog.helpers";
import type { ProductCardData } from "../types";
import { useCableCardData } from "./useCableCardData";
import { useStandCardData } from "./useStandCardData";

/**
 * Todos los accesorios como cards: los cables del catalogo y la columna al
 * final. Es la lista de /accesorios y de la seccion de la home.
 *
 *   const accessories = useAccessoryCards();
 *   <ProductCollection items={accessories} variant="horizontal-3" />
 */
export function useAccessoryCards(): ProductCardData[] {
  const toCableCard = useCableCardData();
  const column = useStandCardData();

  return [...getCableProducts().map(toCableCard), column];
}
