"use client";

import { motion } from "framer-motion";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import { ChargerEV } from "@/components/animated/charger-ev/ChargerEv";
import { Link } from "@/i18n/navigation";

/* ------------------ Highlights ------------------ */

const HIGHLIGHTS = {
  residential: [
    "Carga nocturna eficiente",
    "Ideal para 1 vehículo",
    "Máximo ahorro energético",
  ],
  pro: [
    "Uso intensivo continuo",
    "Pensado para flotas y transporte",
    "Máxima potencia disponible",
  ],
};

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className=" flex flex-col gap-1 text-base text-neutral-400 text-center">
      {items.map((item) => (
        <li key={item} className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function CTA({ slug }: { slug: string }) {
  return (
    <Link
      href={`/cargadores/${slug}`}
      className="
        mt-4 px-4 py-2 text-lg
        hover:text-green-400
        transition underline underline-offset-4
      "
    >
      Más información
    </Link>
  );
}

/* ------------------ Section ------------------ */

export default function ChargerGridSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="bg-neutral-950 w-full mt-28 flex-col relative hidden xl:flex max-w-[1440px] mx-auto"
    >
      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center flex flex-col justify-center items-center"
      >
        {/* Eyebrow */}
        <motion.span
          variants={waterfallItem}
          className="text-green-400 text-xs sm:text-sm tracking-widest uppercase"
        >
          Cargadores Wallbox Besen BS20
        </motion.span>

        {/* Title */}
        <motion.h2 variants={waterfallItem} className="mt-4 mb-2 sm:mt-3">
          Soluciones inteligentes de carga
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={waterfallItem}
          className="my-6 sm:my-4 lg:w-2xl text-neutral-400 text-base sm:text-md"
        >
          Descubrí nuestra línea de cargadores eléctricos tipo Wallbox de 7kW y
          22kW. Diseñados para hogares y empresas en Uruguay.
        </motion.p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-4 sm:mt-12 max-w-7xl mx-auto px-4 sm:px-0 "
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          {/* Residential */}
          <motion.div
            variants={waterfallItem}
            className="flex flex-col gap-1 items-center"
          >
            <ChargerEV powerKw={7.4} variant="residential" mode="single" />
            <div className="flex flex-col items-center my-4 gap-2">
              <h3 className="text-lg text-green-400">Residencial</h3>
              <h4 className="text-4xl font-thin ">7.4kW</h4>
            </div>{" "}
            <Highlights items={HIGHLIGHTS.residential} />
            <CTA slug="bs20-bc-7kw" />
          </motion.div>

          {/* 22kW */}
          <motion.div
            variants={waterfallItem}
            className="flex flex-col gap-1 items-center"
          >
            <ChargerEV
              powerKw={22}
              variant="residential"
              mode="multi"
              phases={3}
            />{" "}
            <div className="flex flex-col items-center my-4 gap-2">
              <h3 className="text-lg text-green-400">Comercial</h3>
              <h4 className="text-4xl font-thin ">22.0kW</h4>
            </div>{" "}
            <Highlights items={HIGHLIGHTS.pro} />
            <CTA slug="bs20-bc-22kw" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
