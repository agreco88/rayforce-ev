"use client";

import Container from "@/components/layout/container";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import { FaWhatsapp } from "react-icons/fa6";

export function RegulatorySection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.RegulatorySection");
  const t2 = useTranslations("HomePage.ChargerStandSection");
  const whatsappNumber = "59892041709";

  const message = encodeURIComponent(
    `Hola! Me interesa saber mas sobre los beneficios de UTE/URSEA`,
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
  return (
    <section
      id={id}
      className="relative bg-gradient-to-b from-green-950 via-neutral-950 pb-20 sm:pb-40"
    >
      {/* subtle divider */}
      <div className="h-[1px] bg-green-900 animate-pulse [animation-duration:8s]" />

      <Container className="max-w-7xl px-6 pt-20 sm:pt-40">
        <motion.div
          variants={waterfallList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          {/* LEFT → TEXT */}
          <div className="order-1">
            <motion.h2
              variants={waterfallItem}
              className="text-3xl sm:text-4xl font-medium tracking-tight text-white"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              variants={waterfallItem}
              className="mt-6 text-neutral-200 leading-relaxed"
            >
              {t("paragraph1")}
            </motion.p>

            <motion.p
              variants={waterfallItem}
              className="mt-4 text-neutral-400 leading-relaxed"
            >
              {t("paragraph2")}
            </motion.p>

            {/* ✅ NEW CTA PARAGRAPH */}
            <motion.p
              variants={waterfallItem}
              className="mt-6 text-neutral-300 leading-relaxed"
            >
              {t2.rich("contact", {
                whatsapp: (chunks) => (
                  <a
                    href="https://wa.me/598092041709"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green-400 hover:underline"
                  >
                    {chunks} <FaWhatsapp className="size-4" />
                  </a>
                ),
                email: (chunks) => (
                  <a
                    href="mailto:comercial@rayforce.com.uy"
                    className="text-green-400 hover:underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </motion.p>
            <div className="pt-8">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center gap-3
                  w-fit h-12
                  rounded-full
                  px-8
                  bg-gradient-to-t from-green-800 via-green-700 to-green-600
                  text-gray-200 font-semibold text-base 
                  transition-all duration-300
                  shadow-lg shadow-black/40
                "
              >
                <FaWhatsapp className="text-xl" />
                Consulta sobre beneficios
              </a>
            </div>
          </div>

          {/* RIGHT → GRID */}
          <motion.div variants={waterfallItem} className="order-2">
            <div className="grid grid-cols-2 gap-6">
              {/* TOP IMAGE */}
              <div
                className="
                  col-span-2
                  relative
                  aspect-[16/9]
                  rounded-2xl
                  overflow-hidden
                  bg-neutral-900
                  ring-1 ring-neutral-800
                "
              >
                <Image
                  src="/images/post-bg.webp"
                  alt="Instalación certificada de cargadores eléctricos en Uruguay"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0" />
              </div>

              {/* LOGO 1 */}
              <div
                className="
                  flex items-center justify-center
                  h-[120px] sm:h-[140px] lg:h-[160px]
                  bg-white rounded-2xl
                "
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/logo-ursea.webp"
                    alt="URSEA Uruguay regulación energética"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>

              {/* LOGO 2 */}
              <div
                className="
                  flex items-center justify-center
                  h-[120px] sm:h-[140px] lg:h-[160px]
                  bg-white rounded-2xl
                "
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/logo-ute.webp"
                    alt="UTE empresa estatal electricidad Uruguay"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
