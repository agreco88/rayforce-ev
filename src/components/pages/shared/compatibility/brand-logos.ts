import type { IconType } from "react-icons";
import {
  SiAudi,
  SiBmw,
  SiChevrolet,
  SiHyundai,
  SiKia,
  SiMg,
  SiMini,
  SiNissan,
  SiRenault,
  SiSuzuki,
  SiTesla,
  SiToyota,
  SiVolkswagen,
  SiVolvo,
} from "react-icons/si";

const BRANDS = "/assets/images/brands";

// Simple Icons no tiene las chinas: esas van en `public/`, recortadas al
// simbolo (o al nombre, si la marca es el nombre). SVG de Wikimedia Commons;
// GAC, JMEV y Lynk & Co en PNG blanco, que como mascara rinde igual.
export const BRAND_LOGOS: Partial<Record<string, IconType | string>> = {
  Audi: SiAudi,
  BMW: SiBmw,
  BYD: `${BRANDS}/byd.svg`,
  Chery: `${BRANDS}/chery.svg`,
  Chevrolet: SiChevrolet,
  Dongfeng: `${BRANDS}/dongfeng.svg`,
  "GAC MOTOR": `${BRANDS}/gac.png`,
  Geely: `${BRANDS}/geely.svg`,
  Hyundai: SiHyundai,
  JAC: `${BRANDS}/jac.svg`,
  Jetour: `${BRANDS}/jetour.svg`,
  JMEV: `${BRANDS}/jmev.png`,
  Kia: SiKia,
  Leapmotor: `${BRANDS}/leapmotor.svg`,
  "Lynk & Co": `${BRANDS}/lynk-co.png`,
  MG: SiMg,
  Mini: SiMini,
  Nissan: SiNissan,
  Omoda: `${BRANDS}/omoda.svg`,
  Renault: SiRenault,
  Suzuki: SiSuzuki,
  Tesla: SiTesla,
  Toyota: SiToyota,
  Volkswagen: SiVolkswagen,
  Volvo: SiVolvo,
};
