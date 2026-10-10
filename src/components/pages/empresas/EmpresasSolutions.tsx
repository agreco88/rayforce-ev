"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Building2, ShieldCheck, Store } from "lucide-react";

import { CardCarousel } from "@/components/shared/carousel/CardCarousel";
import { CarouselCard } from "@/components/shared/carousel/CarouselCard";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "buildings", Icon: Building2 },
  { key: "business", Icon: Store },
  { key: "safety", Icon: ShieldCheck },
] as const;

/** Edificios, empresas y el respaldo de la instalacion. Sin encabezado propio:
 * el titulo de la seccion es el h1 del hero, que esta justo arriba. */
export function EmpresasSolutions() {
  const t = useTranslations("EmpresasPage.Solutions");
  const paragraphs = (key: string) =>
    t.raw(`items.${key}.description`) as string[];

  return (
    <section className="overflow-hidden border-t border-neutral-900 bg-neutral-950">
      <div className="mx-auto w-full max-w-7xl px-6 pt-16 pb-20 sm:px-8 sm:py-24 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={waterfallList}
          className="hidden gap-6 sm:grid lg:grid-cols-2"
        >
          {ITEMS.map(({ key, Icon }) => (
            <motion.article
              key={key}
              variants={waterfallItem}
              className={cn(
                "rounded-3xl border border-white/10 bg-white/[0.02] p-8 lg:p-10",
                // Edificios tiene dos parrafos: ocupa la columna izquierda entera
                // y las otras dos se apilan a la derecha
                key === "buildings" && "lg:row-span-2",
              )}
            >
              <div className="w-fit rounded-xl bg-green-400/10 p-2.5">
                <Icon className="size-5 text-green-400" strokeWidth={1.6} />
              </div>

              <h2 className="mt-6 block-title">{t(`items.${key}.title`)}</h2>

              <div className="mt-4 flex flex-col gap-4">
                {paragraphs(key).map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-pretty text-neutral-400 lg:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* `-mx-6`: el carousel necesita el ancho del viewport para que asome
            la tarjeta siguiente. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="-mx-6 sm:hidden"
        >
          <CardCarousel
            items={ITEMS.map(({ key, Icon }) => (
              <CarouselCard
                key={key}
                card={{
                  key,
                  icon: Icon,
                  title: t(`items.${key}.title`),
                  // Edificios va resumido: sus dos parrafos estiraban las tres
                  // tarjetas, que miden lo que la mas alta.
                  description: t.has(`mobile.items.${key}.description`)
                    ? t(`mobile.items.${key}.description`)
                    : paragraphs(key).join(" "),
                }}
              />
            ))}
          />
        </motion.div>
      </div>
    </section>
  );
}
