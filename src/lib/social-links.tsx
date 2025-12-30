import { ReactElement } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaThreads,
  FaFacebook,
} from "react-icons/fa6";

export type SocialLink = {
  href: string;
  label: string;
  ariaLabel: string;
  icon: ReactElement;
};

const ICON_CLASS = "h-5 w-5";

export const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com/windoors_cortinas/",
    label: "Instagram",
    ariaLabel: "Windoors on Instagram",
    icon: <FaInstagram className={ICON_CLASS} aria-hidden="true" />,
  },
  {
    href: "https://www.threads.com/@windoors_cortinas",
    label: "Threads",
    ariaLabel: "Windoors on Threads",
    icon: <FaThreads className={ICON_CLASS} aria-hidden="true" />,
  },
  {
    href: "https://www.facebook.com/WindoorsUY",
    label: "Facebook",
    ariaLabel: "Windoors on Facebook",
    icon: <FaFacebook className={ICON_CLASS} aria-hidden="true" />,
  },
  {
    href: "https://wa.me/59899123456",
    label: "WhatsApp",
    ariaLabel: "Contact Windoors via WhatsApp",
    icon: <FaWhatsapp className={ICON_CLASS} aria-hidden="true" />,
  },
];
