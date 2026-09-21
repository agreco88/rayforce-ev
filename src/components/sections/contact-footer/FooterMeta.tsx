"use client";

import { socialLinks } from "@/lib/social-links";
import { useTranslations } from "next-intl";

export function FooterMeta() {
  const t = useTranslations("Footer.meta");
  const tAria = useTranslations("AriaLabels");

  return (
    <div className="mt-16 border-t border-white/10 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-center text-sm text-neutral-400 sm:text-left">
        © {new Date().getFullYear()} Rayforce. {t("rights")}
      </p>

      <div
        className="flex justify-center gap-5"
        aria-label={tAria("socialLinks")}
      >
        {socialLinks.map(({ href, label, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-neutral-400 transition-colors hover:text-neutral-200"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
