"use client";

import { localeConfig, supportedLocales } from "@/lib/locale-config";
import { useLocale, useTranslations } from "next-intl";
import { fadeIn } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  // Remove locale prefix from pathname so switching languages works correctly
  const pathWithoutLocale =
    pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.replace(newPath);
    //parent component onSelect prop passed down
    onSelect();
  };

  return (
    <motion.div
      className="grid grid-cols-2 justify-start gap-3 py-6"
      aria-label={tA11y("languageSwitcher")}
      variants={fadeIn(0.35)}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      {supportedLocales.map((loc) => {
        const { country } = localeConfig[loc];
        const isActive = loc === locale;

        return (
          <Button
            key={loc}
            onClick={() => handleChange(loc)}
            variant={isActive ? "secondary" : "outline"}
            className={clsx(
              "flex items-center justify-center gap-2 py-6 text-sm font-medium uppercase tracking-wide transition-all"
            )}
          >
            <ReactCountryFlag
              countryCode={country}
              svg
              style={{
                width: "1.25em",
                height: "1.25em",
                borderRadius: "6px",
              }}
              aria-label={tLang(loc)}
            />
            <span>{tLang(loc)}</span>
          </Button>
        );
      })}
    </motion.div>
  );
}
