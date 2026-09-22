import {
  BatteryCharging,
  PlugZap,
  ShieldCheck,
  SmartphoneNfc,
} from "lucide-react";

/**
 * Los cuatro argumentos, en orden de lectura. Cada uno resuelve su copy contra
 * `whyBetter.cards.<key>` y decide su visual: el 0->100 usa el anillo (es el
 * unico que cuenta un porcentaje), compatibilidad usa la mascara del conector
 * Tipo 2 y el resto un icono.
 *
 * `mobileIcon` es lo que muestra el carousel, siempre un icono de lucide. Dos
 * razones para no reusar el visual de desktop: el anillo tarda 3s en contar y
 * el autoplay cambia a los 4s, asi que casi nunca se veria entero; y la mascara
 * del conector es un bloque de 28px pensado para una tarjeta ancha. Al tile
 * chico de mobile le va mejor un icono parejo en las cuatro.
 */
export const WALLBOX_CARDS = [
  { key: "safety", visual: "icon", icon: ShieldCheck, mobileIcon: ShieldCheck },
  { key: "speed", visual: "ring", mobileIcon: BatteryCharging },
  { key: "app", visual: "icon", icon: SmartphoneNfc, mobileIcon: SmartphoneNfc },
  { key: "compatible", visual: "mask", mobileIcon: PlugZap },
] as const;
