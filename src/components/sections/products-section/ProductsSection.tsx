"use client";

import SectionWrapper from "@/components/layout/section-wrapper";
import Container from "@/components/layout/container";
import { ProductsGrid } from "./ProductsGrid";

export default function ProductsSection() {
  return (
    <SectionWrapper
      id="products"
      className="bg-gradient-to-b! from-neutral-950! to-neutral-50!"
    >
      <div className="py-24 sm:py-32 text-white">
        <Container>
          {/* Section header */}
          <header className="mb-16 max-w-2xl">
            <p className="mb-3 text-xs tracking-widest uppercase text-neutral-400">
              Productos
            </p>

            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-balance">
              Soluciones que acompañan tu espacio
            </h2>
          </header>

          <ProductsGrid />
        </Container>
      </div>
    </SectionWrapper>
  );
}
