import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Faq } from "@/components/enterprise/faq";
import { EnterpriseHero } from "@/components/enterprise/hero";
import { Product } from "@/components/enterprise/product";
import { Security } from "@/components/enterprise/security";
import { Trust } from "@/components/enterprise/trust";
import { UseCases } from "@/components/enterprise/use-cases";
import { pageMetadata } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("enterprise.meta");
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function EnterprisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="page-dark bg-panel text-panel-ink">
      <EnterpriseHero />
      <Product />
      <Trust />
      <UseCases />
      <Security />
      <Faq />
    </main>
  );
}
