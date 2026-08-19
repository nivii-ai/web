import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Answer } from "@/components/console/answer";
import { ConsoleChoreography } from "@/components/console/console-choreography";
import { ConsoleShell } from "@/components/console/console-shell";
import { QuestionBubble } from "@/components/console/question-bubble";
import { Recommendation } from "@/components/console/recommendation";
import { StreamInfo } from "@/components/console/stream-info";
import type { Scenario } from "@/components/console/types";

const QUESTION_AT = 0.2;
const INFO_AT = 0.9;
const INFO_STEP = 1.5;

export async function EnterpriseHero() {
  const t = await getTranslations("enterprise.hero");
  const c = await getTranslations("console");
  const scenario = (c.raw("scenarios") as Scenario[])[2];
  const answerAt = INFO_AT + scenario.queries.length * INFO_STEP;
  const sectors = t.raw("sectors") as string[];

  return (
    <section className="px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-display-xl text-panel-ink">
              {t.rich("title", {
                accent: (chunks) => (
                  <span className="text-brand-green italic">{chunks}</span>
                ),
              })}
            </h1>

            <p className="mt-6 max-w-xl text-body-l text-panel-ink/70">
              {t("description")}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="rounded-lg bg-brand-green px-4 py-2 text-body-s font-semibold text-white transition-all duration-100 hover:bg-brand-green-dark active:scale-[0.97]"
              >
                {t("cta")}
              </Link>
              <Link
                href="/enterprise#seguridad"
                className="group inline-flex items-center gap-2 rounded-lg border border-panel-hairline px-4 py-2 text-body-s font-semibold text-panel-ink transition-all duration-100 hover:bg-white/5 active:scale-[0.97]"
              >
                {t("secondary")}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="mt-5 text-body-s text-panel-ink/60">{t("note")}</p>

            <p className="mt-8 text-body-s text-panel-ink/60">
              {sectors.join(" · ")}
            </p>
          </div>

          {/* La UI clara del producto flotando sobre el panel, como en el banner. */}
          <div className="min-w-0 lg:perspective-[1200px]">
            <ConsoleChoreography>
              <ConsoleShell tone="dark" className="lg:rotate-y-[-12deg]">
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
                      style={{ animationDelay: `${INFO_AT + i * INFO_STEP}s` }}
                    />
                  ))}
                </div>

                <Answer answer={scenario.answer} delay={answerAt} compact />
                <Recommendation
                  text={scenario.recommendation}
                  delay={answerAt + 3.2}
                />
              </ConsoleShell>
            </ConsoleChoreography>
          </div>
        </div>
      </div>
    </section>
  );
}
