// Sin el 0 del celular: wa.me y `tel:` con el 0 despues del 598 no llegan.
export const WHATSAPP_NUMBER = "59892041709";

export function buildWhatsAppHref(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
