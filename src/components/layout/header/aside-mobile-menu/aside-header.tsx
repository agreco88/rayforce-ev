"use client";

import { useTranslations } from "next-intl";
import Logo from "@/components/logo";
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
      className="
        h-16
        pt-4 px-6
      "
    >
      <div className="flex h-16 items-center justify-between px-0 sm:px-6 lg:px-8">
        <HeaderLogo aria-label={tA11y("logo")} />
        <HamburgerButton open onClick={onClose} />
      </div>
    </header>
  );
}
