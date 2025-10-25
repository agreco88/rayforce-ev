import SectionWrapper from "@/components/layout/section-wrapper";
import ContactForm from "@/components/pages/contact/contact-form";
import ContactHero from "@/components/pages/contact/contact-hero";
import { generateLocaleMetadata } from "@/lib/generate-locale-metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return await generateLocaleMetadata({
    locale,
    route: "contactUs",
    path: "/contact-us",
  });
}

export default function ContactUsPage() {
  return (
    <SectionWrapper className="grid grid-cols-2 h-full items-center">
      <ContactHero />
      <ContactForm />
    </SectionWrapper>
  );
}
