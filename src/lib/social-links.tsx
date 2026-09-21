import { ReactElement } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { buildWhatsAppHref } from "./whatsapp";

export type SocialLink = {
  href: string;
  label: string;
  icon: ReactElement;
};

const ICON_CLASS = "h-5 w-5";

export const socialLinks: SocialLink[] = [
  {
    // Antes el numero estaba hardcodeado acá y difería del canonico.
    href: buildWhatsAppHref(),
    label: "WhatsApp",
    icon: <FaWhatsapp className={ICON_CLASS} aria-hidden="true" />,
  },
];
