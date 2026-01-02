"use client";

import Container from "@/components/layout/container";
import SectionWrapper from "@/components/layout/section-wrapper";
import ProductsSectionHeader from "./ProductsSectionHeader";
import ProductsSectionGrid from "./ProductsSectionsGrid";

export default function ProductsSection() {
  return (
    <SectionWrapper id="products" className="py-32 border-t border-white/30">
      <Container>
        <ProductsSectionHeader />
        <ProductsSectionGrid />
      </Container>
    </SectionWrapper>
  );
}
