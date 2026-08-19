import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Answer } from "@/components/console/answer";
import { QuestionBubble } from "@/components/console/question-bubble";
import { Recommendation } from "@/components/console/recommendation";
import { StreamInfo } from "@/components/console/stream-info";
import type { Scenario } from "@/components/console/types";

export async function BeaconHero() {
  const t = await getTranslations("beacon.hero");
  const c = await getTranslations("console");
  const scenario = (c.raw("scenarios") as Scenario[])[3];

  return (
    <section className="hero-band relative isolate overflow-hidden px-6 pt-32 pb-24 lg:px-12 lg:pt-40 lg:pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-display-xl text-ink">
            {t.rich("title", {
              accent: (chunks) => (
                <span className="text-brand-green italic">{chunks}</span>
              ),
            })}
          </h1>

          <p className="mt-6 max-w-xl text-body-l text-ink-muted">
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
              href="/beacon#como-funciona"
              className="group inline-flex items-center gap-2 rounded-lg border border-hairline px-4 py-2 text-body-s font-semibold text-ink transition-all duration-100 hover:bg-surface-sunken active:scale-[0.97]"
            >
              {t("secondary")}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-5 text-body-s text-ink-muted">{t("note")}</p>
        </div>

        <div className="min-w-0 rounded-bezel bg-surface-sunken p-1.5 shadow-ambient-lg ring-1 ring-hairline">
          <div className="flex flex-col gap-4 rounded-core bg-background p-6">
            <QuestionBubble>{scenario.question}</QuestionBubble>
            <StreamInfo text={c("ready")} done />
            <Answer answer={scenario.answer} delay={0} compact />
            <Recommendation text={scenario.recommendation} />
          </div>
        </div>
      </div>
    </section>
  );
}
