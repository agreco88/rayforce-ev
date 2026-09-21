"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

const TRUST_KEYS = ["compatibility", "ursea", "safety", "ownInstall"] as const;

/**
 * Señales de confianza en mobile, apenas debajo del hero.
 *
 * En desktop viven dentro del hero (ver HomeHeroDesktop), donde la media
 * columna da lugar a las cuatro en fila. En mobile no entran: apiladas son
 * ~328px que empujan los CTA fuera del fold en pantallas chicas, y en 2×2
 * quedan los títulos partidos y sin aire.
 *
 * La solución no es sacarlas —son lo que respalda la compra y mucha gente no
 * scrollea más allá del hero— sino darles su propia banda, pegada al hero.
 * Ahí tienen el ancho completo y no compiten con el CTA.
 *
 * El layout es una lista de filas a ancho completo, con el título arriba y el
 * dato abajo. Se probó a dos columnas (título izquierda, dato derecha) y a
 * 360px la descripción quedaba en una columna de ~164px: 3 líneas y filas de
 * alto desparejo. Apilado, cada texto usa los ~312px completos y todas las
 * filas miden igual. Es el mismo contenido que el strip de desktop (mismas
 * claves de i18n), presentado para el formato.
 */
export function HomeHeroTrustBand() {
  const t = useTranslations("HomePage.Hero.trust");

  return (
    <section className="bg-neutral-950 px-6 pb-12">
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={waterfallList}
        className="flex flex-col divide-y divide-white/10 border-y border-white/10"
      >
        {TRUST_KEYS.map((key) => (
          <motion.li key={key} variants={waterfallItem} className="py-3.5">
            <div className="text-sm font-medium text-green-400">
              {t(`${key}.title`)}
            </div>

            {/* El dato concreto: es lo que hace verificable al título */}
            <div className="mt-1 text-xs leading-snug text-neutral-400">
              {t(`${key}.description`)}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
