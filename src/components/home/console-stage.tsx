import { getTranslations } from "next-intl/server";
import { Answer } from "@/components/console/answer";
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
    <div className="min-w-0 lg:perspective-[1200px]">
      <div className="rounded-bezel bg-surface-sunken p-1.5 shadow-ambient-lg ring-1 ring-hairline lg:rotate-y-[-12deg] lg:shadow-tilt">
        <div className="flex min-h-[27rem] flex-col gap-4 rounded-core bg-background p-6">
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

          <Answer
            answer={scenario.answer}
            recommendation={scenario.recommendation}
            delay={answerAt}
            compact
          />
        </div>
      </div>
    </div>
  );
}
