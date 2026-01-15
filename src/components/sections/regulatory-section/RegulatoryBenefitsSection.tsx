"use client";

import Container from "@/components/layout/container";
import Image from "next/image";

export function RegulatorySection() {
  return (
    <section className="relative border-t border-neutral-800 bg-neutral-950 py-24">
      <Container className="max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Cumplimiento normativo y beneficios energéticos
            </h2>

            <p className="mt-6 text-neutral-400 leading-relaxed">
              Nuestros cargadores están{" "}
              <strong className="text-neutral-200">
                habilitados y alineados con la normativa uruguaya vigente
              </strong>
              , cumpliendo con los requisitos establecidos por{" "}
              <strong className="text-neutral-200">UTE y URSEA</strong>.
            </p>

            <p className="mt-4 text-neutral-400 leading-relaxed">
              Esto garantiza una instalación segura, confiable y plenamente
              compatible con la red eléctrica nacional. Además, permite acceder
              a beneficios y programas de UTE, como el Plan Redondo, según
              condiciones vigentes.
            </p>
          </div>

          {/* Logos */}
          <div className="flex justify-center lg:justify-end">
            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
                <Image
                  src="/images/logo-ursea.webp"
                  alt="URSEA"
                  width={160}
                  height={80}
                  className="mx-auto opacity-90"
                />
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
                <Image
                  src="/images/logo-ute.webp"
                  alt="UTE"
                  width={160}
                  height={80}
                  className="mx-auto opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
