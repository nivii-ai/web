import { getTranslations } from "next-intl/server";
import { Answer } from "@/components/console/answer";
import { QuestionBubble } from "@/components/console/question-bubble";
import { Recommendation } from "@/components/console/recommendation";
import { PreparationPanel } from "@/components/console/preparation-panel";
import { StreamInfo } from "@/components/console/stream-info";
import type { Scenario } from "@/components/console/types";
import { Reveal } from "@/components/ui/reveal";
import { TimelineSteps } from "./timeline-steps";

export async function HowItWorks() {
  const t = await getTranslations("home.howItWorks");
  const c = await getTranslations("console");
  const scenario = (c.raw("scenarios") as Scenario[])[1];
  // El título se resuelve acá para que pueda llevar acento; la cinta es cliente
  // y sólo recibe el nodo ya armado.
  const steps = (
    t.raw("steps") as { title: string; description: string }[]
  ).map((step, i) => ({
    description: step.description,
    title: t.rich(`steps.${i}.title`, {
      accent: (chunks) => <span className="text-brand-green">{chunks}</span>,
    }),
  }));

  // Una pieza por paso: se acumulan, no se rearman.
  const pieces = [
    <div key="question" className="fade-word">
      <QuestionBubble>{scenario.question}</QuestionBubble>
    </div>,
    <StreamInfo
      key="searching"
      className="fade-word"
      text={scenario.queries[0].question}
    />,
    <Answer key="answer" answer={scenario.answer} delay={0} compact />,
    <Recommendation key="recommendation" text={scenario.recommendation} />,
  ];

  return (
    <section
      id="how-it-works"
      className="scroll-m-28 overflow-x-clip bg-surface-sunken px-6 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-display-l text-ink">{t("title")}</h2>
          <p className="mt-5 text-body-l text-ink-muted">{t("description")}</p>
        </Reveal>

        <TimelineSteps
          steps={steps}
          pieces={pieces}
          preparation={<PreparationPanel />}
          readyLine={
            <StreamInfo
              key="ready"
              className="fade-word"
              text={c("ready")}
              done
            />
          }
        />
      </div>
    </section>
  );
}
