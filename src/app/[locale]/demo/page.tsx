import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DemoForm } from "@/components/demo-form";
import { pageMetadata } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("demo.meta");
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("demo");
  const reassurance = t.raw("reassurance") as string[];

  return (
    <main className="px-6 pt-40 pb-32 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <h1 className="text-display-l text-ink">
            {t.rich("title", {
              accent: (chunks) => (
                <span className="text-brand-green italic">{chunks}</span>
              ),
            })}
          </h1>
          <ul className="mt-12 flex flex-col gap-5">
            {reassurance.map((line) => (
              <li key={line} className="flex gap-3 text-body-s text-ink-text">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-green" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-bezel bg-surface-sunken p-1.5 shadow-ambient-lg ring-1 ring-hairline">
          <div className="rounded-core bg-background p-8">
            <DemoForm />
          </div>
        </div>
      </div>
    </main>
  );
}
