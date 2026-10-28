import { getTranslations } from "next-intl/server";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  slug: string;
  /** Ancho sobre alto del archivo, ya recortado al borde. */
  ratio: number;
  /** Fracción del recuadro que tiene tinta (alpha > 50%). */
  ink: number;
  /** Ajuste a ojo para lo que la tinta mide mal, como un fondo macizo. */
  scale?: number;
  vector?: boolean;
}

const clients: Logo[] = [
  { name: "Despegar", slug: "despegar", ratio: 3.67, ink: 0.22 },
  { name: "Newsan", slug: "newsan", ratio: 7.26, ink: 0.36 },
  { name: "Tecpetrol", slug: "tecpetrol", ratio: 1.49, ink: 0.18 },
  // El recuadro gris cuenta como tinta, pero se lee como fondo del texto.
  { name: "Ternium", slug: "ternium", ratio: 3.11, ink: 0.84, scale: 1.15 },
  { name: "Syngenta", slug: "syngenta", ratio: 3.41, ink: 0.32, vector: true },
  { name: "Satoshi Tango", slug: "satoshitango", ratio: 2.14, ink: 0.25 },
];

const partners: Logo[] = [
  { name: "iQuant", slug: "iquant", ratio: 3.46, ink: 0.18 },
  { name: "PCG", slug: "pcg", ratio: 2.4, ink: 0.37 },
];

/* A una altura común los logos anchos quedan enormes y los apilados, ilegibles.
   Igualar el área del recuadro lo corrige; la tinta pesa a medias, porque
   igualarla del todo achica de más a los macizos como Ternium. */
function logoHeight({ ratio, ink, scale = 1 }: Logo) {
  return Math.round((36 * scale) / (ratio ** 2 * ink) ** 0.25);
}

export async function Clients() {
  const t = await getTranslations("home.clients");

  return (
    <section id="clients" className="scroll-m-28 px-6 py-12 lg:px-12">
      {/* Las columnas se reparten 5 a 2, la misma proporción que los logos. */}
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-12 xl:grid-cols-[5fr_2fr] xl:items-start xl:gap-16">
        <div>
          <RuledLabel>{t("title")}</RuledLabel>

          {/* La cinta sangra hasta el borde mientras corre; desde md vuelve al
              ancho del contenedor porque los logos ya entran. */}
          <div className="-mx-6 mt-6 md:mx-0 md:min-w-0">
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
                  className="md:hidden"
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
        "flex h-14 shrink-0 items-center justify-center px-7",
        "md:min-w-0 md:shrink md:px-[clamp(0.875rem,1.6vw,1.75rem)]",
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
          style={{ height: logoHeight(logo) }}
          className={cn(
            // En el celular no hay hover que revele el color: van a color de entrada.
            "w-auto object-contain transition duration-300 md:max-w-full md:opacity-70 md:grayscale md:hover:opacity-100 md:hover:grayscale-0",
          )}
        />
      </picture>
    </Tag>
  );
}
