import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { UseCaseCard } from "../ui/use-case-card";
import {
  Briefcase,
  ChartScatter,
  Factory,
  Landmark,
  Users,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export async function UseCases() {
  const t = await getTranslations("home.useCases");
  const locale = (await getLocale()) || "en";

  const useCases = [
    {
      icon: <ChartScatter className="size-5" />,
      title: t("marketing.title"),
      desc: t("marketing.description"),
      shortDesc: t("marketing.shortDescription"),
      img: `/marketing_${locale}.jpeg`,
      gridLayout: "col-span-3 col-start-3",
    },
    {
      icon: <Briefcase className="size-5" />,
      title: t("sales.title"),
      desc: t("sales.description"),
      shortDesc: t("sales.shortDescription"),
      img: `/sales_${locale}.jpeg`,
      gridLayout: "col-span-2 col-start-1 row-start-1",
    },
    {
      icon: <Factory className="size-5" />,
      title: t("operations.title"),
      desc: t("operations.description"),
      shortDesc: t("operations.shortDescription"),
      img: `/operations_${locale}.jpeg`,
      gridLayout: "col-span-2",
    },
    {
      icon: <Users className="size-5" />,
      title: t("hr.title"),
      desc: t("hr.description"),
      shortDesc: t("hr.shortDescription"),
      img: `/hr_${locale}.jpeg`,
      gridLayout: "col-span-3",
    },
    {
      icon: <Landmark className="size-5" />,
      title: t("finance.title"),
      desc: t("finance.description"),
      shortDesc: t("finance.shortDescription"),
      img: `/financial_${locale}.jpeg`,
      gridLayout: "col-span-4",
    },
  ];

  return (
    <section id="use-cases" className="relative py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mx-auto mb-16">
          <h2 className="text-balance text-3xl font-bold lg:text-4xl tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-pretty">
            {t("description")}
          </p>
        </div>

        <div className="relative grid grid-cols-7 auto-rows-[1fr] gap-4 max-w-4xl mx-auto">
          {useCases.map((item) => (
            <motion.div
              key={item.title}
              className={cn(
                "flex items-center justify-center w-full",
                item.gridLayout
              )}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8 }}
            >
              <UseCaseCard
                title={item.title}
                description={item.desc}
                shortDescription={item.shortDesc}
                image={item.img}
                icon={item.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
