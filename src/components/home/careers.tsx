import { getTranslations } from "next-intl/server";
import { Button } from "../ui/button";
import Link from "next/link";

export async function Careers() {
  const t = await getTranslations("home.careers");

  return (
    <section id="careers" className="py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-balance text-3xl font-bold lg:text-4xl mb-6">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-700 mb-12 text-pretty max-w-xl mx-auto">
          {t("description")}
        </p>
        <Link href="/careers">
          <Button>{t("applyNow")}</Button>
        </Link>
      </div>
    </section>
  );
}
