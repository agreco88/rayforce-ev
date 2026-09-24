/**
 * Chip base del navbar: mismo padding, alto y radio para los links de navegación,
 * el CTA de WhatsApp y el trigger del selector de idioma, para que la fila lea
 * pareja. Se escribe verbatim (no interpolado) para que el scanner de Tailwind
 * lo vea.
 */
export const CHIP_CLASS =
  "flex items-center px-4 h-10 rounded-md transition-colors text-sm tracking-tight font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-200 dark:bg-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-800";

/**
 * Variante solida del chip, sin color de fondo: lo pone quien lo usa. Es el CTA
 * del cierre de pagina, que sigue el color del producto de la ruta.
 */
export const CHIP_CTA_CLASS =
  "flex items-center gap-2 px-4 h-10 rounded-md transition-colors text-sm tracking-tight font-medium text-neutral-950";
