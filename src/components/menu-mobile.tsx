"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { DemoButton } from "./demo-button";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export function MenuMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("header");

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex flex-col justify-between w-10 h-8 lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer"
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
      >
        <div
          className={`block h-0.5 bg-gray-600 transition-transform duration-300 ease-in-out rounded-2xl w-full ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <div
          className={`block h-0.5 bg-gray-600 transition-opacity duration-300 ease-in-out rounded-2xl w-full ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`block h-0.5 bg-gray-600 transition-transform duration-300 ease-in-out rounded-2xl ms-auto ${
            isOpen ? "-rotate-45 -translate-y-[6px] w-full " : "w-6/8"
          }`}
        />
      </button>
      <div
        className={clsx(
          "lg:hidden text-center basis-full transition-[max-height] duration-700 overflow-hidden",
          isOpen ? "max-h-[500px]" : "max-h-0"
        )}
        aria-hidden={!isOpen}
      >
        <div className="space-y-4 px-6 pt-6 pb-4 flex flex-col gap-4 items-center">
          <Link
            href="#product"
            className="block text-gray-600 hover:text-brand-green"
            onNavigate={() => setIsOpen(false)}
          >
            {t("product")}
          </Link>
          <Link
            href="#use-cases"
            className="block text-gray-600 hover:text-brand-green"
            onNavigate={() => setIsOpen(false)}
          >
            {t("useCases")}
          </Link>
          <Link
            href="#faq"
            className="block text-gray-600 hover:text-brand-green"
            onNavigate={() => setIsOpen(false)}
          >
            {t("faq")}
          </Link>
          <Link
            href="#about"
            className="block text-gray-600 hover:text-brand-green"
            onNavigate={() => setIsOpen(false)}
          >
            {t("about")}
          </Link>
          <Link
            href="#team"
            className="block text-gray-600 hover:text-brand-green"
            onNavigate={() => setIsOpen(false)}
          >
            {t("team")}
          </Link>
          <Link
            href="#careers"
            className="block text-gray-600 hover:text-brand-green"
            onNavigate={() => setIsOpen(false)}
          >
            {t("careers")}
          </Link>
          <DemoButton />
        </div>
      </div>
    </>
  );
}
