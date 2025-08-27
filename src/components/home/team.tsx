import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

export async function Team() {
  const t = await getTranslations("home.team");
  const messages = await getMessages();
  const members = messages.home.team.members as {
    name: string;
    photo: string;
    role: string;
    bio: string[];
  }[];
  return (
    <section id="team" className="py-32">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-balance text-3xl font-bold lg:text-4xl mb-6">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-700 mb-12  max-w-2xl mx-auto">
          {t("description")}
        </p>
        <div className="flex flex-wrap justify-center gap-12">
          {members.map((member) => (
            <div
              key={member.name}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 w-80 flex-shrink-0"
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

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-brand-green font-bold mb-4">{member.role}</p>
                <ul className="text-gray-600 text-sm leading-relaxed text-left mb-2 flex flex-col gap-2">
                  {member.bio.map((paragraph, index) => (
                    <li key={index}>{paragraph}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
