import { ReactElement } from "react";
import { FaWhatsapp } from "react-icons/fa6";

export type SocialLink = {
  href: string;
  label: string;
  ariaLabel: string;
  icon: ReactElement;
};

const ICON_CLASS = "h-5 w-5";

export const socialLinks: SocialLink[] = [
  {
    href: "https://wa.me/+59899168085",
    label: "WhatsApp",
    ariaLabel: "Contact Rayforce via WhatsApp",
    icon: <FaWhatsapp className={ICON_CLASS} aria-hidden="true" />,
  },
];
