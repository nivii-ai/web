import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getMessages, getTranslations } from "next-intl/server";

export default async function Career() {
  const t = await getTranslations("careers");
  const messages = await getMessages();

  const openPositions = messages?.careers?.positions?.openPositions || [];

  const hasOpenPositions = openPositions.length > 0;

  return (
    <>
      <section className="pb-20 pt-[152px] md:pb-32 md:pt-[200px]">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
            {t("title")}{" "}
            <span className="text-brand-green">{t("titleHighlight")}</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="pt-20 pb-40 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t("openPositions")}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t("openPositionsDescription")}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {hasOpenPositions ? (
              openPositions.map((position: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 mb-6 bg-background shadow-sm flex flex-col"
                >
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {position.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{position.location}</p>
                  <Link
                    className="md:ms-auto"
                    href={`/careers/${position.slug}`}
                  >
                    <Button>{t("applyNow")}</Button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="w-2xl text-gray-500 text-center">
                {t("noPositions")}
              </p>
            )}
          </div>

          <div className="mt-16 text-center max-w-xl mx-auto">
            <p className="text-gray-700 mb-6">{t("generalApplication")}</p>
            <Link href="mailto:careers@nivii.ai?subject=General Application">
              <Button>{t("sendResumeLink")}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
