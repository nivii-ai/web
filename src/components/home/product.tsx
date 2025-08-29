import { getTranslations } from "next-intl/server";
import { ProductCard } from "../ui/product-card";
import { BotMessageSquare, ChartPie, Clock, Lock } from "lucide-react";
import * as motion from "motion/react-client";

export async function Product() {
  const t = await getTranslations("home.product");

  const productFeatures = [
    {
      icon: <Lock className="size-10" />,
      title: t("securelyConnected"),
      description: t("securelyConnectedDescription"),
    },
    {
      icon: <ChartPie className="size-10" />,
      title: t("knowsYourBusiness"),
      description: t("knowsYourBusinessDescription"),
    },
    {
      icon: <Clock className="size-10" />,
      title: t("fromWeeksToMinutes"),
      description: t("fromWeeksToMinutesDescription"),
    },
    {
      icon: <BotMessageSquare className="size-10" />,
      title: t("aiPoweredConversations"),
      description: t("aiPoweredConversationsDescription"),
    },
  ];

  return (
    <section id="product" className="py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-balance text-3xl font-bold lg:text-4xl mb-6">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-700 mb-12  max-w-2xl mx-auto">
          {t("description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:max-lg:max-w-2xl mx-auto">
          {productFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ProductCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
