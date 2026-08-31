import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { Stat } from "./stat";

type Case = { stat?: string; title: string; description: string };

export async function UseCases() {
  const t = await getTranslations("home.useCases");
  const cases = t.raw("cases") as Case[];

  return (
    <section id="use-cases" className="scroll-m-28 px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-display-l text-ink">
            {t.rich("title", {
              accent: (chunks) => (
                <span className="text-brand-green-dark">{chunks}</span>
              ),
            })}
          </h2>
          <p className="mt-5 text-body-l text-ink-muted">{t("description")}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <Reveal
            className="rounded-bezel bg-brand-green-tint p-8 lg:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-center lg:p-12"
            order={0}
          >
            <h3 className="max-w-xl text-display-m text-ink">
              {t("cleaning.title")}
            </h3>
            <p className="mt-5 max-w-xl text-body-l text-ink-text">
              {t("cleaning.description")}
            </p>
          </Reveal>

          {cases.map((item, i) => (
            <Reveal
              key={item.title}
              className="flex flex-col rounded-bezel border border-hairline p-8"
              order={i + 1}
            >
              {item.stat ? (
                <Stat value={item.stat} />
              ) : (
                // Reserva el renglón del número para que las tarjetas alineen.
                <span aria-hidden className="block font-display text-display-m">
                  &nbsp;
                </span>
              )}
              <h3 className="mt-4 text-heading text-ink">{item.title}</h3>
              <p className="mt-2 text-body-s text-ink-muted">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
