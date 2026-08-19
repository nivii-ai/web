import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DemoButton } from "./demo-button";
import { MenuMobile } from "./menu-mobile";
import { ProductsMenu } from "./products-menu";
import LanguageSwitch from "./language-switch";

const links = [
  { href: "/#use-cases", key: "useCases" },
  { href: "/#team", key: "team" },
  { href: "/careers/", key: "careers" },
] as const;

export async function Header({ locale }: { locale: string }) {
  const t = await getTranslations("header");

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 px-6 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center">
        <Link
          href="/#home"
          className="relative z-50 mr-auto flex items-center transition-transform duration-100 active:scale-[0.97]"
        >
          <Image
            src="/logo.png"
            alt={t("logo")}
            className="h-6 w-auto"
            width={114}
            height={32}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <ProductsMenu />
          {links.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="rounded-md px-3 py-2 text-body-s font-medium text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <span
          aria-hidden
          className="mx-4 hidden h-4 w-px bg-hairline lg:block"
        />

        <div className="relative z-50 ml-auto flex items-center gap-3 lg:ml-0">
          <LanguageSwitch locale={locale} />
          <div className="hidden lg:block">
            <DemoButton />
          </div>
        </div>

        <MenuMobile />
      </div>
    </header>
  );
}
