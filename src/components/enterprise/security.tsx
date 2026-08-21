import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function Security() {
  const t = await getTranslations("enterprise.security");
  const stats = t.raw("stats") as { value: string; description: string }[];
  const controls = t.raw("controls") as { title: string; description: string }[];
  const onRequest = t.raw("onRequest.items") as string[];

  return (
    <section
      id="security"
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

        <Reveal
          order={stats.length + 1}
          className="mt-20 rounded-bezel bg-white/[0.04] p-8 lg:p-12"
        >
          <h3 className="max-w-2xl text-display-m text-panel-ink">
            {t("egress.title")}
          </h3>
          <p className="mt-5 max-w-3xl text-body-l text-panel-ink/70">
            {t("egress.description")}
          </p>
          <p className="mt-4 max-w-3xl text-body-s text-panel-ink/50">
            {t("egress.note")}
          </p>
        </Reveal>

        <ul className="mt-20 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {controls.map((control, i) => (
            <Reveal
              as="li"
              key={control.title}
              order={stats.length + 2 + i}
              className="border-t border-panel-hairline pt-6"
            >
              <h3 className="text-heading text-panel-ink">{control.title}</h3>
              <p className="mt-3 text-body-s text-panel-ink/60">
                {control.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal
          order={stats.length + controls.length + 2}
          className="mt-16 border-t border-panel-hairline pt-6"
        >
          <p className="text-body-s text-panel-ink/50">
            <span className="text-panel-ink/70">{t("onRequest.label")}</span>{" "}
            {onRequest.join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
