// ComparisonTable.tsx

"use client";

import HeaderLogo from "@/components/layout/header/header-logo";
import { renderFeatureValue } from "@/lib/formatFeatureValue";
import { Product } from "@/lib/types/product";
import { FaWhatsapp } from "react-icons/fa6";

type Props = {
  product: Product;
};

export function ComparisonTable({ product }: Props) {
  const whatsappNumber = "59892041709";

  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-[250px_repeat(3,1fr)] border border-neutral-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-950 p-8 flex flex-col items-start gap-1 justify-center">
          <HeaderLogo />
          <span className="text-xs pl-1 italic tracking-wide text-neutral-400">
            Espeficicaciones tecnicas
          </span>
        </div>
        {product.variants.map((variant) => (
          <div
            key={variant.id}
            className={`
              p-6 text-center border-l border-neutral-800
              ${variant.highlight ? "bg-neutral-900" : "bg-neutral-950"}
            `}
          >
            <h3 className="text-white font-semibold">{variant.name}</h3>
            <p className="text-xl mt-2">U$S {variant.price}</p>
          </div>
        ))}

        {/* Features */}
        {product.features.map((feature) => (
          <>
            {/* Label */}
            <div
              key={feature.key}
              className="p-4 pl-8 text-sm text-neutral-400 border-t border-neutral-800"
            >
              {feature.label}
            </div>

            {/* Values */}
            {product.variants.map((variant) => (
              <div
                key={variant.id + feature.key}
                className="p-4 flex justify-center items-center border-t border-l border-neutral-800"
              >
                {renderFeatureValue(variant.values[feature.key])}
              </div>
            ))}
          </>
        ))}
      </div>{" "}
      <div
        className="
          my-16 py-8  flex justify-center w-full items-center
          rounded-2xl border border-neutral-800
          bg-gradient-to-t from-neutral-950 via-neutral-900 to-neutral-950
          bg-neutral-950
          shadow-sm
          overflow-hidden
        "
      >
        {/* Content */}
        <div className="flex flex-col text-start gap-12">
          {/* Title */}
          <div className="flex flex-col gap-6">
            <span className="text-3xl   max-w-lg text-neutral-100">
              Agrega tu columna de instalación para tu cargador
            </span>
            {/* Specs */}
            <span className="text-xl text-neutral-400 mt-1">
              Altura: 150cm · Base: 26cm × 14.5 cm
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-col items-start gap-2">
            <span className="text-5xl font-bold text-green-400 tracking-tight">
              USD 158
            </span>
            <span className="text-xl  text-neutral-500 mt-1">IVA inc.</span>
          </div>
        </div>
        {/* Image */}
        <div className="relative flex justify-center ">
          <img
            src="/images/11.png"
            alt="Columna de instalación para cargador eléctrico"
            className="h-[850px] w-120 object-cover"
          />
        </div>
      </div>
      <div className="my-8 flex justify-center">
        <a
          href={whatsappNumber}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2.5
            py-4 px-8
            rounded-full text-xl
            bg-gradient-to-t from-green-600 via-green-800 to-green-900
            text-gray-200 
            transition-all duration-300
            shadow-lg shadow-black/40
          "
        >
          <FaWhatsapp className="size-6" />
          Hablar con un vendedor
        </a>
      </div>
    </div>
  );
}
