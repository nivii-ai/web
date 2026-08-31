"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const NUMBER = /(\d+(?:[.,]\d+)?)/g;

/** Respeta los decimales y el separador que trae el original de cada idioma. */
function format(raw: string, progress: number) {
  const separator = raw.includes(",") ? "," : ".";
  const decimals = raw.split(/[.,]/)[1]?.length ?? 0;
  const value = Number.parseFloat(raw.replace(",", ".")) * progress;
  return value.toFixed(decimals).replace(".", separator);
}

export function Stat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  const reduced = useReducedMotion();
  // Sin JS el número queda en su valor final; con JS arranca en cero, y eso
  // pasa fuera de pantalla porque la sección está bajo el fold.
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(1);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (!inView) {
      setProgress(0);
      return;
    }
    if (reduced) {
      setProgress(1);
      return;
    }
    const controls = animate(0, 1, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setProgress,
    });
    return () => controls.stop();
  }, [mounted, inView, reduced]);

  const shown = value.replace(NUMBER, (raw) => format(raw, progress));

  return (
    <span
      ref={ref}
      className="tabular block font-display text-display-m text-brand-green"
    >
      {shown}
    </span>
  );
}
