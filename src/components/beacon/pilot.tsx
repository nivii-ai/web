import { getTranslations } from "next-intl/server";
import { Answer } from "@/components/console/answer";
import { ConsoleChoreography } from "@/components/console/console-choreography";
import { ConsoleShell } from "@/components/console/console-shell";
import { QuestionBubble } from "@/components/console/question-bubble";
import { Recommendation } from "@/components/console/recommendation";
import { StreamInfo } from "@/components/console/stream-info";
import type { Scenario } from "@/components/console/types";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const QUESTION_AT = 0.2;
const INFO_AT = 0.9;
const INFO_STEP = 1.5;

export async function Pilot() {
  const t = await getTranslations("beacon.pilot");
  const c = await getTranslations("console");
  const steps = t.raw("steps") as { title: string; description: string }[];
  const scenario = (c.raw("scenarios") as Scenario[]).find(
    (item) => item.id === "stock-inmovilizado",
  );
  const answerAt = scenario ? INFO_AT + scenario.queries.length * INFO_STEP : 0;

  return (
    <section
      id="piloto"
      className="scroll-m-28 border-t border-hairline px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t.rich("title", {
              accent: (chunks) => (
                <span className="text-brand-green italic">{chunks}</span>
              ),
            })}
            description={t("description")}
          />

          <Reveal order={1} className="mt-8 border-t border-hairline pt-6">
            <p className="text-body-s text-ink-muted">{t("terms")}</p>
          </Reveal>
        </div>

        <div className="max-w-3xl">
          <ol>
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                order={i + 2}
                className="relative border-t border-hairline py-8 ps-12 last:border-b"
              >
                <span
                  aria-hidden
                  className="absolute start-0 top-9 font-mono text-code text-ink-muted"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-heading text-ink">{step.title}</h3>
                <p className="mt-3 text-body-l text-ink-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>

          {scenario ? (
            <Reveal order={steps.length + 2} className="mt-14">
              <p className="text-eyebrow font-medium text-ink-muted uppercase">
                {t("consoleLabel")}
              </p>
              <ConsoleChoreography className="mt-6">
                <ConsoleShell>
                  <div
                    className="fade-word"
                    style={{ animationDelay: `${QUESTION_AT}s` }}
                  >
                    <QuestionBubble>{scenario.question}</QuestionBubble>
                  </div>

                  <div className="relative h-5">
                    {scenario.queries.map((query, i) => (
                      <StreamInfo
                        key={query.question}
                        text={query.question}
                        className="console-info absolute inset-x-0 top-0"
                        style={{
                          animationDelay: `${INFO_AT + i * INFO_STEP}s`,
                        }}
                      />
                    ))}
                  </div>

                  <Answer answer={scenario.answer} delay={answerAt} />
                  <Recommendation
                    text={scenario.recommendation}
                    delay={answerAt + 3.2}
                  />
                </ConsoleShell>
              </ConsoleChoreography>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
