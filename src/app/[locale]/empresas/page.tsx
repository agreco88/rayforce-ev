import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { EmpresasHero } from "@/components/pages/empresas/hero/EmpresasHero";
import { EmpresasSolutions } from "@/components/pages/empresas/EmpresasSolutions";
import { EmpresasBuildings } from "@/components/pages/empresas/EmpresasBuildings";
import { EmpresasCertification } from "@/components/pages/empresas/EmpresasCertification";
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
    image: "/images/og/empresas.jpg",
  });
}

export default async function EmpresasPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EmpresasPage.Hero" });
  const tMeta = await getTranslations({ locale, namespace: "metadata.empresas" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumb.home"),
        item: SITE.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.empresas"),
        item: `${SITE.baseUrl}/empresas`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("title"),
    description: tMeta("description"),
    provider: { "@type": "Organization", name: SITE.name, url: SITE.baseUrl },
    areaServed: { "@type": "Country", name: "Uruguay" },
  };

  return (
    <div className="bg-neutral-950">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceSchema} />
      <EmpresasHero />
      <EmpresasSolutions />
      <EmpresasBuildings />
      <EmpresasCertification />
      <Footer
        faqNamespace="Common.Faq"
        faqId="faq"
        ctaNamespace="EmpresasPage.Contact"
        ctaSource="empresas"
      />
      <ScrollDepthTracker page="empresas" />
    </div>
  );
}
