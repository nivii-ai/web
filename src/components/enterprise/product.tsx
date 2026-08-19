import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Pillar = { title: string; description: string };

export async function Product() {
  const t = await getTranslations("enterprise.product");
  const pillars = t.raw("pillars") as Pillar[];

  return (
    <section
      id="producto"
      className="scroll-m-28 border-t border-panel-hairline px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            accent: (chunks) => (
              <span className="text-brand-green italic">{chunks}</span>
            ),
          })}
          description={t("description")}
        />

        <ol className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar.title}
              order={i + 1}
              className="border-t border-panel-hairline pt-6"
            >
              <h3 className="text-heading text-panel-ink">{pillar.title}</h3>
              <p className="mt-3 text-body-s text-panel-ink/60">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
