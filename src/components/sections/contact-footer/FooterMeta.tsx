"use client";

import { socialLinks } from "@/lib/social-links";
import { useTranslations } from "next-intl";

export function FooterMeta() {
  const t = useTranslations("Footer.meta");

  return (
    <div className="mt-12 border-t border-white/10 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-neutral-500 text-center">
        © {new Date().getFullYear()} Windoors. {t("rights")}
      </p>

      <div className="flex gap-5 justify-center">
        {socialLinks.map(({ href, label, ariaLabel, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel ?? label}
            className="
              text-neutral-400
              hover:text-neutral-200
              transition-colors
            "
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
