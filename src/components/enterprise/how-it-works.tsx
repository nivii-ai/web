import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Step = { when: string; description: string };

/** El corte entre las dos fases se marca en la propia lista, no al costado. */
const PHASE_AT: Record<number, string> = {
  0: "phasePilot",
  3: "phaseProduction",
};

export async function HowItWorks() {
  const t = await getTranslations("enterprise.howItWorks");
  const steps = t.raw("steps") as Step[];
  const modelItems = t.raw("modelItems") as string[];

  return (
    <section
      id="como-funciona"
      className="scroll-m-28 border-t border-panel-hairline px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            tone="dark"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </div>

        <div className="max-w-3xl">
          <ol>
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.when}
                order={i + 2}
                className="grid gap-2 border-t border-panel-hairline py-7 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-8"
              >
                {PHASE_AT[i] ? (
                  <p className="text-eyebrow font-medium text-panel-ink/60 uppercase lg:col-span-2">
                    {t(PHASE_AT[i])}
                  </p>
                ) : null}
                <p className="font-mono text-code text-brand-green">
                  {step.when}
                </p>
                <p className="text-body-l text-panel-ink/70">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal
            order={steps.length + 2}
            className="mt-14 rounded-core border border-panel-hairline p-8 lg:p-10"
          >
            <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
              <p className="font-display text-display-m whitespace-nowrap text-brand-green">
                {t("roiStat")}
              </p>
              <div>
                <h3 className="text-heading text-panel-ink">{t("roiTitle")}</h3>
                <p className="mt-3 text-body-s text-panel-ink/60">
                  {t("roiBody")}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal order={steps.length + 3} className="mt-10">
            <h3 className="text-eyebrow font-medium text-panel-ink/60 uppercase">
              {t("modelTitle")}
            </h3>
            <ul className="mt-5">
              {modelItems.map((item) => (
                <li
                  key={item}
                  className="border-t border-panel-hairline py-4 text-body-s text-panel-ink/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
