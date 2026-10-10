import { ReactElement } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { buildWhatsAppHref } from "./whatsapp";

export type SocialLink = {
  href: string;
  label: string;
  icon: ReactElement;
};

const ICON_CLASS = "h-5 w-5";

export const INSTAGRAM = {
  href: "https://www.instagram.com/rayforceuruguay/",
  handle: "@rayforceuruguay",
};

export const socialLinks: SocialLink[] = [
  {
    // Antes el numero estaba hardcodeado acá y difería del canonico.
    href: buildWhatsAppHref(),
    label: "WhatsApp",
    icon: <FaWhatsapp className={ICON_CLASS} aria-hidden="true" />,
  },
  {
    href: INSTAGRAM.href,
    label: "Instagram",
    icon: <FaInstagram className={ICON_CLASS} aria-hidden="true" />,
  },
];
