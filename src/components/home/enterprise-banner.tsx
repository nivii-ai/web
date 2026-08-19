import { ArrowRight, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Answer } from "@/components/console/answer";
import { QuestionBubble } from "@/components/console/question-bubble";
import { StreamInfo } from "@/components/console/stream-info";
import type { Scenario } from "@/components/console/types";
import { DemoButton } from "../demo-button";
import { Reveal } from "@/components/ui/reveal";

export async function EnterpriseBanner() {
  const t = await getTranslations("home.enterprise");
  const c = await getTranslations("console");
  const scenario = (c.raw("scenarios") as Scenario[])[2];

  return (
    <section className="bg-panel px-6 py-24 text-panel-ink lg:px-12 lg:py-32">
      <Reveal className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-eyebrow font-medium text-panel-ink uppercase">
            <ShieldCheck className="size-3.5" />
            {t("eyebrow")}
          </span>

          <h2 className="mt-6 text-display-l text-panel-ink">
            {t.rich("title", {
              accent: (chunks) => (
                <span className="text-brand-green">{chunks}</span>
              ),
            })}
          </h2>

          <p className="mt-6 max-w-xl text-body-l text-panel-ink/70">
            {t("description")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <DemoButton />
            <Link
              href="/enterprise"
              className="group inline-flex items-center gap-2 rounded-lg border border-panel-hairline px-4 py-2 text-body-s font-semibold text-panel-ink transition-all duration-100 hover:bg-white/5 active:scale-[0.97]"
            >
              {t("cta")}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* La UI clara del producto flotando sobre el panel. */}
        <div className="lg:perspective-[1200px]">
          <div className="rounded-bezel bg-white/10 p-1.5 ring-1 ring-panel-hairline lg:rotate-y-[12deg]">
            <div className="flex flex-col gap-4 rounded-core bg-background p-6">
              <span className="flex w-fit items-center gap-2 rounded-full bg-brand-green-tint px-2.5 py-1 text-code font-medium text-brand-green-dark">
                <ShieldCheck className="size-3.5" />
                {t("cardLabel")}
              </span>
              <QuestionBubble>{scenario.question}</QuestionBubble>
              <StreamInfo text={c("ready")} done />
              <Answer answer={scenario.answer} delay={0} compact />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
