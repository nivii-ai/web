"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

/** Desde acá los logos entran enteros: la cinta se apaga y quedan centrados. */
const FITS = "(min-width: 40rem)";

export function LogoMarquee({ children }: { children: React.ReactNode }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
      breakpoints: { [FITS]: { active: false } },
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 0.6,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  return (
    // Los logos se desvanecen contra los bordes en vez de cortarse en seco;
    // desde sm no hay nada que cortar y la máscara se apaga.
    <div
      ref={emblaRef}
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:[mask-image:none]"
    >
      <div className="flex sm:justify-center">{children}</div>
    </div>
  );
}
