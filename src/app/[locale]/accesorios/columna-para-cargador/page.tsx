import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { HomeStandSection } from "@/components/sections/home/stand/HomeStandSection";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { generateLocaleMetadata, SITE } from "@/lib/generate-locale-metadata";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/accesorios/columna-para-cargador";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata({
    locale,
    route: "accesorios-columna",
    path: PATH,
  });
}

/** La seccion de la columna de la home, tal cual, con el titulo como h1. */
export default async function ColumnPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ColumnPage.breadcrumb" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("home"), item: SITE.baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: t("accessories"),
        item: `${SITE.baseUrl}/accesorios`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("column"),
        item: `${SITE.baseUrl}${PATH}`,
      },
    ],
  };

  return (
    <div className="bg-neutral-950">
      <JsonLd schema={breadcrumbSchema} />

      <HomeStandSection
        id="columna"
        titleAs="h1"
        header={
          <AppBreadcrumb
            items={[
              { label: t("home"), href: "/" },
              { label: t("accessories"), href: "/accesorios" },
              { label: t("column") },
            ]}
          />
        }
      />

      <Footer faqNamespace="AccessoriesPage.Faq" faqId="faq" ctaSource="column" />
      <ScrollDepthTracker page="column" />
    </div>
  );
}
