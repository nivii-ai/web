import { getMessages, getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/acoordion";

type FaqItem = { question: string; answer: string };

export async function Faq() {
  const t = await getTranslations("home.faq");

  const messages = await getMessages();

  const faqItems = Object.values(messages.home.faq.faqs).map((value) => {
    const faq = value as FaqItem;
    return {
      question: faq.question,
      answer: faq.answer,
    };
  });

  return (
    <section
      id="faq"
      className="py-16 bg-gradient-to-b from-transparent to-brand-green/20"
    >
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-700 text-pretty">
            {t("description")}
          </p>
        </div>
        <div className="mx-auto border border-gray-200 bg-background px-6 py-2 rounded-lg shadow-md">
          <Accordion type="multiple" defaultValue={[faqItems[0].question]}>
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="pt-6 pb-4">
                  <h3 className="text-lg font-semibold text-foreground hover:underline-none">
                    {item.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mt-2 mb-8 text-gray-700 text-base">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
