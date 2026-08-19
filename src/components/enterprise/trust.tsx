import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function Trust() {
  const t = await getTranslations("enterprise.trust");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section
      id="confianza"
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
        />

        <ul className="mt-16 grid gap-x-12 gap-y-10 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              order={i + 1}
              className="border-t border-panel-hairline pt-6"
            >
              <h3 className="text-heading text-panel-ink">{item.title}</h3>
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
