import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Audience } from "@/components/beacon/audience";
import { BeaconCta } from "@/components/beacon/cta";
import { Examples } from "@/components/beacon/examples";
import { Faq } from "@/components/beacon/faq";
import { BeaconHero } from "@/components/beacon/hero";
import { HowItWorks } from "@/components/beacon/how-it-works";
import { NotChatbot } from "@/components/beacon/not-chatbot";
import { Pilot } from "@/components/beacon/pilot";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("beacon.meta");
  return { title: t("title"), description: t("description") };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BeaconPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <BeaconHero />
      <NotChatbot />
      <Examples />
      <HowItWorks />
      <Pilot />
      <Audience />
      <Faq />
      <BeaconCta />
    </main>
  );
}
