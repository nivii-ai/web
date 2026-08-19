import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

export async function Mission() {
  const t = await getTranslations("home.mission");
  const questions = t.raw("questions") as string[];

  return (
    <section
      id="mission"
      className="scroll-m-28 bg-surface-sunken px-6 py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-24">
        <p className="text-eyebrow font-medium text-ink-muted uppercase lg:sticky lg:top-32 lg:self-start">
          {t("label")}
        </p>

        <div className="max-w-3xl">
          <Reveal>
            <p className="text-display-m text-ink">{t("lead")}</p>
          </Reveal>

          <ul className="mt-12">
            {questions.map((question, i) => (
              <Reveal
                key={question}
                as="li"
                order={i + 1}
                className="border-t border-hairline py-6 text-body-l text-ink-muted"
              >
                {question}
              </Reveal>
            ))}
          </ul>

          <Reveal order={questions.length + 1} className="mt-16">
            <p className="text-display-l text-ink">
              {t.rich("close", {
                accent: (chunks) => (
                  <span className="text-brand-green italic">{chunks}</span>
                ),
              })}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
