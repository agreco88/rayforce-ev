import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { EmpresasHero } from "@/components/pages/empresas/EmpresasHero";
import { EmpresasWhyRayforce } from "@/components/pages/empresas/EmpresasWhyRayforce";
import { EmpresasInstallation } from "@/components/pages/empresas/EmpresasInstallation";
import { EmpresasBuildings } from "@/components/pages/empresas/EmpresasBuildings";
import { EmpresasBusiness } from "@/components/pages/empresas/EmpresasBusiness";
import { EmpresasContact } from "@/components/pages/empresas/EmpresasContact";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateLocaleMetadata, SITE } from "@/lib/generate-locale-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata({
    locale,
    route: "empresas",
    path: "/empresas",
  });
}

export default async function EmpresasPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "EmpresasPage.Hero.breadcrumb",
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("home"), item: SITE.baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: t("empresas"),
        item: `${SITE.baseUrl}/empresas`,
      },
    ],
  };

  return (
    <div className="bg-neutral-950">
      <JsonLd schema={breadcrumbSchema} />
      <EmpresasHero />
      <EmpresasWhyRayforce />
      <EmpresasInstallation />
      <EmpresasBuildings id="metodologia" />
      <EmpresasBusiness />
      <EmpresasContact id="contacto-empresas" />
      <Footer />
      <ScrollDepthTracker page="empresas" />
    </div>
  );
}
