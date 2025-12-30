"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeIn } from "@/lib/animation-variants";
import { socialLinks } from "@/lib/social-links";

export default function AsideSocialLinks() {
  const tA11y = useTranslations("AriaLabels");

  return (
    <motion.footer
      variants={fadeIn(0.3)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="
        mt-auto
        border-t border-white/10
        px-6 py-6
        flex justify-center sm:justify-start gap-6
        text-neutral-400
        hover:[&>a]:text-neutral-200
      "
      aria-label={tA11y("socialLinks")}
    >
      {socialLinks.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="transition-colors duration-200"
        >
          {icon}
        </a>
      ))}
    </motion.footer>
  );
}
