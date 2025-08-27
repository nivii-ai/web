import { cn } from "@/lib/utils";
import { getMessages, getTranslations } from "next-intl/server";

export async function Mission() {
  const t = await getTranslations("home.mission");
  const messages = await getMessages();
  console.log("🚀 ~ Mission ~ messages:", messages);

  const missionDescription = messages.home.mission.description as string[];

  return (
    <section id="mission" className="py-32">
      <div className=" relative max-w-3xl mx-auto px-6">
        <div className="absolute opacity-5 top-20 -left-44 bg-[url('/goal.svg')] bg-no-repeat bg-contain w-2xl h-full" />
        <div className="text-left mx-auto mb-16">
          <h2 className="text-balance text-3xl font-bold lg:text-5xl tracking-tight text-brand-green">
            {t("title")}
          </h2>
          <div>
            {missionDescription.map((paragraph, index) => (
              <p
                key={index}
                className={cn(
                  "mt-6 font-medium text-xl text-gray-700 leading-relaxed",
                  {
                    "font-bold": index === missionDescription.length - 1,
                  }
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
