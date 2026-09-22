"use client";

import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

/**
 * La salida al catalogo. Link subrayado y no boton: las cuatro tarjetas de
 * arriba ya son la accion principal, y un verde solido acá competiria con
 * ellas.
 */
export function HomeLineupLink({ label }: { label: string }) {
  return (
    <Link
      href="/cargadores"
      className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white hover:decoration-green-400"
    >
      {label}
      <ArrowRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
