import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import BaseLayout from "@/components/layout/base-layout";

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	// Validate locale
	if (!hasLocale(routing.locales, locale)) notFound();

	// Load messages for current locale
	const messages = await getMessages({ locale });

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<BaseLayout>{children}</BaseLayout>
		</NextIntlClientProvider>
	);
}
