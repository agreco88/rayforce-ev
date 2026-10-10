import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { Lexend_Deca } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import BaseLayout from "@/components/layout/base-layout";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORGANIZATION_ID } from "@/lib/generate-locale-metadata";

const lexend = Lexend_Deca({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

// Respaldo de las rutas sin `generateMetadata` propio (las estacionadas, el 404).
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata.home" });
	return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) notFound();

	const messages = await getMessages({ locale });

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={`${lexend.variable} scroll-smooth dark`}
			data-scroll-behavior="smooth"
		>
			<body className="transition-all min-w-dvw min-h-dvh overflow-x-hidden">
				<NextIntlClientProvider locale={locale} messages={messages}>
					<BaseLayout>{children}</BaseLayout>
				</NextIntlClientProvider>
				<Analytics />
				<SpeedInsights />
				<JsonLd
					schema={{
						"@context": "https://schema.org",
						"@type": "Organization",
						"@id": ORGANIZATION_ID,
						name: "Rayforce",
						url: "https://www.rayforce.uy",
						// Google pide el logo de al menos 112x112: el isotipo, no la palabra (500x80)
						logo: "https://www.rayforce.uy/images/brand/rayforce-isotype.png",
						parentOrganization: { "@type": "Organization", name: "Bamibel S.A." },
						email: "comercial@rayforce.uy",
						telephone: "+59892041709",
						// Va el mismo numero del WhatsApp de ventas (`lib/whatsapp.ts`).
						contactPoint: {
							"@type": "ContactPoint",
							contactType: "sales",
							telephone: "+59892041709",
							email: "comercial@rayforce.uy",
							areaServed: "UY",
						},
						// El perfil de Google por su `cid`: el link de compartir es una
						// redireccion, y la URL larga de Maps cambia con cada sesion.
						sameAs: [
							"https://www.google.com/maps?cid=7781446569801349357",
							"https://www.instagram.com/rayforceuruguay/",
						],
						address: {
							"@type": "PostalAddress",
							addressLocality: "Montevideo",
							addressCountry: "UY",
						},
						areaServed: "UY",
					}}
				/>
			</body>
		</html>
	);
}
