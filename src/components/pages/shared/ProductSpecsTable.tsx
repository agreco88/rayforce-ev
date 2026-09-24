"use client";

import Image from "next/image";
import Flag from "react-world-flags";
import { useTranslations } from "next-intl";
import { ArrowDownToLine, CheckIcon, XIcon } from "lucide-react";
import { useTrack } from "@/lib/analytics/use-track";
import {
  Accordion,
  AccordionContentAnimated,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getProductImageScaleStyle } from "@/lib/catalog/catalog.helpers";
import type {
  CatalogProduct,
  CatalogTheme,
} from "@/lib/catalog/catalog.types";
import { buildSpecGroups, type SpecRow } from "./product-specs-table.rows";

type Props = {
  product: CatalogProduct;
  id?: string;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * Ficha tecnica de UN producto, agrupada por categoria — no confundir con
 * `ComparisonTable`, que pone varios productos en columnas. Sirve a cables y
 * cargadores: las filas salen de `buildSpecGroups`, que es quien sabe de
 * categorias, y este archivo solo las dibuja.
 */
export function ProductSpecsTable({ product, id }: Props) {
  const t = useTranslations("Common.SpecsTable");
  const tSpecs = useTranslations("Common.Specs");
  const track = useTrack();
  const { theme } = product;

  const groups = buildSpecGroups(product, tSpecs);

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden border-t border-neutral-900 py-24 lg:py-32"
    >
      {/* Mismo fondo que el hero, para que la ficha se lea como continuacion
          suya y no como un bloque pegado aparte. */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#0a0a0a_20%,#111827_60%,#0a0a0a_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 80% 50%, ${theme.glow}, transparent 70%)`,
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `
            linear-gradient(to left, rgba(64,64,64,0.25) 0px, black 1px),
            linear-gradient(to top, rgba(64,64,64,0.25) 0px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 20%, transparent 80%)",
        }}
      />

      <div className="page-shell relative z-20 !pt-0">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className={`text-sm uppercase tracking-[0.35em] ${theme.accentText}`}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl">
            {t("title")}
          </h2>
          {/* El modelo, explicito: la ficha se comparte y se llega por buscador,
              asi que tiene que decir de que equipo habla sin el hero arriba. */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400">
            {product.publicName}
          </p>
        </div>

        {/* La tabla no toma el ancho del shell: a 1600px la etiqueta y el valor
            quedan en extremos opuestos de la pantalla y no se leen como una
            misma fila. */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {/* La cabecera de la ficha: la foto del equipo y, al lado, quien es
                y quien lo hace. Van juntas y fuera de los grupos porque no son
                specs sino la identidad — es lo primero que se mira al comparar
                contra un generico sin marca. */}
            <div className="grid grid-cols-1 border-b border-white/10 bg-white/[0.04] sm:grid-cols-2">
              {/* La foto sobre fondo blanco pide su propio container claro, y
                  por eso lleva padding propio en vez del de la celda. */}
              <div className="flex items-center justify-center border-b border-white/10 bg-white p-8 sm:border-b-0 sm:border-r">
                <Image
                  src={product.photoImage}
                  alt={product.publicName}
                  width={800}
                  height={800}
                  style={getProductImageScaleStyle(product)}
                  className="h-48 w-auto object-contain scale-[var(--product-image-scale)] sm:h-56"
                />
              </div>

              <div className="flex flex-col divide-y divide-white/10">
                <div className="flex flex-1 flex-col justify-center gap-1.5 px-5 py-4 sm:px-7">
                  <span className="text-xs uppercase tracking-widest text-neutral-500">
                    {t("model")}
                  </span>
                  <span className="text-base font-medium text-white">
                    {product.modelCode}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-center gap-1.5 px-5 py-4 sm:px-7">
                  <span className="text-xs uppercase tracking-widest text-neutral-500">
                    {t("origin")}
                  </span>
                  <span className="flex items-center gap-3">
                    {/* `height` y no `width`: las banderas no comparten proporcion
                        (CN es 3:2, DE 5:3) y fijando el alto quedan parejas. */}
                    <Flag
                      code={product.origin.countryCode}
                      height={18}
                      className="h-[18px] w-auto rounded-[2px] shadow-sm shadow-black/40"
                    />
                    <span className="text-base font-medium text-white">
                      {t(`countries.${product.origin.countryCode}`)}
                    </span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-center gap-1.5 px-5 py-4 sm:px-7">
                  <span className="text-xs uppercase tracking-widest text-neutral-500">
                    {t("manufacturer")}
                  </span>
                  <a
                    href={product.origin.manufacturerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit items-center gap-3 text-base font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {/* El logo viene negro sobre transparente: `invert` lo pasa a
                        blanco para que exista sobre el fondo oscuro. */}
                    <Image
                      src={product.origin.manufacturerLogo}
                      alt=""
                      width={192}
                      height={192}
                      className="h-5 w-auto brightness-0 invert"
                    />
                    {product.origin.manufacturer}
                  </a>
                </div>
              </div>
            </div>

            {/* Los grupos van colapsados: enteros son ~25 filas y casi dos
                pantallas de scroll. Arranca abierto el primero para que se vea
                de que va la tabla sin tener que tocar nada. */}
            <Accordion
              type="multiple"
              defaultValue={groups.length > 0 ? [groups[0].key] : []}
            >
              {groups.map((group) => (
                <AccordionItem
                  key={group.key}
                  value={group.key}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <AccordionTrigger
                    className={`items-center px-5 py-5 text-xs font-semibold uppercase tracking-widest hover:no-underline sm:px-7 ${theme.accentText}`}
                  >
                    {t(`groups.${group.key}`)}
                  </AccordionTrigger>

                  {/* La variante animada, que ademas monta siempre: las specs
                      son el contenido que le da autoridad a la pagina, y si lo
                      cerrado se desmonta no lo indexa Google ni lo encuentra
                      Ctrl+F. */}
                  <AccordionContentAnimated className="pb-0 pt-0">
                    {group.rows.map((row) => (
                      <div
                        key={row.key}
                        className="flex items-start justify-between gap-6 border-t border-white/5 px-5 py-4 sm:px-7"
                      >
                        <span className="text-sm text-neutral-400">
                          {t(`rows.${row.key}`)}
                        </span>
                        <SpecValue value={row.value} theme={theme} />
                      </div>
                    ))}
                  </AccordionContentAnimated>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {product.datasheetUrl && (
            <a
              href={product.datasheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track.datasheetRequested(product.slug)}
              className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-white/30 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5"
            >
              <ArrowDownToLine size={16} />
              {t("datasheet")}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Value                                                              */
/* ------------------------------------------------------------------ */

/** Los booleanos van como icono y el resto como texto alineado a la derecha. */
function SpecValue({
  value,
  theme,
}: {
  value: SpecRow["value"];
  theme: CatalogTheme;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className={`mt-0.5 h-4 w-4 shrink-0 ${theme.check}`} />
    ) : (
      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
    );
  }

  // `max-w-sm`: la lista de protecciones electricas es un parrafo entero y sin
  // tope estira la fila hasta empujar la etiqueta contra el borde.
  return (
    <span className="max-w-sm text-right text-sm text-neutral-100">
      {value}
    </span>
  );
}
