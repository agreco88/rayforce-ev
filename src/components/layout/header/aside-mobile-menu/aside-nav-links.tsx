"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

import { NAV_LINKS } from "@/lib/internal-nav-links";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import { scrollToSection } from "@/lib/scroll-to-section";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTrack } from "@/lib/analytics/use-track";

const PRODUCTS = [
  {
    key: "residential",
    power: "7.4kW",
    href: "/cargadores/bs20-bc-7kw",
  },
  {
    key: "comercial",
    power: "22kW",
    href: "/cargadores/bs20-bc-22kw",
  },
] as const;

const HASH_LINKS = NAV_LINKS.filter(
  (l) => !["inicio", "cargadores"].includes(l.id),
);

type AsideNavLinksProps = {
  onSelect?: () => void;
};

export default function AsideNavLinks({ onSelect }: AsideNavLinksProps) {
  const t = useTranslations("Layout.Header");
  const tA11y = useTranslations("AriaLabels");

  const pathname = usePathname();
  const router = useRouter();
  const activeId = useActiveSection(NAV_LINKS.map((link) => link.id));
  const track = useTrack();

  const routeLinkClass = (active: boolean) =>
    `block w-full text-left text-2xl font-light tracking-widest transition-all duration-300 ${
      active
        ? "text-green-400 font-semibold"
        : "text-neutral-200 font-bold!  hover:text-white hover:translate-x-1"
    }`;

  return (
    <nav
      aria-label={tA11y("mobileNavigation")}
      className="flex-1 flex flex-col justify-around px-4 py-10"
    >
      <motion.ul
        variants={waterfallList}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-col gap-10"
      >
        {/* Home — main route link */}
        <motion.li variants={waterfallItem}>
          <button
            onClick={() => {
              track.mobileNavLinkClicked("home", "inicio");
              if (pathname === "/") scrollToSection("inicio");
              else router.push("/");
              onSelect?.();
            }}
            aria-current={activeId === "inicio" ? "true" : undefined}
            className={routeLinkClass(activeId === "inicio")}
          >
            /{t("nav.home")}
          </button>
        </motion.li>

        {/* Hash section links — subordinate anchors */}
        <motion.li variants={waterfallItem}>
          <ul className="flex flex-col gap-1 border-l border-white/10 pl-4">
            {HASH_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      track.mobileNavLinkClicked(link.label, link.id);
                      if (pathname === "/") scrollToSection(link.id);
                      else router.push(`/#${link.id}`);
                      onSelect?.();
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`
                      flex items-center gap-1 w-full text-left
                      text-2xl py-2 tracking-widest lowercase font-thin
                      transition-all duration-300
                      ${
                        isActive
                          ? "text-green-400"
                          : "text-neutral-400 hover:text-neutral-200 hover:translate-x-1"
                      }
                    `}
                  >
                    <span
                      className={` ${
                        isActive ? "text-green-50" : "text-neutral-600"
                      }`}
                    >
                      #
                    </span>
                    {t(`nav.${link.label}`)}
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.li>

        {/* Products — main route link + product cards */}
        <motion.li variants={waterfallItem} className="flex flex-col gap-3">
          <Link
            href="/cargadores"
            onClick={() => { track.mobileNavLinkClicked("chargers", "/cargadores"); onSelect?.(); }}
            className={routeLinkClass(pathname === "/cargadores")}
          >
            /{t("nav.chargers")}
          </Link>
          <div className="grid grid-cols-2 gap-3">
            {PRODUCTS.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                onClick={() => { track.mobileNavLinkClicked(product.key, product.href); onSelect?.(); }}
                className="
                  rounded-2xl
                  border border-white/5
                  bg-white/[0.02]
                  p-4
                  transition-all duration-300
                  hover:border-green-500/30
                  hover:bg-white/[0.04]
                "
              >
                <div className="text-xs uppercase tracking-[0.2em] text-green-400">
                  {t(`products.${product.key}.title`)}
                </div>
                <div className="mt-1 text-2xl font-light tracking-tight">
                  {product.power}
                </div>
              </Link>
            ))}
          </div>
        </motion.li>
      </motion.ul>

      {/* WhatsApp CTA */}
      <Button
        asChild
        className="
          h-14
          rounded-2xl
          bg-green-500
          hover:bg-green-400
          text-black
          font-medium
          w-full
        "
      >
        <a
          href="https://wa.me/598092041709"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onSelect?.()}
          className="flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="text-lg" />
          {t("nav.contactCta")}
        </a>
      </Button>
    </nav>
  );
}
