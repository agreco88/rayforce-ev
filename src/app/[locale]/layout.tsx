import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { Lexend_Deca } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import BaseLayout from "@/components/layout/base-layout";

const lexend = Lexend_Deca({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
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
			</body>
		</html>
	);
}
