"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { scrollToSection } from "@/lib/scroll-to-section";
import { useTrack } from "@/lib/analytics/use-track";

const ROUTE_LINKS = [
  { href: "/cargadores", labelKey: "chargers" },
] as const;

const HASH_LINKS = [
  { id: "beneficios", labelKey: "benefits" },
  { id: "faq", labelKey: "faq" },
  { id: "compatibilidad", labelKey: "compatibility" },
] as const;

const linkClass =
  "transition-colors duration-200 hover:text-green-400 cursor-pointer";

export function FooterNavColumn() {
  const t = useTranslations("Layout.Header");
  const tF = useTranslations("Footer");
  const pathname = usePathname();
  const router = useRouter();
  const track = useTrack();

  return (
    <div>
      <h3 className="text-xs tracking-[0.18em] uppercase text-neutral-400">
        {tF("sections.navigation")}
      </h3>

      <ul className="mt-6 space-y-4 text-sm text-neutral-400">
        {/* Home — navigate or scroll */}
        <li>
          <button
            onClick={() => {
              track.footerNavClicked(t("nav.home"), "inicio");
              if (pathname === "/") scrollToSection("inicio");
              else router.push("/");
            }}
            className={linkClass}
          >
            {t("nav.home")}
          </button>
        </li>

        {/* Route links */}
        {ROUTE_LINKS.map(({ href, labelKey }) => (
          <li key={href}>
            <Link href={href} onClick={() => track.footerNavClicked(t(`nav.${labelKey}`), href)} className={linkClass}>
              {t(`nav.${labelKey}`)}
            </Link>
          </li>
        ))}

        {/* Hash section links */}
        {HASH_LINKS.map(({ id, labelKey }) => (
          <li key={id}>
            <button
              onClick={() => {
                track.footerNavClicked(t(`nav.${labelKey}`), id);
                if (pathname === "/") scrollToSection(id);
                else router.push(`/#${id}`);
              }}
              className={linkClass}
            >
              {t(`nav.${labelKey}`)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
