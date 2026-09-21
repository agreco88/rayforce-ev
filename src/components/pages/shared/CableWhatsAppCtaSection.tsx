"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { useTrack } from "@/lib/analytics";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CableProduct;
};

export function CableWhatsAppCtaSection({ product }: Props) {
  const t = useTranslations("CableModelPage");
  const track = useTrack();
  const { theme } = product;
  const whatsappHref = buildWhatsAppHref(
    t("cta.whatsappMessage", { model: product.shortName }),
  );

  return (
    <section className="relative w-full border-b border-neutral-900 bg-[#0a0a0a] py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 sm:px-6 lg:px-16 2xl:px-0 text-center">
        <h2 className="text-2xl font-light tracking-tight text-white sm:text-3xl">
          {t("cta.whatsappHeadline")}
        </h2>

        <motion.a
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.3 }}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track.whatsappClick({ source: "cable_page", charger: product.slug })
          }
          className={`
            inline-flex min-h-[48px] w-fit items-center justify-center gap-2 rounded-xl px-6 py-3
            border ${theme.accentBorder} ${theme.accentText}
            text-sm font-semibold transition-colors
            hover:bg-white/5
          `}
        >
          {t("cta.whatsapp")}
          <FaWhatsapp size={16} />
        </motion.a>
      </div>
    </section>
  );
}
