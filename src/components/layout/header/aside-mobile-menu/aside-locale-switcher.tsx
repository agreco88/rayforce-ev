"use client";

import { localeConfig, supportedLocales } from "@/lib/locale-config";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import ReactCountryFlag from "react-country-flag";

type LocaleSwitcherMobileProps = {
  onSelect: () => void;
};

export default function LocaleSwitcherMobile({
  onSelect,
}: LocaleSwitcherMobileProps) {
  const tLang = useTranslations("Languages");
  const tA11y = useTranslations("AriaLabels");
  const tAside = useTranslations("Layout.Aside");

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const pathWithoutLocale =
    pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    router.replace(`/${newLocale}${pathWithoutLocale}`);
    onSelect();
  };

  return (
    <section
      className="px-6 py-6 border-t border-white/10"
      aria-label={tA11y("languageSwitcher")}
    >
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-neutral-400">
        {tAside("language")}
      </p>

      <div className="flex rounded-lg border border-white/15 overflow-hidden">
        {supportedLocales.map((loc) => {
          const { country } = localeConfig[loc];
          const isActive = loc === locale;

          return (
            <button
              key={loc}
              type="button"
              onClick={() => handleChange(loc)}
              aria-label={`${tA11y("language")} ${tLang(loc)}`}
              aria-current={isActive ? "true" : undefined}
              className={clsx(
                "flex flex-1 items-center justify-center gap-2 py-3 text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
              )}
            >
              <ReactCountryFlag
                countryCode={country}
                svg
                style={{ width: "1.1em", height: "1.1em", borderRadius: "4px" }}
                aria-hidden
              />
              <span className="font-medium">{tLang(loc)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
