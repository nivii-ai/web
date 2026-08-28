import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BeaconBanner } from "@/components/home/beacon-banner";
import { Clients } from "@/components/home/clients";
import { FinalCta } from "@/components/home/final-cta";
import { EnterpriseBanner } from "@/components/home/enterprise-banner";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Team } from "@/components/home/team";
import { UseCases } from "@/components/home/use-cases";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("metadata");
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
  });
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Clients />
        <HowItWorks />
        <EnterpriseBanner />
        <UseCases />
        <BeaconBanner />
        <Team />
        <FinalCta />
      </main>
    </div>
  );
}
