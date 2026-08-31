import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, SearchX } from "lucide-react";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { pageMetadata } from "@/lib/metadata";

type Position = {
  slug: string;
  title: string;
  metaDescription: string;
  location: string;
  applicationUrl?: string;
  aboutNivii?: string[];
  aboutNiviiTitle?: string;
  aboutRole: string[];
  aboutRoleTitle?: string;
  responsibilities: string[];
  responsibilitiesTitle?: string;
  requirements: string[];
  requirementsTitle?: string;
  bonusPoints?: string[];
  bonusPointsTitle?: string;
  benefits: string[];
  benefitsTitle?: string;
  quickInfo: {
    location: string;
    experience?: string;
    department: string;
  };
};

async function findPosition(slug: string) {
  const messages = await getMessages();
  const positions = (messages.careers.positions.openPositions ??
    []) as Position[];

  return positions.find((position) => position.slug === slug);
}

function applyHref(position: Position) {
  return (
    position.applicationUrl ||
    `mailto:careers@nivii.ai?subject=Application for ${position.title}`
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const position = await findPosition(slug);
  if (!position) return {};

  return pageMetadata({
    title: position.title,
    description: position.metaDescription,
    locale,
  });
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-body-l text-ink-muted">
          <span
            aria-hidden
            className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-brand-green"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function PositionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("careers");
  const position = await findPosition(slug);

  if (!position) {
    return (
      <main className="px-6 pt-40 pb-32 lg:px-12">
        <div className="mx-auto max-w-xl text-center">
          <SearchX className="mx-auto size-10 text-ink-muted" />
          <h1 className="mt-8 text-display-m text-ink">
            {t("positions.page.notFoundPositionTitle")}
          </h1>
          <p className="mt-6 text-body-l text-ink-muted">
            {t("positions.page.notFoundPositionDescription")}
          </p>
          <Link
            href="/careers/"
            className="group mt-10 inline-flex items-center gap-2 text-body-s font-semibold text-brand-green"
          >
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {t("positions.page.backToCareers")}
          </Link>
        </div>
      </main>
    );
  }

  const quickInfo = [
    ["location", position.quickInfo.location],
    ["experience", position.quickInfo.experience],
    ["department", position.quickInfo.department],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  const sections = [
    {
      title: position.aboutNiviiTitle || "About Nivii",
      paragraphs: position.aboutNivii,
      level: "h2" as const,
    },
    {
      title: position.aboutRoleTitle || t("positions.page.aboutRole"),
      paragraphs: position.aboutRole,
      level: "h2" as const,
    },
    {
      title:
        position.responsibilitiesTitle || t("positions.page.responsibilities"),
      items: position.responsibilities,
      level: "h3" as const,
    },
    {
      title: position.requirementsTitle || t("positions.page.requirements"),
      items: position.requirements,
      level: "h3" as const,
    },
    {
      title: position.bonusPointsTitle || t("positions.page.bonusPoints"),
      items: position.bonusPoints,
      level: "h3" as const,
    },
    {
      title: position.benefitsTitle || t("positions.page.benefits"),
      items: position.benefits,
      level: "h3" as const,
    },
  ].filter((section) => section.paragraphs?.length || section.items?.length);

  return (
    <main className="px-6 pt-32 pb-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/careers/"
          className="group inline-flex items-center gap-2 text-body-s text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          {t("positions.page.backToCareers")}
        </Link>

        <header className="mt-10 flex flex-wrap items-end justify-between gap-8 border-b border-hairline pb-12">
          <div>
            <h1 className="max-w-3xl text-display-l text-ink">
              {position.title}
            </h1>
            <p className="mt-4 text-body-l text-ink-muted">
              {position.location}
            </p>
          </div>

          <a
            href={applyHref(position)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-body-s font-semibold text-white transition-all duration-100 hover:bg-brand-green-dark active:scale-[0.97]"
          >
            {t("applyNow")}
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </header>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-24">
          <article className="flex max-w-3xl flex-col gap-14">
            {sections.map((section, i) => (
              <Reveal key={section.title} order={i}>
                {section.level === "h2" ? (
                  <h2 className="text-display-m text-ink">{section.title}</h2>
                ) : (
                  <h3 className="text-heading text-ink">{section.title}</h3>
                )}

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-6 text-body-l text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.items ? <Bullets items={section.items} /> : null}
              </Reveal>
            ))}
          </article>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-core border border-hairline p-6">
              <h2 className="text-eyebrow font-medium text-ink-muted uppercase">
                {t("positions.page.quickInfo")}
              </h2>
              <dl className="mt-5 flex flex-col gap-3">
                {quickInfo.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-baseline justify-between gap-4 border-t border-hairline pt-3 text-body-s first:border-t-0 first:pt-0"
                  >
                    <dt className="text-ink-muted">
                      {t(`positions.page.quickInfoLabels.${key}`)}
                    </dt>
                    <dd className="text-end font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-core bg-brand-green-tint p-6">
              <h2 className="text-heading text-ink">
                {t("positions.page.cta.title")}
              </h2>
              <p className="mt-3 text-body-s text-ink-text">
                {t("positions.page.cta.description")}
              </p>
              <a
                href={applyHref(position)}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-body-s font-semibold text-white transition-all duration-100 hover:bg-brand-green-dark active:scale-[0.97]"
              >
                {t("positions.page.cta.button")}
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
