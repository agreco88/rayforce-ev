"use client";

import { useTranslations } from "next-intl";
import HamburgerButton from "../hamburguer-button";
import HeaderLogo from "../header-logo";

type AsideHeaderProps = {
  onClose: () => void;
};

export default function AsideHeader({ onClose }: AsideHeaderProps) {
  const tA11y = useTranslations("AriaLabels");

  return (
    <header
      aria-label={tA11y("mobileMenuHeader")}
      className="py-2 px-4 sm:px-0"
    >
      <div className="flex items-center justify-between my-2">
        <div className="ml-1.5 sm:ml-2">
          <HeaderLogo aria-label={tA11y("logo")} />
        </div>
        <HamburgerButton open onClick={onClose} />
      </div>
    </header>
  );
}
