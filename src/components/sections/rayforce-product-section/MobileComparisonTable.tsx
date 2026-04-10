"use client";

import type { Product } from "@/lib/types/product";
import { renderFeatureValue } from "@/lib/formatFeatureValue";
import { FaWhatsapp } from "react-icons/fa6";

type Props = {
  product: Product;
};

export function MobileComparisonTable({ product }: Props) {
  const whatsappNumber = "598XXXXXXXX"; // ← your number (no +, no spaces)

  const message = encodeURIComponent(
    `Hola! Me interesa el ${product.name}. ¿Podrían ayudarme a elegir la mejor opción?`,
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="lg:hidden mt-10 relative pb-24">
      {/* Sticky header */}
      <div
        className="
          sticky top-[1px] z-40
          bg-neutral-950/90 backdrop-blur
          border border-neutral-800
        "
      >
        <div className="grid grid-cols-3 text-xs">
          {product.variants.map((variant, index) => (
            <div
              key={variant.id}
              className={`
                py-4 text-center flex flex-col gap-2
                ${variant.highlight ? "bg-neutral-900" : ""}
              `}
            >
              <span className="text-white font-semibold">{variant.name}</span>
              <span className="text-white font-thin text-lg">
                USD {variant.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="border-neutral-800 rounded-b-xl overflow-hidden">
        {product.features.map((feature, i) => (
          <div
            key={feature.key}
            className={
              i === 0 ? "pt-6 pb-3" : "border-t border-neutral-700 pt-6 pb-3"
            }
          >
            {/* Label */}
            <div className="text-center uppercase tracking-widest text-xs pb-1.5 text-neutral-400">
              {feature.label}
            </div>

            {/* Values */}
            <div className="grid grid-cols-3">
              {product.variants.map((variant) => (
                <div
                  key={`${variant.id}-${feature.key}`}
                  className="p-4 flex items-center justify-center text-center"
                >
                  {renderFeatureValue(variant.values[feature.key])}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🚀 Sticky WhatsApp CTA */}
      <div
        className="
        
          px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]
          pt-6
        "
      >
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-3
            w-full h-16
            rounded-xl

            bg-gradient-to-t from-green-800 via-green-700 to-green-600

            text-gray-200 font-semibold text-base 
            transition-all duration-300

            shadow-lg shadow-black/40
          "
        >
          <FaWhatsapp className="text-xl" />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
