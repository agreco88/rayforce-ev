"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

type Item = {
  key: string;
  href: string;
};

type Props = {
  group: "products" | "company";
  items: Item[];
};

export function FooterNavColumn({ group, items }: Props) {
  const t = useTranslations("Footer.nav");

  return (
    <div>
      <h3 className="text-xs tracking-[0.18em] uppercase text-white sm:text-neutral-300">
        {t(`${group}.title`)}
      </h3>

      {/* <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              {t(`${group}.items.${item.key}`)}
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
