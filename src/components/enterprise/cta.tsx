import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";

export async function EnterpriseCta() {
  const t = await getTranslations("enterprise.cta");

  return (
    <section className="border-t border-panel-hairline px-6 py-32 lg:px-12 lg:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-display-l text-panel-ink">
          {t.rich("title", {
            accent: (chunks) => (
              <span className="text-brand-green italic">{chunks}</span>
            ),
          })}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-body-l text-panel-ink/70">
          {t("description")}
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/demo"
            className="rounded-lg bg-brand-green px-4 py-2 text-body-s font-semibold text-white transition-all duration-100 hover:bg-brand-green-dark active:scale-[0.97]"
          >
            {t("button")}
          </Link>
        </div>
      </Reveal>

    </section>
  );
}
