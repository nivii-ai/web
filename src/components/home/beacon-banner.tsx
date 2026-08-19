import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Answer } from "@/components/console/answer";
import { QuestionBubble } from "@/components/console/question-bubble";
import { StreamInfo } from "@/components/console/stream-info";
import type { Scenario } from "@/components/console/types";
import { Reveal } from "@/components/ui/reveal";

export async function BeaconBanner() {
  const t = await getTranslations("home.beacon");
  const c = await getTranslations("console");
  const scenario = (c.raw("scenarios") as Scenario[])[3];

  return (
    <section className="bg-brand-green-tint px-6 py-24 lg:px-12 lg:py-32">
      <Reveal className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Espejo del banner de Enterprise: acá la consola va a la izquierda. */}
        <div className="lg:order-first lg:perspective-[1200px]">
          <div className="rounded-bezel bg-white/60 p-1.5 shadow-ambient-lg ring-1 ring-white lg:rotate-y-[-12deg]">
            <div className="flex flex-col gap-4 rounded-core bg-background p-6">
              <QuestionBubble>{scenario.question}</QuestionBubble>
              <StreamInfo text={c("ready")} done />
              <Answer answer={scenario.answer} delay={0} compact />
            </div>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-eyebrow font-medium text-brand-green-dark uppercase">
            {t("eyebrow")}
          </span>

          <h2 className="mt-6 text-display-l text-ink">
            {t.rich("title", {
              accent: (chunks) => (
                <span className="text-brand-green">{chunks}</span>
              ),
            })}
          </h2>

          <p className="mt-6 max-w-xl text-body-l text-ink-text">
            {t("description")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/beacon#piloto"
              className="rounded-lg bg-brand-green px-4 py-2 text-body-s font-semibold text-white transition-all duration-100 hover:bg-brand-green-dark active:scale-[0.97]"
            >
              {t("cta")}
            </Link>
            <Link
              href="/beacon"
              className="group inline-flex items-center gap-2 rounded-lg border border-brand-green/25 px-4 py-2 text-body-s font-semibold text-ink transition-all duration-100 hover:bg-white/60 active:scale-[0.97]"
            >
              {t("secondary")}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-4 text-body-s text-ink-muted">{t("note")}</p>
        </div>
      </Reveal>
    </section>
  );
}
