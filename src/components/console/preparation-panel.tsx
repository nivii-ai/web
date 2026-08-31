import { getTranslations } from "next-intl/server";
import { Stat } from "@/components/home/stat";

type Source = { name: string; detail: string };
type PrepStat = { value: string; label: string };

/** El paso previo a la conversación: la pantalla en modo "preparando datos". */
export async function PreparationPanel() {
  const t = await getTranslations("console.preparation");
  const sources = t.raw("sources") as Source[];
  const stats = t.raw("stats") as PrepStat[];

  return (
    <div className="flex flex-col gap-6">
      <p className="text-code font-medium text-ink">{t("title")}</p>

      <ul className="flex flex-col gap-4">
        {sources.map((source) => (
          <li key={source.name} className="flex gap-3">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-green" />
            <span>
              <span className="block text-body-s text-ink">{source.name}</span>
              <span className="tabular mt-0.5 block text-code text-ink-muted">
                {source.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col gap-5 border-t border-hairline pt-6">
        {stats.map((stat) => (
          <li key={stat.label} className="flex items-baseline gap-4">
            <Stat value={stat.value} />
            <span className="text-body-s text-ink-muted">{stat.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
