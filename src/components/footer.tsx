import { ArrowRight, Linkedin, Mail, MapPin, Youtube } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          <div className="lg:col-span-1">
            <Link href="/#home" className="flex items-center mb-8">
              <Image
                src="/logo.png"
                alt="Nivii"
                className="h-8 w-auto"
                width={114}
                height={32}
              />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-9">{t("product")}</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/#product"
                  className="text-gray-400 hover:text-brand-green transition-colors flex items-center gap-2 group"
                >
                  {t("product")}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#use-cases"
                  className="text-gray-400 hover:text-brand-green transition-colors flex items-center gap-2 group"
                >
                  {t("useCases")}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-gray-400 hover:text-brand-green transition-colors flex items-center gap-2 group"
                >
                  {t("faq")}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-9">{t("company")}</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/#mission"
                  className="text-gray-400 hover:text-brand-green transition-colors flex items-center gap-2 group"
                >
                  {t("about")}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#team"
                  className="text-gray-400 hover:text-brand-green transition-colors flex items-center gap-2 group"
                >
                  {t("team")}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link
                  href="/careers/"
                  className="text-gray-400 hover:text-brand-green transition-colors flex items-center gap-2 group"
                >
                  {t("careers")}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t("getInTouch")}</h3>
            <div className="flex items-center gap-3 mb-4">
              <Link
                href={`mailto:${t("email")}`}
                aria-label={t("email")}
                className="w-8 h-8 bg-gray-800 hover:bg-brand-green-dark rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-background"
              >
                <Mail className="w-4 h-4" />
              </Link>
              <Link
                href={t("linkedin")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 bg-gray-800 hover:bg-brand-green-dark rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-background"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href={t("youtube")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 bg-gray-800 hover:bg-brand-green-dark rounded-lg flex items-center justify-center transition-colors text-gray-400 hover:text-background"
              >
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
            <div className="text-gray-400 flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-background">
                <MapPin className="w-4 h-4" />
              </div>
              {t("location")}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              {t("copyright", { year: new Date().getFullYear() })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
