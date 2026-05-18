"use client";

import { Button } from "@/components/ui/button";
import { AppButton } from "@/components/ui/wrappers/AppButton";
import { Link } from "@/i18n/navigation";
import SocketTypeTwo from "../../../../public/images/icons/socket-type-2.svg";

import { motion } from "framer-motion";
import {
  Zap,
  Plug,
  ShieldCheck,
  Wifi,
  Gauge,
  Wrench,
  ArrowRight,
  Unplug,
} from "lucide-react";

export function FeaturesRayforce() {
  const features = [
    {
      icon: Zap,
      title: "Carga rápida y eficiente",
      description:
        "Potencias de hasta 22 kW para reducir tiempos de carga y aprovechar al máximo cada sesión.",
    },
    {
      icon: SocketTypeTwo,
      title: "Conector Tipo 2",
      description:
        "Compatible con la mayoría de vehículos eléctricos del mercado.",
    },
    {
      icon: ShieldCheck,
      title: "Protección y seguridad",
      description:
        "Sistemas integrados de protección eléctrica para garantizar una instalación segura y confiable.",
    },
    {
      icon: Wifi,
      title: "Conectividad inteligente",
      description:
        "Controlá y monitoreá tu cargador desde la app con funciones remotas y estadísticas de uso.",
    },
    {
      icon: Gauge,
      title: "Uso residencial y comercial",
      description:
        "Solución ideal tanto para hogares, comercios y empresas con flota de vehiculos.",
    },
    {
      icon: Wrench,
      title: "Instalación flexible",
      description:
        "Montaje en pared o con columna independiente para adaptarse a cualquier espacio.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 px-6 sm:px-0 bg-neutral-950 relative">
      {/* Background Grid (keep your premium feel) */}
      <div
        className="absolute inset-0 -z-0 opacity-80"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(64,64,64,0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(64,64,64,0.3) 1px, transparent 1px)
`,
          backgroundSize: "60px 60px",
          maskImage: `
            radial-gradient(ellipse 70% 40% at 40% 30%, #000 20%, transparent 80%)
          `,
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="my-12 md:my-16">
          <div className="flex flex-col max-w-3xl">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Beneficios
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-4"
            >
              Tecnología, diseño y rendimiento— en cada carga
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8 max-w-xl"
          >
            Soluciones de carga pensadas para adaptarse a tu espacio y a tu
            forma de usar la energía.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 border border-neutral-900 rounded-2xl overflow-hidden">
          {features.map((feature, index) => {
            const isCustom = feature.icon === SocketTypeTwo;
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`
                  p-8 md:p-10 bg-neutral-950 flex flex-col gap-6 text-center items-center
                  ${index !== 5 ? "border-b border-neutral-900" : ""}
                  ${index % 2 === 0 && index !== 4 ? "md:border-r border-neutral-900" : ""}
                  ${(index + 1) % 3 !== 0 ? "lg:border-r border-neutral-900" : ""}
                  ${index < 3 ? "lg:border-b border-neutral-900" : ""}
                `}
              >
                {/* Icon */}
                <div className="flex">
                  {isCustom ? (
                    <div
                      className="size-20 bg-green-500"
                      style={{
                        WebkitMaskImage: `url(${SocketTypeTwo.src})`,
                        maskImage: `url(${SocketTypeTwo.src})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                      }}
                    />
                  ) : (
                    <Icon
                      className="size-20"
                      strokeWidth={0.4}
                      stroke={`url(#grad-${index})`}
                    >
                      <defs>
                        <linearGradient
                          id={`grad-${index}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="100%" stopColor="#00c950" />
                          <stop offset="0%" stopColor="#00c950" />
                        </linearGradient>
                      </defs>
                    </Icon>
                  )}
                </div>

                {/* Title */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg sm:text-2xl tracking-tighter capitalize font-medium text-neutral-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-normal">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-center mt-24 gap-4"
        >
          <div className="flex gap-4">
            <AppButton
              href="/cargadores"
              className="group text-neutral-400"
              icon={
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-[1px]"
                  size={16}
                />
              }
            >
              Ver modelos de cargadores
            </AppButton>
            <AppButton
              className="group"
              href="/cargadores"
              icon={
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-[1px]"
                  size={16}
                />
              }
            >
              Ver informacion de contacto
            </AppButton>{" "}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
