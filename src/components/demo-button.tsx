import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function DemoButton() {
  const t = await getTranslations("demo");

  return (
    <Link
      href="/demo"
      className="w-fit cursor-pointer rounded-lg bg-brand-green px-4 py-2 text-body-s font-semibold text-white transition-all duration-100 hover:bg-brand-green-dark active:scale-[0.97]"
    >
      {t("label")}
    </Link>
  );
}
