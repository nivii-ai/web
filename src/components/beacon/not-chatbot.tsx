import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";

const SOURCE_URL =
  "https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude";

export async function NotChatbot() {
  const t = await getTranslations("beacon.notChatbot");
  const cards = t.raw("cards") as { title: string; description: string }[];

  return (
    <section
      id="no-es-un-chatbot"
      className="scroll-m-28 border-t border-hairline bg-surface-sunken px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            accent: (chunks) => (
              <span className="text-brand-green italic">{chunks}</span>
            ),
          })}
          description={t("description")}
        />

        <Reveal
          order={1}
          className="mt-14 grid gap-10 rounded-core border border-hairline p-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-16 lg:p-12"
        >
          <p className="font-display text-display-m whitespace-nowrap text-brand-green">
            {t("stat")}
          </p>

          <div className="max-w-2xl">
            <p className="text-body-l font-medium text-ink">{t("statLead")}</p>
            <p className="mt-4 text-body-s text-ink-muted">{t("statBody")}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal
              as="li"
              key={card.title}
              order={i + 2}
              className="border-t border-hairline pt-6"
            >
              <h3 className="text-heading text-ink">{card.title}</h3>
              <p className="mt-3 text-body-s text-ink-muted">
                {card.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <p className="mt-12 text-code text-ink-muted">
          {t.rich("source", {
            link: (chunks) => (
              <a
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
