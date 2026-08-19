// Espeja la anatomía de una respuesta de wald-face: título, línea en negrita,
// tabla, alerta, conclusión y recomendación. Sin markdown en runtime: el
// contenido lo escribimos nosotros y viene estructurado.
import { Lightbulb } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FadeWords } from "./fade-words";
import type { Answer as AnswerData } from "./types";

interface AnswerProps {
  answer: AnswerData;
  recommendation: string;
  /** Segundo en el que arranca la respuesta dentro de la coreografía. */
  delay: number;
  /** En el hero la conclusión y la repregunta sobran: alargan de más la tarjeta. */
  compact?: boolean;
}

export async function Answer({
  answer,
  recommendation,
  delay,
  compact = false,
}: AnswerProps) {
  const t = await getTranslations("console");
  const { title, lead, table, alert, conclusion, followUp } = answer;

  return (
    <div className="flex flex-col gap-3">
      <h3
        className="fade-word border-b border-hairline pb-2 font-display text-heading text-ink"
        style={{ animationDelay: `${delay}s` }}
      >
        <FadeWords text={title} delay={delay} />
      </h3>

      <p className="text-body-s font-semibold text-ink">
        <FadeWords text={lead} delay={delay + 0.3} />
      </p>

      {table ? (
        <div
          className="fade-word -mx-1 overflow-x-auto"
          style={{ animationDelay: `${delay + 1.1}s` }}
        >
          <table className="w-full border-collapse text-code">
            <thead>
              <tr className="bg-surface-sunken text-left">
                {table.columns.map((column) => (
                  <th
                    key={column}
                    className="border border-hairline px-2.5 py-1.5 font-semibold text-ink"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={String(row[0])}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className="border border-hairline px-2.5 py-1.5 text-ink-text"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {alert ? (
        <div
          className="fade-word rounded-r-product border-l-4 border-brand-green bg-brand-green/5 py-2 pr-3 pl-4 text-body-s text-ink-text italic"
          style={{ animationDelay: `${delay + 1.5}s` }}
        >
          <p className="font-semibold text-ink">{alert.title}</p>
          <p className="mt-1">{alert.body}</p>
        </div>
      ) : null}

      {conclusion && !compact ? (
        <p className="text-body-s text-ink-text">
          <FadeWords text={conclusion} delay={delay + 1.9} />
        </p>
      ) : null}

      {followUp && !compact ? (
        <p
          className="fade-word text-body-s text-ink-muted"
          style={{ animationDelay: `${delay + 2.4}s` }}
        >
          {followUp}
        </p>
      ) : null}

      <div
        className="fade-word mt-2"
        style={{ animationDelay: `${delay + 2.7}s` }}
      >
        <span className="-mx-2 inline-flex items-center gap-2.5 rounded-full bg-brand-green-tint px-2.5 py-1 text-body-s">
          <span className="inline-flex size-6 items-center justify-center rounded-full text-brand-green">
            <Lightbulb className="size-3.5" />
          </span>
          <span className="font-medium text-brand-green">
            {t("recommendation")}
          </span>
        </span>
        <p className="mt-3 ml-3 border-l-2 border-brand-green/70 py-1 pl-5 text-body-s text-ink-text">
          <FadeWords text={recommendation} delay={delay + 2.9} />
        </p>
      </div>
    </div>
  );
}
