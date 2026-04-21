"use client";

import type { Product } from "@/lib/types/product";
import { renderFeatureValue } from "@/lib/formatFeatureValue";
import { FaWhatsapp } from "react-icons/fa6";

type Props = {
  product: Product;
};

export function MobileComparisonTable({ product }: Props) {
  const whatsappNumber = "59892041709";

  const message = encodeURIComponent(
    `Hola! Necesito informacion extra sobre un cargador Rayforce`,
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="lg:hidden">
      {/* Sticky header */}
      <div
        className="
          bg-neutral-950/90 backdrop-blur
          border border-neutral-800
        "
      >
        <img
          src="/images/1.png" // ← your collage image
          alt="Cargadores EV instalados"
          className="
            w-full h-[25rem]
            object-cover
            object-center
          "
        />
        <div className="grid grid-cols-3 text-xs">
          {product.variants.map((variant, index) => (
            <div
              key={variant.id}
              className={`
                py-8 shadow text-center flex flex-col gap-2 
                ${variant.highlight ? "bg-neutral-900" : ""}
              `}
            >
              <span className="text-white font-light uppercase tracking-wide">
                {variant.name}
              </span>
              <span className="tracking-tighter text-xl text-green-400 font-bold">
                USD {variant.price}
              </span>
              <span className="font-thin text-[11px] text-neutral-400">
                IVA Inc.
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
            className={i === 0 ? "pt-6 pb-3" : " pt-6 pb-3"}
          >
            {/* Label */}
            <div className="text-center uppercase tracking-widest text-xs pb-3 text-neutral-400">
              {feature.label}
            </div>

            {/* Values */}
            <div className="grid grid-cols-3">
              {product.variants.map((variant) => (
                <div
                  key={`${variant.id}-${feature.key}`}
                  className="p-4 flex items-center justify-center border border-neutral-800  text-center"
                >
                  {renderFeatureValue(variant.values[feature.key])}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* 🚀 Sticky WhatsApp CTA */}

      <div className="my-8 py-8 shadow text-center flex flex-col gap-1 bg-neutral-950">
        <span className="">Columna de instlacion para cargador electrico</span>
        <div className="text-center text-neutral-400">
          Altura 150cm - Base 26 x 14.5 cm
        </div>
        <span className="tracking-tighter text-3xl pt-4 text-green-400 font-bold">
          USD 158
        </span>
        <span className="font-thin text-[12px] text-neutral-400">IVA Inc.</span>
        <img
          src="/images/11.png" // ← your collage image
          alt="Cargadores EV instalados"
        />
      </div>
      <div
        className="
          px-4
        "
      >
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
                  flex items-center justify-center gap-3
                  w-fit self-center mx-auto mt-8 px-8 h-12
                  rounded-full
      
                  bg-gradient-to-t from-green-800 via-green-700 to-green-600
      
                  text-gray-200 font-semibold text-base 
                  transition-all duration-300
      
                  shadow-lg shadow-black/40
                "
        >
          <FaWhatsapp className="text-xl" />
          Hablar con un vendedor
        </a>
      </div>
    </div>
  );
}
