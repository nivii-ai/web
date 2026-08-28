import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Step = { title: string; description: string };
type Phase = { label: string; steps: Step[]; terms: string[] };

export async function Product() {
  const t = await getTranslations("enterprise.product");
  const phases = t.raw("phases") as Phase[];

  return (
    <section
      id="product"
      className="scroll-m-28 border-t border-panel-hairline px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            accent: (chunks) => (
              <span className="text-brand-green italic">{chunks}</span>
            ),
          })}
          description={t("description")}
        />

        <div className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {phases.map((phase, phaseIndex) => {
            const firstStep = phases
              .slice(0, phaseIndex)
              .reduce((total, previous) => total + previous.steps.length, 0);
            // El tramo de producción es el que compromete: ahí la regla se tiñe.
            const committed = phaseIndex > 0;

            return (
              <Reveal key={phase.label} order={phaseIndex + 1}>
                <p className="text-eyebrow font-medium text-panel-ink/60 uppercase">
                  {phase.label}
                </p>

                {/* Sin separación horizontal: los borde-superior de cada paso se
                    encadenan y se leen como una sola regla de tiempo. */}
                <ol className="mt-6 grid gap-y-10 sm:grid-cols-3 sm:grid-rows-[auto_auto_1fr] sm:gap-y-0">
                  {phase.steps.map((step, i) => (
                    <li
                      key={step.title}
                      className={cn(
                        // subgrid alinea número, título y texto entre pasos
                        // aunque los títulos ocupen distinta cantidad de líneas.
                        "relative border-t pt-6 sm:row-span-3 sm:grid sm:grid-rows-subgrid sm:pe-6",
                        committed
                          ? "border-brand-green/60"
                          : "border-panel-hairline",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -top-1 start-0 size-2 rounded-full",
                          committed ? "bg-brand-green" : "bg-panel-ink/30",
                        )}
                      />
                      <p className="font-mono text-code font-medium text-brand-green">
                        {String(firstStep + i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-heading text-panel-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-body-s text-panel-ink/60">
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>

                <ul className="mt-10">
                  {phase.terms.map((term) => (
                    <li
                      key={term}
                      className="border-t border-panel-hairline py-3.5 text-body-s text-panel-ink/70"
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
