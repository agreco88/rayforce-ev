"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type Props = {
  /** Namespace con la `description`, lo unico que cambia entre paginas. */
  namespace: string;
  theme?: {
    accentText: string;
    gradientColors?: [string, string, string];
  };
  id?: string;
};

const DEFAULT_THEME = { accentText: "text-green-400" };

/**
 * Regulatory reassurance — URSEA/UTE logos left, approval copy right. In
 * /cargadores it lives inside AppHighlightsInteractive's section and shares its
 * background; /empresas wraps it in `EmpresasCertification`.
 */
export function ChargerCertificationSection({
  namespace,
  theme = DEFAULT_THEME,
  id,
}: Props) {
  const t = useTranslations("Common.Certification");
  const tPage = useTranslations(namespace);

  /* Sin ancho propio: el ancho y el padding los pone la seccion padre. */
  return (
    <div
      id={id}
      className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="order-2 flex items-center justify-center gap-4 sm:gap-6 lg:order-1 lg:gap-8"
      >
        <div className="relative flex h-28 w-1/2 max-w-xs items-center justify-center rounded-2xl bg-white p-4 sm:h-56 lg:h-64">
          <Image
            src="/images/partners/logo-ursea.webp"
            alt={t("urseaAlt")}
            fill
            className="object-contain p-5 sm:p-6"
          />
        </div>
        <div className="relative flex h-28 w-1/2 max-w-xs items-center justify-center rounded-2xl bg-white p-4 sm:h-56 lg:h-64">
          <Image
            src="/images/partners/logo-ute.webp"
            alt={t("uteAlt")}
            fill
            className="object-contain p-5 sm:p-6"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.1 }}
        className="order-1 text-center lg:order-2 lg:text-left"
      >
        <p
          className={cn(
            "text-sm uppercase tracking-[0.35em]",
            theme.accentText,
          )}
        >
          {t("eyebrow")}
        </p>
        <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400 lg:mx-0">
          {tPage("description")}
        </p>
      </motion.div>
    </div>
  );
}
