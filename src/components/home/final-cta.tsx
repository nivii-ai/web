import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";
import { DemoButton } from "../demo-button";

export async function FinalCta() {
  const t = await getTranslations("home.cta");

  return (
    <section className="border-t border-hairline px-6 py-32 lg:px-12 lg:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-display-l text-ink">
          {t.rich("title", {
            accent: (chunks) => (
              <span className="text-brand-green italic">{chunks}</span>
            ),
          })}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-muted">
          {t("description")}
        </p>

        <div className="mt-10 flex justify-center">
          <DemoButton />
        </div>

        <Link
          href="/enterprise/#seguridad"
          className="group mt-8 inline-flex items-center gap-2 text-body-s text-ink-muted transition-colors hover:text-ink"
        >
          {t("secondary")}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </section>
  );
}
