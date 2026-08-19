import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";

export async function Audience() {
  const t = await getTranslations("beacon.audience");
  const groups = t.raw("groups") as { title: string; items: string[] }[];

  return (
    <section
      id="para-quien"
      className="scroll-m-28 border-t border-hairline bg-surface-sunken px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {groups.map((group, i) => (
            <Reveal
              key={group.title}
              order={i + 1}
              className="rounded-core bg-background p-8 ring-1 ring-hairline lg:p-10"
            >
              <h3 className="text-heading text-ink">{group.title}</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-body-s text-ink-muted"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
