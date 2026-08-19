import Image from "next/image";
import { getMessages, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

type Member = {
  name: string;
  photo: string;
  role: string;
  bio: string[];
  linkedin?: string;
};

export async function Team() {
  const t = await getTranslations("home.team");
  const messages = await getMessages();
  const members = messages.home.team.members as Member[];

  return (
    <section id="team" className="scroll-m-28 px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <h2 className="text-display-l text-ink">{t("title")}</h2>
          <p className="mt-6 text-body-l text-ink-muted">{t("description")}</p>
        </Reveal>

        <ul className="mt-20 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {members.map((member, i) => {
            const Wrapper = member.linkedin ? "a" : "div";
            const props = member.linkedin
              ? {
                  href: member.linkedin,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <Reveal as="li" key={member.name} order={i}>
                <Wrapper {...props} className="group flex items-start gap-6">
                  <div className="w-32 shrink-0 overflow-hidden rounded-xl bg-surface-sunken">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={240}
                      height={300}
                      className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div>
                    <h3 className="text-heading text-ink">{member.name}</h3>
                    <p className="mt-0.5 text-body-s font-medium text-brand-green">
                      {member.role}
                    </p>
                    <div className="mt-3 flex flex-col gap-2">
                      {member.bio.map((line) => (
                        <p key={line} className="text-body-s text-ink-muted">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
