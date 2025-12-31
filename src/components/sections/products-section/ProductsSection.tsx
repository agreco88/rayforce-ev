"use client";

import SectionWrapper from "@/components/layout/section-wrapper";
import Container from "@/components/layout/container";
import { ProductsGrid } from "./ProductsGrid";
import { useTranslations } from "next-intl";

export default function ProductsSection() {
  const t = useTranslations("ProductsSection");

  return (
    <SectionWrapper id="products" className=" border-y border-white/10">
      <div className="py-24 sm:py-32 text-white">
        <Container>
          {/* Section header */}
          <header className="mb-16 max-w-2xl">
            <p className="mb-3 text-xs tracking-widest uppercase text-neutral-400">
              {t("eyebrow")}
            </p>

            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-balance">
              {t("title")}
            </h2>
          </header>

          <ProductsGrid />
        </Container>
      </div>
    </SectionWrapper>
  );
}
