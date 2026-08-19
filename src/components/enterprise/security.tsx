import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function Security() {
  const t = await getTranslations("enterprise.security");
  const stats = t.raw("stats") as { value: string; description: string }[];
  const checklist = t.raw("checklist") as string[];

  return (
    <section
      id="seguridad"
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
          {stats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.value}
              order={i + 1}
              className="border-t border-panel-hairline pt-6"
            >
              <p className="font-display text-display-m text-brand-green">
                {stat.value}
              </p>
              <p className="mt-3 text-body-s text-panel-ink/60">
                {stat.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal order={stats.length + 1} className="mt-20">
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {checklist.map((item) => (
              <li
                key={item}
                className="border-t border-panel-hairline pt-4 text-body-s text-panel-ink/70"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
