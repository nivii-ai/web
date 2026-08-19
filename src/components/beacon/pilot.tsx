import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";

export async function Pilot() {
  const t = await getTranslations("beacon.pilot");
  const steps = t.raw("steps") as { title: string; description: string }[];

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

        <ol className="max-w-3xl">
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
      </div>
    </section>
  );
}
