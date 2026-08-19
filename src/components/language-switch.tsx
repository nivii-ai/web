"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { ChevronDown, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LanguageSwitch({ locale }: { locale?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("header.languageSelector");

  const handleLanguageChange = (locale: string) => {
    router.replace(pathname, { locale });
    router.refresh();
  };

  return (
    <div className="relative inline-flex items-center px-2">
      <Globe className="w-4 h-4 text-ink-muted mr-1.5 relative" />
      <select
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="appearance-none bg-transparent border-none text-body-s text-ink-muted focus:outline-none cursor-pointer min-w-10"
        defaultValue={locale}
        aria-label={t("label")}
      >
        <option value="en" aria-label={t("options.en")}>
          EN
        </option>
        <option value="es" aria-label={t("options.es")}>
          ES
        </option>
        <option value="pt" aria-label={t("options.pt")}>
          PT
        </option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 w-4 h-4 text-ink-muted" />
    </div>
  );
}
