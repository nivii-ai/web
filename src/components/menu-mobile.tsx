"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { spring, springSheet } from "@/lib/motion";
import { useFocusTrap } from "@/hooks/use-focus-trap";

const links = [
  { href: "/beacon", key: "beacon" },
  { href: "/enterprise", key: "enterprise" },
  { href: "/#use-cases", key: "useCases" },
  { href: "/#team", key: "about" },
  { href: "/careers/", key: "careers" },
] as const;

const DISMISS_VELOCITY = 300;
const DISMISS_OFFSET = 120;

export function MenuMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const exitVelocity = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("header");

  useFocusTrap(panelRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cerrar por el signo de la velocidad; la posición sólo decide si el gesto se soltó quieto.
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const flicked = info.velocity.y < -DISMISS_VELOCITY;
    const settledAbove =
      Math.abs(info.velocity.y) < DISMISS_VELOCITY &&
      info.offset.y < -DISMISS_OFFSET;

    if (flicked || settledAbove) {
      exitVelocity.current = info.velocity.y;
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 flex h-8 w-10 cursor-pointer flex-col justify-between rounded-md p-2 text-ink-muted transition-transform duration-100 active:scale-[0.94] lg:hidden"
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-full rounded-2xl bg-current transition-transform duration-300 ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-full rounded-2xl bg-current transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 rounded-2xl bg-current transition-transform duration-300 ${
            isOpen ? "w-full -translate-y-[6px] -rotate-45" : "ms-auto w-6/8"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={panelRef}
            key="sheet"
            drag="y"
            dragConstraints={{ top: -600, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.15 }}
            onDragEnd={handleDragEnd}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: { ...springSheet, velocity: exitVelocity.current },
            }}
            transition={springSheet}
            className="fixed inset-x-0 top-0 z-40 h-dvh touch-none glass lg:hidden"
          >
            <nav className="flex h-full flex-col gap-1 px-6 pt-24">
              {links.map(({ href, key }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.04 * (i + 1) }}
                >
                  <Link
                    href={href}
                    className="block py-3 font-display text-display-m text-ink"
                    onNavigate={() => setIsOpen(false)}
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.04 * (links.length + 1) }}
                className="mt-6"
              >
                <Link
                  href="/demo"
                  onNavigate={() => setIsOpen(false)}
                  className="inline-block rounded-lg bg-brand-green px-4 py-2 text-body-s font-semibold text-white transition-all duration-100 active:scale-[0.97]"
                >
                  {t("demo")}
                </Link>
              </motion.div>
            </nav>

            <span
              aria-hidden
              className="absolute inset-x-0 bottom-3 mx-auto h-1 w-10 rounded-full bg-hairline"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
