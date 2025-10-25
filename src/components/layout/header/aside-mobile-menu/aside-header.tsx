"use client";

import { useTranslations } from "next-intl";
import Logo from "@/components/logo";
import HamburgerButton from "../hamburguer-button";

type AsideHeaderProps = {
  onClose: () => void;
};

export default function AsideHeader({ onClose }: AsideHeaderProps) {
  const tA11y = useTranslations("AriaLabels");

  return (
    <header
      className="flex min-h-16 items-center justify-between"
      aria-label={tA11y("mobileMenuHeader")}
    >
      {/* Brand / Logo */}
      <Logo aria-label={tA11y("logo")} />
      {/* Close button */}
      <HamburgerButton open={true} onClick={onClose} />
    </header>
  );
}
