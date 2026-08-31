import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Row = { label: string; own: string; beacon: string };

export async function HowItWorks() {
  const t = await getTranslations("beacon.howItWorks");
  const cards = t.raw("cards") as { title: string; description: string }[];
  const rows = t.raw("rows") as Row[];

  return (
    <section
      id="how-it-works"
      className="scroll-m-28 border-t border-hairline bg-surface-sunken px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <ul className="mt-14 grid gap-4 lg:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal
              as="li"
              key={card.title}
              order={i + 1}
              className="rounded-bezel border border-hairline p-8"
            >
              <h3 className="text-heading text-ink">{card.title}</h3>
              <p className="mt-3 text-body-s text-ink-muted">
                {card.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal order={cards.length + 1} className="mt-20 max-w-3xl">
          <h3 className="text-heading text-ink">{t("tableTitle")}</h3>
          <p className="mt-3 text-body-s text-ink-muted">
            {t("tableDescription")}
          </p>
        </Reveal>

        <Reveal
          order={cards.length + 2}
          className="mt-8 overflow-hidden rounded-bezel border border-hairline bg-background"
        >
          <div className="hidden lg:grid lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8 lg:px-8 lg:py-5">
            <span />
            <span className="text-eyebrow font-medium text-ink-muted uppercase">
              {t("columnOwn")}
            </span>
            <span className="text-eyebrow font-medium text-brand-green uppercase">
              {t("columnBeacon")}
            </span>
          </div>

          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-4 border-t border-hairline px-6 py-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8 lg:px-8"
            >
              <p className="text-body-s font-medium text-ink">{row.label}</p>

              <p className="text-body-s text-ink-muted">
                <span className="mb-1 block text-code text-ink-muted lg:hidden">
                  {t("columnOwn")}
                </span>
                {row.own}
              </p>

              <p className="border-s-2 border-brand-green ps-4 text-body-s text-ink lg:border-s-0 lg:ps-0">
                <span className="mb-1 block text-code text-brand-green lg:hidden">
                  {t("columnBeacon")}
                </span>
                {row.beacon}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
