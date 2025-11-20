import { getMessages, getTranslations } from "next-intl/server";
import * as motion from "motion/react-client";
import Image from "next/image";
import { cn } from "@/lib/utils";

export async function Team() {
  const t = await getTranslations("home.team");
  const messages = await getMessages();
  const members = messages.home.team.members as {
    name: string;
    photo: string;
    role: string;
    bio: string[];
    linkedin?: string;
  }[];
  return (
    <section id="team" className="py-16 scroll-m-28">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-balance text-3xl font-bold lg:text-4xl mb-6">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-700 mb-12  max-w-2xl mx-auto">
          {t("description")}
        </p>
        <div className="grid grid-cols-1 grid-flow-row-dense md:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-16">
          {members.map((member, index) => {
            const CardWrapper = member.linkedin ? "a" : "div";
            const cardProps = member.linkedin
              ? {
                  href: member.linkedin,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.2 * index,
                }}
                key={member.name}
                className={cn(
                  "w-full mx-auto md:mx-0 flex-shrink-0 flex max-w-sm h-full",
                  index % 2 === 0
                    ? "md:justify-self-end"
                    : "md:justify-self-start"
                )}
              >
                <CardWrapper
                  {...cardProps}
                  className={`group bg-white rounded-3xl p-6 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col h-full min-h-[450px] ${
                    member.linkedin ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="relative mb-6">
                    <div className="w-40 h-40 mx-auto rounded-full overflow-hidden ring-3 ring-brand-green group-hover:ring-brand-green-dark transition-all">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={250}
                        height={250}
                      />
                    </div>
                  </div>

                  <div className="text-center flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-brand-green font-bold mb-4">
                      {member.role}
                    </p>
                    <ul className="text-gray-600 text-sm leading-relaxed text-left mb-2 flex flex-col gap-2 flex-grow">
                      {member.bio.map((paragraph, index) => (
                        <li key={index}>{paragraph}</li>
                      ))}
                    </ul>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
