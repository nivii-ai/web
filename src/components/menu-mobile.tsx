"use client";
import { useState } from "react";
import Link from "next/link";
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
        <span
          className={`block h-0.5 bg-gray-600 transition-transform duration-300 ease-in-out rounded-2xl ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 bg-gray-600 transition-opacity duration-300 ease-in-out rounded-2xl ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
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
        <div className="space-y-4 px-6 pt-2 pb-4">
          <Link
            href="#product"
            className="block text-gray-600 hover:text-brand-green"
          >
            {t("product")}
          </Link>
          <Link
            href="#use-cases"
            className="block text-gray-600 hover:text-brand-green"
          >
            {t("useCases")}
          </Link>
          <Link
            href="#faq"
            className="block text-gray-600 hover:text-brand-green"
          >
            {t("faq")}
          </Link>
          <Link
            href="#about"
            className="block text-gray-600 hover:text-brand-green"
          >
            {t("about")}
          </Link>
          <Link
            href="#team"
            className="block text-gray-600 hover:text-brand-green"
          >
            {t("team")}
          </Link>
          <Link
            href="#careers"
            className="block text-gray-600 hover:text-brand-green"
          >
            {t("careers")}
          </Link>
          <DemoButton />
        </div>
      </div>
    </>
  );
}
