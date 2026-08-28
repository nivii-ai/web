import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  slug: string;
  /** Altura propia: a una altura común los logos apilados quedan ilegibles y
      los muy anchos, enormes. Lo que se empareja es el peso óptico. */
  size: string;
  vector?: boolean;
}

const clients: Logo[] = [
  { name: "Ternium", slug: "ternium", size: "h-9" },
  { name: "Despegar", slug: "despegar", size: "h-8" },
  { name: "Tecpetrol", slug: "tecpetrol", size: "h-14" },
  { name: "Newsan", slug: "newsan", size: "h-6" },
  { name: "Syngenta", slug: "syngenta", size: "h-7", vector: true },
];

const partners: Logo[] = [
  { name: "iQuant", slug: "iquant", size: "h-7" },
  { name: "PCG", slug: "pcg", size: "h-7" },
];

export async function Clients() {
  const t = await getTranslations("home.clients");

  return (
    <section id="clients" className="scroll-m-28 px-6 py-16 lg:px-12">
      <Reveal className="mx-auto max-w-7xl">
        <p className="text-center text-body-s text-ink-muted">{t("title")}</p>

        {/* Cinco celdas de 11rem entran enteras recién en lg. Hasta ahí desbordan
            y se convierten en cinta; desde ahí quedan quietas y centradas. */}
        <div className="group mt-8 flex justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] lg:[mask-image:none]">
          <div className="flex w-max shrink-0 animate-marquee group-hover:[--marquee-duration:180s] lg:animate-none">
            <LogoRow logos={clients} />
            <LogoRow logos={clients} className="lg:hidden" aria-hidden />
          </div>
        </div>

        <p className="mt-14 text-center text-body-s text-ink-muted">
          {t("partners")}
        </p>
        <LogoRow logos={partners} className="mt-6 justify-center" />
      </Reveal>
    </section>
  );
}

function LogoRow({
  logos,
  className,
  ...props
}: { logos: Logo[] } & React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("flex shrink-0 items-center", className)} {...props}>
      {logos.map((logo) => (
        <li
          key={logo.slug}
          className="flex h-16 shrink-0 items-center justify-center px-7"
        >
          {/* `picture` y no `next/image`: el fallback a PNG es negociación de
              formato en el markup, algo que el optimizador no expone. */}
          <picture>
            {!logo.vector && (
              <source srcSet={`/${logo.slug}.webp`} type="image/webp" />
            )}
            <img
              src={`/${logo.slug}.${logo.vector ? "svg" : "png"}`}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              className={cn(
                logo.size,
                "w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0",
              )}
            />
          </picture>
        </li>
      ))}
    </ul>
  );
}
