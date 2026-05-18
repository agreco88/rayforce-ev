import AsideMobileMenu from "./aside-mobile-menu/aside-mobile-menu";
import HeaderLogo from "./header-logo";
import HeaderNav from "./header-nav";

export default function Header() {
  return (
    <header className="group/header  fixed inset-x-0 z-[99] py-2 mx-auto px-4 sm:px-0 bg-linear-to-b from-black via-black/50 to-transparent">
      {/* Gradient backdrop — fades in / scales up on hover via CSS */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.85] scale-y-[0.9] origin-top group-hover/header:opacity-100 group-hover/header:scale-y-[1.05]"
        style={{
          transition:
            "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* Content */}
      <div className="relative flex-1 max-w-[1440px] flex items-center mx-auto">
        <div className="flex flex-1 my-2 mx-1.5 sm:mx-0 items-center gap-4">
          <HeaderLogo />
          <HeaderNav />
        </div>
        <AsideMobileMenu />
      </div>
    </header>
  );
}
