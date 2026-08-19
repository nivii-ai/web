import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";

export async function BeaconCta() {
  const t = await getTranslations("beacon.cta");

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
          <Link
            href="/demo"
            className="rounded-lg bg-brand-green px-4 py-2 text-body-s font-semibold text-white transition-all duration-100 hover:bg-brand-green-dark active:scale-[0.97]"
          >
            {t("button")}
          </Link>
        </div>

        <p className="mx-auto mt-16 max-w-xl border-t border-hairline pt-10 text-body-s text-ink-muted">
          {t("bridge")}
        </p>
        <Link
          href="/enterprise"
          className="group mt-4 inline-flex items-center gap-2 text-body-s font-semibold text-ink transition-colors hover:text-brand-green"
        >
          {t("bridgeLink")}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </section>
  );
}
