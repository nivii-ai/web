import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { DemoButton } from "../demo-button";
import { HeroBackground } from "./hero-background";
import * as motion from "motion/react-client";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section
      id="home"
      className="min-h-[400px] pt-60 pb-24 relative backdrop-blur-xs"
    >
      <HeroBackground />
      <div className="mx-auto px-6 text-center flex items-center justify-center flex-col h-full backdrop-blur-3xl bg-background/50">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight"
        >
          <span>{t("title")}</span> <br className="hidden md:block" />
          <span className="text-brand-green text-nowrap">{t("subtitle")}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-gray-600"
        >
          {t("description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <DemoButton />
          <Link
            href="#use-cases"
            className="bg-white text-gray-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 border border-gray-300"
          >
            {t("seeUseCases")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
