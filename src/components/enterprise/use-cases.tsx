import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type UseCase = { sector: string; title: string; description: string };

export async function UseCases() {
  const t = await getTranslations("enterprise.useCases");
  const items = t.raw("items") as UseCase[];

  return (
    <section
      id="casos-de-uso"
      className="scroll-m-28 border-t border-panel-hairline bg-white/[0.02] px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <ul className="mt-16 grid gap-4 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              order={i + 1}
              className="flex flex-col rounded-bezel border border-panel-hairline p-8"
            >
              <p className="text-eyebrow font-medium text-panel-ink/50 uppercase">
                {item.sector}
              </p>
              <h3 className="mt-5 text-heading text-panel-ink">{item.title}</h3>
              <p className="mt-3 text-body-s text-panel-ink/60">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
