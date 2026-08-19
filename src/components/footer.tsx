import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitch from "./language-switch";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("footer");
  const h = await getTranslations("header");

  const columns = [
    {
      heading: t("product"),
      links: [
        { href: "/beacon", label: h("beacon") },
        { href: "/enterprise", label: h("enterprise") },
        { href: "/#use-cases", label: t("useCases") },
      ],
    },
    {
      heading: t("company"),
      links: [
        { href: "/#mission", label: t("about") },
        { href: "/#team", label: t("team") },
        { href: "/careers/", label: t("careers") },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:px-12">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-8">
            <Link href="/#home" className="mb-5 flex items-center">
              <Image
                src="/logo.png"
                alt="Nivii"
                className="h-6 w-auto"
                width={114}
                height={32}
              />
            </Link>
            <p className="text-body-s text-ink-muted">{t("description")}</p>
          </div>

          {columns.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="mb-5 font-sans text-eyebrow font-medium text-ink-muted uppercase">
                {heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-body-s text-ink-muted transition-colors duration-200 hover:text-ink"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-5 font-sans text-eyebrow font-medium text-ink-muted uppercase">
              {t("getInTouch")}
            </h3>
            <ul className="flex flex-col gap-3 text-body-s text-ink-muted">
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="transition-colors duration-200 hover:text-ink"
                >
                  {t("email")}
                </a>
              </li>
              <li>
                <a
                  href={t("linkedin")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-ink"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={t("youtube")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-ink"
                >
                  YouTube
                </a>
              </li>
              <li>{t("location")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-center justify-between gap-4 border-t border-hairline pt-8 md:flex-row">
          <p className="text-body-s text-ink-muted">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <LanguageSwitch locale={locale} />
        </div>
      </div>
    </footer>
  );
}
