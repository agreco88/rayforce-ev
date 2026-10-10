import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { HomeStandSection } from "@/components/sections/home/stand/HomeStandSection";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { getCableProducts } from "@/lib/catalog/catalog.helpers";
import { generateLocaleMetadata, SITE } from "@/lib/generate-locale-metadata";

type Props = { params: Promise<{ locale: string }> };

const PATH = "/accesorios/columna-para-cargador";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata({
    locale,
    route: "accesorios-columna",
    path: PATH,
    image: "/images/og/columna.jpg",
  });
}

/** La seccion de la columna de la home, tal cual, con el titulo como h1. */
export default async function ColumnPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ColumnPage.breadcrumb" });

  // Sin cables a la venta /accesorios redirige aca: el camino lo saltea.
  const trail = [
    { label: t("home"), href: "/" },
    ...(getCableProducts().length > 0
      ? [{ label: t("accessories"), href: "/accesorios" }]
      : []),
    { label: t("column"), href: PATH },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ label, href }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: label,
      item: href === "/" ? SITE.baseUrl : `${SITE.baseUrl}${href}`,
    })),
  };

  return (
    <div className="bg-neutral-950">
      <JsonLd schema={breadcrumbSchema} />

      <HomeStandSection
        id="columna"
        titleAs="h1"
        header={<AppBreadcrumb items={trail} />}
      />

      <Footer faqNamespace="AccessoriesPage.Faq" faqId="faq" ctaSource="column" />
      <ScrollDepthTracker page="column" />
    </div>
  );
}
