import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DemoButton } from "./demo-button";
import { MenuMobile } from "./menu-mobile";
import * as motion from "motion/react-client";
import LanguageSwitch from "./language-switch";

export async function Header({ locale }: { locale: string }) {
  const t = await getTranslations("header");

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-lg fixed top-0 z-50 shadow-sm left-0 right-0"
    >
      <div className="container lg:max-w-7xl mx-auto px-6 py-6 flex justify-between items-center flex-wrap font-semibold">
        <Link href="/#home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Nivii"
            className="h-8 w-auto"
            width={114}
            height={32}
          />
        </Link>
        <nav className="hidden lg:flex space-x-8 items-center absolute left-1/2 -translate-x-1/2">
          <Link
            href="/#product"
            className="text-gray-600 hover:text-brand-green transition duration-300 font-medium"
          >
            {t("product")}
          </Link>
          <Link
            href="/#use-cases"
            className="text-gray-600 hover:text-brand-green transition duration-300 font-medium"
          >
            {t("useCases")}
          </Link>
          <Link
            href="/#faq"
            className="text-gray-600 hover:text-brand-green transition duration-300 font-medium"
          >
            {t("faq")}
          </Link>
          <Link
            href="/#mission"
            className="text-gray-600 hover:text-brand-green transition duration-300"
          >
            {t("about")}
          </Link>
          <Link
            href="/#team"
            className="text-gray-600 hover:text-brand-green transition duration-300 font-medium"
          >
            {t("team")}
          </Link>
          <Link
            href="/careers/"
            className="text-gray-600 hover:text-brand-green transition duration-300 font-medium"
          >
            {t("careers")}
          </Link>
        </nav>
        <div className="flex items-center gap-4 ms-auto lg:ms-0">
          <LanguageSwitch locale={locale} />
          <div className="hidden lg:block">
            <DemoButton />
          </div>
        </div>
        <MenuMobile />
      </div>
    </motion.header>
  );
}
