import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export async function Faq() {
  const t = await getTranslations("enterprise.faq");
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <section
      id="faq"
      className="scroll-m-28 border-t border-panel-hairline px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-24">
        <SectionHeading
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t("title")}
          className="lg:sticky lg:top-32 lg:self-start"
        />

        <Reveal order={1}>
          <Accordion
            type="single"
            collapsible
            className="border-t border-panel-hairline"
          >
            {items.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="border-b-panel-hairline"
              >
                <AccordionTrigger className="py-6 text-body-l font-medium text-panel-ink [&>svg]:text-panel-ink/50">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-6 text-body-s text-panel-ink/60">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
