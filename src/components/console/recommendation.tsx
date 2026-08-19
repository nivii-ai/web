import { Lightbulb } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FadeWords } from "./fade-words";

// Espeja recommendation-callout.tsx de wald-face: chip pill y el contenido citado.
export async function Recommendation({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const t = await getTranslations("console");

  return (
    <div className="fade-word mt-2" style={{ animationDelay: `${delay}s` }}>
      <span className="-mx-2 inline-flex items-center gap-2.5 rounded-full bg-brand-green-tint px-2.5 py-1 text-body-s">
        <span className="inline-flex size-6 items-center justify-center rounded-full text-brand-green">
          <Lightbulb className="size-3.5" />
        </span>
        <span className="font-medium text-brand-green">
          {t("recommendation")}
        </span>
      </span>
      <p className="mt-3 ml-3 border-l-2 border-brand-green/70 py-1 pl-5 text-body-s text-ink-text">
        <FadeWords text={text} delay={delay + 0.2} />
      </p>
    </div>
  );
}
