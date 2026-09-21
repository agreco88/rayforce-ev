/**
 * Chip base del navbar: mismo padding, alto y radio para los links de navegación,
 * el CTA de WhatsApp y el trigger del selector de idioma, para que la fila lea
 * pareja. Se escribe verbatim (no interpolado) para que el scanner de Tailwind
 * lo vea.
 */
export const CHIP_CLASS =
  "flex items-center px-4 h-10 rounded-md transition-colors text-sm tracking-tight font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-200 dark:bg-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-800";

/**
 * Variante del chip para el CTA de WhatsApp: mismo padding, alto y radio, pero
 * en verde de marca con texto oscuro para que sea la unica accion destacada
 * de la fila.
 */
export const CHIP_WHATSAPP_CLASS =
  "flex items-center gap-2 px-4 h-10 rounded-md transition-colors text-sm tracking-tight font-medium text-neutral-950 bg-[#25D366] hover:bg-[#1EBE5B]";
