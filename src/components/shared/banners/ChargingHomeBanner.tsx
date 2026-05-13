"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";

export function ChargingHomeBanner() {
  return (
    <section className={cn("relative w-full overflow-hidden")}>
      {/* Aspect Ratio Container */}
      <div className="relative max-w-[120rem] rounded-2xl z-50 overflow-hidden shadow-xl shadow-neutral-900/50 border-neutral-900 bg-gradient-to-tr from-neutral-950 via-neutral-950 to-neutral-900 border mx-auto flex justify-center gap-8">
        {/* Image */}
        <Image
          src="/images/banners/home-charging.png"
          alt="Cargador eléctrico en hogar"
          height={1000}
          width={1000}
          priority
          className="object-contain"
        />

        {/* Left Gradient (content readability) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/25 to-transparent pointer-events-none " />

        {/* Side Vignette (for larger screens) */}

        {/* Content */}
        <div className=" inset-0 max-w-7xl mx-auto flex gap-8 items-center justify-end">
          <div className="max-w-2xl flex flex-col gap-4  px-6 sm:px-10 lg:px-0">
            {/* Headline */}
            <h2 className="text-2xl  sm:text-3xl lg:text-5xl font-thin text-white">
              Convertí tu casa en tu propia estación de carga
            </h2>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-neutral-300 max-w-md">
              Más del 80% de las cargas de vehículos eléctricos se realizan en
              el hogar. Instalá tu wallbox y cargá de forma segura, rápida y
              económica.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {/* MELI CTA */}
              <a
                href="https://articulo.mercadolibre.com.uy/..."
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex gap-2 items-center justify-center",
                  "px-4 py-1.5 rounded-xl font-medium",
                  "bg-yellow-400 text-black",
                  "hover:bg-yellow-300 transition-all duration-500",
                )}
              >
                <SiMercadopago className="size-10 " />
                <span>Comprar con envío y garantía</span>
              </a>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/59892041709"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex gap-2 items-center justify-center",
                  "px-5 py-3 rounded-xl font-medium",
                  "bg-white/10 text-white",
                  "border border-white/20",
                  "hover:bg-white/20 transition-all duration-500",
                )}
              >
                <FaWhatsapp className="size-7" />
                Iniciar chat con un vendedor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
