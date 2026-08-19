import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DemoButton } from "../demo-button";
import { ConsoleStage } from "./console-stage";
import { HeroMotif } from "./hero-motif";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section
      id="home"
      className="hero-band relative isolate scroll-m-28 overflow-hidden px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-28"
    >
      <HeroMotif />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-display-xl">
            {t("title")}
            <span className="block text-brand-green">{t("subtitle")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-body-l text-ink-muted">
            {t("description")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <DemoButton />
            <Link
              href="/#use-cases"
              className="rounded-lg border border-hairline px-4 py-2 text-body-s font-semibold text-ink transition-all duration-100 hover:bg-surface-sunken active:scale-[0.97]"
            >
              {t("seeUseCases")}
            </Link>
          </div>
        </div>

        <ConsoleStage />
      </div>
    </section>
  );
}
