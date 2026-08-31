import { getTranslations } from "next-intl/server";
import { LogoMarquee } from "@/components/home/logo-marquee";
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
  { name: "Despegar", slug: "despegar", size: "h-8" },
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
    <section id="clients" className="scroll-m-28 px-6 py-12 lg:px-12">
      {/* Las columnas se reparten 3 a 2, la misma proporción que los logos. */}
      <Reveal className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-16">
        <div>
          <RuledLabel>{t("title")}</RuledLabel>

          {/* La cinta sangra hasta el borde mientras corre; desde sm vuelve al
              ancho del contenedor porque los logos ya entran. */}
          <div className="-mx-6 mt-6 sm:mx-0">
            <LogoMarquee>
              {clients.map((logo) => (
                <LogoSlide key={logo.slug} logo={logo} />
              ))}
              {/* El set va dos veces: con uno solo Embla no junta ancho para
                  clonar, apaga el loop y la cinta queda quieta. */}
              {clients.map((logo) => (
                <LogoSlide
                  key={`${logo.slug}-loop`}
                  logo={logo}
                  className="sm:hidden"
                  aria-hidden
                />
              ))}
            </LogoMarquee>
          </div>
        </div>

        <div>
          <RuledLabel>{t("partners")}</RuledLabel>
          <ul className="mt-6 flex items-center justify-center">
            {partners.map((logo) => (
              <LogoSlide key={logo.slug} logo={logo} as="li" />
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/** Rótulo centrado, con la regla partida a los dos lados. */
function RuledLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-5", className)}>
      <span aria-hidden className="h-px flex-1 bg-hairline" />
      <p className="shrink-0 text-eyebrow font-medium text-ink-muted uppercase">
        {children}
      </p>
      <span aria-hidden className="h-px flex-1 bg-hairline" />
    </div>
  );
}

function LogoSlide({
  logo,
  as: Tag = "div",
  className,
  ...props
}: {
  logo: Logo;
  as?: "div" | "li";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={cn(
        "flex h-12 shrink-0 items-center justify-center px-7",
        className,
      )}
      {...props}
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
            // En el celular no hay hover que revele el color: van a color de entrada.
            "w-auto object-contain transition duration-300 sm:opacity-70 sm:grayscale sm:hover:opacity-100 sm:hover:grayscale-0",
          )}
        />
      </picture>
    </Tag>
  );
}
