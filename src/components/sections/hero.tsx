"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import SectionWrapper from "../layout/section-wrapper";
import { useTranslations, useLocale } from "next-intl";
import Plasma from "../Plasma";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";

export default function DefaultHero() {
  const t = useTranslations("HomePage.hero");
  const locale = useLocale();
  const pathname = usePathname(); // track client-side locale path change

  return (
    <SectionWrapper className="relative !py-0 flex flex-col justify-center text-start md:text-center min-h-screen items-center overflow-hidden mx-auto container max-w-7xl">
      {/* Plasma background */}
      <div className="fixed inset-1 bg-black -z-10 pointer-events-none">
        <Plasma
          key={`${locale}-${pathname}`} // ✅ force full re-init on locale or route change
          color="#22BDB5" //#ff1f1f
          speed={0.6}
          direction="forward"
          scale={0.7}
          opacity={0.7}
          mouseInteractive={true}
        />
      </div>

      {/* Content */}
      <motion.h1
        variants={fadeInUp(0.2)}
        initial="hidden"
        animate="show"
        className="text-4xl text-white text-balance font-medium tracking-tighter sm:tracking-tight sm:text-7xl"
      >
        {t("title")}
      </motion.h1>

      <motion.p
        variants={fadeInUp(0.3)}
        initial="hidden"
        animate="show"
        className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground"
      >
        {t("subtitle")}
      </motion.p>

      <motion.div
        variants={fadeInUp(0.4)}
        initial="hidden"
        animate="show"
        className="mt-10 flex items-center justify-start gap-3"
      >
        <Button size="lg" asChild className="flex-1 sm:flex-none">
          <Link href="#about">{t("cta")}</Link>
        </Button>

        <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
          {t("cta2")}
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
