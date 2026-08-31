import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { pageMetadata } from "@/lib/metadata";

type Position = {
  slug: string;
  title: string;
  location: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("careers.meta");
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
  });
}

export default async function Careers({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("careers");
  const messages = await getMessages();
  const positions = (messages.careers.positions.openPositions ??
    []) as Position[];

  return (
    <main>
      <section className="px-6 pt-40 pb-24 lg:px-12">
        <Reveal className="mx-auto max-w-7xl">
          <h1 className="max-w-4xl text-display-xl text-ink">
            {t("title")}{" "}
            <span className="text-brand-green italic">
              {t("titleHighlight")}
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-body-l text-ink-muted">
            {t("description")}
          </p>
        </Reveal>
      </section>

      <section className="border-t border-hairline bg-surface-sunken px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-24">
          <p className="text-eyebrow font-medium text-ink-muted uppercase lg:sticky lg:top-32 lg:self-start">
            {t("openPositions")}
          </p>

          <div className="max-w-3xl">
            <Reveal>
              <p className="text-display-m text-ink">
                {t("openPositionsDescription")}
              </p>
            </Reveal>

            {positions.length > 0 ? (
              <ul className="mt-14">
                {positions.map((position, i) => (
                  <Reveal
                    as="li"
                    key={position.slug}
                    order={i + 1}
                    className="border-t border-hairline last:border-b"
                  >
                    <Link
                      href={`/careers/${position.slug}`}
                      className="group flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-7"
                    >
                      <span>
                        <span className="block text-heading text-ink">
                          {position.title}
                        </span>
                        <span className="mt-1 block text-body-s text-ink-muted">
                          {position.location}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-2 text-body-s font-semibold text-brand-green">
                        {t("viewPosition")}
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            ) : (
              <p className="mt-14 border-t border-hairline pt-7 text-body-l text-ink-muted">
                {t("noPositions")}
              </p>
            )}

            <Reveal order={positions.length + 1} className="mt-16">
              <p className="max-w-xl text-body-l text-ink-text">
                {t("generalApplication")}
              </p>
              <a
                href="mailto:careers@nivii.ai?subject=General Application"
                className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-hairline bg-background px-4 py-2 text-body-s font-semibold text-ink transition-all duration-100 hover:border-brand-green/30 active:scale-[0.97]"
              >
                {t("sendResumeLink")}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
