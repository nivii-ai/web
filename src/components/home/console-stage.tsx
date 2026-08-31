import { getTranslations } from "next-intl/server";
import { Answer } from "@/components/console/answer";
import { ConsoleShell } from "@/components/console/console-shell";
import { ParticleField } from "@/components/console/particle-field";
import { Recommendation } from "@/components/console/recommendation";
import { QuestionBubble } from "@/components/console/question-bubble";
import { StreamInfo } from "@/components/console/stream-info";
import type { Scenario } from "@/components/console/types";

const QUESTION_AT = 0.2;
const INFO_AT = 0.9;
const INFO_STEP = 1.5;

export async function ConsoleStage() {
  const t = await getTranslations("console");
  const [scenario] = t.raw("scenarios") as Scenario[];
  const answerAt = INFO_AT + scenario.queries.length * INFO_STEP;

  return (
    <div className="relative isolate min-w-0 lg:perspective-[1200px]">
      <ParticleField className="pointer-events-none absolute -inset-x-40 -inset-y-28 -z-10 h-[calc(100%+14rem)] w-[calc(100%+20rem)] [mask-image:radial-gradient(closest-side,black_55%,transparent)]" />
      <ConsoleShell className="lg:rotate-y-[-12deg] lg:shadow-tilt">
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

          <StreamInfo
            className="console-info absolute inset-x-0 top-0"
            style={{ animationDelay: `${answerAt}s` }}
            text={t("ready")}
            done
          />
        </div>

        <Answer answer={scenario.answer} delay={answerAt} compact />
        <Recommendation text={scenario.recommendation} delay={answerAt + 2.7} />
      </ConsoleShell>
    </div>
  );
}
