import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";

type Example = {
  question: string;
  metric: string;
  title: string;
  description: string;
};

export async function Examples() {
  const t = await getTranslations("beacon.examples");
  const items = t.raw("items") as Example[];

  return (
    <section
      id="ejemplos"
      className="scroll-m-28 border-t border-hairline px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <ul className="mt-16 grid gap-6 lg:grid-cols-2">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              order={i + 1}
              className="flex flex-col rounded-core border border-hairline p-8"
            >
              <p className="text-body-s text-ink-muted italic">
                {item.question}
              </p>
              <p className="mt-6 font-display text-display-m text-brand-green">
                {item.metric}
              </p>
              <h3 className="mt-6 text-heading text-ink">{item.title}</h3>
              <p className="mt-3 text-body-s text-ink-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal
          order={items.length + 1}
          className="mt-6 rounded-core bg-surface-sunken p-8 lg:p-12"
        >
          <h3 className="text-heading text-ink">{t("extraTitle")}</h3>
          <p className="mt-3 max-w-3xl text-body-l text-ink-muted">
            {t("extraBody")}
          </p>
          <Link
            href="/demo"
            className="group mt-8 inline-flex items-center gap-2 text-body-s font-semibold text-brand-green"
          >
            {t("cta")}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
