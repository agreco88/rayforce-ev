import { ChargerCertificationSection } from "@/components/pages/shared/ChargerCertificationSection";

/** La certificacion de /cargadores con la descripcion de empresas. El carril y
 * el padding son los de `AppHighlightsInteractive`, que la envuelve alla. */
export function EmpresasCertification() {
  return (
    <section className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950">
      <div className="header-rail relative z-10 pt-16 pb-20 sm:py-24 lg:py-32">
        <ChargerCertificationSection namespace="EmpresasPage.Certification" />
      </div>
    </section>
  );
}
