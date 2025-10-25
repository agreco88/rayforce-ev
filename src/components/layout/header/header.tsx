"use client";

import AsideMobileMenu from "./aside-mobile-menu/aside-mobile-menu";
import HeaderLogo from "./header-logo";
import HeaderNav from "./header-nav";

export default function Header() {
  return (
    <header className="sm:border-b relative z-50 h-16 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 justify-between items-center">
        <div className="flex items-center gap-4 h-full flex-1">
          <HeaderLogo />
          <HeaderNav />
        </div>
        <AsideMobileMenu />
      </div>
    </header>
  );
}
