import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

// Al llegar los archivos, cada entrada suma `logo` y `name` y la ranura vacía
// se reemplaza sola.
const clients: { name: string; logo?: string }[] = Array.from(
  { length: 6 },
  () => ({ name: "" })
);

export async function Clients() {
  const t = await getTranslations("home.clients");

  return (
    <section id="clients" className="scroll-m-28 px-6 py-16 lg:px-12">
      <Reveal className="mx-auto max-w-7xl">
        <p className="text-center text-body-s text-ink-muted">{t("title")}</p>

        <ul className="mt-8 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client, i) => (
            <li key={i} className="w-full max-w-[9rem]">
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={144}
                  height={48}
                  className="h-12 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="flex h-12 items-center justify-center rounded-lg border border-dashed border-hairline text-code text-ink-muted">
                  {t("logoPending")}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
